/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment, lazy } from 'react';
// mui
import { Box, Container, Stack, Toolbar, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
//components
import MoreOptionList from 'components/Layouts/MoreOptionList';
// import ConnectToWallet from 'components/Layouts/ConnectToWallet';
import Loadable from 'components/CustomUI/LoadableComponent';
//redux
import { useSelector } from 'react-redux';
import { selectAddress } from 'redux/slices/web3InfoSlice';
import { selectUser } from 'redux/slices/userSlice';
//styled
import {
	AppbarHeader,
	AppearWrapper,
	FixedBottomHeader,
	LogoLink,
	MainNavBarWrapper,
	ModalClose,
	NotiBox,
	PageLogo,
} from './styled';
//models
import { User } from 'models';
//image
import LogoNFTSpaceXWhite from 'assets/images/header/NFTSpaceXLogoWhite.webp';
import LogoNFTSpaceXBlack from 'assets/images/header/NFTSpaceXLogoBlack.webp';
import LogoSpaceX from 'assets/images/home/logoSpaceX.webp';

//Lazy Component
const ConnectToWallet = Loadable(lazy(() => import('../ConnectToWallet')));
const PersonalAccount = Loadable(lazy(() => import('../PersonalAccount')));
const SwitchNetWork = Loadable(lazy(() => import('../SwitchNetwork')));
const PlatformToken = Loadable(lazy(() => import('../PlatformToken')));
const MainNavBar = Loadable(lazy(() => import('../MainNavBar')));

const Header: React.FC = () => {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';

	// useState
	let [open, setOpen] = useState(true);
	let [background, setBackground] = useState(false);

	// useSelector
	const address = useSelector(selectAddress);
	const userInfo: User | null = useSelector(selectUser);

	useEffect(() => {
		// Handler to call on window scroll
		const handleScroll = () => {
			if (window.pageYOffset > 25) {
				setBackground(true);
			} else {
				setBackground(false);
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => window.removeEventListener('scroll', handleScroll);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AppbarHeader position="fixed" color="transparent" elevation={0} background={background}>
			<Container maxWidth="xl" disableGutters>
				<Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
					<PageLogo>
						<LogoLink href="/">
							<img className="logoMobile" src={LogoSpaceX} alt="page logo" />
							{isLightTheme ? (
								<img
									loading="lazy"
									src={LogoNFTSpaceXBlack}
									alt="page logo"
									className="logoPC"
								/>
							) : (
								<img
									loading="lazy"
									src={LogoNFTSpaceXWhite}
									alt="page logo"
									className="logoPC"
								/>
							)}
						</LogoLink>
					</PageLogo>
					<MainNavBarWrapper>
						<MainNavBar />
					</MainNavBarWrapper>

					<Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
						{address && userInfo && (
							<Fragment>
								<AppearWrapper>
									<SwitchNetWork />
								</AppearWrapper>
								<AppearWrapper>
									<PlatformToken />
								</AppearWrapper>
							</Fragment>
						)}

						<ConnectToWallet />

						{address && <PersonalAccount />}

						<MoreOptionList placementDropdown="bottom" />
					</Box>

					{/* Fixed Header */}
					<FixedBottomHeader>
						{address && userInfo && (
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="flex-end"
								spacing={1}
							>
								<PlatformToken />

								<SwitchNetWork />
							</Stack>
						)}
					</FixedBottomHeader>
				</Toolbar>

				{!open && (
					<NotiBox>
						<Typography variant="body2">
							NFTSpaceX is currently in alpha release which is only supported on
							Rinkeby.
						</Typography>

						<ModalClose onClick={() => setOpen(false)}>
							<CloseIcon
								sx={{
									fontSize: '1.5rem',
									cursor: 'pointer',
								}}
							/>
						</ModalClose>
					</NotiBox>
				)}
			</Container>
		</AppbarHeader>
	);
};
export default React.memo(Header);
