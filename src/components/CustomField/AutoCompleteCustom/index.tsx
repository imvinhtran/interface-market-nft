/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect } from 'react';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
// styled
import {
	ListOption,
	DropDownContent,
	IconArrowDown,
	SelectOptionBox,
	OptionItem,
	InputStyle,
} from './styled';
// images
import ImageInputDefault from 'assets/images/home/image-input-default.webp';
// components
import DividerGradient from 'components/CustomUI/DividerGradient';
// mui
import { Autocomplete, Avatar, Box, Stack, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// models
import { OptionSelectCustom } from 'models';
import { renderImage } from 'utils';

export interface AutoCompleteCustomProps {
	currentItem: OptionSelectCustom | undefined | null;
	listItem: OptionSelectCustom[];
	onChange: (value: any) => void;
	placeHolder: string;
	sx?: any;
}

function AutoCompleteCustom({
	currentItem,
	listItem,
	onChange,
	placeHolder,
	sx,
}: AutoCompleteCustomProps) {
	const { getRootProps, getInputProps, getListboxProps, getOptionProps, groupedOptions, value } =
		useAutocomplete({
			id: 'autocomplete',
			options: listItem,
			getOptionLabel: (option: OptionSelectCustom) => String(option.name),
			isOptionEqualToValue: (option: OptionSelectCustom, value: OptionSelectCustom) =>
				option.value === value.value,
		});

	useEffect(() => {
		onChange(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	const renderListOption = () => {
		return (groupedOptions as typeof listItem).map((option: any, index: number) => (
			<Fragment key={index}>
				<OptionItem {...getOptionProps({ option, index })}>
					<Stack direction="row" alignItems="center">
						{option.image && (
							<Avatar
								sx={{ width: '30px', height: '30px', mr: 1 }}
								src={renderImage(
									option.image ? option.image : '',
									ImageInputDefault
								)}
								alt="option"
							/>
						)}

						<Typography variant="body1">{option.name}</Typography>
					</Stack>
				</OptionItem>
				<DividerGradient />
			</Fragment>
		));
	};

	return (
		<Box sx={{ width: '100%', position: 'relative' }}>
			<SelectOptionBox {...getRootProps()} direction="row" alignItems="center" sx={sx}>
				{currentItem && currentItem.image && (
					<Avatar
						sx={{ width: '30px', height: '30px', mr: 1 }}
						src={currentItem.image}
						alt="current option"
					/>
				)}

				<InputStyle
					{...getInputProps()}
					placeholder={currentItem ? String(currentItem.name) : placeHolder}
					sx={{ zIndex: 1, cursor: 'pointer' }}
				/>

				<ArrowDropDownIcon
					sx={{
						position: 'absolute',
						top: '50%',
						right: '10px',
						transform: 'translateY(-50%)',
						zIndex: 0,
					}}
				/>

				{groupedOptions.length > 0 ? (
					<DropDownContent>
						<ListOption {...getListboxProps()}>{renderListOption()}</ListOption>
					</DropDownContent>
				) : null}
			</SelectOptionBox>
		</Box>
	);
}

export default AutoCompleteCustom;
