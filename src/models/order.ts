// export interface OrderHash {
// 	exchange: string;
// 	maker: string;
// 	taker: string;
// 	makerRelayerFee: BigNumber;
// 	takerRelayerFee: BigNumber;
// 	makerProtocolFee: BigNumber;
// 	takerProtocolFee: BigNumber;
// 	feeRecipient: string;
// 	feeMethod: number;
// 	side: number;
// 	saleKind: number;
// 	target: string;
// 	howToCall: number;
// 	callData: string;
// 	replacementPattern: string;
// 	staticTarget: string;
// 	staticExtraData: string;
// 	paymentToken: string;
// 	basePrice: BigNumber;
// 	extra: BigNumber;
// 	listingTime: BigNumber;
// 	expirationTime: BigNumber;
// 	salt: BigNumber;
// }

export interface Order {
	exchange: string;
	maker: string;
	taker: string;
	makerRelayerFee: string;
	takerRelayerFee: string;
	makerProtocolFee: string;
	takerProtocolFee: string;
	feeRecipient: string;
	feeMethod: number;
	side: number;
	saleKind: number;
	target: string;
	howToCall: number;
	callData: string;
	replacementPattern: string;
	staticTarget: string;
	staticExtraData: string;
	paymentToken: string;
	basePrice: string;
	extra: string;
	listingTime: string;
	expirationTime: string;
	salt: string;
}

export interface OrderResponseAPI extends Order {
	_id: string;
	orderId: string;
	r: string;
	s: string;
	v: string;
	itemId: string;
	itemMedia?: string;
	itemName?: string;
	offerPrice?: string;
	salePrice?: string;
	priceLogo?: string;
	usdPrice?: number;
	symbolToken?: string;
	itemTokenId?: string;
	createdAt?: string;
	type: number;
}

export interface getOrderRequest {
	itemId: string;
	maker: string;
	side: number;
	chainId: number;
}

export interface SetupOrderForSaleInput {
	chainId: number;
	userAddress: string;
	paymentToken: string;
	feeMethod: number;
	startPrice: number;
	endPrice: number;
	itemTokenId: string;
	itemStandard: string;
	collectionAddress: string;
	collectionOwner: string;
	royalties: number;
	web3: any;
	startTime: string;
	endTime: string;
	saleKind: number;
}

export interface SetupOrderForOfferInput {
	chainId: number;
	userAddress: string;
	paymentToken: string;
	offerPrice: number;
	listingTime: string;
	expirationTime: string;
	itemTokenId: string;
	itemStandard: string;
	itemOwner: string;
	collectionAddress: string;
	collectionOwner: string;
	royalties: number;
	web3: any;
}

export interface SetupAtomicMatchInput {
	chainId: number;
	userAddress: string;
	orderSell: OrderResponseAPI;
	orderBuy: OrderResponseAPI;
	web3: any;
	itemTokenId: string;
	itemStandard: string;
}

export interface CancelOrderInput {
	chainId: number;
	itemId: string;
	collectionId: string;
	makerAddress: string;
	orderMaker: OrderResponseAPI;
	setLoading: Function;
	refetchApi: VoidFunction;
}

export interface ApproveWalletNftAssetInput {
	chainId: number;
	userAddress: string;
	collectionAddress: string;
	itemStandard: string;
}

export interface ApproveRoyaltiesFeeForSellInput {
	feeMethod: number;
	royalties: number;
	startPrice: number;
	paymentToken: string;
	chainId: number;
	userAddress: string;
}

export interface ApproveRoyaltiesFeeForAcceptOfferInput {
	userAddress: string;
	chainId: number;
	orderBuy: OrderResponseAPI;
}

export interface ApproveItemPriceAndServiceFeeForBuyInput {
	orderSell: OrderResponseAPI;
	chainId: number;
	userAddress: string;
}

export interface ApproveItemPriceAndServiceFeeForCreateOfferInput {
	offerPrice: number;
	paymentToken: string;
	userAddress: string;
	chainId: number;
}

export interface HashOrderAndSignForSellInput {
	chainId: number;
	userAddress: string;
	paymentToken: string;
	feeMethod: number;
	startPrice: number;
	endPrice: number;
	itemTokenId: string;
	itemStandard: string;
	collectionAddress: string;
	collectionOwner: string;
	royalties: number;
	web3: any;
	startTime: string;
	endTime: string;
	saleKind: number;
	itemId: string;
	collectionId: string;
}

export interface HashOrderAndSignForCreateOfferInput {
	chainId: number;
	userAddress: string;
	paymentToken: string;
	offerPrice: number;
	listingTime: string;
	expirationTime: string;
	itemTokenId: string;
	itemStandard: string;
	itemOwner: string;
	collectionAddress: string;
	collectionOwner: string;
	royalties: number;
	web3: any;
	itemId: string;
	collectionId: string;
}

export interface ExecuteAtomicMatchForAcceptOfferInput {
	orderBuy: OrderResponseAPI;
	userAddress: string;
	chainId: number;
	web3: any;
	itemTokenId: string;
	itemStandard: string;
	collectionId: string;
}

export interface ExecuteAtomicMatchForBuyInput {
	chainId: number;
	userAddress: string;
	orderSell: OrderResponseAPI;
	web3: any;
	itemTokenId: string;
	itemStandard: string;
	collectionId: string;
}

export interface OfferFilter {
	chainId?: number[];
	maker?: string;
	asc?: number;
	itemId?: string;
}
