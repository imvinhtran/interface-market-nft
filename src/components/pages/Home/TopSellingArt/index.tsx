import React, { Fragment } from 'react';
//components
import NFTItem from 'components/CustomUI/Card/NFTItem';
import TextGradient from 'components/CustomUI/TextGradient';
//mui
import { Box, Grid } from '@mui/material';
import SkeletonNftList from 'components/CustomUI/Skeleton/List/SkeletonNFTList';
import { NFT } from 'models';
import CustomSlider from 'components/CustomUI/CustomSlider';

interface Props {
	listNFTs: any;
	isLoading: boolean;
}

function TopSellingArt({ listNFTs, isLoading }: Props) {
	const renderTopSellingStaticData = () => {
		return listNFTs.map((item: NFT, index: number) => {
			return <NFTItem itemId={item} key={index} />;
		});
	};

	return (
		<Fragment>
			<TextGradient title="Top Arts">
				<img src="/fire-4.webp" alt="fire" />
			</TextGradient>
			<Box sx={{ width: '100%', mt: 2 }}>
				{isLoading ? (
					<Grid container spacing={2} columns={{ xs: 5 }}>
						<SkeletonNftList amount={5} />
					</Grid>
				) : (
					<CustomSlider
						delay={2500}
						slidesPerView={5}
						loop={true}
						spaceBetween={15}
						slidesPerGroup={1}
						centeredSlides={true}
						slidesToShowPoint1358={5}
						slidesToShowPoint1093={4}
						slidesToShowPoint828={3}
						slidesToShowPoint547={2}
						slidesToShowPoint320={1}
						renderItem={renderTopSellingStaticData()}
					/>
				)}
			</Box>
		</Fragment>
	);
}

export default TopSellingArt;
