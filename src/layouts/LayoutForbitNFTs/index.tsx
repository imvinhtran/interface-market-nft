/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import detectEthereumProvider from '@metamask/detect-provider';
import { Web3Provider } from '@ethersproject/providers/src.ts/web3-provider';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
//styled
import { MainStyle, RootStyle } from './styled';
//mui
import { Container, Typography, useTheme, Box } from '@mui/material';
//components
import Modal from 'components/CustomUI/Modal';
import Header from 'components/Layouts/Header';
import Footer from 'components/Layouts/Footer';
import LoadingPage from 'components/CustomUI/LoadingPage';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { setChainId, setCurrentProvider } from 'redux/slices/web3InfoSlice';
import { selectLoadingPage } from 'redux/slices/loadingSlice';
//utils
import { isSupportChainId } from 'utils/function';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import { toast } from 'react-toastify';

declare let window: any;

function LayoutForbitNFTs() {
	const theme = useTheme();
	const ethereum: any = window.ethereum;
	const dispatch = useDispatch();
	const context = useWeb3React<Web3Provider>();
	let { chainId } = context;

	const isLoading = useSelector(selectLoadingPage);

	//state
	let [modalError, setModalError] = useState(false);

	useEffect(() => {
		const loadWeb3 = async () => {
			const provider = await detectEthereumProvider({ timeout: 1000 });
			if (provider === window.ethereum) {
				if (window.ethereum && window.ethereum.isMetaMask) {
					dispatch(setCurrentProvider(new Web3(window.ethereum)));
				} else if (window.web3)
					dispatch(setCurrentProvider(new Web3(window.web3.currentProvider)));
			} else {
				dispatch(setChainId(4));
			}
		};
		loadWeb3();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (modalError) document.body.classList.add('stop-scroll');
		else document.body.classList.remove('stop-scroll');
	}, [modalError]);

	useEffect(() => {
		if (chainId) {
			checkSupportedNetWork(chainId);
		}
	}, [chainId]);

	const checkSupportedNetWork = (chainId: number | undefined) => {
		if (chainId) {
			if (isSupportChainId(chainId)) {
				setModalError(false);
			} else {
				setModalError(true);
			}
		}
	};

	const changeNetwork = async () => {
		if (typeof window.ethereum !== 'undefined') {
			try {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: Web3.utils.toHex(4) }],
				});
				dispatch(setChainId(4));
				toast.success('Switch network successfully');
			} catch (error: any) {
				toast.error('Switch network failed!');
			}
		}
	};

	return (
		<RootStyle>
			<Header />
			{isLoading && <LoadingPage />}
			<Box sx={{ pt: { xs: '70px', sm: '100px' } }}>
				<MainStyle
					sx={{
						transition: theme.transitions.create('margin', {
							duration: theme.transitions.duration.complex,
						}),
					}}
				>
					<Outlet />
				</MainStyle>
			</Box>

			{modalError && (
				<Modal
					onOpen={modalError}
					mainHeader="Wrong network"
					allowClose={false}
					style={{ width: 500 }}
				>
					<Typography sx={{ textAlign: 'center', p: '2rem', pt: '1rem' }}>
						Wrong network! Currently, we only support Rinkeby testnet, please switch to
						the right one.
					</Typography>
					<Box
						sx={{
							width: '100%',
							display: 'flex',
							alignItem: 'center',
							justifyContent: 'center',
							pb: '1rem',
						}}
					>
						<Box sx={{ width: '50%' }}>
							<ButtonGradient onClick={changeNetwork}>
								Switch to Rinkeby
							</ButtonGradient>
						</Box>
					</Box>
				</Modal>
			)}
			<Container maxWidth="xl" sx={{ position: 'relative' }}>
				<Footer />
			</Container>
		</RootStyle>
	);
}

export default LayoutForbitNFTs;
