/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import { useWeb3React } from '@web3-react/core';
//redux
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserLogin } from 'redux/slices/web3InfoSlice';
import { logoutUser } from 'redux/actions/userAction';
import { selectAddress, selectBalance, selectChainId } from 'redux/slices/web3InfoSlice';
import { selectUser } from 'redux/slices/userSlice';
// styled
import { AccountContent, CloseButton, DrawerContent, GradIcon, LinkItem, ListLink } from './styled';
//mui
import { Avatar, Box, CircularProgress, Drawer, Stack, Typography, useTheme } from '@mui/material';
import DividerGradient from 'components/CustomUI/DividerGradient';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
//image
import IconCollectionWhite from 'assets/icons/collection-white.webp';
import IconCollectionBlack from 'assets/icons/collection-black.webp';
import IconCollectionBlue from 'assets/icons/collection-blue.webp';
import IconUserWhite from 'assets/icons/user-white.webp';
import IconUserBlack from 'assets/icons/user-black.webp';
import IconUserBlue from 'assets/icons/user-blue.webp';
import FBSToken from 'assets/images/home/logo-fbs.webp';
//model
import { User } from 'models';
//utils
import {
	erc20function,
	formatNumber,
	generateGrad,
	getInfoNetWorkByChainId,
	localStorageCustom,
	renderImage,
} from 'utils';
//constants
import { CONTRACT, NULL_ADDRESS } from '../../../constants';

