export const mainnetEthereum = [
	{
		chainId: '0x1',
	},
];

export const mainnetPolygon = [
	{
		chainId: '0x89',
		chainName: 'Matic Mainnet RPC',
		rpcUrls: ['https://polygon-rpc.com'],
	},
];

export const mainnetBinance = [
	{
		chainId: '0x38',
		chainName: 'Binance Smart Chain Mainnet RPC',
		rpcUrls: ['https://bsc-dataseed.binance.org/'],
		nativeCurrency: {
			name: 'BNB',
			symbol: 'BNB', // 2-6 characters long
			decimals: 18,
		},
		// Currently ignored.
	},
];

export const mainnetAvalanche = [
	{
		chainId: '0xa86a',
		chainName: 'Avalanche Mainnet',
		rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
	},
];
