import { toast } from 'react-toastify';
// abis
import { getWeb3Contract } from 'hooks/useWebContract';
import ContractFactory from 'abis/AssetContract.json';
import ContractFactory721 from 'abis/AssetContract721.json';
// apis
import nftsApi from 'apis/nftsApi';
// utils
import { baseIpfsUrl } from 'utils';
// models
import { FreezeItemInput, MintItemInput } from 'models';

export function FreezeItemAction() {
	// isCheck === true => this function just to check => "return" means approved or not.
	// isCheck === false => this function approve item price and service fee  => "return" means succeed or not.
	const MintItem = async (data: MintItemInput, isCheck: boolean): Promise<boolean> => {
		const { itemTokenId, itemStandard, collectionAddress, userAddress, web3 } = data;

		try {
			// NFTs 721 are already minted in our NFTSpaceX collection
			if (itemStandard.includes('721')) {
				return true;
			}

			const contractFactory = getWeb3Contract(ContractFactory.abi, collectionAddress);

			let isMinted: boolean = false;
			await contractFactory.methods
				.exists(itemTokenId)
				.call()
				.then(function (result: boolean) {
					isMinted = result;
				});

			if (!isMinted) {
				// not minted + isCheck => return false immediately
				if (isCheck) {
					return false;
				} else {
					await contractFactory.methods
						.mint(userAddress, itemTokenId, 1, web3.utils.asciiToHex(''))
						.send({ from: userAddress })
						.then(function (result: any) {
							console.log('Result after mint item: ', result);
						});
				}
			}

			return true;
		} catch (error) {
			if (isCheck) {
				toast.error('Some error occur when checking item is mint or not!');
			} else {
				toast.error('Some error occur when minting item!');
			}
			console.log(error);
			return false;
		}
	};

	// freeze item => "return" means succeed or not.
	const FreezeItem = async (data: FreezeItemInput): Promise<boolean> => {
		const { itemId, itemStandard, collectionAddress, userAddress } = data;

		try {
			// contract Factory
			let contractFactory: any = null;
			if (itemStandard.includes('1155')) {
				// STANDARD 1155
				contractFactory = getWeb3Contract(ContractFactory.abi, collectionAddress);
			} else {
				// STANDARD 721
				contractFactory = getWeb3Contract(ContractFactory721.abi, collectionAddress);
			}

			// ---call api to get uri
			const res: any = await nftsApi.getDataForFreezeNft(itemId);

			const { cid, tokenId } = res;
			const metaDataUrl = baseIpfsUrl + cid;

			// ---call freeze method
			await contractFactory.methods
				.setURI(tokenId, metaDataUrl)
				.send({ from: userAddress })
				.then(function (result: any) {
					console.log('Result after freeze item: ', result);
				});

			// ---call api to confirm that item minted successfully -> change item 'isFreeze' property
			await nftsApi.freezeNft(itemId, userAddress, metaDataUrl);

			return true;
		} catch (error) {
			toast.error('Some error occur when freeze item!');
			console.log(error);
			return false;
		}
	};

	return { MintItem, FreezeItem };
}
