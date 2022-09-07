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

export interface SelectCustomProps {
	headerIcon?: string;
	currentItem: OptionSelectCustom | null | undefined;
	listItem: OptionSelectCustom[];
	onChange?: (value: OptionSelectCustom) => void; // use when this select box impact on another state (ex: datetimepicker)
	sx?: any;
	layout?: string;
	readOnly?: boolean;
}

function SelectCustom({
	currentItem,
	listItem,
	sx,
	onChange,
	headerIcon,
	layout,
	readOnly,
}: SelectCustomProps) {
	const ref: any = useRef(null);
	let [activeSelectOption, setActiveSelectOption] = useState(false);

	useEffect(() => {
		const onBodyClick = (event: any) => {
			event.stopPropagation();
			if (ref.current && !ref.current.contains(event.target)) {
				setActiveSelectOption(false);
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
	}, [activeSelectOption]);

	const showOptionBox = () => {
		if (readOnly) return;
		if (!activeSelectOption) setActiveSelectOption(true);
	};

	const handleSetOption = (value: OptionSelectCustom) => {
		if (onChange) onChange(value);
		setActiveSelectOption(false);
	};

	const renderListOption = () => {
		return listItem.map((item: OptionSelectCustom, idx: number) => {
			return (
				<Box key={idx}>
					<OptionItem onClick={() => handleSetOption(item)}>
						<ContentWrapper>
							<Stack direction="row" alignItems="center">
								{item.image && (
									<img
										src={item.image}
										alt="token icon"
										width="25"
										height="25"
										style={{ marginRight: 10 }}
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
			<Stack
				direction="row"
				alignItems="center"
				justifyContent={layout ? layout : 'space-between'}
			>
				{headerIcon && <img src={headerIcon} alt="header icon" width={25} height={25} />}

				{currentItem?.image && (
					<img src={currentItem.image} alt="token icon" width={25} height={25} />
				)}

				<Typography sx={{ pl: 1, flexGrow: 1 }}>{currentItem?.name}</Typography>

				{!readOnly && <ArrowDropDownOutlinedIcon sx={{ ml: 2 }} />}
			</Stack>

			<DropDownOverlay className={activeSelectOption ? 'active' : ''} />

			<DropDownContent ref={ref} className={activeSelectOption ? 'active' : ''}>
				<ListOption>{renderListOption()}</ListOption>
			</DropDownContent>
		</SelectOptionBox>
	);
}

export default SelectCustom;
