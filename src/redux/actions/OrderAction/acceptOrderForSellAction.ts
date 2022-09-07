/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from 'react-toastify';
//utils
import { BigNumber } from 'ethers';
import { randomBytes } from '@ethersproject/random';
import { encodeFunctionCall, isNativeToken, erc20function, ValidateOrder } from 'utils';
//constants
import { CONTRACT, ORDER_CONFIGURATION, ORDER_TYPE } from '../../../constants';
//api
import orderApi from 'apis/orderApi';
// models
import {
	SetupAtomicMatchInput,
	OrderResponseAPI,
	ApproveItemPriceAndServiceFeeForBuyInput,
	ExecuteAtomicMatchForBuyInput,
} from 'models';
//abi
import ContractForbitExchange from 'abis/ForbitExchange.json';
import { getWeb3Contract } from 'hooks/useWebContract';
// order action
import { CalculateFinalPrice } from './common';

const { validateOrderSignature, checkOrderCanMatch, validateOrderParameters } = ValidateOrder();

export function AcceptOrderForSellAction() {
	// isCheck === true => this function just to check => "return" means approved or not.
	// isCheck === false => this function approve item price and service fee  => "return" means succeed or not.
	const ApproveItemPriceAndServiceFee = async (
		data: ApproveItemPriceAndServiceFeeForBuyInput,
		isCheck: boolean
	): Promise<boolean> => {
		const { orderSell, chainId, userAddress } = data;

		try {
			// ==============================================================CALCULATE FINAL PRICE OF ITEM=====================================================//
			let itemPrice: string | BigNumber;
			if (orderSell.saleKind === ORDER_CONFIGURATION.DUTCH_AUCTION) {
				// DUTCH_AUCTION
				itemPrice = await CalculateFinalPrice(orderSell, chainId);
			} else {
				// FIXED_PRICE
				itemPrice = orderSell.basePrice;
			}
			console.log('itemPrice', itemPrice);

			// ============================================================== APPROVE TOKEN =====================================================//
			if (
				orderSell.feeMethod === ORDER_CONFIGURATION.PROTOCOL_FEE_METHOD &&
				!isNativeToken(orderSell.paymentToken)
			) {
				const missingAmount: BigNumber = await erc20function().getMissingAllowanceAmount(
					orderSell.paymentToken,
					userAddress,
					CONTRACT[chainId].TOKEN_TRANSFER_PROXY,
					BigNumber.from(String(itemPrice))
				);

				if (BigNumber.from(String(missingAmount)).gt(BigNumber.from(0))) {
					// missingAmount > 0 + isCheck => return false immediately
					if (isCheck) {
						return false;
					} else {
						await erc20function().approve(
							orderSell.paymentToken,
							missingAmount,
							userAddress,
							CONTRACT[chainId].TOKEN_TRANSFER_PROXY
						);
					}
				}
			} else if (
				orderSell.feeMethod === ORDER_CONFIGURATION.SPLIT_FEE_METHOD &&
				!isNativeToken(orderSell.paymentToken)
			) {
				const protocolFee: BigNumber = BigNumber.from(String(itemPrice))
					.mul(BigNumber.from(String(orderSell.takerProtocolFee)))
					.div(BigNumber.from(10000));

				const total: BigNumber = BigNumber.from(String(itemPrice)).add(protocolFee);

				const missingAmount: BigNumber = await erc20function().getMissingAllowanceAmount(
					orderSell.paymentToken,
					userAddress,
					CONTRACT[chainId].TOKEN_TRANSFER_PROXY,
					total
				);

				if (BigNumber.from(String(missingAmount)).gt(BigNumber.from(0))) {
					// missingAmount > 0 + isCheck => return false immediately
					if (isCheck) {
						return false;
					} else {
						await erc20function().approve(
							orderSell.paymentToken,
							missingAmount,
							userAddress,
							CONTRACT[chainId].TOKEN_TRANSFER_PROXY
						);
					}
				}
			}

			return true;
		} catch (error) {
			if (isCheck) {
				toast.error('Some error occur when checking item price and service fee approved!');
			} else {
				toast.error('Some error occur when approving item price and service fee!');
			}
			console.log(error);
			return false;
		}
	};

	// execute atomic match => "return" means succeed or not.
	const ExecuteAtomicMatch = async (data: ExecuteAtomicMatchForBuyInput): Promise<boolean> => {
		const { chainId, userAddress, orderSell, web3, itemTokenId, itemStandard, collectionId } =
			data;

		try {
			const orderBuy: OrderResponseAPI = {
				...orderSell,
				maker: userAddress,
				taker: orderSell.maker,
				side: ORDER_CONFIGURATION.BUY_SIDE,
				feeRecipient: '0x0000000000000000000000000000000000000000',
				replacementPattern: ORDER_CONFIGURATION.BUY_REPLACEMENT_PATTERN,
				salt: String(BigNumber.from(randomBytes(32))),
			};

			// contract exchange
			const contractForbitExchange = getWeb3Contract(
				ContractForbitExchange.abi,
				CONTRACT[chainId].EXCHANGE
			);

			// ===================================================================VALIDATE ORDER BEFORE ATOMIC MATCH==============================================================================//
			await validateOrderSignature(orderSell, chainId);

			// ===================================================================VALIDATE ORDER PARAMETERS BEFORE ATOMIC MATCH==============================================================================//
			await validateOrderParameters(orderBuy, chainId);

			// ===================================================================CHECK ORDER CAN MATCH BEFORE ATOMIC MATCH==============================================================================//
			await checkOrderCanMatch(
				orderBuy,
				orderSell,
				chainId,
				web3,
				false,
				userAddress,
				itemTokenId,
				itemStandard
			);

			// ===================================================================SETUP DATA FOR ATOMIC MATCH==============================================================================//
			const atomic = await setupAtomicMatch({
				chainId,
				userAddress,
				orderBuy,
				orderSell,
				web3,
				itemTokenId,
				itemStandard,
			});

			// ==============================================================CALCULATE FINAL PRICE OF ITEM=====================================================//
			let itemPrice: string | BigNumber;
			if (orderSell.saleKind === ORDER_CONFIGURATION.DUTCH_AUCTION) {
				// DUTCH_AUCTION
				itemPrice = await CalculateFinalPrice(orderSell, chainId);
			} else {
				// FIXED_PRICE
				itemPrice = orderSell.basePrice;
			}
			console.log('itemPrice', itemPrice);

			// ===================================================================LET ATOMIC MATCH !!!==============================================================================//

			console.log('atomic', atomic);
			const params: any = Object.values(atomic);
			console.log('params', params);
			let atomicMatchReceipt: any = {};

			//========================IF TOKEN PAYMENT IS NOT NATIVE COIN==============================//
			if (!isNativeToken(orderSell.paymentToken)) {
				await contractForbitExchange.methods
					.atomicMatch_(...params)
					.send({ from: userAddress, value: 0 })
					.then(function (receipt: any) {
						console.log('receipt for atomicMatch', receipt);
						atomicMatchReceipt = receipt;
					});
			} else {
				if (orderSell.feeMethod === ORDER_CONFIGURATION.PROTOCOL_FEE_METHOD) {
					// ====================================PROTOCOL_FEE (can not used by DUTCH)======================//
					// ========================================VALUE = BASEPRICE======================================//
					await contractForbitExchange.methods
						.atomicMatch_(...params)
						.send({
							from: userAddress,
							value: BigNumber.from(String(itemPrice)),
						})
						.then(function (receipt: any) {
							console.log('receipt for atomicMatch', receipt);
							atomicMatchReceipt = receipt;
						});
				} else {
					// =========================================SPLIT_FEE ================================================//
					// =========================================VALUE = FINAL PRICE + PROTOCOL FEE================================//
					const protocolFee: BigNumber = BigNumber.from(String(itemPrice))
						.mul(BigNumber.from(String(orderSell.takerProtocolFee)))
						.div(BigNumber.from(10000));
					console.log('protocolFee', protocolFee.toString());

					const total: BigNumber = BigNumber.from(String(itemPrice)).add(protocolFee);
					console.log('total', total.toString());

					await contractForbitExchange.methods
						.atomicMatch_(...params)
						.send({ from: userAddress, value: total })
						.then(function (receipt: any) {
							console.log('receipt for atomicMatch', receipt);
							atomicMatchReceipt = receipt;
						});
				}
			}

			const transactionHash = atomicMatchReceipt.transactionHash;

			// ===================================================================CALL API EXECUTE ATOMICMATCH==============================================================================//
			await orderApi.acceptOrder({
				order: orderBuy,
				collectionId,
				chainId,
				transactionHash,
				type: ORDER_TYPE.BUY,
				finalPrice: atomicMatchReceipt.events?.OrdersMatched?.returnValues?.price,
				userAddress: userAddress,
			});

			return true;
		} catch (error) {
			toast.error('Some error occur when atomic match!');
			console.log(error);
			return false;
		}
	};

	return { ApproveItemPriceAndServiceFee, ExecuteAtomicMatch };
}

