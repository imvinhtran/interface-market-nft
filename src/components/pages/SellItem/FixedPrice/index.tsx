/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
//mui
import { Grid, Box, Stack, Typography, useTheme } from '@mui/material';
//components
import SwitchButton from 'components/CustomField/SwitchButton';
import FieldInput from 'components/CustomField/FieldInput';
import SelectCustom from 'components/CustomField/SelectCustom';
import DateTimePicker from '../DateTimePicker';
//context
import { useSelling } from 'contexts/SellingContext';
// models
import { OptionSelectCustom } from 'models';
//styled
import { SelectAndInputWraper } from './styled';
import { Title } from 'pages/SellItem/styled';
import AutoCompleteCustom2 from 'components/CustomField/AutoCompleteCustom2';

export interface FixedPriceProps {
	listTokenPayment: OptionSelectCustom[];
	onChangePaymentToken: (value: OptionSelectCustom | null | undefined) => void;
	onChangeFeeMethod: (value: any) => void;
}

export default function FixedPrice({
	listTokenPayment,
	onChangePaymentToken,
	onChangeFeeMethod,
}: FixedPriceProps) {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';
	//state
	const [errorMessage, setErrorMessage] = useState<string>('');

	//context
	const context = useSelling();
	const { state, dispatch } = context;

	// functions
	const handleChangePaymentToken = (
		currentPaymentToken: OptionSelectCustom | null | undefined
	) => {
		if (currentPaymentToken) {
			onChangePaymentToken(currentPaymentToken);
		} else {
			onChangePaymentToken(undefined);
		}
	};

	const setFixedPrice = (e: any) => {
		if (parseFloat(e.target.value) <= 0) {
			setErrorMessage('Price must be greater then 0');
		} else if (parseFloat(e.target.value) < 0.001) {
			setErrorMessage('Price too low! Min price is 0.001!');
		} else {
			setErrorMessage('');
			dispatch({ type: 'SET_FIXED_PRICE', value: e.target.value });
		}
	};

	return (
		<Stack spacing={5} sx={{ width: '100%' }}>
			{/*-------------------------------Price-------------------------------- */}
			<Box sx={{ width: '100%' }}>
				<Title variant="h6">Price</Title>
				<SelectAndInputWraper>
					<Box sx={{ width: '130px' }}>
						{/* <SelectCustom
							currentItem={state.tokenPayment}
							listItem={listTokenPayment}
							onChange={onChangePaymentToken}
							sx={{
								padding: '5px 15px',
								...(isLightTheme
									? { backgroundColor: theme.palette.primaryLight.dark }
									: {}),
							}}
						/> */}

						<AutoCompleteCustom2
							currentItem={state.tokenPayment}
							listItem={listTokenPayment}
							onChange={handleChangePaymentToken}
							placeholder="Token name..."
							disabled={!state.feeMethod}
							sx={{
								width: '155px',

								...(isLightTheme
									? {
											backgroundColor: theme.palette.primaryLight.dark,
									  }
									: {
											backgroundColor: theme.palette.primary.main,
									  }),
							}}
						/>
					</Box>

					<Box sx={{ flexGrow: 1 }}>
						<FieldInput
							id="price"
							type="text"
							placeholder="0.0"
							onChange={setFixedPrice}
							sx={{
								border: 'none',
								textAlign: 'right',
								fontSize: '20px',
								textOverflow: 'ellipsis',
							}}
							otherProps={{
								inputMode: 'decimal',
								pattern: '^[0-9]*[.,]?[0-9]*$',
								minLength: 1,
								maxLength: 10,
							}}
						/>
					</Box>
				</SelectAndInputWraper>
				<Box sx={{ width: '100%' }}>
					<Typography variant="body1" sx={{ color: 'red', pt: 1, float: 'right' }}>
						{errorMessage}
					</Typography>
				</Box>
			</Box>

			{/*-------------------------------Fee method-------------------------------- */}
			<Stack direction="row" alignItems="center" justifyContent="space-between">
				<Box>
					<Title variant="h6">Fee method</Title>
					<Typography variant="body2" sx={{ opacity: '0.5' }}>
						({state.feeMethod ? 'Split Fee' : 'Protocol Fee'})
					</Typography>
				</Box>

				<SwitchButton onChange={onChangeFeeMethod} />
			</Stack>

			<Box>
				<Title variant="h6" sx={{ pb: 1 }}>
					Duration
				</Title>
				<DateTimePicker />
			</Box>
		</Stack>
	);
}
