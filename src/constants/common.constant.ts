export const CATEGORY_COLLECTION: { [key: string]: any } = {
	0: 'Other',
	1: 'Artwork',
	2: 'Music',
	3: 'Photography',
	4: 'Games',
	5: 'Space',
	6: 'Metaverse',
};

export const ITEM_STATUS = {
	NOT_FOR_SELL: 0,
	BUY_NOW: 1,
	TIME_AUCTION: 2,
	OPEN_FOR_OFFERS: 3,
};

export const TYPE_TRANSACTION: { [key: string]: any } = {
	1: 'Minted',
	2: 'Accept Offer',
	3: 'Sale',
	4: 'Transfer',
	5: 'Cancel',
	6: 'List',
	7: 'Order',
	8: 'Auction',
	9: 'Auction',
	10: 'List Expired',
};

export const ORDER_TYPE: { [key: string]: any } = {
	SELL: 0,
	OFFER: 1,
	BUY: 2,
	ACCEPT_OFFER: 3,
	EXPIRED_LISTING: 4,
};
