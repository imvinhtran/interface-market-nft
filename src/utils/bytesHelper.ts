import { encodeParameter } from './encoded';

export const bytesConverter = (web3: any, types: any, values: any) => {
	return (
		'0x' +
		types.reduce((accumulator: any, currentValue: any, index: number) => {
			if (currentValue.includes('address')) return accumulator + addingAddress(values[index]);
			if (currentValue.includes('uint'))
				return accumulator + addingUint(web3, currentValue, values[index]);
			if (currentValue.includes('bytes'))
				return accumulator + addingBytes(currentValue, values[index]);
			return accumulator;
		}, '')
	);
};

const addingAddress = (address: any) => {
	if (address.includes('0x')) return address.substring(2);
	return address;
};

const addingUint = (web3: any, type: any, value: any) => {
	let hex = encodeParameter(web3, type, value);

	const matches = type.match(/(\d+)/);
	if (matches) {
		hex = hex.slice(-matches[0] / 4);
	}

	return hex;
};

const addingBytes = (type: any, value: any) => {
	let hex = value.includes('0x') ? value.substring(2) : value;

	const matches = type.match(/(\d+)/);
	if (matches) {
		hex = hex.slice(-matches[0] / 4);
	}

	return hex;
};
