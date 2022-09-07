import React, { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// styled
import {
	DropDownContent,
	DropdownList,
	IconDots,
	ListItem,
	SelectOptionBox,
	SmallNavigationRender,
} from './styled';
// mui
import { Stack, Tooltip, Typography } from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
// components
import DarkLight from '../DarkLight';
import DividerGradient from 'components/CustomUI/DividerGradient';

const listMenu = [
	{ name: 'About', url: 'https://forbitswap.com/' },
	{ name: 'Doc', url: 'https://nftspacex1.gitbook.io/' },
	{ name: 'API', url: '#' },
	{ name: 'FAQ', url: '#' },
	{ name: 'Language', url: '#' },
];

const listNavigation = [
	{ name: 'Marketplace', url: '/' },
	{ name: 'Auction', url: '#' },
	{ name: 'Metaverse', url: '#' },
	{ name: 'Boarc', url: 'https://boarc.nftspacex.io/' },
];

export interface IMoreOptionListProps {
	placementDropdown: 'top' | 'bottom';
}

const MoreOptionList = ({ placementDropdown }: IMoreOptionListProps) => {
	const ref: any = useRef(null);
	const [activeSelectOption, setActiveSelectOption] = useState(false);

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
		if (!activeSelectOption) setActiveSelectOption(true);
	};

	return (
		<SelectOptionBox onClick={showOptionBox}>
			<IconDots alignItems="center" justifyContent="center">
				<MoreHorizOutlinedIcon sx={{ width: '32px' }} />
			</IconDots>

			<DropDownContent
				ref={ref}
				sx={{
					...(placementDropdown === 'top'
						? {
								bottom: 0,
						  }
						: {
								top: 0,
						  }),
				}}
				className={activeSelectOption ? 'active' : ''}
			>
				<DropdownList>
					<SmallNavigationRender>
						{listNavigation.map((item: any, index: number) => (
							<ListItem key={index} href={item.url} target="_blank">
								<Typography variant="body1" sx={{ padding: '5px 15px' }} noWrap>
									{item.name}
								</Typography>
							</ListItem>
						))}
						<DividerGradient sx={{ m: '0.5rem 0' }} />
					</SmallNavigationRender>

					<Stack direction="row" alignItems="center" justifyContent="space-between">
						<Typography variant="body1" sx={{ padding: '5px 15px' }} noWrap>
							Theme
						</Typography>
						<DarkLight />
					</Stack>
					{listMenu.map((item: any, index: number) =>
						item.url === '#' ? (
							<Tooltip title="Coming soon" placement="left" key={index} arrow>
								<ListItem key={index} href={item.url}>
									<Typography variant="body1" sx={{ padding: '5px 15px' }} noWrap>
										{item.name}
									</Typography>
								</ListItem>
							</Tooltip>
						) : (
							<ListItem key={index} href={item.url} target="_blank">
								<Typography variant="body1" sx={{ padding: '5px 15px' }} noWrap>
									{item.name}
								</Typography>
							</ListItem>
						)
					)}
				</DropdownList>
			</DropDownContent>
		</SelectOptionBox>
	);
};

export default React.memo(MoreOptionList);
