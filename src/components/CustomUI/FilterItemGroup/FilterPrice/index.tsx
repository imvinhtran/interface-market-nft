/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// mui
import { Box, Stack, Typography, useTheme } from '@mui/material';
// components
import DropDown from '../Common/DropDown';
import DividerGradient from 'components/CustomUI/DividerGradient';
import SelectCustom from 'components/CustomField/SelectCustom';
import FieldInput from 'components/CustomField/FieldInput';
import AutoCompleteCustom2 from 'components/CustomField/AutoCompleteCustom2';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectListTokenPayment } from 'redux/slices/tokenPaymentSlice';
// styled
import {
	ButtonApply,
	ButtonBadge,
	ButtonClear,
	ButtonStyled,
	ButtonTitle,
	ButtonWrapper,
	DropdownButtonGroup,
	DropdownWrapper,
	IconStyled,
} from '../Common/styled';
// models
import { OptionSelectCustom, TokenPayment } from 'models';
// images
import iconPriceWhite from 'assets/icons/filter-price-white.webp';
import iconPriceBlack from 'assets/icons/filter-price-black.webp';
// models
import { FilterNft } from 'models';

export interface IFormFilterPrice {
	minPrice: string;
	maxPrice: string;
}

const defaultButtonTitle = 'Price';

export interface IFilterPriceProps {
	filter: FilterNft;
	setFilter: Function;
	resetAll: boolean;
}

export default function FilterPrice({ filter, setFilter, resetAll }: IFilterPriceProps) {
	const dispatch = useDispatch();
	const theme = useTheme();

	const isLightTheme = theme.palette.mode === 'light';

	// useState
	const [currentTokenPayment, setCurrentTokenPayment] = useState<
		OptionSelectCustom | null | undefined
	>();
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [buttonTitle, setButtonTitle] = useState<string>(defaultButtonTitle);

	// useSelector
	const listTokenPayment: TokenPayment[] = useSelector(selectListTokenPayment);

	const listTokenPaymentTransformed: OptionSelectCustom[] = listTokenPayment.map(
		(tokenPayment: TokenPayment) => ({
			name: tokenPayment.symbol,
			value: tokenPayment.address,
			image: tokenPayment.logoURI,
		})
	);

	// useEffect
	useEffect(() => {
		if (resetAll) {
			handleClear();
			setButtonTitle(defaultButtonTitle);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [resetAll]);

	// functions
	const handleChangePaymentToken = (currentOption: OptionSelectCustom | null | undefined) => {
		setCurrentTokenPayment(currentOption);
	};

	const handleClear = () => {
		reset();
	};

	const handleApply = (data: IFormFilterPrice) => {
		let symbol: string = '';
		data.minPrice = data.minPrice.trim();
		data.maxPrice = data.maxPrice.trim();

		if (Number(data.minPrice) < 0 || Number(data.maxPrice) < 0) {
			toast.warning('Invalid price!');
			return;
		}

		if (
			data.minPrice !== '' &&
			data.maxPrice !== '' &&
			Number(data.minPrice) > Number(data.maxPrice)
		) {
			toast.warning('Max price cannot be less than min price!');
			return;
		}

		if (data.minPrice === '' && data.maxPrice === '') {
			symbol = '';
			setButtonTitle(defaultButtonTitle);
		} else {
			if (!currentTokenPayment) {
				toast.warning('Please choose a token!');
				return;
			}

			symbol = String(currentTokenPayment.name);
			const minPrice: string = data.minPrice ? data.minPrice : 'min';
			const maxPrice: string = data.maxPrice ? data.maxPrice : 'max';

			setButtonTitle(minPrice + ' - ' + maxPrice + ' ' + symbol);
		}

		const newFilter: FilterNft = {
			...filter,
			...data,
			tokenSymbol: symbol,
		};

		dispatch(setFilter(newFilter));
	};

	const schema = yup
		.object({
			minPrice: yup.string(),
			maxPrice: yup.string(),
		})
		.required();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<IFormFilterPrice>({
		resolver: yupResolver(schema),
	});

	const renderButtonContent = () => {
		return (
			<ButtonWrapper>
				{buttonTitle !== defaultButtonTitle && (
					<ButtonBadge>{defaultButtonTitle}</ButtonBadge>
				)}

				<ButtonStyled>
					<IconStyled sx={{ width: '8px', height: '16px' }}>
						{isLightTheme ? (
							<img src={iconPriceBlack} alt="icon price" />
						) : (
							<img src={iconPriceWhite} alt="icon price" />
						)}
					</IconStyled>
					<ButtonTitle>{buttonTitle}</ButtonTitle>
				</ButtonStyled>
			</ButtonWrapper>
		);
	};

	const renderDropdownContent = () => {
		return (
			<DropdownWrapper sx={{ minWidth: '300px' }}>
				<form onSubmit={handleSubmit(handleApply)}>
					<AutoCompleteCustom2
						currentItem={currentTokenPayment}
						listItem={listTokenPaymentTransformed}
						onChange={handleChangePaymentToken}
						placeholder="Token name..."
						sx={{
							border: 'none',

							...(isLightTheme
								? {
										backgroundColor: theme.palette.primaryLight.main,
								  }
								: {
										backgroundColor: theme.palette.primary.dark,
								  }),
						}}
					/>

					<Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
						<FieldInput
							id="min-price"
							type="number"
							placeholder="Min"
							registerHookForm={{ ...register('minPrice') }}
							sx={{ borderWidth: '1px', borderRadius: '12px' }}
						/>

						<Typography variant="body1">to</Typography>

						<FieldInput
							id="max-price"
							type="number"
							placeholder="Max"
							registerHookForm={{ ...register('maxPrice') }}
							sx={{ borderWidth: '1px', borderRadius: '12px' }}
						/>
					</Stack>

					<DividerGradient sx={{ mt: 1 }} />

					<DropdownButtonGroup>
						<ButtonClear onClick={handleClear}>Clear</ButtonClear>
						<ButtonApply type="submit">Apply</ButtonApply>
					</DropdownButtonGroup>
				</form>
			</DropdownWrapper>
		);
	};

	return (
		<DropDown
			activeDropDown={activeDropDown}
			setActiveDropDown={setActiveDropDown}
			buttonContent={renderButtonContent()}
			dropdownContent={renderDropdownContent()}
		/>
	);
}
