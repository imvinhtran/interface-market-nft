/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, lazy, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// mui
import { Box, Stack, Typography, Drawer, Tooltip, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// styled
import {
	DropdownMenu,
	NavBar,
	NavigationBarBigScreen,
	NavigationItemBigScreen,
	NavLinkBigScreen,
	NavigationBarSmallScreen,
	NavigationItemSmallScreen,
	NavLinkSmallScreen,
	DropdownMenuLink,
	ContentWrapper,
} from './styled';
import { CollectionCategory } from 'models';
import { CATEGORY_COLLECTION } from 'constants/common.constant';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCollectionCategory } from 'redux/slices/collectionCategorySlice';
//actions
import { fetchListCollectionCategory } from 'redux/actions/collectionCategoryAction';
//components
import Loadable from 'components/CustomUI/LoadableComponent';

const GlobalSearch = Loadable(lazy(() => import('../GlobalSearch')));

const ListTitleHeader = [
	{
		id: 1,
		titleHeader: 'Auction',
		href: '#',
		target: '_self',
		listItemSubMenu: [
			{
				title: 'Art',
				href: '#',
			},
			{
				title: 'Collectibles',
				href: '#',
			},
		],
	},
	{
		id: 2,
		titleHeader: 'Metaverse',
		href: '#',
		target: '_self',
		listItemSubMenu: [
			{
				title: 'Virtual Worlds',
				href: '#',
			},
			{
				title: 'Sports',
				href: '#',
			},
			{
				title: 'Games',
				href: '#',
			},
		],
	},
	{
		id: 3,
		titleHeader: 'Boarc',
		href: 'https://boarc.nftspacex.io/',
		target: '_blank',
		listItemSubMenu: [],
	},
];

const MainNavBar: React.FC = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// useRef
	const ref = useRef<HTMLDivElement>(null);

	// useState
	const [isOpenSmallScreenMenu, setIsOpenSmallScreenMenu] = useState(false);

	// useSelector
	const listCategory: CollectionCategory[] = useSelector(selectCollectionCategory);

	//Get list submenu header for navigation
	useEffect(() => {
		dispatch(fetchListCollectionCategory());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		setIsOpenSmallScreenMenu(open);
	};

	const renderCategory = (category: number) => {
		return CATEGORY_COLLECTION[category];
	};

	const RenderMenuHeaderSmallScreen = () => {
		return (
			<Fragment>
				<Box onClick={toggleDrawer(true)} sx={{}}>
					<Box
						sx={{
							width: '100%',
							height: '100%',
							backgroundColor: theme.palette.primary.main,
							borderRadius: '12px',
							display: 'flex',
							padding: '10px',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<MenuIcon
							sx={{
								color: 'white',
							}}
						/>
					</Box>
				</Box>

				<Drawer anchor="right" open={isOpenSmallScreenMenu} onClose={toggleDrawer(false)}>
					<ContentWrapper>
						<NavigationBarSmallScreen>
							{ListTitleHeader.map((item, idx) => (
								<NavigationItemSmallScreen key={idx}>
									<NavLinkSmallScreen href="#">
										<Typography variant="subtitle2">
											{item.titleHeader}
										</Typography>
									</NavLinkSmallScreen>
								</NavigationItemSmallScreen>
							))}
						</NavigationBarSmallScreen>
					</ContentWrapper>
				</Drawer>
			</Fragment>
		);
	};

	const RenderMenuHeaderBigScreen = () => {
		return (
			<>
				<NavigationBarBigScreen>
					<NavigationItemBigScreen>
						<NavLinkBigScreen className="navLink" href="#" target="_self">
							<Typography variant="body1">Marketplace</Typography>
						</NavLinkBigScreen>
						<DropdownMenu className="dropdownMenu">
							<Stack>
								{listCategory.length !== 0 &&
									listCategory.map(
										(category: CollectionCategory, index: number) => (
											// <Tooltip
											// 	title="Coming soon"
											// 	placement="right"
											// 	key={index}
											// 	arrow
											// >
											<DropdownMenuLink
												key={index}
												onClick={() => {
													navigate('/');

													setTimeout(() => {
														document
															?.querySelector(
																`#${renderCategory(category.key)}`
															)
															?.scrollIntoView({
																behavior: 'auto',
															});

														setTimeout(() => {
															document
																?.querySelector(
																	`#${renderCategory(
																		category.key
																	)}`
																)
																?.scrollIntoView({
																	behavior: 'auto',
																});
														}, 500);
													}, 200);
												}}
											>
												<Typography
													variant="body2"
													sx={{ padding: '0 10px' }}
													textAlign="center"
													noWrap
												>
													{renderCategory(category.key)}
												</Typography>
											</DropdownMenuLink>

											// </Tooltip>
										)
									)}
							</Stack>
						</DropdownMenu>
					</NavigationItemBigScreen>
					{ListTitleHeader.map((item, idx) => (
						<NavigationItemBigScreen key={idx}>
							<NavLinkBigScreen
								className="navLink"
								href={item.href}
								target={item.target}
							>
								<Typography variant="body1">{item.titleHeader}</Typography>
							</NavLinkBigScreen>

							<DropdownMenu className="dropdownMenu">
								<Stack>
									{item.listItemSubMenu.length !== 0 &&
										item.listItemSubMenu.map((menu: any, index: number) => (
											<Tooltip
												title="Coming soon"
												placement="right"
												key={index}
												arrow
											>
												<DropdownMenuLink href={`${menu.href}`}>
													<Typography
														variant="body2"
														sx={{ padding: '0 10px' }}
														textAlign="center"
														noWrap
													>
														{menu.title}
													</Typography>
												</DropdownMenuLink>
											</Tooltip>
										))}
								</Stack>
							</DropdownMenu>
						</NavigationItemBigScreen>
					))}
				</NavigationBarBigScreen>
			</>
		);
	};

	return (
		<NavBar ref={ref}>
			<Stack direction="row" alignItems="center" sx={{ position: 'relative', mx: 1 }}>
				{/* <Box className="menuSmallScreen">{RenderMenuHeaderSmallScreen()}</Box> */}
				<Box className="menuBigScreen" sx={{ flexGrow: 1 }}>
					{RenderMenuHeaderBigScreen()}
				</Box>

				<Box sx={{ height: '100%', width: '1px', opacity: 0 }}>text</Box>
				<GlobalSearch />
			</Stack>
		</NavBar>
	);
};

export default React.memo(MainNavBar);
