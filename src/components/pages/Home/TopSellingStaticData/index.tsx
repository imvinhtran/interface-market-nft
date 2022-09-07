import React from 'react';
//components
// import NFTsSlider from 'components/CustomUI/NFTsSlider';
import NFTItem from 'components/CustomUI/Card/NFTItem';
//mui
import { Box, Grid } from '@mui/material';
import SkeletonNftList from 'components/CustomUI/Skeleton/List/SkeletonNFTList';
import CustomSlider from 'components/CustomUI/CustomSlider';

interface Props {
	listNFTs: any;
	isLoading: boolean;
}

function TopSellingStaticData({ listNFTs, isLoading }: Props) {
	const renderTopSellingStaticData = () => {
		return listNFTs.map((item: any, index: number) => {
			return <NFTItem itemId={item} key={index} />;
		});
	};

	return (
		<Box sx={{ width: '100%' }}>
			{isLoading ? (
				<Grid container spacing={2} columns={{ xs: 2 }}>
					<SkeletonNftList amount={2} />
				</Grid>
			) : (
				<CustomSlider
					delay={2500}
					slidesPerView={5}
					loop={true}
					spaceBetween={15}
					slidesPerGroup={1}
					centeredSlides={false}
					slidesToShowPoint1358={2}
					slidesToShowPoint1093={2}
					slidesToShowPoint828={3}
					slidesToShowPoint547={2}
					slidesToShowPoint320={1}
					renderItem={renderTopSellingStaticData()}
				/>
			)}
		</Box>
	);
}

export default TopSellingStaticData;
