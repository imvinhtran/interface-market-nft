/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
// ultis
import { renderImage, sliceAddress } from 'utils/function';
// model
import { User } from 'models';
// styled
import {
	AvatarWrapper,
	GradIcon,
	InfoAccountUserWrapper,
	InfoStack,
	MoreOptions,
	UserAddress,
	UserBio,
	UserInfo,
	Username,
} from './styled';
// components
import CopyToClipboard from 'react-copy-to-clipboard';
import FormEditProfile, { IFormEditProfileInputs } from 'components/Form/FormEditProfile';
import Modal from 'components/CustomUI/Modal';
import CopyToClipboardButton from 'components/CustomUI/CopyToClipboardButton';
// mui
import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ShareIcon from '@mui/icons-material/Share';
// models
import { SubmitHandler } from 'react-hook-form';
import { useLocation, useParams } from 'react-router-dom';
import { generateGrad } from 'utils';
import { useSelector } from 'react-redux';
import { selectAddress } from 'redux/slices/web3InfoSlice';
import { NULL_ADDRESS } from '../../../../constants';

export type InfoAccountUserProps = {
	infoUser: User | null;
	modal: boolean;
	setModal: Function;

	isLoadingEditProfile: boolean;
	onSubmitEditProfile: SubmitHandler<IFormEditProfileInputs>;
};

function InfoAccountUser({
	infoUser,
	modal,
	setModal,
	isLoadingEditProfile,
	onSubmitEditProfile,
}: InfoAccountUserProps) {
	const { pathname } = useLocation();
	const isMineInfoAccountPage = pathname.includes('my');
	const { infoAccountAddress } = useParams();
	const userAddress = useSelector(selectAddress);

	useEffect(() => {
		if (modal) document.body.classList.add('stop-scroll');
		else document.body.classList.remove('stop-scroll');
	}, [modal]);

	// functions
	const userAvatar = useMemo(() => {
		if (isMineInfoAccountPage) {
			return (
				<GradIcon
					sx={{
						background: `${generateGrad(userAddress ? userAddress : NULL_ADDRESS)}`,
					}}
				/>
			);
		} else {
			return (
				<GradIcon
					sx={{
						background: `${generateGrad(
							infoAccountAddress ? infoAccountAddress : NULL_ADDRESS
						)}`,
					}}
				/>
			);
		}
	}, [userAddress, infoAccountAddress, isMineInfoAccountPage]);

	return (
		<InfoAccountUserWrapper>
			<InfoStack
				sx={{ flexDirection: { md: 'row' } }}
				alignItems="center"
				justifyContent="center"
			>
				<AvatarWrapper>
					{/* <Avatar
						sx={{ width: '120px', height: '120px', background: '#0768ff' }}
						src={renderImage(infoUser ? infoUser.avatar : '', '/default_img.png')}
					/> */}
					{infoUser?.avatar ? (
						infoUser?.avatar ===
						'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' ? (
							<Box sx={{ width: '120px', height: '120px' }}>{userAvatar}</Box>
						) : (
							<Avatar
								src={infoUser?.avatar}
								sx={{ width: '120px', height: '120px' }}
								alt="user avatar"
							/>
						)
					) : (
						<Box sx={{ width: '120px', height: '120px' }}>{userAvatar}</Box>
					)}
				</AvatarWrapper>
				<UserInfo>
					<Username variant="h4">{infoUser?.username}</Username>
					{infoUser && (
						<Box sx={{ mt: 0 }}>
							<Stack direction="row" alignItems="center">
								<Typography variant="body1" sx={{ marginRight: '5px' }}>
									{sliceAddress(infoUser.userAddress, 8, 5)}
								</Typography>
								<CopyToClipboardButton
									text={infoUser.userAddress}
									placementTooltip="right"
								/>
							</Stack>
						</Box>
					)}

					<Typography variant="body1" sx={{ mt: 3 }}>
						Total Collectible: {infoUser?.totalItems}
					</Typography>
				</UserInfo>

				<MoreOptions>
					<Stack direction="row">
						<ShareIcon />

						{isMineInfoAccountPage && (
							<AppRegistrationIcon
								sx={{ ml: 2, cursor: 'pointer' }}
								onClick={() => {
									setModal(true);
								}}
							/>
						)}

						<Modal
							onOpen={modal}
							mainHeader={'Edit Profile'}
							onClose={() => setModal(false)}
							style={{
								maxWidth: '500px',
								minWidth: '300px',
								pb: 2,
								overflowY: 'auto',
							}}
						>
							<FormEditProfile
								infoUser={infoUser}
								isLoadingEditProfile={isLoadingEditProfile}
								onSubmit={onSubmitEditProfile}
							/>
						</Modal>
					</Stack>
				</MoreOptions>
			</InfoStack>
		</InfoAccountUserWrapper>
	);
}

export default InfoAccountUser;