// ================================================================================================================================= //
const setupAtomicMatch = async (data: SetupAtomicMatchInput) => {
	const { chainId, userAddress, orderBuy, orderSell, web3, itemTokenId, itemStandard } = data;

	const addrs = [
		// BUY
		CONTRACT[chainId].EXCHANGE,
		orderBuy.maker, //maker
		orderBuy.taker, //taker
		orderBuy.feeRecipient, //feeRecipient
		orderBuy.target,
		orderBuy.staticTarget,
		orderBuy.paymentToken,
		// SELL
		CONTRACT[chainId].EXCHANGE,
		orderSell.maker,
		orderSell.taker,
		orderSell.feeRecipient, //feeRecipient
		orderSell.target,
		orderSell.staticTarget,
		orderSell.paymentToken,
	];

	const uints = [
		// BUY
		orderBuy.makerRelayerFee,
		orderBuy.takerRelayerFee,
		orderBuy.makerProtocolFee,
		orderBuy.takerProtocolFee,
		orderBuy.basePrice,
		orderBuy.extra,
		orderBuy.listingTime,
		orderBuy.expirationTime,
		orderBuy.salt,
		// SELL
		orderSell.makerRelayerFee,
		orderSell.takerRelayerFee,
		orderSell.makerProtocolFee,
		orderSell.takerProtocolFee,
		orderSell.basePrice,
		orderSell.extra,
		orderSell.listingTime,
		orderSell.expirationTime,
		orderSell.salt,
	].map(String);

	const feeMethodsSidesKindsHowToCalls = [
		// BUY
		orderBuy.feeMethod,
		orderBuy.side,
		orderBuy.saleKind,
		ORDER_CONFIGURATION.CALL,
		// SELL
		orderSell.feeMethod,
		orderSell.side,
		orderSell.saleKind,
		ORDER_CONFIGURATION.CALL,
	].map(String);

	// ================================================================= CALL DATA ================================================================= //
	let callDataBuy: any = null;
	if (itemStandard.includes('1155')) {
		//  STANDARD 1155
		callDataBuy = encodeFunctionCall(
			web3,
			'safeTransferFrom(address,address,uint256,uint256,bytes)',
			['address', 'address', 'uint256', 'uint256', 'bytes'],
			[
				'0x0000000000000000000000000000000000000000',
				userAddress,
				itemTokenId,
				1,
				web3.utils.asciiToHex(''),
			]
		);
	} else {
		// STANDARD 721
		callDataBuy =
			encodeFunctionCall(
				web3,
				'safeTransferFrom(address,address,uint256,bytes)',
				['address', 'address', 'uint256', 'bytes'],
				[
					'0x0000000000000000000000000000000000000000',
					userAddress,
					itemTokenId,
					web3.utils.asciiToHex(''),
				]
			) + '0'.repeat(64);
	}

	const callDataSell = orderSell.callData;

	const replacementPatternBuy = orderBuy.replacementPattern;
	const replacementPatternSell = orderSell.replacementPattern;

	// const staticExtradataBuy = web3.utils.asciiToHex('');
	const staticExtradataBuy = orderSell.staticExtraData;
	const staticExtradataSell = orderSell.staticExtraData;

	const v = [orderSell.v, orderSell.v];

	const rsMetadata = [
		'0x' + orderSell.r,
		'0x' + orderSell.s,
		'0x' + orderSell.r,
		'0x' + orderSell.s,
		'0x0000000000000000000000000000000000000000000000000000000000000000',
	];

	return {
		addrs,
		uints,
		feeMethodsSidesKindsHowToCalls,
		callDataBuy,
		callDataSell,
		replacementPatternBuy,
		replacementPatternSell,
		staticExtradataBuy,
		staticExtradataSell,
		v,
		rsMetadata,
	};
};
