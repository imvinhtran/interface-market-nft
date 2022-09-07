export const encodeParameter = (web3: any, type: any, value: any) => {
	return web3.eth.abi.encodeParameter(type, value).substring(2);
};

export const encodeParameters = (web3: any, types: any, values: any) => {
	if (types.length !== values.length) return false;

	return web3.eth.abi.encodeParameters(types, values).substring(2);
};

export const encodeFunctionSelector = (web3: any, functionInterface: any) => {
	if (functionInterface.length < 0) return false;

	return web3.utils.keccak256(functionInterface).substr(0, 10);
};

export const encodeFunctionCall = (web3: any, functionInterface: any, types: any, values: any) => {
	console.log('values', values);

	return encodeFunctionSelector(web3, functionInterface) + encodeParameters(web3, types, values);
};

export const encodeValue = (web3: any, value: any, unit = 'ether') => {
	return web3.utils.toHex(web3.utils.toWei(`${value}`, unit));
};
