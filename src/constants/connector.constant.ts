import { AuthereumConnector } from '@web3-react/authereum-connector';
import { FortmaticConnector } from '@web3-react/fortmatic-connector';
import { FrameConnector } from '@web3-react/frame-connector';
import { InjectedConnector } from '@web3-react/injected-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
import { MagicConnector } from '@web3-react/magic-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { TorusConnector } from '@web3-react/torus-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
// import { MewConnectConnector } from '@myetherwallet/mewconnect-web-client';
import { BscConnector } from '@binance-chain/bsc-connector';
// images
import ImageMetamask from 'assets/images/wallet/metamask.svg';
import ImageBinance from 'assets/images/wallet/binance.svg';
import ImageWalletConnect from 'assets/images/wallet/wallet-connect.svg';
import ImageCoinbase from 'assets/images/wallet/coinbase.svg';
import ImageLedger from 'assets/images/wallet/ledger.svg';
import ImageTrezor from 'assets/images/wallet/trezor.svg';
import ImageFortmatic from 'assets/images/wallet/fortmatic.svg';
import ImageAuthereum from 'assets/images/wallet/authereum.svg';
import ImageTorus from 'assets/images/wallet/torus.svg';
import ImagePortis from 'assets/images/wallet/portis.svg';
import ImageFrame from 'assets/images/wallet/frame.svg';
import ImageMew from 'assets/images/wallet/mew.svg';

const POLLING_INTERVAL = 12000;
const RPC_URLS: { [chainId: number]: string } = {
	//ETHEREUM
	1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
	4: 'https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
	//POLYGON
	137: 'https://polygon-rpc.com',
	80001: 'https://rpc-mumbai.maticvigil.com',
	//AVALANCE
	43114: 'https://api.avax.network/ext/bc/C/rpc',
	43113: 'https://api.avax-test.network/ext/bc/C/rpc',
	//BINANCE
	56: 'https://bsc-dataseed.binance.org/',
	97: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
};

export const injected = new InjectedConnector({
	supportedChainIds: [1, 4, 137, 80001, 43113, 43114, 56, 97],
});

export const walletconnect = new WalletConnectConnector({
	rpc: {
		1: RPC_URLS[1],
		4: RPC_URLS[4],
		137: RPC_URLS[137],
		80001: RPC_URLS[80001],
		43114: RPC_URLS[43114],
		43113: RPC_URLS[43113],
		56: RPC_URLS[56],
		97: RPC_URLS[97],
	},
	qrcode: true,
});

export const fortmatic = new FortmaticConnector({
	apiKey: 'pk_test_C05FBC31EA442165',
	chainId: 1,
});
export const portis = new PortisConnector({
	dAppId: '3c73a219-973e-436c-af0e-300660345b14',
	networks: [1, 4],
});

//coinbase
export const walletlink = new WalletLinkConnector({
	url: RPC_URLS[1],
	appName: 'demo-app',
	supportedChainIds: [1, 4],
});

//Ledger
export const ledger = new LedgerConnector({
	chainId: 1,
	url: RPC_URLS[1],
	pollingInterval: POLLING_INTERVAL,
});

//Trezor
export const trezor = new TrezorConnector({
	chainId: 1,
	url: RPC_URLS[1],
	pollingInterval: POLLING_INTERVAL,
	manifestEmail: 'dummy@abc.xyz',
	manifestAppUrl: 'http://localhost:1234',
});

//Frame
export const frame = new FrameConnector({ supportedChainIds: [1] });

//Authereum
export const authereum = new AuthereumConnector({ chainId: 42 });

//Magic
export const magic = new MagicConnector({
	apiKey: 'pk_test_398B82F5F0E88874',
	chainId: 4,
	email: 'hello@example.org',
});

export const binance = new BscConnector({
	supportedChainIds: [1, 56, 137],
});

// export const myetherwallet = new MewConnectConnector({
// 	url: `https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
// });

//Torus
export const torus = new TorusConnector({ chainId: 1 });

enum ConnectorNames {
	Injected = 'Injected',
	Binance = 'Binance',
	WalletConnect = 'WalletConnect',
	Coinbase = 'Coinbase',
	Ledger = 'Ledger',
	Trezor = 'Trezor',
	Frame = 'Frame',
	Authereum = 'Authereum',
	Fortmatic = 'Fortmatic',
	Magic = 'Magic',
	Portis = 'Portis',
	Torus = 'Torus',
	Mew = 'Mew',
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
	[ConnectorNames.Injected]: injected,
	[ConnectorNames.Binance]: binance,
	[ConnectorNames.WalletConnect]: walletconnect,
	[ConnectorNames.Coinbase]: walletlink,
	[ConnectorNames.Ledger]: ledger,
	[ConnectorNames.Trezor]: trezor,
	[ConnectorNames.Frame]: frame,
	[ConnectorNames.Authereum]: authereum,
	[ConnectorNames.Fortmatic]: fortmatic,
	[ConnectorNames.Magic]: magic,
	[ConnectorNames.Portis]: portis,
	[ConnectorNames.Torus]: torus,
	[ConnectorNames.Mew]: torus,
};

export const listWallet = [
	{
		name: 'Metamask',
		image: ImageMetamask,
		connector: connectorsByName.Injected,
	},
	{
		name: 'Binance',
		image: ImageBinance,
		connector: connectorsByName.Binance,
	},
	{
		name: 'WalletConnect',
		image: ImageWalletConnect,
		connector: connectorsByName.WalletConnect,
	},
	{
		name: 'Coinbase',
		image: ImageCoinbase,
		connector: connectorsByName.Coinbase,
	},
	{
		name: 'Leager',
		image: ImageLedger,
		connector: connectorsByName.Ledger,
	},
	{
		name: 'Trezor',
		image: ImageTrezor,
		connector: connectorsByName.Trezor,
	},
	{
		name: 'Fortmatic',
		image: ImageFortmatic,
		connector: connectorsByName.Fortmatic,
	},
	{
		name: 'Authereum',
		image: ImageAuthereum,
		connector: connectorsByName.Authereum,
	},
	{
		name: 'Torus',
		image: ImageTorus,
		connector: connectorsByName.Torus,
	},
	{
		name: 'Portis',
		image: ImagePortis,
		connector: connectorsByName.Portis,
	},
	{
		name: 'Frame',
		image: ImageFrame,
		connector: connectorsByName.Frame,
	},
	{
		name: 'MEW',
		image: ImageMew,
		connector: connectorsByName.Frame,
	},
];
