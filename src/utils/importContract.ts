const CONTRACT: { [key: string]: any } = {
	rinkeby: {
		ForbitswapNFTSProxyRegistry: '0xee01Fd2aAb7da51bf016D3Ca2415Ed0ea3c5f6D1',
		ForbitswapNFTSAssetShared: '0xa2bD244ab7c163413db9De4db38165C08D4Ea16D',
		ECDSA: '0xD14a0F78F6188d63a3199108dbbd2C0aBE549cD2',
		ForbitswapNFTSTokenTransferProxy: '0x1c6612dCbb58aFb5FAD1f50eC5D87932ec398DA7',
		ForbitswapNFTSExchange: '0xA748d47291f309707Ec3E7bb9CE76Ff436Cc38C9',
		ForbitswapNFTSMulticall: '0xa9da502D520fe0a5bDd900eEF013A11c50AE13e6',
		ForbitswapNFTSAuction: '0xd984370214Be39290C25318b7fF7fAeb87F18D82',
	},
	'matic-testnet': {
		ForbitswapNFTSProxyRegistry: '0x63831029279825a682eF7b573CFa8b5FC6AFb2fD',
		ForbitswapNFTSAssetShared: '0xE845f2BF442916 9D9b11Df46A95283A996e0bFA2',
		ECDSA: '0x5D439b4d8667fAa430CC76b6C791447A77A5957A',
		ForbitswapNFTSTokenTransferProxy: '0x59455C85f6f5fd683bA0d8E85432741d3a1e78cD',
		ForbitswapNFTSExchange: '0x150b747B7f811962E564A3242229b0f99Fd6D9fE',
		ForbitswapNFTSMulticall: '0x890c9cdE5653F06f9EDC1112E673cD33E9ab1c37',
		ForbitswapNFTSAuction: '0x83A2c1D0b01b94b9579B83b6F6fBA7fe696A0437',
	},
	'avalanche-testnet': {
		ForbitswapNFTSProxyRegistry: '0x2918fe6A491ed29bC1e61d92F78cefe7bde81910',
		ForbitswapNFTSAssetShared: '0x5230c6417dee2a6DE748F7146dEd71Ecb9942CD8',
		ECDSA: '0x0FDfCA7F77A5a7a3da8e4913e4dCE0C29d9A01D3',
		ForbitswapNFTSTokenTransferProxy: '0x57DF5a7a6aaD50B91310aB761462Ce160012DE47',
		ForbitswapNFTSExchange: '0x890aaA4a227bCA31caA83A0505513799e493a448',
		ForbitswapNFTSMulticall: '0x8a53f24b9d7403cF72695F789eB0B19baE6db22B',
		ForbitswapNFTSAuction: '0x3B6360dCb7343659890EC6614E995b367311710F',
	},
	'bsc-testnet': {
		ForbitswapNFTSProxyRegistry: '0xd616c68f38d58Fb80acc9E8bD4742D083D83413c',
		ForbitswapNFTSAssetShared: '0xefF0d92dD67A648Dc70d70150fb74896984425dE',
		ECDSA: '0x484715c81ceafED3733ecee0Fde604605F3823c0',
		ForbitswapNFTSTokenTransferProxy: '0x1a9ED73c55B9aD443c5Ae5839fCF9Ed1Ab2965cd',
		ForbitswapNFTSExchange: '0xCA8B599E7f82F668e53a93d297b401CD553A93EA',
		ForbitswapNFTSMulticall: '0x1A2881E56a5704Dd1693e40E3C08E088a7fc457E',
		ForbitswapNFTSAuction: '0x0ffd26D35A403B57e80e06BAD22273310763E161',
	},
};

const CHAIN_ID = [4, 80001, 43113, 97];

const EXCHANGE_TOKEN = [
	'0x996AfE323CD425f3ABa1D1C1c72dDfed7840275D',
	'0x14efeA12451cE6C69132Cc0d69Ef733649DB40C3',
	'0x8F8dbD1159A9664F861d9179889a98D65f5D0235',
	'0xB8f48CBb98A6E76e05716095Ea3bFC3891397e21',
];

export const importContract = () => {
	let res: any = {};
	Object.keys(CONTRACT).map((key: any, index: number) => {
		console.log('asdasdas', key);
		const temp = {
			EXCHANGE: CONTRACT[key].ForbitswapNFTSExchange,
			REGISTRY: CONTRACT[key].ForbitswapNFTSProxyRegistry,
			COLLECTION: CONTRACT[key].ForbitswapNFTSAssetShared,
			TOKEN_TRANSFER_PROXY: CONTRACT[key].ForbitswapNFTSTokenTransferProxy,
			EXCHANGE_TOKEN: EXCHANGE_TOKEN[index],
			AUCTION: CONTRACT[key].ForbitswapNFTSAuction,
		};
		return (res[CHAIN_ID[index]] = temp);
	});
	console.log(res);
};
