export const ORDER_CONFIGURATION: { [key: string]: any } = {
	SELL_MAKER_RELAYER_FEE: 0,
	SELL_TAKER_RELAYER_FEE: 0,
	SELL_MAKER_PROTOCOL_FEE: 0,
	SELL_TAKER_PROTOCOL_FEE: 200,
	OFFER_MAKER_RELAYER_FEE: 0,
	OFFER_TAKER_RELAYER_FEE: 0,
	OFFER_MAKER_PROTOCOL_FEE: 200,
	OFFER_TAKER_PROTOCOL_FEE: 0,
	PROTOCOL_FEE_METHOD: 0,
	SPLIT_FEE_METHOD: 1,
	BUY_SIDE: 0,
	SELL_SIDE: 1,
	FIXED_PRICE: 0,
	DUTCH_AUCTION: 1,
	CALL: 0,
	DELEGATE_CALL: 1,
	BUY_REPLACEMENT_PATTERN:
		'0x00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
	SELL_REPLACEMENT_PATTERN:
		'0x000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
	BUY_REPLACEMENT_PATTERN_721:
		'0x00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
	SELL_REPLACEMENT_PATTERN_721:
		'0x000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
	FEE_RECIPIENT: '0x00B91B2F8aFE87FCDc2b3fFA9ee2278cd1E4DDf8',
};