/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TwitterShareButton } from 'react-share';
// ultis
import { renderImage, sliceAddress } from 'utils/function';
// model
import { Collection } from 'models';
// styled
import {
	InfoCollectionWrapper,
	InfoStack,
	CollectionName,
	CollectionInfo,
	MoreOptions,
	AvatarWrapper,
	InfoAddressList,
	InfoAddressItem,
	InfoAddress,
} from './styled';
// components
import Loadable from 'components/CustomUI/LoadableComponent';
// mui
import { Avatar, Stack, Tooltip, Typography } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ShareIcon from '@mui/icons-material/Share';
//redux
import { useSelector } from 'react-redux';
import { selectAddress } from 'redux/slices/web3InfoSlice';
import CopyToClipboardButton from 'components/CustomUI/CopyToClipboardButton';
import { NETWORKINFO } from 'constants/etherscan.constant';

const DetailCollectionStatistic = Loadable(lazy(() => import('../DetailCollectionStatistic')));

export type InfoCollectionProps = {
	collection: Collection | null;
};

function InfoCollection({ collection }: InfoCollectionProps) {
	const { collectionId } = useParams();
	const navigate = useNavigate();

	// useSelector
	const userAddress = useSelector(selectAddress);

	const getBlockchainIcon = (chainId: number) => {
		const blockchain = NETWORKINFO[chainId];
		return (
			<Tooltip title={blockchain.name} placement="top" aria-describedby="tip1" arrow>
				<img
					loading="lazy"
					src={blockchain.image}
					alt="blockchain icon"
					width="24"
					height="24"
					style={{ cursor: 'pointer' }}
				/>
			</Tooltip>
		);
	};

	return (
		<InfoCollectionWrapper>
			{collection && (
				<InfoStack alignItems="center">
					<AvatarWrapper>
						<Avatar
							sx={{ width: '120px', height: '120px', background: '#0768ff' }}
							src={collection.logo}
							alt="collection logo"
						/>
					</AvatarWrapper>
					<CollectionInfo>
						<Stack direction="row" alignItems="center" spacing={1}>
							<CollectionName variant="h4">
								{collection?.collectionName}
							</CollectionName>

							{getBlockchainIcon(collection.chainId)}
						</Stack>

						<InfoAddressList sx={{ mt: 0 }}>
							<InfoAddressItem>
								<InfoAddress variant="body1">Collection address:</InfoAddress>
								<Stack direction="row">
									<InfoAddress variant="body1">
										{sliceAddress(collection.collectionAddress, 8, 5)}
									</InfoAddress>
									<CopyToClipboardButton
										text={collection.collectionAddress}
										placementTooltip="right"
									/>
								</Stack>
							</InfoAddressItem>

							<InfoAddressItem>
								<InfoAddress variant="body1">Owned by:</InfoAddress>
								<Stack direction="row">
									<InfoAddress variant="body1">
										{sliceAddress(collection.userAddress, 8, 5)}
									</InfoAddress>
									<CopyToClipboardButton
										text={collection.userAddress}
										placementTooltip="right"
									/>
								</Stack>
							</InfoAddressItem>
						</InfoAddressList>

						<Typography variant="body1" sx={{ mt: 3 }}>
							Royalties: {collection?.royalties}%
						</Typography>
					</CollectionInfo>

					{collection && <DetailCollectionStatistic collection={collection} />}

					<MoreOptions>
						<Stack direction="row">
							<TwitterShareButton
								url={`https://nftspacex.io/#/collections/view/${collection.collectionId}`}
								// url="https://nftspacex.io/#/detail/6273b63badcba59d78a9bc75"
								title={`Look what I found! Collection ${collection.collectionName}`}
								// hashtags={['Music', 'Game']}
								via="NFTSpaceX"
							>
								<Tooltip
									title={'Share'}
									placement="top"
									aria-describedby="tip1"
									arrow
								>
									<ShareIcon sx={{ ml: 2, cursor: 'pointer' }} />
								</Tooltip>
							</TwitterShareButton>

							{collection?.userAddress === userAddress && (
								<Tooltip title="Edit" placement="top" aria-describedby="tip1" arrow>
									<AppRegistrationIcon
										sx={{ ml: 2, cursor: 'pointer' }}
										onClick={() =>
											navigate(`/collections/edit-collection/${collectionId}`)
										}
									/>
								</Tooltip>
							)}
						</Stack>
					</MoreOptions>
				</InfoStack>
			)}
		</InfoCollectionWrapper>
	);
}

export default InfoCollection;
