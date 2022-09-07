import { toast } from 'react-toastify';
// constant
import { CONTRACT } from '../../../constants';
// abi
import { getWeb3Contract } from 'hooks/useWebContract';
import ContractRegistryProxy from 'abis/RegistryProxy.json';
import ContractFactory from 'abis/AssetContract.json';
import ContractFactory721 from 'abis/AssetContract721.json';
import ContractForbitExchange from 'abis/ForbitExchange.json';
// utils
import { isNullAddress } from 'utils';
import { BigNumber } from 'ethers';
// model
import { ApproveWalletNftAssetInput, OrderResponseAPI } from 'models';

// isChecking === true => this function just to check => "return" means approved or not.
// isChecking === false => this function approve nfts in wallet  => "return" means succeed or not.
export const ApproveWalletNftAsset = async (
	data: ApproveWalletNftAssetInput,
	isChecking: boolean
): Promise<boolean> => {
	const { chainId, userAddress, collectionAddress, itemStandard } = data;

	try {
		// contract Registry Proxy
		const contractRegistryProxy = getWeb3Contract(
			ContractRegistryProxy.abi,
			CONTRACT[chainId].REGISTRY
		);

		// contract Factory
		let contractFactory: any = null;
		if (itemStandard.includes('1155')) {
			// STANDARD 1155
			contractFactory = getWeb3Contract(ContractFactory.abi, collectionAddress);
		} else {
			// STANDARD 721
			contractFactory = getWeb3Contract(ContractFactory721.abi, collectionAddress);
		}

		// =======================================================GET PROXY OF USER (RETURN NULL ADDRESS IF USER DON'T HAVE)=======================================================//
		let proxy: string = '';
		await contractRegistryProxy.methods
			.proxies(userAddress)
			.call()
			.then(function (result: string) {
				console.log('proxy', result);
				proxy = result;
			});

		// ==========================================================IF USER DON'T HAVE, REGISTER PROXY FOR USER==============================================================================//
		if (isNullAddress(proxy)) {
			// Not register proxy yet + isChecking => return false immediately
			if (isChecking) {
				return false;
			} else {
				//=======================Register Proxy=============================//
				await contractRegistryProxy.methods
					.registerProxy()
					.send({ from: userAddress })
					.then(function (receipt: any) {
						console.log('receipt for register proxy', receipt);
					});

				//=======================GET PROXY OF USER AGAIN=============================//
				await contractRegistryProxy.methods
					.proxies(userAddress)
					.call()
					.then(function (result: string) {
						console.log('proxy', result);
						proxy = result;
					});
			}
		}

		// ==============================================================CHECK APPROVE ITEM FOR SALE==================================================================================//
		let isApproved: boolean = false;
		await contractFactory.methods
			.isApprovedForAll(userAddress, proxy)
			.call()
			.then(function (result: boolean) {
				console.log('isApproved', result);
				isApproved = result;
			});

		// ==============================================================APPROVE ITEM IF USER HAVEN'T APPROVE =========================================================================//
		if (!isApproved) {
			// Not approvedForAll yet + isChecking => return false immediately
			if (isChecking) {
				return false;
			} else {
				//Approve item
				await contractFactory.methods
					.setApprovalForAll(proxy, true)
					.send({ from: userAddress })
					.then(function (receipt: any) {
						console.log('receipt for approved', receipt);
					});
			}
		}

		return true;
	} catch (error) {
		if (isChecking) {
			toast.error('Some error occur when checking your wallet initialize!');
		} else {
			toast.error('Some error occur when initializing your wallet!');
		}
		console.log(error);
		return false;
	}
};

// Calculate price for dutch
export const CalculateFinalPrice = async (
	orderSell: OrderResponseAPI,
	chainId: number
): Promise<BigNumber> => {
	// contract exchange
	const contractForbitExchange = getWeb3Contract(
		ContractForbitExchange.abi,
		CONTRACT[chainId].EXCHANGE
	);

	const result: BigNumber = await contractForbitExchange.methods
		.calculateFinalPrice(
			orderSell.side,
			orderSell.saleKind,
			orderSell.basePrice,
			orderSell.extra,
			orderSell.listingTime,
			orderSell.expirationTime
		)
		.call();

	return result;
};
