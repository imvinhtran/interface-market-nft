import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface DarkThemeState {
	dark: boolean;
}

const initialState: DarkThemeState = {
	dark: false,
};

export const slice = createSlice({
	name: 'darkTheme',
	initialState,
	reducers: {
		setDarkTheme: (state, action) => {
			state.dark = action.payload;
		},
	},
});

//Actions
export const { setDarkTheme } = slice.actions;

//Selectors
export const selectDarkTheme = (state: RootState) => state.darkTheme.dark;

//Reducer
export default slice.reducer;
