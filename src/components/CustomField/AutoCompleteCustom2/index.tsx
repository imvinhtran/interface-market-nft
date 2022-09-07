/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
// mui
import { Stack, Typography, Box } from '@mui/material';
// components
import DividerGradient from 'components/CustomUI/DividerGradient';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
// models
import { OptionSelectCustom } from 'models';

import {
	ListOption,
	DropDownContent,
	SelectOptionBox,
	OptionItem,
	ContentWrapper,
	DropDownOverlay,
} from './styled';
import FieldInput from '../FieldInput';

export interface SelectCustomProps {
	headerIcon?: string;
	currentItem: OptionSelectCustom | null | undefined;
	listItem: OptionSelectCustom[];
	placeholder?: string;
	onChange?: (value: OptionSelectCustom | null | undefined) => void; // use when this select box impact on another state (ex: datetimepicker)
	disabled?: boolean;
	sx?: any;
}

function AutoCompleteCustom2({
	currentItem,
	listItem,
	sx,
	placeholder,
	onChange,
	headerIcon,
	disabled = false,
}: SelectCustomProps) {
	// useRef
	const ref: any = useRef(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// useState
	const [inputValue, setInputValue] = useState<string>('');
	const [activeSelectOption, setActiveSelectOption] = useState(false);

	useEffect(() => {
		const onBodyClick = (event: any) => {
			event.stopPropagation();

			if (ref.current && !ref.current.contains(event.target)) {
				setActiveSelectOption(false);

				// reset the input value to current item name if user not enter correct value
				if (currentItem) {
					setInputValue(String(currentItem.name));
				}
			}
		};
		// Bind the event listener if dropdown is active
		if (activeSelectOption)
			document.body.addEventListener('click', onBodyClick, { passive: true });

		return () => {
			// Unbind the event listener on clean up
			document.body.removeEventListener('click', onBodyClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeSelectOption, currentItem]);

	useEffect(() => {
		if (currentItem) {
			setInputValue(String(currentItem.name));
		} else {
			setInputValue('');
		}
	}, [currentItem]);

	const showOptionBox = () => {
		if (!activeSelectOption && !disabled) {
			setActiveSelectOption(true);
			if (inputRef.current) inputRef.current.focus();
		}
	};

	const handleSetOption = (e: any, value: OptionSelectCustom) => {
		e.stopPropagation();

		if (onChange) onChange(value);
		setActiveSelectOption(false);
	};

	const handleOnChangeInputValue = (e: any) => {
		const newValue = e.target.value;
		setInputValue(newValue);

		if (newValue === '') {
			if (onChange) onChange(null);
		}
	};

	// new filtered list by input value
	const listItemFiltered =
		inputValue === ''
			? listItem
			: listItem.filter((item: OptionSelectCustom) =>
					String(item.name).toLowerCase().includes(inputValue.toLowerCase())
			  );

	const renderListOption = () => {
		return listItemFiltered.map((item: OptionSelectCustom, idx: number) => {
			return (
				<Box key={idx}>
					<OptionItem onClick={(e: any) => handleSetOption(e, item)}>
						<ContentWrapper>
							<Stack direction="row" alignItems="center">
								{item.image && (
									<img
										src={item.image}
										alt="token icon"
										width="25"
										height="25"
										style={{ marginRight: 10, borderRadius: '50%' }}
									/>
								)}
								<Typography variant="body1">{item.name}</Typography>
							</Stack>
						</ContentWrapper>
					</OptionItem>
					{idx + 1 !== listItem.length && <DividerGradient />}
				</Box>
			);
		});
	};

	return (
		<SelectOptionBox onClick={showOptionBox} sx={sx}>
			<Stack direction="row" alignItems="center">
				{headerIcon && <img src={headerIcon} alt="header icon" width={25} height={25} />}

				{currentItem?.image && (
					<img
						src={currentItem.image}
						alt="token icon"
						width={25}
						height={25}
						style={{ borderRadius: '50%', marginRight: '10px' }}
					/>
				)}

				{/* <Typography sx={{ pl: 1 }}>{currentItem?.name}</Typography> */}
				<Box sx={{ flexGrow: 1 }}>
					<FieldInput
						otherProps={{ ref: inputRef }}
						type="text"
						value={inputValue}
						readOnly={disabled}
						placeholder={placeholder ?? ''}
						onChange={handleOnChangeInputValue}
						sx={{ zIndex: 1, paddingLeft: '0px', backgroundColor: 'inherit' }}
					/>
				</Box>

				{!disabled && (
					<ArrowDropDownOutlinedIcon
						sx={{
							position: 'absolute',
							top: '50%',
							right: '10px',
							transform: 'translateY(-50%)',
							zIndex: 0,
						}}
					/>
				)}
			</Stack>

			<DropDownOverlay className={activeSelectOption ? 'active' : ''} />

			<DropDownContent ref={ref} className={activeSelectOption ? 'active' : ''}>
				<ListOption>{renderListOption()}</ListOption>
			</DropDownContent>
		</SelectOptionBox>
	);
}

export default AutoCompleteCustom2;
