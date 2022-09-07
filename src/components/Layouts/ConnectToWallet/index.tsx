/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, Fragment } from 'react';
// connect wallet
import { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import { formatEther } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect, useInactiveListener } from 'hooks/useConnector';
// redux
import { useDispatch, useSelector } from 'react-redux';
// slices
import { selectConnectModal, setConnectModal } from 'redux/slices/modalSlice';
import {
	setBalanceUser,
	setChainId,
	setUserLogin,
	selectAddress,
	selectBalance,
	selectChainId,
} from 'redux/slices/web3InfoSlice';
import { selectLoading, selectUser } from 'redux/slices/userSlice';
//constants
import { connectorsByName, listWallet } from '../../../constants';
// components
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import Modal from 'components/CustomUI/Modal';
// mui
import { Box, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// util
import { getInfoNetWorkByChainId } from 'utils';
// styled
import {
	Initializing,
	TryAgainBtn,
	ConnectWalletContainer,
	EthIconStyle,
	BalanceTxt,
	ConfirmBox,
	WalletList,
	WalletItem,
	WalletName,
	WalletImage,
	Learnmore,
	ConnectingBox,
	CurrentWallet,
	ContentWalletConnect,
} from './styled';
//model
import { User } from 'models';

export interface WalletProps {
	name: string;
	image: string;
}

declare let window: any;

const ConnectToWallet = () => {
	const context = useWeb3React<Web3Provider>();
	let { connector, account, chainId, library, activate, error } = context;
	let dispatch = useDispatch();

	//state
	const [activatingConnector, setActivatingConnector] = useState<any>();
	const [modalInfoAddress, setModalInfoAddress] = useState(false);
	const [isOpenTooltipCopy, setIsOpenTooltipCopy] = useState(false);
	const [checked, setChecked] = useState<boolean>(true);
	const [confirm, setConfirm] = useState<boolean>(false);
	const [activating, setActivating] = useState(false);
	const [errorConnect, setErrorConnect] = useState<any>();
	const [wallet, setWallet] = useState<WalletProps>({
		name: 'Metamask',
		image: '/metamask.png',
	});

	// selector
	const addressUser = useSelector(selectAddress);
	const balanceUser = useSelector(selectBalance);
	const chainIdState = useSelector(selectChainId);
	const onOpenConnectModal = useSelector(selectConnectModal);
	const userInfo: User | null = useSelector(selectUser);
	const isLoadingLogin = useSelector(selectLoading);

	// Connect wallet function
	const handleConnectWallet = async (name: string, image: string, connector: any) => {
		setWallet({
			name,
			image,
		});
		try {
			if (account) {
				dispatch(setUserLogin(account));
				dispatch(setConnectModal(false));
				setActivating(false);
			} else {
				setActivating(true);
				await activate(connector);
			}
		} catch (error) {
			setErrorConnect(undefined);
			console.log(error);
		}
	};

	const handleConnectAgain = async () => {
		setErrorConnect(undefined);
		const currentWallet = listWallet.find((w) => w.name === wallet.name);
		if (currentWallet)
			await handleConnectWallet(
				currentWallet?.name,
				currentWallet?.image,
				currentWallet?.connector
			);
	};

	//UseEffect
	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined);
		}
	}, [activatingConnector, connector]);

	//Check account address and chainId
	useEffect(() => {
		if (account) {
			dispatch(setConnectModal(false));
		}
		setActivating(false);
		dispatch(setUserLogin(account ? account.toLowerCase() : account));
		// dispatch(setChainId(chainId ? chainId : 4));
		dispatch(setChainId(4));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account, chainId, dispatch]);

	//Check balance of account
	useEffect(() => {
		if (account && library) {
			library.getBalance(account).then((balance: any) => {
				dispatch(setBalanceUser(formatEther(balance.toString())));
			});
		}
	}, [account, dispatch, library, chainId]);

	//Handle modal scroll
	useEffect(() => {
		if (onOpenConnectModal) document.body.classList.add('stop-scroll');
		else document.body.classList.remove('stop-scroll');
	}, [onOpenConnectModal]);

	useEffect(() => {
		if (modalInfoAddress) document.body.classList.add('stop-scroll');
		else document.body.classList.remove('stop-scroll');
	}, [modalInfoAddress]);

	useEffect(() => {
		if (isOpenTooltipCopy) {
			let id = setTimeout(() => {
				setIsOpenTooltipCopy(false);
			}, 500);
			return () => clearTimeout(id);
		}
	}, [isOpenTooltipCopy]);

	// set errorConnect
	useEffect(() => {
		setErrorConnect(error);
	}, [error]);

	// handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
	const triedEager = useEagerConnect();

	// handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
	useInactiveListener(!triedEager || !!activatingConnector);

	// Modal handler

	const onCloseModalConnect = () => {
		dispatch(setConnectModal(false));
		// setModalInfoAddress(false);
		setActivating(false);
		setConfirm(false);
	};

	const onCloseModalInitilizaing = () => {
		dispatch(setConnectModal(false));
		setActivating(false);
		setConfirm(false);
	};

	//Render
	const renderListWallet = () => {
		return listWallet.map((wallet: any, index: number) => {
			const isMetamask = window.ethereum && window.ethereum.isMetaMask;

			// check for mobile options
			// if (isMobile) {
			// 	//disable portis on mobile for now
			// 	if (wallet.name === 'Portis') {
			// 		return null;
			// 	}

			// 	return (
			// 		<WalletItem
			// 			key={index}
			// 			onClick={() =>
			// 				handleConnectWallet(wallet.name, wallet.image, wallet.connector)
			// 			}
			// 		>
			// 			<WalletImage>
			// 				<img src={wallet.image} alt={wallet.name} />
			// 			</WalletImage>

			// 			<WalletName>{wallet.name}</WalletName>
			// 		</WalletItem>
			// 	);
			// }

			if (wallet.connector === connectorsByName.Injected) {
				if (!(window.web3 || window.ethereum)) {
					if (wallet.name === 'Metamask') {
						return (
							<WalletItem key={index}>
								<a
									href="https://metamask.io"
									target="_blank"
									rel="noreferrer noopener"
								>
									<WalletImage>
										<img src={wallet.image} alt={wallet.name} />
									</WalletImage>

									<WalletName>Install {wallet.name}</WalletName>
								</a>
							</WalletItem>
						);
					}
					// don't return metamask if injected provider isn't metamask
					else if (wallet.name === 'Metamask' && !isMetamask) {
						return null;
					}
					// likewise for generic
					else if (wallet.name === 'Injected' && isMetamask) {
						return null;
					}
				}
			}

			if (wallet.connector === connectorsByName.Binance) {
				//don't show injected if there's no injected provider
				if (!window.BinanceChain) {
					if (wallet.name === 'Binance') {
						return (
							<WalletItem key={index}>
								<a
									href="https://www.bnbchain.world/en"
									target="_blank"
									rel="noreferrer noopener"
								>
									<WalletImage>
										<img src={wallet.image} alt={wallet.name} />
									</WalletImage>

									<WalletName>Install {wallet.name}</WalletName>
								</a>
							</WalletItem>
						);
					} else {
						return null; //dont want to return install twice
					}
				}
			}

			// return rest of options
			return (
				<WalletItem
					key={index}
					onClick={() => handleConnectWallet(wallet.name, wallet.image, wallet.connector)}
				>
					<WalletImage>
						<img src={wallet.image} alt={wallet.name} />
					</WalletImage>

					<WalletName>{wallet.name}</WalletName>
				</WalletItem>
			);
		});
	};

	return (
		<Fragment>
			{!addressUser || !userInfo ? (
				<ConnectWalletContainer onClick={() => dispatch(setConnectModal(true))}>
					<ButtonGradient disabled={isLoadingLogin}>
						{isLoadingLogin ? (
							<>
								<CircularProgress sx={{ color: 'white', mr: 1 }} size={16} />
								<Typography variant="body2">Login</Typography>{' '}
							</>
						) : (
							<Typography variant="body2">Connect to wallet</Typography>
						)}
					</ButtonGradient>
				</ConnectWalletContainer>
			) : (
				<ConnectWalletContainer onClick={() => setModalInfoAddress(true)}>
					<Stack
						direction="row"
						justifyContent="center"
						alignItems="center"
						sx={{ padding: '6px 0' }}
					>
						<EthIconStyle
							src={getInfoNetWorkByChainId(chainIdState)?.image}
							alt={getInfoNetWorkByChainId(chainIdState)?.symbol}
						/>

						<BalanceTxt variant="body2">
							{balanceUser && balanceUser.toString().substring(0, 5)}
						</BalanceTxt>
					</Stack>
				</ConnectWalletContainer>
			)}

			<Modal
				leftHeader={'Connect wallet'}
				onOpen={onOpenConnectModal}
				onClose={onCloseModalConnect}
			>
				<ConfirmBox>
					By connecting a wallet, you agree to{' '}
					<span style={{ paddingRight: '5px' }}>NFTSpaceX</span>
					<a
						href="https://forbitswap.com/terms-of-service.pdf"
						target="_blank"
						rel="noreferrer noopener"
					>
						Terms of Service
					</a>{' '}
					and{' '}
					<a
						href="https://forbitswap.com/privacy-policy.pdf"
						target="_blank"
						rel="noreferrer noopener"
					>
						Privacy Policy
					</a>
					<Box>
						<input
							type="checkbox"
							aria-checked="false"
							checked={confirm}
							onChange={() => setConfirm(!confirm)}
						/>{' '}
						I agree to Terms of Service and Privacy policy
					</Box>
				</ConfirmBox>
				<ContentWalletConnect>
					<WalletList
						sx={{
							opacity: confirm ? 1 : 0.5,
							pointerEvents: confirm ? 'auto' : 'none',
							overflow: confirm ? 'auto' : 'hidden',
						}}
					>
						{renderListWallet()}
					</WalletList>
					<Learnmore>
						New to Ethereum?
						<a
							href="https://ethereum.org/en/wallets/"
							target="_blank"
							rel="noreferrer noopener"
						>
							Learn more about wallet
						</a>
					</Learnmore>
				</ContentWalletConnect>
			</Modal>

			<Modal
				leftHeader={'Back'}
				leftHeaderFn={() => setActivating(false)}
				onOpen={activating}
				onClose={onCloseModalInitilizaing}
				style={{ maxWidth: '440px' }}
			>
				<ConfirmBox>
					By connecting a wallet, you agree to <span>NFTSpaceX</span>
					<a
						href="https://forbitswap.com/terms-of-service.pdf"
						target="_blank"
						rel="noreferrer noopener"
					>
						Terms of Service
					</a>{' '}
					and{' '}
					<a
						href="https://forbitswap.com/privacy-policy.pdf"
						target="_blank"
						rel="noreferrer noopener"
					>
						Privacy Policy
					</a>
					<Box>
						<input
							type="checkbox"
							aria-checked="false"
							checked={checked}
							// value={checked}
							onChange={() => setChecked(!checked)}
						/>{' '}
						I agree to Terms of Service and Privacy policy
					</Box>
				</ConfirmBox>
				<ConnectingBox
					sx={{ opacity: checked ? 1 : 0.5, pointerEvents: checked ? 'auto' : 'none' }}
				>
					{errorConnect ? (
						<Initializing>
							Error connecting.
							<TryAgainBtn onClick={handleConnectAgain}>Try again</TryAgainBtn>
						</Initializing>
					) : (
						<Fragment>
							<Initializing>
								<CircularProgress
									size={18}
									style={{ marginRight: '10px', color: 'white' }}
								/>
								Initializing...
							</Initializing>
							<CurrentWallet>
								<img src={wallet.image} alt={wallet.name} />
								<WalletName sx={{ paddingTop: '10px' }}>{wallet.name}</WalletName>
							</CurrentWallet>
						</Fragment>
					)}
				</ConnectingBox>
			</Modal>
		</Fragment>
	);
};

export default React.memo(ConnectToWallet);
