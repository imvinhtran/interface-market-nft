/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect } from 'react';
//components
import FixedPrice from '../FixedPrice';
import FallingPrice from '../FallingPrice';
//model
import { OptionSelectCustom, TokenPayment } from 'models';
//mui
import { Stack } from '@mui/material';
//context
import { useSelling } from 'contexts/SellingContext';
//constant
import { ORDER_CONFIGURATION } from '../../../../constants';
import { SaleSetupContainer } from './styled';

export interface SaleItemSetupProps {
	listTokenPayment: TokenPayment[];
}

function SaleItemSetup({ listTokenPayment }: SaleItemSetupProps) {
	const listTransformed: OptionSelectCustom[] = listTokenPayment.map(
		(tokenPayment: TokenPayment) => ({
			name: tokenPayment.symbol,
			value: tokenPayment.address,
			image: tokenPayment.logoURI,
		})
	);

	const flatFormTokenTransformed: OptionSelectCustom | undefined = listTransformed.find(
		(tokenPayment: OptionSelectCustom) => String(tokenPayment.name).toLowerCase() === 'bkn'
	);

	//Sale kind
	const FIXED = ORDER_CONFIGURATION.FIXED_PRICE;
	const DUTCH = ORDER_CONFIGURATION.DUTCH_AUCTION;

	//context
	const context = useSelling();
	const { state, dispatch } = context;
	const { saleKind, feeMethod } = state;

	// default value for tokenPayment
	useEffect(() => {
		if (saleKind === FIXED) {
			if (!feeMethod && listTransformed.length > 0) {
				dispatch({ type: 'SET_TOKEN_PAYMENT', value: flatFormTokenTransformed });
			}
		} else {
			dispatch({ type: 'SET_TOKEN_PAYMENT', value: null });
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listTokenPayment, feeMethod, saleKind]);

	// function
	// Set fee saleKind (true: splitFee, false: protocolFee)
	const handleChangeFeeMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({ type: 'SET_FEE_METHOD', value: event.target.checked });

		if (event.target.checked) {
			// splitFee
			dispatch({ type: 'SET_TOKEN_PAYMENT', value: null });
		} else {
			// protocolFee
			dispatch({ type: 'SET_TOKEN_PAYMENT', value: flatFormTokenTransformed });
		}
	};

	// Choose token payment
	const handleChangePaymentToken = (token: OptionSelectCustom | null | undefined) => {
		dispatch({ type: 'SET_TOKEN_PAYMENT', value: token });
	};

	return (
		<SaleSetupContainer>
			{saleKind === FIXED ? (
				<FixedPrice
					listTokenPayment={listTransformed}
					onChangePaymentToken={handleChangePaymentToken}
					onChangeFeeMethod={handleChangeFeeMethod}
				/>
			) : (
				<FallingPrice
					listTokenPayment={listTransformed}
					onChangePaymentToken={handleChangePaymentToken}
				/>
			)}
		</SaleSetupContainer>
	);
}
export default SaleItemSetup;
