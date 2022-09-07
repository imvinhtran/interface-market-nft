/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
//components
import InfoAccountUser from 'components/pages/InfoAccount/InfoAccountUser';
import TabInfoAccount from 'components/pages/InfoAccount/TabInfoAccount';
import LazyImage from 'components/CustomUI/LazyImages/LazyImage';
// mui
import { Container } from '@mui/material';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
// slices
import { selectOtherUserInfo } from 'redux/slices/userSlice';
import { selectChainId } from 'redux/slices/web3InfoSlice';
//actions
import { getOtherUserInfo } from 'redux/actions/userAction';
import { fetchListPaymentTokenByChainId } from 'redux/actions/tokenPaymentAction';
// styled
import { UserBackground } from './styled';
// model
import { OptionSelectCustom, User } from 'models';
// enum
import { FilterOfferOption } from 'enum';
import { fetchUserHistory } from 'redux/actions/tradingAction';
import LazyImageCustom from 'components/CustomUI/LazyImages/LazyImageCustom';

const filterOptions: OptionSelectCustom[] = [
	{
		name: 'Offer received',
		value: FilterOfferOption.OfferReceived,
	},
	{
		name: 'Offer made',
		value: FilterOfferOption.OfferMade,
	},
];

function OtherInfoAccount() {
	const dispatch = useDispatch();
	const { infoAccountAddress } = useParams();

	// useSelector
	const otherUserInfo: User | null = useSelector(selectOtherUserInfo);
	const chainId = useSelector(selectChainId);

	// useEffect
	// get info of infoAccountAddress
	useEffect(() => {
		if (infoAccountAddress) {
			dispatch(getOtherUserInfo(infoAccountAddress, executeAfterGetOtherUser));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [infoAccountAddress]);

	// fetch list token payment
	useEffect(() => {
		if (chainId) {
			dispatch(fetchListPaymentTokenByChainId(chainId, executeAfterFetchListTokenPayment));
		}
	}, [chainId]);

	// fetch list user activity
	useEffect(() => {
		if (infoAccountAddress) {
			dispatch(fetchUserHistory(infoAccountAddress, executeAfterFetchUserHistory));
		}
	}, [dispatch, infoAccountAddress]);

	// function
	const executeAfterGetOtherUser = (globalStateNewest: RootState) => {
		const { user } = globalStateNewest;
		if (!user.isSuccess) {
			toast.error('Some error occur when getting other user info! ' + user.errorMessage);
		}
	};

	const executeAfterFetchListTokenPayment = (globalStateNewest: RootState) => {
		const { tokenPayment } = globalStateNewest;
		if (!tokenPayment.isSuccess) {
			toast.error('Can not fetch list token payment!');
		}
	};

	const executeAfterFetchUserHistory = (globalStateNewest: RootState) => {
		const { tradeHistory } = globalStateNewest;
		if (!tradeHistory.isSuccess) {
			toast.error('Can not fetch user history!' + tradeHistory.errorMessage);
		}
	};

	return (
		<>
			<Container maxWidth="xl" sx={{ pt: '5px' }}>
				<UserBackground>
					{otherUserInfo && (
						<LazyImageCustom
							src={otherUserInfo.background}
							alt="user background"
							wrapperPosition="relative"
							type="skeleton"
							style={{ objectFit: 'cover', width: '100%', height: '100%' }}
						/>
					)}
				</UserBackground>

				<InfoAccountUser
					infoUser={otherUserInfo}
					modal={false}
					setModal={() => {}}
					isLoadingEditProfile={false}
					onSubmitEditProfile={() => {}}
				/>

				<TabInfoAccount
					// props for OffersTab
					currentFilterOfferOption={{ name: '', value: '' }}
					setCurrentFilterFilterOfferOption={() => {}}
					listFilterOfferOption={filterOptions}
				/>
			</Container>
		</>
	);
}

export default OtherInfoAccount;
