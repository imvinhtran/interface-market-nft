/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
// redux
import { useSelector } from 'react-redux';
import { selectLoading, selectNftItem } from 'redux/slices/nftItemByItemIdSlice';
import { selectChainId, selectAddress } from 'redux/slices/web3InfoSlice';
// mui
import { Box, Skeleton, Stack, Typography } from '@mui/material';
// models
import { NFT } from 'models';
// styled
import {
	AddressStyled,
	ImageBlockchain,
	ItemDescription,
	MoreInfoItem,
	MoreInfoList,
} from './styled';
// components
import DividerGradient from 'components/CustomUI/DividerGradient';
import CopyToClipboardButton from 'components/CustomUI/CopyToClipboardButton';
// utils
import { sliceAddress } from 'utils';
import { ETHERSCAN } from 'constants/etherscan.constant';
import { NETWORKINFO } from '../../../../../constants';

export interface IDescriptionTabProps {}

export default function DescriptionTab(props: IDescriptionTabProps) {
	// useSelector
	const item: NFT | null = useSelector(selectNftItem);
	const isLoadingItem = useSelector(selectLoading);
	const userAddress = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);

	return (
		<Box>
			{/* <Typography variant="body1" component="span">
				Description:
			</Typography> */}

			<ItemDescription sx={{ mt: 1 }}>
				{isLoadingItem ? (
					<Skeleton width="100%" height={40} />
				) : (
					<>
						<Typography variant="body1" component="span">
							Description:{' '}
						</Typography>
						<Typography variant="body1" component="span" sx={{ opacity: 0.6 }}>
							{item?.description}
						</Typography>
					</>
				)}
			</ItemDescription>

			<DividerGradient sx={{ mt: 2 }} />

			<MoreInfoList sx={{ mt: 2 }}>
				<MoreInfoItem>
					<Typography variant="body1">Item creator:</Typography>

					{item ? (
						<Stack direction="row" alignItems="center">
							<AddressStyled
								variant="body1"
								href={`${ETHERSCAN[chainId].url}address/${item.creator}`}
								underline="none"
								sx={{ mr: 1 }}
							>
								{sliceAddress(item.creator, 8, 5)}
							</AddressStyled>

							<CopyToClipboardButton text={item.creator} placementTooltip="top" />
						</Stack>
					) : (
						<Typography variant="body1" sx={{ mr: 1 }}>
							----
						</Typography>
					)}
				</MoreInfoItem>

				<MoreInfoItem>
					<Typography variant="body1">Item token ID:</Typography>
					{item ? (
						<Stack direction="row" alignItems="center">
							<Typography variant="body1" sx={{ mr: 1 }}>
								{item.itemTokenId.length > 15
									? sliceAddress(item.itemTokenId, 8, 5)
									: item.itemTokenId}
							</Typography>

							<CopyToClipboardButton text={item.itemTokenId} placementTooltip="top" />
						</Stack>
					) : (
						<Typography variant="body1" sx={{ mr: 1 }}>
							----
						</Typography>
					)}
				</MoreInfoItem>

				<MoreInfoItem>
					<Typography variant="body1">Collection address:</Typography>

					{item ? (
						<Stack direction="row" alignItems="center">
							<AddressStyled
								variant="body1"
								href={
									item
										? `${ETHERSCAN[chainId].url}address/${item.collection?.collectionAddress}`
										: '#'
								}
								underline="none"
								target="_blank"
								sx={{ mr: 1 }}
							>
								{sliceAddress(item.collection?.collectionAddress, 8, 5)}
							</AddressStyled>

							<CopyToClipboardButton
								text={item.collection?.collectionAddress}
								placementTooltip="top"
							/>
						</Stack>
					) : (
						<Typography variant="body1" sx={{ mr: 1 }}>
							----
						</Typography>
					)}
				</MoreInfoItem>

				<MoreInfoItem>
					<Typography variant="body1">Standard:</Typography>

					{item ? (
						<Stack direction="row" alignItems="center">
							<Typography variant="body1" sx={{ ml: 1 }}>
								{item.standard}
							</Typography>
						</Stack>
					) : (
						<Typography variant="body1" sx={{ mr: 1 }}>
							----
						</Typography>
					)}
				</MoreInfoItem>
				<MoreInfoItem>
					<Typography variant="body1">Blockchain:</Typography>

					{item ? (
						<Stack direction="row" alignItems="center">
							<ImageBlockchain>
								<img src={NETWORKINFO[item.chainId].image} alt="icon blockchain" />
							</ImageBlockchain>

							<Typography variant="body1" sx={{ ml: 1 }}>
								{NETWORKINFO[item.chainId].name}
							</Typography>
						</Stack>
					) : (
						<Typography variant="body1" sx={{ mr: 1 }}>
							----
						</Typography>
					)}
				</MoreInfoItem>
			</MoreInfoList>
		</Box>
	);
}
