import { CustomFile } from 'models';
import moment from 'moment';
import { CONTRACT, NETWORKINFO, NULL_ADDRESS, SUPPORT_NETWORK } from '../constants';

export const getAccount = () => {
	if (localStorage.getItem('account')) {
		const account = JSON.parse(localStorage.getItem('account') || '{}');
		return account;
	}

	return false;
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const convertWeiToEther = (wei: number) => wei / 10 ** 18;

export const getCurrentTheme = () => {
	if (localStorage.getItem('account')) {
		let theme = JSON.parse(localStorage.getItem('darkLocal') || '{}');
		return theme;
	}
	return true;
};

export const checkIsInstallMetamask = () => {
	if (typeof window.ethereum !== 'undefined') {
		return true;
	}
	return false;
};

export const isSupportChainId = (chainId: number) => {
	if (SUPPORT_NETWORK.includes(chainId)) return true;
	// let supportedNetWork = Object.keys(SUPPORT_NETWORK);
	// if (supportedNetWork.includes(`${chainId}`)) return true;
	return false;
};

export const sliceString = (string: string, limit = 0) => {
	if (string && 0 < string.length && typeof limit === 'number') {
		return string.length < limit ? string : `${string.slice(0, limit)}...`;
	}
	return '';
};

export const isNativeToken = (address: string) => {
	return address === NULL_ADDRESS;
};

export const isNullAddress = (address: string) => {
	return address === NULL_ADDRESS;
};

export const isPlatformTokenAddress = (address: string, chainId: number) => {
	return isEqualAddress(address, CONTRACT[chainId].EXCHANGE_TOKEN);
};

export const renderImage = (data: string, defaultImage: string) => {
	return !data ? defaultImage : data.length === 0 ? defaultImage : data;
};

export const sliceAddress = (string: string | undefined, first: number, end: number) => {
	if (string) {
		return (
			string.toString().substring(0, first) +
			'...' +
			string.toString().substring(string.length - end, string.length + 1)
		);
	}
};

export const convertBuffer = (file: any) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsArrayBuffer(file);

		fileReader.onload = () => {
			resolve(fileReader.result);
		};
		fileReader.onerror = (err) => {
			reject(err);
		};
	});
};
export const getChainId = () => {
	const chainId = JSON.parse(localStorage.getItem('chainId')!);
	return chainId || false;
};

export const getInfoNetWorkByChainId = (id: number) => {
	return NETWORKINFO[id];
};

export const isEqualAddress = (addr1: string, addr2: string): boolean => {
	if (addr1.toLowerCase() === addr2.toLowerCase()) {
		return true;
	}
	return false;
};

export const dateToTimestamp = (date: Date): number => {
	const result: number = Math.floor(date.getTime() / 1000);
	return result;
};

export const timestampToDate = (timestamp: number): Date => {
	const result: Date = new Date(timestamp * 1000);
	return result;
};

export const formatTimestamp = (timestamp: number, format: string) => {
	return moment(new Date(timestamp * 1000)).format(format);
};

export const compareDate = (date1: Date, date2: Date): number => {
	const date1TimeStamp: number = new Date(date1).getTime();
	const date2TimeStamp: number = new Date(date2).getTime();

	if (date1TimeStamp > date2TimeStamp) {
		return 1;
	} else if (date1TimeStamp < date2TimeStamp) {
		return -1;
	} else {
		return 0;
	}
};

export const getFileType = (file: CustomFile | string | null) => {
	if (!file) return;
	let f: any;
	if (typeof file === 'string') {
		f = file.split('.');
	} else {
		f = file.path?.split('.');
	}

	return f[f.length - 1];
};

export const compressImage = (url: string, width: number, quality: string) => {
	if (url === '') return url;
	const split = url.split('/');
	const index = split.indexOf('upload');
	split.splice(index + 1, 0, `w_${width}`, `q_auto:${quality},f_auto`);
	return split.join('/');
};
