import moment from 'moment';
import { isNullAddress, sliceAddress } from './function';
import { formatNumber } from './number';

export const formatAddressHistory = (
	addressHistory: string,
	userAddress: string | null | undefined
): string => {
	let result: string = '';

	if (!addressHistory || isNullAddress(addressHistory)) {
		result = '-----';
	} else if (addressHistory === userAddress) {
		result = 'You';
	} else {
		result = sliceAddress(addressHistory, 8, 5) ?? '-----';
	}

	return result;
};

export const formatTxHashHistory = (transactionHash: string): string => {
	let result: string = '';

	if (!transactionHash) {
		result = '-----';
	} else {
		result = sliceAddress(transactionHash, 8, 5) ?? '-----';
	}

	return result;
};

export const formatPriceHistory = (price: string | number, tokenSymbol: string): string => {
	let result: string;
	let priceTypeNumber: number = Number(price);

	if (!priceTypeNumber || priceTypeNumber === 0) {
		result = '-----';
	} else {
		result = formatNumber(priceTypeNumber, 0, 4) + ' ' + tokenSymbol.toUpperCase();
	}

	return result;
};

export const formatTimeHistory = (time: Date | string): string => {
	let result: string;

	if (!time) {
		result = '-----';
	} else {
		result = moment(time).format('MM/DD/YYYY');
	}
	return result;
};