const PersonalAccount: React.FC = () => {
	const theme = useTheme();
	const context = useWeb3React<Web3Provider>();
	const { deactivate } = context;
	let dispatch = useDispatch();
	const navigate = useNavigate();
	const isLightTheme = theme.palette.mode === 'light';

	//redux state
	const chainId = useSelector(selectChainId);
	const balance = useSelector(selectBalance);
	const address = useSelector(selectAddress);
	const userInfo: User | null = useSelector(selectUser);

	//state
	const [openDrawer, setOpenDrawer] = useState(false);
	const [platformBalance, setPlatformBalance] = useState<any>('0');
	const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false);

	// useEffect
	useEffect(() => {
		if (!chainId || !address) return;
		(async () => {
			const balanceWei = await erc20function().getBalanceOfUser(
				address,
				CONTRACT[chainId].EXCHANGE_TOKEN
			);
			const balanceToken = await erc20function().changeWeiToToken(
				CONTRACT[chainId].EXCHANGE_TOKEN,
				balanceWei
			);

			setPlatformBalance(formatNumber(balanceToken, 0, 3));
		})();
	}, [address, chainId]);

	// function
	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		setOpenDrawer(open);
	};

	const handleLogout = () => {
		setIsLoadingLogout(true);
		dispatch(logoutUser(address!, executeAfterLogoutUser));
	};

	const executeAfterLogoutUser = (globalStateNewest: RootState) => {
		const { user } = globalStateNewest;
		if (!user.isSuccess) {
			toast.error('Logout failed! ' + user.errorMessage);
		} else {
			dispatch(removeUserLogin());
			deactivate();
			if (address) localStorageCustom.removeAuthSignature(address);
			toast.success('You have been logged out successfully!');
			navigate('/');
		}
		setIsLoadingLogout(false);
	};

	const handleChangePage = (page: string) => {
		navigate(page);
		setOpenDrawer(false);
	};

	const userAvatar = useMemo(() => {
		return (
			<GradIcon
				sx={{
					background: `${generateGrad(address ? address : NULL_ADDRESS)}`,
				}}
			/>
		);
	}, [address]);

	return (
		<Fragment>
			{userInfo ? (
				<AccountContent>
					<Box
						sx={{
							borderRadius: '50%',
							cursor: 'pointer',
						}}
						onClick={toggleDrawer(true)}
					>
						{userInfo.avatar ? (
							userInfo.avatar ===
							'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' ? (
								// <Avatar
								// 	src="/astronaut.webp"
								// alt="astronaut"
								// 	sx={{ width: '30px', height: '30px' }}
								// />
								<Box sx={{ width: '30px', height: '30px' }}>{userAvatar}</Box>
							) : (
								<Avatar
									src={userInfo.avatar}
									sx={{ width: '30px', height: '30px' }}
									alt="user avatar"
								/>
							)
						) : (
							<Box sx={{ width: '30px', height: '30px' }}>{userAvatar}</Box>
						)}
					</Box>

					<Drawer
						anchor="right"
						open={openDrawer}
						onClose={toggleDrawer(false)}
						PaperProps={{
							sx: {
								height: 'max-content',
								margin: '1rem',
								background: 'none',
							},
						}}
					>
						<DrawerContent>
							<CloseButton onClick={toggleDrawer(false)}>
								<CloseIcon />
							</CloseButton>

							<Box sx={{ height: '100%', position: 'relative' }}>
								<Stack spacing={3}>
									<Stack spacing={1} direction="row" alignItems="center">
										{userInfo.avatar ? (
											userInfo.avatar ===
											'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' ? (
												// <Avatar
												// 	src="/astronaut.webp"
												// alt = "astronaut"
												// 	sx={{ width: '50px', height: '50px' }}
												// />
												<Box sx={{ width: '50px', height: '50px' }}>
													{userAvatar}
												</Box>
											) : (
												<Avatar
													src={userInfo.avatar}
													sx={{ width: '50px', height: '50px' }}
													alt="user avatar"
												/>
											)
										) : (
											<Box sx={{ width: '50px', height: '50px' }}>
												{userAvatar}
											</Box>
										)}
										<Box>
											<Typography variant="h6">
												{address?.substring(0, 10)} ...{' '}
												{address?.substring(37, address.length + 1)}{' '}
											</Typography>
											{/* <Typography variant="body2">My Profile</Typography> */}
										</Box>
									</Stack>

									<DividerGradient />

									<Stack sx={{ width: '100%' }} spacing={1}>
										<Typography sx={{ fontWeight: 500, pb: 1 }}>
											Balance
										</Typography>
										{/* Native coin */}
										<Stack
											direction="row"
											alignItems="center"
											justifyContent="space-between"
										>
											<Stack direction="row" alignItems="center" spacing={1}>
												<img
													src={getInfoNetWorkByChainId(chainId)?.image}
													alt={getInfoNetWorkByChainId(chainId)?.symbol}
													width={22}
													height={22}
												/>
												<Typography>
													{getInfoNetWorkByChainId(chainId)?.symbol}
												</Typography>
											</Stack>

											<Typography>
												{balance.toString().substring(0, 5)}

												{getInfoNetWorkByChainId(chainId)?.symbol}
											</Typography>
										</Stack>

										{/* Platform */}
										<Stack
											direction="row"
											alignItems="center"
											justifyContent="space-between"
										>
											<Stack direction="row" alignItems="center" spacing={1}>
												<img
													src={FBSToken}
													alt="fbs icon"
													width={22}
													height={22}
												/>
												<Typography>FBS</Typography>
											</Stack>

											<Typography>
												{formatNumber(String(platformBalance), 0, 3)} FBS
											</Typography>
										</Stack>
									</Stack>

									<DividerGradient />
									<Stack sx={{ width: '100%' }} spacing={1}>
										<Typography sx={{ fontWeight: 500, pb: 1 }}>
											Assets
										</Typography>
										{/* Native coin */}
										<Stack
											direction="row"
											alignItems="center"
											justifyContent="space-between"
										>
											<Stack direction="row" alignItems="center" spacing={1}>
												<Typography>
													Total items: {userInfo.totalItems}
												</Typography>
											</Stack>

											<Box>
												<ButtonGradient
													onClick={() => {
														setOpenDrawer(false);
														navigate('/info-account/add-item');
													}}
												>
													<AddIcon></AddIcon>
												</ButtonGradient>
											</Box>
										</Stack>
									</Stack>

									<DividerGradient />

									<ListLink spacing={2}>
										<LinkItem
											onClick={() => handleChangePage(`/my-info-account`)}
										>
											<Box className="non-hovered">
												{isLightTheme ? (
													<img
														src={IconUserBlack}
														alt="icon user"
														width={18}
														height={18}
													/>
												) : (
													<img
														src={IconUserWhite}
														alt="icon user"
														width={18}
														height={18}
													/>
												)}
											</Box>

											<Box className="hovered">
												<img
													src={IconUserBlue}
													alt="user icon"
													width={18}
													height={18}
												/>
											</Box>

											<Typography variant="body1">My Profile</Typography>
										</LinkItem>

										<LinkItem
											onClick={() => handleChangePage('/my-collection')}
										>
											<Box className="non-hovered">
												{isLightTheme ? (
													<img
														src={IconCollectionBlack}
														alt="collection icon"
														width={18}
														height={18}
													/>
												) : (
													<img
														src={IconCollectionWhite}
														alt="collection icon"
														width={18}
														height={18}
													/>
												)}
											</Box>

											<Box className="hovered">
												<img
													src={IconCollectionBlue}
													alt="collection icon"
													width={18}
													height={18}
												/>
											</Box>

											<Typography variant="body1">
												Collectible Asset
											</Typography>
										</LinkItem>
									</ListLink>
								</Stack>

								<Box sx={{ pt: 3 }}>
									<ButtonGradient
										onClick={handleLogout}
										disabled={isLoadingLogout}
									>
										{isLoadingLogout && (
											<CircularProgress sx={{ color: 'white' }} size={16} />
										)}
										<Typography variant="body1" sx={{ ml: 2 }} component="span">
											Logout
										</Typography>
									</ButtonGradient>
								</Box>
							</Box>
						</DrawerContent>
					</Drawer>
				</AccountContent>
			) : null}
		</Fragment>
	);
};

export default React.memo(PersonalAccount);
