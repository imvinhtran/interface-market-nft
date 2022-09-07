import Web3 from 'web3';

export function getWeb3Contract(abi: any, address: any) {
	const web3 = new Web3(Web3.givenProvider);
	const contract = new web3.eth.Contract(abi, address);
	return contract;
}
