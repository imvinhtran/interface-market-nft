/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState, useRef, lazy, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
//mui
import { Box, Container, Grid, Stack } from '@mui/material';
// styled
import {
	ButtonViewAll,
	FirstSectionHomePage,
	HeaderSection,
	ImgCatchAFish,
	MainHeader,
	OpacityBackground,
	SubHeader,
} from './styled';
// models
import { CollectionCategory } from 'models';
// component
import ButtonLoadmore from 'components/CustomUI/ButtonLoadmore';
// images
import CatchFish from 'assets/images/home/catch-fish.webp';
import Loadable from 'components/CustomUI/LoadableComponent';

//Loadable Component
const AdvertiseSection = Loadable(
	lazy(() => import('../../components/pages/Home/AdvertiseSection'))
);
const InfinityAnimation = Loadable(
	lazy(() => import('../../components/pages/Home/InfinityAnimation'))
);

const OverviewSection = Loadable(lazy(() => import('../../components/pages/Home/OverviewSection')));
const ListNFT = Loadable(lazy(() => import('../../components/pages/Home/ListNFT')));
const NewTopArt = Loadable(lazy(() => import('../../components/pages/Home/NewTopArt')));
const ListTopCollection = Loadable(
	lazy(() => import('../../components/pages/Home/ListTopCollection'))
);
const GalleryItem = Loadable(lazy(() => import('../../components/pages/Home/GalleryItem')));
const CategoryCollection = Loadable(
	lazy(() => import('../../components/pages/Home/CategoryCollection'))
);

const Home: React.FC = () => {
	const navigate = useNavigate();
	// useRef
	const sectionRef = useRef<any>(null);
	// useState
	const [displayGallery, setDisplayGallery] = useState<boolean | object>(false);
	const [distance, setDistance] = useState<string>('0px');
	const [firstSectionHeight, setFirstSectionHeight] = useState<number>(0);
	const [renderSection, setRenderSection] = useState<boolean>(false);

	const handleResize = useCallback(() => {
		if (sectionRef.current) {
			const height = sectionRef.current.clientHeight;
			setFirstSectionHeight(height);
		}
	}, []);

	useEffect(() => {
		if (sectionRef.current) {
			const height = sectionRef.current.clientHeight;
			setFirstSectionHeight(height);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [renderSection]);

	//Handle resize window event
	useEffect(() => {
		window.addEventListener('resize', handleResize, { passive: true });
		return () => {
			window.removeEventListener('resize', handleResize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [handleResize]);

	return (
		<Fragment>
			<FirstSectionHomePage ref={sectionRef}>
				<OpacityBackground />

				<Container maxWidth="xl">
					<Grid container spacing={1}>
						<Grid item xs={12} lg={6}>
							<InfinityAnimation />
						</Grid>
						<Grid item xs={12} lg={5}>
							<AdvertiseSection />
						</Grid>
					</Grid>

					<Box sx={{ mt: 7 }}>
						<ListTopCollection
							renderSection={renderSection}
							setRenderSection={setRenderSection}
						/>
					</Box>
				</Container>
			</FirstSectionHomePage>
			{firstSectionHeight !== 0 && (
				<Fragment>
					<Box
						sx={{
							position: 'relative',
							height: `${firstSectionHeight + (window.innerHeight * 4) / 3}px`,
							width: '100vw',
						}}
					>
						<NewTopArt
							displayGallery={displayGallery}
							setDisplayGallery={setDisplayGallery}
							setDistance={setDistance}
							sectionHeight={firstSectionHeight}
						/>
					</Box>
					<GalleryItem displayGallery={displayGallery} distance={distance} />
				</Fragment>
			)}
			<Container
				maxWidth="xl"
				sx={{ position: 'relative', marginTop: displayGallery ? 0 : '100vh' }}
			>
				<Box sx={{ mt: 10 }}>
					<HeaderSection>
						<MainHeader variant="h2">Explore Collections</MainHeader>
						<SubHeader variant="h5">
							All the hottest NFT collections based on category
						</SubHeader>
					</HeaderSection>

					<CategoryCollection />
				</Box>
				<Box sx={{ mt: 10, width: '100%' }}>
					<HeaderSection>
						<MainHeader variant="h2">Explore NFTs</MainHeader>
						<SubHeader variant="h5" sx={{ display: 'inline' }}>
							The world of digital assets in forms of NFTs
							<ButtonViewAll
								sx={{ display: 'inline' }}
								onClick={() => {
									navigate('/all-nfts');
								}}
							>
								View All
							</ButtonViewAll>
						</SubHeader>
					</HeaderSection>

					<ListNFT />
				</Box>

				<Box sx={{ mt: 10 }}>
					<HeaderSection>
						<MainHeader variant="h2">NFTSpaceX is a future destination</MainHeader>
						<SubHeader variant="h5">
							NFTSpaceX Exchange is a hybrid off-chain/on-chain system where orders
							with signatures are stored on the server-side until they are matched. It
							is a non-custodial exchange where the atomic match is executed right
							away when two orders are fully compatible and authorized by creators of
							orders.
						</SubHeader>
					</HeaderSection>

					<OverviewSection />
				</Box>

				<Stack sx={{ marginTop: '50px', width: '100%' }} alignItems="center">
					<ButtonLoadmore
						text="Discover NFTSpaceX"
						onClick={() => {
							navigate('/all-nfts');
						}}
					/>
				</Stack>

				<Box sx={{ mt: 10 }}>
					<ImgCatchAFish>
						<img loading="lazy" src={CatchFish} alt="catch a fish" />
					</ImgCatchAFish>
				</Box>
			</Container>
		</Fragment>
	);
};

export default React.memo(Home);
