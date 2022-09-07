import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';

export interface StepState {
	step1Pass: boolean;
	step2Pass: boolean;
	step3Pass: boolean;
	currentStep: number;
}

const initialState: StepState = {
	step1Pass: false,
	step2Pass: false,
	step3Pass: false,
	currentStep: 0,
};

const slice = createSlice({
	name: 'step',
	initialState,
	reducers: {
		setStep(state, action) {
			state.step1Pass = action.payload.step1Pass;
			state.step2Pass = action.payload.step2Pass;
			state.step3Pass = action.payload.step3Pass;
			state.currentStep = action.payload.currentStep;
		},
	},
});

//Reducer
export default slice.reducer;

//Selector
export const selectStep = (state: RootState) => state.step;

//Action
export const { setStep } = slice.actions;
