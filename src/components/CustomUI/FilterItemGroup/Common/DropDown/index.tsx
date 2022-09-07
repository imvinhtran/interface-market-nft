// import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
// styled
import { ButtonContent, DropDownContent, DropDownWrapper, DropDownOverlay } from './styled';
// components
// import FadeInWhenVisible from 'components/Animation/FadeInWhenVisible';

export interface IDropDownProps {
	activeDropDown: boolean;
	setActiveDropDown: Function;
	buttonContent: React.ReactElement;
	dropdownContent: React.ReactElement;
	className?: string;
}

export default function DropDown({
	activeDropDown,
	setActiveDropDown,
	buttonContent,
	dropdownContent,
	className,
}: IDropDownProps) {
	const ref: any = useRef(null);

	useEffect(() => {
		const onBodyClick = (event: any) => {
			event.stopPropagation();

			if (ref.current && !ref.current.contains(event.target)) {
				setActiveDropDown(false);
			}
		};
		// Bind the event listener if dropdown is active
		if (activeDropDown) document.body.addEventListener('click', onBodyClick, { passive: true });

		return () => {
			// Unbind the event listener on clean up
			document.body.removeEventListener('click', onBodyClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeDropDown]);

	const showOptionBox = () => {
		if (!activeDropDown) setActiveDropDown(true);
	};

	return (
		<DropDownWrapper className={className} onClick={showOptionBox}>
			<ButtonContent>{buttonContent}</ButtonContent>
			{/* {activeDropDown && ( */}
			{/* <FadeInWhenVisible> */}

			<DropDownOverlay className={activeDropDown ? 'active' : ''} />

			<DropDownContent ref={ref} className={activeDropDown ? 'active' : ''}>
				{dropdownContent}
			</DropDownContent>
			{/* </FadeInWhenVisible> */}
			{/* )} */}
		</DropDownWrapper>
	);
}
