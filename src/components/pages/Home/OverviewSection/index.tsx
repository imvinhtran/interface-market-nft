/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
//mui
import { Grid, Typography, useTheme } from '@mui/material';
import { OverviewItem, OverviewImage } from './styled';
//images
import AssetIconWhite from 'assets/icons/asset-white.webp';
import TagIconWhite from 'assets/icons/tag-white.webp';
import BlockIconWhite from 'assets/icons/filter-blockchain-white.webp';
import AssetIconBlack from 'assets/icons/asset-black.webp';
import TagIconBlack from 'assets/icons/tag-black.webp';
import BlockIconBlack from 'assets/icons/filter-blockchain-black.webp';
//components
import Parallax from 'components/Animation/Parallax';

type OverviewProps = {
	iconLight: string;
	iconDark: string;
	header: string;
	content: string;
	link: string;
};

const listOverview: OverviewProps[] = [
	{
		iconLight: AssetIconWhite,
		iconDark: AssetIconBlack,
		header: 'Create',
		content: 'Make your own collectibles in NFTSpaceX',
		link: 'https://nftspacex1.gitbook.io/document/create-an-asset/collectible',
	},
	{
		iconLight: BlockIconWhite,
		iconDark: BlockIconBlack,
		header: 'Collect',
		content: 'Unearth NFTs for your growing collection',
		link: 'https://nftspacex1.gitbook.io/document/create-an-asset/nft-item',
	},
	{
		iconLight: TagIconWhite,
		iconDark: TagIconBlack,
		header: 'Listing',
		content: 'Your NFTs will shine in our marketplace',
		link: 'https://nftspacex1.gitbook.io/document/nftspacex-marketplace/listing',
	},
];

const OverviewSection = () => {
	const theme = useTheme();
	return (
		<Grid container spacing={4} sx={{ pt: '2rem' }}>
			{listOverview.map((item: OverviewProps, index: number) => (
				<Grid item xs={12} md={4} key={index}>
					<a href={item.link} target="_blank" rel="noreferrer">
						<OverviewItem>
							<Typography variant="h3">{item.header}</Typography>
							<Typography
								variant="h6"
								sx={{ maxWidth: '270px', textAlign: 'center', mx: 2 }}
							>
								{item.content}
							</Typography>

							<OverviewImage>
								<Parallax>
									<img
										src={
											theme.palette.mode === 'light'
												? item.iconDark
												: item.iconLight
										}
										alt="overview icon"
									/>
								</Parallax>
							</OverviewImage>
						</OverviewItem>
					</a>
				</Grid>
			))}
		</Grid>
	);
};

export default React.memo(OverviewSection);
