import React, { useEffect, useState } from 'react';
import { PlatFormCoin } from './styled';
import { Typography } from '@mui/material';
//redux
import { useSelector } from 'react-redux';
import { selectAddress, selectChainId } from 'redux/slices/web3InfoSlice';
//utils
import { erc20function, formatNumber } from 'utils';
//images
import FBSToken from 'assets/images/home/logo-fbs.webp';
//constants
import { CONTRACT } from '../../../constants';

const PlatformToken: React.FC = () => {
	//state
	let [platformBalance, setPlatformBalance] = useState<any>('0');

	//selector
	const address = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);

	//Get balance and platform token of user from Wallet
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

	return (
		<PlatFormCoin direction="row" justifyContent="center" alignItems="center" spacing={1}>
			<img src={FBSToken} alt="flat form token" width={20} />
			<Typography variant="body2">
				{platformBalance} <span style={{ fontWeight: 'bold' }}>FBS</span>
			</Typography>
		</PlatFormCoin>
	);
};

export default React.memo(PlatformToken);
