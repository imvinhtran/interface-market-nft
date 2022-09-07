import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TwitterShareButton } from 'react-share';
// mui
import { Button, Tooltip, useTheme } from '@mui/material';
// styled
import { ButtonGroupStyle } from './styled';
// icons
import IconShareWhite from 'assets/icons/share-white.webp';
import IconFlagWhite from 'assets/icons/flag-white.webp';
import IconEditWhite from 'assets/icons/edit-white.webp';

import IconShareBlack from 'assets/icons/share-black.webp';
import IconFlagBlack from 'assets/icons/flag-black.webp';
import IconEditBlack from 'assets/icons/edit-black.webp';
// redux
import { useSelector } from 'react-redux';
import { selectAddress } from 'redux/slices/web3InfoSlice';
import { selectNftItem } from 'redux/slices/nftItemByItemIdSlice';
// models
import { NFT } from 'models';
// components
import ButtonFreeze from '../ExecuteButton/ButtonFreeze';

export interface IButtonGroupOptionsProps {
	itemId: string;
	itemName: string;
	refetchApi: Function;
}

export default function ButtonGroupOptions({
	itemId,
	itemName,
	refetchApi,
}: IButtonGroupOptionsProps) {
	const theme = useTheme();
	const navigate = useNavigate();
	const isLightTheme = theme.palette.mode === 'light';

	// useSelector
	const userAddress = useSelector(selectAddress);
	const item: NFT | null = useSelector(selectNftItem);

	const isQualifiedToEdit = () => {
		if (
			item &&
			userAddress &&
			userAddress === item.owner &&
			item.owner === item.creator &&
			!item.isFreeze
		) {
			return true;
		}
		return false;
	};

	return (
		<ButtonGroupStyle variant="outlined" aria-label="outlined button group">
			<TwitterShareButton
				url={`https://nftspacex.io/#/detail/${itemId}`}
				// url="https://nftspacex.io/#/detail/6273b63badcba59d78a9bc75"
				title={`Look what I found! ${itemName} collectible`}
				hashtags={['Music', 'Game']}
				via="NFTSpaceX"
				style={{
					border: '1px solid',
					padding: '8px',
					borderTopLeftRadius: '10px',
					borderBottomLeftRadius: '10PX',
				}}
			>
				<Tooltip title="Share" arrow placement="top">
					{isLightTheme ? (
						<img src={IconShareBlack} alt="share icon" width={20} height={20} />
					) : (
						<img src={IconShareWhite} alt="share icon" width={20} height={20} />
					)}
				</Tooltip>
			</TwitterShareButton>

			<Button>
				<Tooltip title="Report" arrow placement="top">
					{isLightTheme ? (
						<img src={IconFlagBlack} alt="flag icon" width={20} height={20} />
					) : (
						<img src={IconFlagWhite} alt="flag icon" width={20} height={20} />
					)}
				</Tooltip>
			</Button>

			<ButtonFreeze refetchApi={refetchApi} />

			{isQualifiedToEdit() && (
				<Button
					onClick={() => {
						navigate(`/edit-item/itemId/${item!.itemId}`);
					}}
				>
					<Tooltip title="Edit item" arrow placement="top">
						{isLightTheme ? (
							<img src={IconEditBlack} alt="edit icon" width={18} height={18} />
						) : (
							<img src={IconEditWhite} alt="edit icon" width={18} height={18} />
						)}
					</Tooltip>
				</Button>
			)}
		</ButtonGroupStyle>
	);
}
