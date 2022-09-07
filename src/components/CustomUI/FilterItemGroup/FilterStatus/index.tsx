import React, { useEffect, useState } from 'react';
// mui

import CheckIcon from '@mui/icons-material/Check';
// components
import DropDown from '../Common/DropDown';
import DividerGradient from 'components/CustomUI/DividerGradient';
// redux
import { useDispatch } from 'react-redux';
// styled
import {
	ButtonApply,
	ButtonBadge,
	ButtonClear,
	ButtonStyled,
	ButtonTitle,
	ButtonWrapper,
	CheckIconWrapper,
	DropdownButtonGroup,
	DropdownWrapper,
	IconStyled,
	ListOption,
	OptionItem,
	OptionItemText,
} from '../Common/styled';
// images
import iconStatusWhite from 'assets/icons/filter-status-white.webp';
import iconStatusBlack from 'assets/icons/filter-status-black.webp';
// constants
import { ITEM_STATUS } from '../../../../constants';
// models
import { FilterNft } from 'models';
import { useTheme } from '@mui/material';

interface Status {
	id: number;
	name: string;
	value: number;
}

const listStatus: Status[] = [
	{ id: 0, name: 'Buy Now', value: ITEM_STATUS.BUY_NOW },
	{ id: 1, name: 'On Auction', value: ITEM_STATUS.TIME_AUCTION },
	{ id: 2, name: 'New', value: ITEM_STATUS.NOT_FOR_SELL },
	{ id: 3, name: 'Has Offers', value: ITEM_STATUS.OPEN_FOR_OFFERS },
];

const defaultButtonTitle = 'Status';

export interface IFilterStatusProps {
	filter: FilterNft;
	setFilter: Function;
	resetAll: boolean;
}

export default function FilterStatus({ filter, setFilter, resetAll }: IFilterStatusProps) {
	const dispatch = useDispatch();
	const theme = useTheme();

	const isLightTheme = theme.palette.mode === 'light';

	// useState
	const [selected, setSelected] = useState<number[]>([]);
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [buttonTitle, setButtonTitle] = useState<string>(defaultButtonTitle);

	// useEffect
	useEffect(() => {
		if (resetAll) {
			handleClear();
			setButtonTitle(defaultButtonTitle);
		}
	}, [resetAll]);

	// functions
	const handleClickOption = (id: number) => {
		const selectedIndex = selected.indexOf(id);

		if (selectedIndex === -1) {
			// option is not selected => select
			setSelected([...selected, id]);
		} else {
			// option is selected => remove
			setSelected(selected.filter((item: number) => item !== id));
		}
	};

	const handleClear = () => {
		setSelected([]);
		setButtonTitle(defaultButtonTitle);
	};

	const handleApply = () => {
		let arrStatusValue: number[] = [];
		let arrStatusName: string[] = [];

		if (selected.length !== 0) {
			selected.forEach((item: number) => {
				arrStatusValue.push(listStatus[item].value);
				arrStatusName.push(listStatus[item].name);
			});
		}

		if (arrStatusName.length === 0) {
			setButtonTitle(defaultButtonTitle);
		} else {
			setButtonTitle(arrStatusName.join(', '));
		}

		const newFilter: FilterNft = { ...filter, status: arrStatusValue };
		dispatch(setFilter(newFilter));
	};

	const renderButtonContent = () => {
		return (
			<ButtonWrapper>
				{buttonTitle !== defaultButtonTitle && (
					<ButtonBadge>{defaultButtonTitle}</ButtonBadge>
				)}

				<ButtonStyled>
					<IconStyled sx={{ width: '14px', height: '14px' }}>
						{isLightTheme ? (
							<img src={iconStatusBlack} alt="icon status" />
						) : (
							<img src={iconStatusWhite} alt="icon status" />
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
				<ListOption>
					{listStatus.map((item: Status, idx: number) => {
						const isItemSelected = selected.indexOf(item.id) !== -1;

						return (
							<OptionItem
								key={idx}
								onClick={() => {
									handleClickOption(item.id);
								}}
							>
								<OptionItemText>{item.name}</OptionItemText>

								{isItemSelected && (
									<CheckIconWrapper>
										<CheckIcon sx={{ width: '100%', height: '100%' }} />
									</CheckIconWrapper>
								)}
							</OptionItem>
						);
					})}
				</ListOption>

				<DividerGradient />

				<DropdownButtonGroup>
					<ButtonClear onClick={handleClear}>Clear</ButtonClear>
					<ButtonApply onClick={handleApply}>Apply</ButtonApply>
				</DropdownButtonGroup>
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
