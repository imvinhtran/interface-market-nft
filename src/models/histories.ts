export interface ItemActivity {
	historyId: string;
	collectionId: string;
	collectionName: string;
	createdAt: Date;
	from: string;
	to: string;
	price: string;
	priceType: string;
	type: number;
	txHash: string;
	tokenPrice: number;
}

export interface UserActivity {
	collectionId: string;
	itemObjId: string;
	chainId: number;
	from: string;
	to: string;
	price: number;
	priceType: string;
	tokenPrice: string;
	txHash: string;
	type: number;
	createdAt: string;
	updatedAt: string;
}

export interface CollectionActivity {
	collectionId: string;
	itemObjId: string;
	chainId: number;
	from: string;
	to: string;
	price: number;
	priceType: string;
	tokenPrice: string;
	txHash: string;
	type: number;
	createdAt: string;
	updatedAt: string;
}

export interface PriceActivity {
	date: string;
	avgPrice: number;
}

export interface LatestTransaction {
	collectionId: string;
	createdAt: string;
	createTime: number;
	from: string;
	itemId: string;
	itemName: string;
	price: string;
	priceType: string;
	tokenPrice: number;
	txHash: string;
	username: string;
	avatar: string;
}
