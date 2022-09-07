/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useEffect } from 'react';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { setConnectModal } from 'redux/slices/modalSlice';
import { selectAddress } from 'redux/slices/web3InfoSlice';
import Web3 from 'web3';

type AccountGuardProp = {
	children: ReactNode | string;
};

const AccountGuard = ({ children }: AccountGuardProp) => {
	const dispatch = useDispatch();
	const userAddress = useSelector(selectAddress);

	useEffect(() => {
		(async () => {
			const web3 = new Web3(Web3.givenProvider);
			const currentAddress = await web3.eth.getAccounts();

			if (!currentAddress[0]) {
				dispatch(setConnectModal(true));
			}
		})();
	}, [userAddress]);

	if (!userAddress) {
		return <></>;
	}

	return <>{children}</>;
};

export default AccountGuard;
