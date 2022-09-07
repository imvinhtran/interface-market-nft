/* eslint-disable @typescript-eslint/no-unused-vars */
import { Collection } from './collection';
import { OrderResponseAPI } from './order';
import { User } from './user';

export interface NFT {
	itemId: string;
	chainId: number; //must have
	itemTokenId: string;
	itemName: string; //must have
	description: string; //must have
	properties: object | null;
	attributes: Array<any>;
	userAddress: string; //create must have this but get not have
	owner: string; //get have this but create not have
	creator: string; //get have this but create not have
	status: number;
	category: number;
	price: number;
	priceType: string;
	listingPrice: string;
	listingPriceType: string;
	currentPrice: string;
	priceLogo: string;
	royalties: number;
	collection?: Collection;
	collectionId: string; //must have
	collectionName: string;
	// collectionAddress: string;
	standard: string;
	isFreeze: boolean;
	usdPrice: number;
	isLike: boolean;
	interaction: number;
	order?: OrderResponseAPI;
	itemMedia: string;
	itemOriginMedia: string;
	itemPreviewMedia: string;
	ownerInfo: User;
	creatorInfo: User;
}

export interface CreateNFTInput {
	chainId: number; //must have
	itemName: string; //must have
	description: string; //must have
	itemImage: string; //must have
	properties?: object | null;
	attributes?: Array<any>;
	userAddress: string; //create must have this but get not have
	status?: number;
	category?: number;
	price: number;
	collectionId: string; //must have
	isFreeze?: boolean;
}

export interface Item {
	itemId?: string;
	itemName: string;
	description?: string;
	metaData: string;
	owner: string;
	creator: string;
	collectionName: string;
	itemStandard?: string;
	chainId: string;
	isFreeze?: boolean;
}

export interface GetNFTsByCollectionIdRequest {
	collectionId: string;
	chainId: number;
	page: number;
	userAddress: string;
}

export interface GetAllNftRequest {
	chainId: number;
	pageSize: number;
	page: number;
	userAddress: string | null | undefined;
}

export interface CreateAndUpdateNFTInput {
	chainId: number; //must have
	itemName: string; //must have
	description: string; //must have
	itemMedia: string; //must have
	itemPreviewMedia?: string;
	itemOriginMedia: string;
	properties?: object | null;
	attributes?: Array<any>;
	userAddress: string; //create must have this but get not have
	category?: number;
	price?: number;
	priceType?: string;
	collectionId: string; //must have
	collectionName?: string;
	collectionAddress?: string;
	standard?: string;
	isFreeze?: boolean;
	creator?: string;
}

export interface InteractionInput {
	itemId: string; //must have
	userAddress: string;
	state: boolean;
	signature: string;
}

export interface FilterNft {
	chainId: number[];
	status: number[];
	collectionId: string[];
	tokenSymbol: string;
	minPrice: string;
	maxPrice: string;
	itemName: string;
	owner: string;
	isFiltering: boolean;
}

export interface MintItemInput {
	itemTokenId: string;
	itemStandard: string;
	collectionAddress: string;
	userAddress: string;
	web3: any;
}

export interface FreezeItemInput {
	itemId: string;
	itemStandard: string;
	collectionAddress: string;
	userAddress: string;
}
