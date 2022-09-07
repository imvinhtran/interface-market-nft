import { sleep } from './function';

declare let window: any;

// write contract
export const sendTransaction = async (
	from: any,
	to: any,
	value: any,
	data: any,
	gas: any,
	gasPrice: any
) => {
	const transactionParameters = {
		from, // must match user's active address.
		to, // Required except during contract publications.
		value, // Only required to send ether to the recipient from the initiating external account.
		data, // Optional, but used for defining smart contract creation and interaction.
		gas: gas.toString(),
		gasPrice,
	};

	console.log(transactionParameters);

	const tx = await window.ethereum.request({
		method: 'eth_sendTransaction',
		params: [transactionParameters],
	});

	return tx;
};

// read contract
export const callTransaction = async (from: any, to: any, data: any) => {
	// console.log(from);
	// console.log(to);
	// console.log(data);

	const transactionParameters = {
		from, // must match user's active address.
		to, // Required except during contract publications.
		data, // Optional, but used for defining smart contract creation and interaction.
	};

	console.log(transactionParameters);

	const tx = await window.ethereum.request({
		method: 'eth_call',
		params: [transactionParameters, 'latest'],
	});

	return tx;
};

/**
 * Using persional sign from web3
 * @param {*} web3
 * @param {*} hash
 * @param {*} address
 * @returns persional sign
 */
export const signTransaction = async (
	web3: { eth: { personal: { sign: (arg0: any, arg1: any) => any } } },
	hash: any,
	address: any
) => {
	if (!hash || !address) return '';

	return web3.eth.personal.sign(hash, address);
};

/**
 * Receive transaction hash and continously checking for transaction has been successfully mined
 * @param {*} txHash
 * @param {*} web3
 * @returns
 */
export const waitingForMined = async (
	txHash: any,
	web3: { eth: { getTransactionReceipt: (arg0: any) => any } }
) => {
	let receipt = await web3.eth.getTransactionReceipt(txHash);
	while (!receipt) {
		await sleep(5000);
		receipt = await web3.eth.getTransactionReceipt(txHash);
	}
	return receipt;
};
