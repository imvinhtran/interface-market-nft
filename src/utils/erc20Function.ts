/* eslint-disable @typescript-eslint/no-unused-vars */
// utils
import { parseUnits } from './calculate';
import { formatUnits } from '@ethersproject/units';
import { BigNumber } from 'ethers';
// abis
import { getWeb3Contract } from 'hooks/useWebContract';
import ContractERC20 from 'abis/ERC20.json';

// erc20function not use for native token
export function erc20function() {
	const getBalanceOfUser = async (
		userAddress: string,
		tokenPayment: string
	): Promise<BigNumber> => {
		const contractERC20 = getWeb3Contract(ContractERC20.abi, tokenPayment);

		let balanceOfUser: BigNumber = BigNumber.from(0);
		await contractERC20.methods
			.balanceOf(userAddress)
			.call()
			.then(function (result: BigNumber) {
				balanceOfUser = result;
			})
			.catch((error: any) => console.log(error.message));
		return balanceOfUser;
	};

	const getAmountAllowance = async (
		ownerAddress: string,
		spenderAddress: string,
		tokenPayment: string
	): Promise<BigNumber> => {
		const contractERC20 = getWeb3Contract(ContractERC20.abi, tokenPayment);

		let amountAllowance: BigNumber = BigNumber.from(0);
		await contractERC20.methods
			.allowance(ownerAddress, spenderAddress)
			.call()
			.then(function (result: BigNumber) {
				console.log('amount erc20 approved', result);
				amountAllowance = result;
			})
			.catch((error: any) => console.log(error.message));
		return amountAllowance;
	};

	const approve = async (
		tokenAddress: string,
		amount: BigNumber,
		ownerAddress: string,
		spenderAddress: string
	) => {
		const contractERC20 = getWeb3Contract(ContractERC20.abi, tokenAddress);

		await contractERC20.methods
			.increaseAllowance(spenderAddress, amount.toString())
			.send({ from: ownerAddress })
			.then(function (result: number) {
				// result is 0 or 1
				console.log('result approve erc20', result);
			});
	};

	const getDecimal = async (tokenPayment: string): Promise<number> => {
		const contractERC20 = getWeb3Contract(ContractERC20.abi, tokenPayment);

		let decimal: number = 0;
		await contractERC20.methods
			.decimals()
			.call()
			.then(function (result: number) {
				decimal = result;
			})
			.catch((error: any) => console.log(error.message));
		return decimal;
	};

	const changeTokenToWei = async (tokenAddress: string, amount: number): Promise<BigNumber> => {
		const decimal: number = await getDecimal(tokenAddress);
		const result: BigNumber = parseUnits(amount.toString(), decimal);
		return result;
	};

	const changeWeiToToken = async (tokenAddress: string, amount: BigNumber): Promise<string> => {
		const decimal: number = await getDecimal(tokenAddress);
		const result: string = formatUnits(amount.toString(), decimal);

		return result;
	};

	const checkBalance = async (
		tokenAddress: string,
		userAddress: string,
		amountToCheck: BigNumber
	): Promise<boolean> => {
		const userBalance: BigNumber = await getBalanceOfUser(userAddress, tokenAddress);

		console.log('Your balance (wei):', String(userBalance));
		console.log('You need to have at least (wei):', String(amountToCheck));

		if (BigNumber.from(String(userBalance)).lt(String(amountToCheck))) {
			return false;
		}
		return true;
	};

	const getMissingAllowanceAmount = async (
		tokenAddress: string,
		userAddress: string,
		spenderAddress: string,
		amountToCheck: BigNumber
	): Promise<BigNumber> => {
		const amountAllowanced: BigNumber = await getAmountAllowance(
			userAddress,
			spenderAddress,
			tokenAddress
		);

		console.log(
			'MissingAllowanceAmount',
			String(BigNumber.from(String(amountToCheck)).sub(String(amountAllowanced)))
		);

		return BigNumber.from(String(amountToCheck)).sub(String(amountAllowanced));
	};

	return {
		changeTokenToWei,
		changeWeiToToken,
		getDecimal,
		getAmountAllowance,
		approve,
		getBalanceOfUser,
		checkBalance,
		getMissingAllowanceAmount,
	};
}
