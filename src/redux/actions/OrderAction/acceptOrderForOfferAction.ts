/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from 'react-toastify';
//utils
import { BigNumber } from 'ethers';
import { randomBytes } from '@ethersproject/random';
import { encodeFunctionCall, erc20function, ValidateOrder } from 'utils';
//constants
import { CONTRACT, ORDER_CONFIGURATION, ORDER_TYPE } from '../../../constants';
//api
import orderApi from 'apis/orderApi';
// models
import {
	SetupAtomicMatchInput,
	ApproveRoyaltiesFeeForAcceptOfferInput,
	ExecuteAtomicMatchForAcceptOfferInput,
	OrderResponseAPI,
} from 'models';
//abi
import ContractForbitExchange from 'abis/ForbitExchange.json';
import { getWeb3Contract } from 'hooks/useWebContract';

const { validateOrderSignature, validateOrderParameters, checkOrderCanMatch } = ValidateOrder();

export function AcceptOrderForOfferAction() {
	// isCheck === true => this function just to check => "return" means approved or not.
	// isCheck === false => this function approve royalties fee  => "return" means succeed or not.
	const ApproveRoyaltiesFee = async (
		data: ApproveRoyaltiesFeeForAcceptOfferInput,
		isCheck: boolean
	): Promise<boolean> => {
		const { userAddress, chainId, orderBuy } = data;

		try {
			// ==============================================================APPROVE ROYALTIES BEFORE ATOMIC MATCH=====================================================//
			// OFFER MUST BE SPLIT_FEE_METHOD, FIXED_PRICE AND CAN NOT OFFER WITH NATIVE TOKEN
			const royaltiesFeeByWei: BigNumber = BigNumber.from(orderBuy.takerRelayerFee)
				.mul(orderBuy.basePrice)
				.div(10000);

			const missingAmount: BigNumber = await erc20function().getMissingAllowanceAmount(
				orderBuy.paymentToken,
				userAddress,
				CONTRACT[chainId].TOKEN_TRANSFER_PROXY,
				royaltiesFeeByWei
			);

			if (BigNumber.from(String(missingAmount)).gt(BigNumber.from(0))) {
				// missingAmount > 0 + isCheck => return false immediately
				if (isCheck) {
					return false;
				} else {
					await erc20function().approve(
						orderBuy.paymentToken,
						missingAmount,
						userAddress,
						CONTRACT[chainId].TOKEN_TRANSFER_PROXY
					);
				}
			}

			return true;
		} catch (error) {
			if (isCheck) {
				toast.error('Some error occur when checking royalties fee approved!');
			} else {
				toast.error('Some error occur when approving royalties fee!');
			}
			console.log(error);
			return false;
		}
	};

	// execute atomic match => "return" means succeed or not.
	const ExecuteAtomicMatch = async (
		data: ExecuteAtomicMatchForAcceptOfferInput
	): Promise<boolean> => {
		const { orderBuy, userAddress, chainId, web3, itemTokenId, itemStandard, collectionId } =
			data;

		try {
			const orderSell: OrderResponseAPI = {
				...orderBuy,
				maker: userAddress,
				taker: orderBuy.maker,
				side: ORDER_CONFIGURATION.SELL_SIDE,
				feeRecipient: '0x0000000000000000000000000000000000000000',
				replacementPattern: ORDER_CONFIGURATION.SELL_REPLACEMENT_PATTERN,
				salt: String(BigNumber.from(randomBytes(32))),
			};

			// contract exchange
			const contractForbitExchange = getWeb3Contract(
				ContractForbitExchange.abi,
				CONTRACT[chainId].EXCHANGE
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
			console.log('atomic', atomic);

			// ===================================================================VALIDATE ORDER SIGNATURE BEFORE ATOMIC MATCH==============================================================================//
			await validateOrderSignature(orderBuy, chainId);

			// ===================================================================VALIDATE ORDER PARAMETERS BEFORE ATOMIC MATCH==============================================================================//
			await validateOrderParameters(orderSell, chainId);

			// ===================================================================CHECK ORDER CAN MATCH BEFORE ATOMIC MATCH==============================================================================//
			await checkOrderCanMatch(
				orderBuy,
				orderSell,
				chainId,
				web3,
				true,
				userAddress,
				itemTokenId,
				itemStandard
			);

			// ===================================================================LET ATOMIC MATCH !!!==============================================================================//
			const params: any = Object.values(atomic);
			console.log('params', params);

			// OFFER MUST BE SPLIT_FEE_METHOD, FIXED_PRICE AND CAN NOT OFFER WITH NATIVE TOKEN
			let atomicMatchReceipt: any = {};

			await contractForbitExchange.methods
				.atomicMatch_(...params)
				.send({ from: userAddress, value: 0 })
				.then(function (receipt: any) {
					console.log('receipt for atomicMatch', receipt);
					atomicMatchReceipt = receipt;
				});

			const transactionHash = atomicMatchReceipt.transactionHash;

			// ===================================================================CALL API AFTER EXECUTE ATOMICMATCH==============================================================================//
			await orderApi.acceptOrder({
				order: orderBuy,
				collectionId,
				chainId,
				transactionHash,
				type: ORDER_TYPE.ACCEPT_OFFER,
				finalPrice: orderSell.basePrice,
				userAddress: userAddress,
			});

			return true;
		} catch (error) {
			toast.error('Some error occur when atomic match!');
			console.log(error);
			return false;
		}
	};

	return { ApproveRoyaltiesFee, ExecuteAtomicMatch };
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
	let callDataSell: any = null;
	if (itemStandard.includes('1155')) {
		//  STANDARD 1155
		callDataSell = encodeFunctionCall(
			web3,
			'safeTransferFrom(address,address,uint256,uint256,bytes)',
			['address', 'address', 'uint256', 'uint256', 'bytes'],
			[
				userAddress,
				'0x0000000000000000000000000000000000000000',
				itemTokenId,
				1,
				web3.utils.asciiToHex(''),
			]
		);
	} else {
		// STANDARD 721
		callDataSell =
			encodeFunctionCall(
				web3,
				'safeTransferFrom(address,address,uint256,bytes)',
				['address', 'address', 'uint256', 'bytes'],
				[
					userAddress,
					'0x0000000000000000000000000000000000000000',
					itemTokenId,
					web3.utils.asciiToHex(''),
				]
			) + '0'.repeat(64);
	}

	const callDataBuy = orderBuy.callData;

	const replacementPatternBuy = orderBuy.replacementPattern;
	const replacementPatternSell = orderSell.replacementPattern;

	// const staticExtradataBuy = web3.utils.asciiToHex('');
	const staticExtradataBuy = orderSell.staticExtraData;
	const staticExtradataSell = orderSell.staticExtraData;

	const v = [orderBuy.v, orderBuy.v];

	const rsMetadata = [
		'0x' + orderBuy.r,
		'0x' + orderBuy.s,
		'0x' + orderBuy.r,
		'0x' + orderBuy.s,
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
