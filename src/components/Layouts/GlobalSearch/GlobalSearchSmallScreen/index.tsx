import React, { useEffect, useRef, useState } from 'react';
// mui
import { Box, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
// styled
import { CloseIconStyled, Divider, SearchIconStyled } from '../Common/styled';
import { DropDownContentSS, DropDownOverlay, SearchResultsWrapperSS } from './styled';
// components
import FieldInput from 'components/CustomField/FieldInput';

export interface IGlobalSearchSmallScreenProps {
	inputValue: string;
	handleOnChangeInputValue: (event: any) => void;
	RenderSearchResults: Function;
}

export default function GlobalSearchSmallScreen({
	inputValue,
	handleOnChangeInputValue,
	RenderSearchResults,
}: IGlobalSearchSmallScreenProps) {
	const ref: any = useRef(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// useState
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);

	// useEffect
	useEffect(() => {
		const onBodyClick = (event: any) => {
			event.stopPropagation();
			if (ref.current && !ref.current.contains(event.target)) {
				setActiveDropDown(false);
			}
		};
		// Bind the event listener if dropdown is active
		if (activeDropDown) {
			document.body.addEventListener('click', onBodyClick, { passive: true });
		}

		return () => {
			// Unbind the event listener on clean up
			document.body.removeEventListener('click', onBodyClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeDropDown]);

	// functions
	const showDropDown = () => {
		if (!activeDropDown) {
			setActiveDropDown(true);
			if (inputRef.current) inputRef.current.focus();
		}
	};

	const deactivateDropdown = () => {
		setActiveDropDown(false);
	};

	return (
		<Box sx={{ marginLeft: 'auto' }} onClick={showDropDown}>
			<SearchIconStyled alignItems="center" justifyContent="center">
				<SearchIcon />
			</SearchIconStyled>

			<DropDownOverlay className={activeDropDown ? 'active' : ''} />

			<DropDownContentSS ref={ref} className={activeDropDown ? 'active' : ''}>
				<Stack direction="row" alignItems="center" sx={{ px: 2 }}>
					<SearchIcon />
					<FieldInput
						otherProps={{ ref: inputRef }}
						type="text"
						value={inputValue}
						placeholder={'Search in NFTSpaceX'}
						onChange={handleOnChangeInputValue}
						sx={{
							flexGrow: 1,
							borderRadius: '0',
							my: 1,
							backgroundColor: 'inherit',
						}}
					/>

					<CloseIconStyled
						alignItems="center"
						justifyContent="center"
						onClick={() => {
							setActiveDropDown(false);
						}}
					>
						<CloseIcon />
					</CloseIconStyled>
				</Stack>

				{activeDropDown && (
					<SearchResultsWrapperSS>
						<Divider />
						{RenderSearchResults(deactivateDropdown)}
					</SearchResultsWrapperSS>
				)}
			</DropDownContentSS>
		</Box>
	);
}
