import React, { useEffect, useRef, useState } from 'react';
// mui
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
// components
import FieldInput from 'components/CustomField/FieldInput';
// styled
import { CloseIconStyled, SearchIconStyled } from '../Common/styled';
import { DropDownContentBS, SearchGroup } from './styled';
// utils
import { sliceString } from 'utils';

export interface IGlobalSearchBigScreenProps {
	inputValue: string;
	setInputValue: Function;
	handleOnChangeInputValue: (event: any) => void;
	RenderSearchResults: Function;
}

export default function GlobalSearchBigScreen({
	inputValue,
	setInputValue,
	handleOnChangeInputValue,
	RenderSearchResults,
}: IGlobalSearchBigScreenProps) {
	const ref: any = useRef(null);
	const inputRef = useRef<HTMLInputElement>(null);

	// useState
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [prevInputValue, setPrevInputValue] = useState<string>('');

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
			setInputValue(prevInputValue);
		} else {
			setPrevInputValue(inputValue);
			setInputValue(sliceString(inputValue, 8));
		}

		return () => {
			// Unbind the event listener on clean up
			document.body.removeEventListener('click', onBodyClick);

			// this useful for reset inputValue when resize to mobile
			setInputValue(prevInputValue);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeDropDown]);

	// handle esc
	useEffect(() => {
		const escFunction = (event: any) => {
			if (event.key === 'Escape') {
				//Do whatever when esc is pressed
				setActiveDropDown(false);
				if (inputRef.current) inputRef.current.blur();
			}
		};

		window.addEventListener('keydown', escFunction, { passive: true });

		return () => {
			window.removeEventListener('keydown', escFunction);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	const responsiveTrueBoxWidthExpand = (): number => {
		const screenWidth = window.innerWidth;
		if (screenWidth < 1300) {
			return 0;
		}
		return 250;
	};

	return (
		<Box
			sx={{
				width: activeDropDown ? `${responsiveTrueBoxWidthExpand()}px` : '140px',
				transition: 'all 0.4s',
			}}
		>
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					right: 0,
					marginTop: '-5px',
					width: activeDropDown ? '100%' : '140px',
					transition: 'all 0.4s',
				}}
				ref={ref}
				onClick={showDropDown}
			>
				<SearchGroup direction="row" alignItems="center">
					{!activeDropDown && (
						<SearchIconStyled alignItems="center" justifyContent="center">
							<SearchIcon sx={{ cursor: 'pointer', flexShrink: 0 }} />
						</SearchIconStyled>
					)}

					<FieldInput
						otherProps={{ ref: inputRef }}
						type="text"
						value={inputValue}
						placeholder={
							activeDropDown
								? 'Search items, collections and user accounts'
								: 'Search...'
						}
						onChange={handleOnChangeInputValue}
						sx={{
							flexGrow: 1,
							padding: activeDropDown ? '0px 0px 0px 10px' : '0px 10px 0px 0px',
							borderRadius: '0',
							my: 1,
							backgroundColor: 'inherit',
						}}
					/>

					{activeDropDown && (
						<CloseIconStyled
							alignItems="center"
							justifyContent="center"
							sx={{ flexShrink: 0, pr: 1 }}
							onClick={(e: any) => {
								setActiveDropDown(false);
								setInputValue('');
							}}
						>
							<CloseIcon />
						</CloseIconStyled>
					)}
				</SearchGroup>

				<DropDownContentBS className={activeDropDown ? 'active' : ''}>
					{RenderSearchResults(deactivateDropdown)}
				</DropDownContentBS>
			</Box>
		</Box>
	);
}
