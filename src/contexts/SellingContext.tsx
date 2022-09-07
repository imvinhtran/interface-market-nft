import React, { createContext, Dispatch, Reducer, useContext, useReducer } from 'react';
import moment from 'moment';
//constant
import { ORDER_CONFIGURATION } from '../constants';
// models
import { OptionSelectCustom } from 'models';

interface Actions {
	type: string;
	value: any;
}

interface SellingProps {
	saleKind: number;
	tokenPayment: OptionSelectCustom | null;
	fixedPrice: number;
	startPrice: number;
	endPrice: number;
	feeMethod: boolean;
	startTime: Date;
	endTime: Date;
}

interface SellingProviderProps {
	reducer: Reducer<SellingProps, Actions>;
	initState: SellingProps;
}

interface InitContextProps {
	state: SellingProps;
	dispatch: Dispatch<Actions>;
}

export const SellingContext = createContext({} as InitContextProps);
export const SellingProvider: React.FC<SellingProviderProps> = ({
	reducer,
	initState,
	children,
}) => {
	const [state, dispatch] = useReducer(reducer, initState);
	const value = { state, dispatch };
	return <SellingContext.Provider value={value}>{children}</SellingContext.Provider>;
};
export const useSelling = () => useContext(SellingContext);

const SellingController: React.FC = ({ children }) => {
	const initState: SellingProps = {
		saleKind: ORDER_CONFIGURATION.FIXED_PRICE,
		tokenPayment: null,
		fixedPrice: 0,
		startPrice: 0,
		endPrice: 0,
		feeMethod: false,
		startTime: new Date(),
		endTime: moment(Date.now()).add(7, 'days').toDate(),
	};

	const reducer: Reducer<SellingProps, Actions> = (state, action) => {
		switch (action.type) {
			case 'SET_SALE_KIND':
				return {
					...state,
					saleKind: action.value,
				};

			case 'SET_TOKEN_PAYMENT':
				return {
					...state,
					tokenPayment: action.value,
				};
			case 'SET_FIXED_PRICE':
				return {
					...state,
					fixedPrice: action.value,
				};
			case 'SET_START_PRICE':
				return {
					...state,
					startPrice: action.value,
				};
			case 'SET_END_PRICE':
				return {
					...state,
					endPrice: action.value,
				};

			case 'SET_FEE_METHOD':
				return {
					...state,
					feeMethod: action.value,
				};
			case 'SET_START_TIME':
				return {
					...state,
					startTime: action.value,
				};

			case 'SET_END_TIME':
				return {
					...state,
					endTime: action.value,
				};

			case 'RESET_SELLING_STATE':
				return {
					...initState,
				};

			case 'CONSOLE_LOG_SELLING_STATE':
				console.log(state);
				return {
					...state,
				};

			default:
				return state;
		}
	};

	return (
		<SellingProvider reducer={reducer} initState={initState}>
			{children}
		</SellingProvider>
	);
};

export default SellingController;
