import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Web3InfoState {
	currentProvider: any;
	address: string | null | undefined;
	chainId: number;
	balance: number;
	balanceToUsd: number;
	wallet: string;
	signature: string | null;
}

const initialState: Web3InfoState = {
	currentProvider: null,
	address: null,
	chainId: 4,
	balance: 0,
	wallet: 'Metamask',
	balanceToUsd: 0,
	signature: null,
};

export const slice = createSlice({
	name: 'web3Info',
	initialState,
	reducers: {
		setCurrentProvider: (state, action) => {
			state.currentProvider = action.payload;
		},
		setUserLogin: (state, action) => {
			state.address = action.payload;
		},

		setChainId: (state, action) => {
			state.chainId = action.payload;
		},
		setBalanceUser: (state, action) => {
			state.balance = action.payload;
		},
		storeBalance: (state, action) => {
			state.balance = action.payload;
		},
		storeETHtoUSD: (state, action) => {
			state.balance = action.payload;
		},
		removeUserLogin: (state) => {
			state.address = '';
			state.balance = 0;
			state.balanceToUsd = 0;
		},
		setWalletName: (state, action) => {
			state.wallet = action.payload;
		},
		setSignature: (state, action) => {
			state.signature = action.payload;
		},
		resetAll: () => initialState,
	},
});

//Actions
export const {
	setCurrentProvider,
	setUserLogin,
	setChainId,
	setBalanceUser,
	storeBalance,
	storeETHtoUSD,
	removeUserLogin,
	setWalletName,
	setSignature,
	resetAll,
} = slice.actions;

//Selectors
export const selectCurrentProvider = (state: RootState) => state.web3Info.currentProvider;
export const selectAddress = (state: RootState) => state.web3Info.address;
export const selectChainId = (state: RootState) => state.web3Info.chainId;
export const selectBalance = (state: RootState) => state.web3Info.balance;
export const selectBalanceToUsd = (state: RootState) => state.web3Info.balanceToUsd;
export const selectWalletName = (state: RootState) => state.web3Info.wallet;
export const selectSignature = (state: RootState) => state.web3Info.signature;

//Reducer
export default slice.reducer;
