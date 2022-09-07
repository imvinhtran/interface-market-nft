import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ConnectModalState {
	onOpenConnect: boolean;
	isConnectWallet: boolean;
	isWrongNetwork: boolean;
}

const initialState: ConnectModalState = {
	onOpenConnect: false,
	isConnectWallet: false,
	isWrongNetwork: false,
};

export const slice = createSlice({
	name: 'connectModal',
	initialState,
	reducers: {
		setConnectModal: (state, action) => {
			state.onOpenConnect = action.payload;
		},
		setIsConnectWallet: (state, action) => {
			state.isConnectWallet = action.payload;
		},
		setIsWrongNetwork: (state, action) => {
			state.isWrongNetwork = action.payload;
		},
	},
});

//Actions
export const { setConnectModal, setIsConnectWallet, setIsWrongNetwork } = slice.actions;

//Selectors
export const selectConnectModal = (state: RootState) => state.modal.onOpenConnect;
export const selectIsConnectWallet = (state: RootState) => state.modal.isConnectWallet;
export const selectIsWrongNetwork = (state: RootState) => state.modal.onOpenConnect;

//Reducer
export default slice.reducer;
