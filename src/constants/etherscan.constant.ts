import PolygonIcon from 'assets/images/network/polygon.webp';
import EthIcon from 'assets/images/network/eth.webp';
import BinanceIcon from 'assets/images/network/binance.webp';
import AvaxIcon from 'assets/images/network/avax.webp';

export const ETHERSCAN: { [key: string]: any } = {
	1: { url: 'https://etherscan.io/', name: 'Etherscan' },
	4: { url: 'https://rinkeby.etherscan.io/', name: 'Etherscan' },
	56: { url: 'https://bscscan.com/', name: 'Bscscan' },
	97: { url: 'https://testnet.bscscan.com/', name: 'Bscscan' },
	137: { url: 'https://polygonscan.com/', name: 'Polygonscan' },
	80001: { url: 'https://mumbai.polygonscan.com/', name: 'Polygonscan' },
	43114: { url: 'https://snowtrace.io/', name: 'Snowtrace' },
	43113: { url: 'https://testnet.snowtrace.io/', name: 'Snowtrace' },
};

export const INFURA_KEY = '';

export const NETWORKINFO: { [key: string]: any } = {
	1: {
		id: '1',
		url: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
		name: 'Ethereum',
		image: EthIcon,
		symbol: 'ETH',
	},
	4: {
		id: '2',
		name: 'Rinkeby',
		image: EthIcon,
		symbol: 'ETH',
	},
	56: {
		id: '3',
		name: 'BNB Chain',
		image: BinanceIcon,
		symbol: 'BNB',
	},
	97: {
		id: '4',
		name: 'BNB Chain',
		image: BinanceIcon,
		symbol: 'BNB',
	},
	137: {
		id: '5',
		name: 'Polygon',
		image: PolygonIcon,
		symbol: 'MATIC',
	},
	80001: {
		id: '6',
		name: 'Polygon',
		image: PolygonIcon,
		symbol: 'MATIC',
	},
	43114: {
		id: '7',
		name: 'Avalanche',
		image: AvaxIcon,
		symbol: 'AVAX',
	},
	43113: {
		id: '8',
		name: 'Avalanche',
		image: AvaxIcon,
		symbol: 'AVAX',
	},
};

export const SUPPORT_NETWORK = [4];
