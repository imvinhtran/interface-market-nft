/* eslint-disable @typescript-eslint/no-unused-vars */
import { toast } from 'react-toastify';
// constant
import { CONTRACT, ORDER_CONFIGURATION, ORDER_TYPE } from '../../../constants';
// utils
import { BigNumber } from 'ethers';
import { randomBytes } from '@ethersproject/random';
import { encodeFunctionCall, erc20function, ValidateOrder } from 'utils';
// api
import orderApi from 'apis/orderApi';
// models
import {
	SetupOrderForOfferInput,
	Order,
	SignatureRSV,
	ApproveItemPriceAndServiceFeeForCreateOfferInput,
	HashOrderAndSignForCreateOfferInput,
} from 'models';

const { signOrder } = ValidateOrder();

export function CreateOrderForOfferAction() {
	// isCheck === true => this function just to check => "return" means approved or not.
	// isCheck === false => this function approve item price and service fee  => "return" means succeed or not.
	const ApproveItemPriceAndServiceFee = async (
		data: ApproveItemPriceAndServiceFeeForCreateOfferInput,
		isCheck: boolean
	): Promise<boolean> => {
		const { offerPrice, paymentToken, userAddress, chainId } = data;

		try {
			// ==============================================================ORDER BUY APPROVE PRICE + PROTOCOL FEE===========================================================================//
			// OFFER MUST BE SPLIT_FEE_METHOD (AND CANNOT OFFER WITH NATIVE COIN) AND FIXED_PRICE

			const itemPrice: number = Number(offerPrice);
			const protocolFee: number =
				itemPrice * (ORDER_CONFIGURATION.OFFER_MAKER_PROTOCOL_FEE / 10000);

			const total: number = itemPrice + protocolFee;
			const totalToWei: BigNumber = await erc20function().changeTokenToWei(
				paymentToken,
				total
			);

			const missingAmount: BigNumber = await erc20function().getMissingAllowanceAmount(
				paymentToken,
				userAddress,
				CONTRACT[chainId].TOKEN_TRANSFER_PROXY,
				totalToWei
			);

			if (BigNumber.from(String(missingAmount)).gt(BigNumber.from(0))) {
				// missingAmount > 0 + isCheck => return false immediately
				if (isCheck) {
					return false;
				} else {
					await erc20function().approve(
						paymentToken,
						missingAmount,
						userAddress,
						CONTRACT[chainId].TOKEN_TRANSFER_PROXY
					);
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

	// hash the order and sign => "return" means succeed or not.
	const HashOrderAndSign = async (
		data: HashOrderAndSignForCreateOfferInput
	): Promise<boolean> => {
		const {
			chainId,
			userAddress,
			paymentToken,
			offerPrice,
			listingTime,
			expirationTime,
			itemTokenId,
			itemStandard,
			itemOwner,
			collectionAddress,
			collectionOwner,
			royalties,
			web3,
			itemId,
			collectionId,
		} = data;

		try {
			// ===================================================================SETUP ORDER DATA==============================================================================//
			const order: Order = await setupOrderForOffer({
				chainId,
				userAddress,
				paymentToken,
				offerPrice,
				listingTime,
				expirationTime,
				itemTokenId,
				itemStandard,
				itemOwner,
				collectionAddress,
				collectionOwner,
				royalties,
				web3,
			});

			console.log('Order here', order);

			// ==============================================================GET SIGNATURE HASH==================================================================================//
			const signatureHash: string = await signOrder(order, chainId, web3);

			// ==============================================================GET SIGNATURE RSV==================================================================================//
			const signatureRSV: SignatureRSV = extractSignatureToRSV(web3, signatureHash);

			// ==============================================================CALL API TO CREATE OFFER==================================================================================//

			await callingCreateOrderApi(
				order,
				signatureRSV,
				itemTokenId,
				chainId,
				itemId,
				collectionId
			);

			return true;
		} catch (error) {
			console.log(error);
			toast.error('Some error occur when creating order!');
			console.log(error);
			return false;
		}
	};

	return { ApproveItemPriceAndServiceFee, HashOrderAndSign };
}

// =======================================================SETUP ORDER FUNCTION========================================================================== //
const setupOrderForOffer = async (data: SetupOrderForOfferInput) => {
	const {
		chainId,
		userAddress,
		paymentToken,
		offerPrice,
		listingTime,
		expirationTime,
		itemTokenId,
		itemStandard,
		itemOwner,
		collectionAddress,
		collectionOwner,
		royalties,
		web3,
	} = data;

	const addrs: string[] = [
		CONTRACT[chainId].EXCHANGE,
		userAddress, // maker
		itemOwner, // taker
		collectionOwner, // ORDER_CONFIGURATION.FEE_RECIPIENT,
		collectionAddress,
		'0x0000000000000000000000000000000000000000',
		paymentToken,
	];

	// =======================================CALCULATE TAKER RELAYER FEE =================================================================
	// offer must be split fee method (and can not offer with native token)
	const takerRelayerFee: number = royalties * 100;

	// =======================================CALCULATE BASE PRICE =================================================================
	let basePriceByWei: BigNumber = BigNumber.from(0);
	basePriceByWei = await erc20function().changeTokenToWei(paymentToken, offerPrice);

	const uints: string[] = [
		ORDER_CONFIGURATION.OFFER_MAKER_RELAYER_FEE,
		takerRelayerFee,
		ORDER_CONFIGURATION.OFFER_MAKER_PROTOCOL_FEE,
		ORDER_CONFIGURATION.OFFER_TAKER_PROTOCOL_FEE,
		basePriceByWei, // basePrice
		0, // extra
		listingTime, // listing time
		expirationTime, // expirationTime
		BigNumber.from(randomBytes(32)), // salt
	].map(String);

	const feeMethodsSidesKindsHowToCalls: number[] = [
		ORDER_CONFIGURATION.SPLIT_FEE_METHOD,
		ORDER_CONFIGURATION.BUY_SIDE,
		ORDER_CONFIGURATION.FIXED_PRICE, // saleKind
		ORDER_CONFIGURATION.CALL,
	];

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

	const replacementPattern = ORDER_CONFIGURATION.BUY_REPLACEMENT_PATTERN;
	const staticExtraData = '0x';

	const result: Order = {
		exchange: addrs[0],
		maker: addrs[1],
		taker: addrs[2],
		makerRelayerFee: uints[0],
		takerRelayerFee: uints[1],
		makerProtocolFee: uints[2],
		takerProtocolFee: uints[3],
		feeRecipient: addrs[3],
		feeMethod: feeMethodsSidesKindsHowToCalls[0],
		side: feeMethodsSidesKindsHowToCalls[1],
		saleKind: feeMethodsSidesKindsHowToCalls[2],
		target: addrs[4],
		howToCall: feeMethodsSidesKindsHowToCalls[3],
		callData: callDataBuy,
		replacementPattern: replacementPattern,
		staticTarget: addrs[5],
		staticExtraData: staticExtraData,
		paymentToken: addrs[6],
		basePrice: uints[4],
		extra: uints[5],
		listingTime: uints[6],
		expirationTime: uints[7],
		salt: uints[8],
	};

	return result;
};

// =======================================================GET SINGNATURE (R,S,V) FUNCTION========================================================================== //
const extractSignatureToRSV = (web3: any, signature: any) => {
	console.log('signature to VRS', {
		r: signature.slice(2, 66),
		s: signature.slice(66, 130),
		v: web3.utils.hexToNumber('0x' + signature.slice(-2)),
	});

	return {
		r: signature.slice(2, 66),
		s: signature.slice(66, 130),
		v: web3.utils.hexToNumber('0x' + signature.slice(-2)),
	};
};

// =================================================CALL API TO CREATE ORDER FOR DATABASE================================================================================ //
const callingCreateOrderApi = async (
	order: Order,
	signature: SignatureRSV,
	itemTokenId: string,
	chainId: number,
	itemId: string,
	collectionId: string
) => {
	const response: any = await orderApi.createOrder(
		constructPostData(order, signature, itemTokenId, itemId, collectionId),
		chainId
	);
	return response;
};

const constructPostData = (
	order: Order,
	signature: SignatureRSV,
	itemTokenId: string,
	itemId: string,
	collectionId: string
) => {
	return {
		itemId,
		itemTokenId,
		userAddress: order.maker,
		owner: order.maker,
		feeRecipient: order.feeRecipient,
		maker: order.maker,
		taker: order.taker,
		makerProtocolFee: order.makerProtocolFee,
		takerProtocolFee: order.takerProtocolFee,
		makerRelayerFee: order.makerRelayerFee,
		takerRelayerFee: order.takerRelayerFee,
		side: order.side,
		saleKind: order.saleKind,
		target: order.target,
		collectionId,
		feeMethod: order.feeMethod,
		howToCall: order.howToCall,
		callData: order.callData,
		replacementPattern: order.replacementPattern,
		staticTarget: order.staticTarget,
		staticExtraData: order.staticExtraData,
		paymentToken: order.paymentToken,
		basePrice: order.basePrice,
		sellPrice: order.basePrice,
		extra: order.extra,
		listingTime: order.listingTime,
		expirationTime: order.expirationTime,
		salt: order.salt,
		r: signature.r,
		s: signature.s,
		v: signature.v,
		type: ORDER_TYPE.OFFER,
	};
};

// =======================================
