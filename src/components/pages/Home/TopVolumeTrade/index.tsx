/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { toast } from 'react-toastify';
// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';
// import required modules
import { Navigation, Autoplay } from 'swiper';
import {
	CollectionLogo,
	CollectionName,
	CollectionRankingItemWrapper,
	ListCollectionRanking,
	SwiperSlideItem,
	SwiperWrapper,
} from './styled';
// mui
import { Avatar, Box, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// redux
import { useDispatch, useSelector } from 'react-redux';
import {
	selectFilter,
	selectListTopCollection,
	selectLoading,
} from 'redux/slices/listTopCollectionSlice';
// actions
import { fetchListTopCollection } from 'redux/actions/listTopCollectionAction';
// component
import TextGradient from 'components/CustomUI/TextGradient';
import DividerGradient from 'components/CustomUI/DividerGradient';
import SkeletonCollectionRankingItem from 'components/CustomUI/Skeleton/Item/SkeletonCollectionRankingItem';
// models
import { Collection, ListResponse } from 'models';
// api
import collectionApi from 'apis/collectionApi';
// utils
import { formatNumber } from 'utils';

const TopVolumeTrade = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// useSelector
	const listTopCollection = useSelector(selectListTopCollection);
	const filter = useSelector(selectFilter);

	// useState
	const [list24Hours, setList24Hours] = useState<Collection[]>([]);
	const [list7Days, setList7Days] = useState<Collection[]>([]);
	const [list30Days, setList30Days] = useState<Collection[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		try {
			(async () => {
				let volume24Hours: ListResponse<Collection>;
				let volume7Days: ListResponse<Collection>;
				let volume30Days: ListResponse<Collection>;
				await Promise.all([
					(volume24Hours = await collectionApi.getListTopCollection(
						{ pageSize: 3, page: 1 },
						{ sortBy: 'volume24Hours' }
					)),
					(volume7Days = await collectionApi.getListTopCollection(
						{ pageSize: 3, page: 1 },
						{ sortBy: 'volume7Days' }
					)),
					(volume30Days = await collectionApi.getListTopCollection(
						{ pageSize: 3, page: 1 },
						{ sortBy: 'volume30Days' }
					)),
				]);

				setList24Hours(volume24Hours.data);
				setList7Days(volume7Days.data);
				setList30Days(volume30Days.data);
				setIsLoading(false);
			})();
		} catch (error: any) {
			setIsLoading(false);
			toast.error(error.message);
		}
	}, []);

	const getVolumeTrade = (type: string, collection: Collection) => {
		if (type === 'In 1 Day') {
			return formatNumber(collection.volume24Hour?.toString()!, 2);
		} else if (type === 'In 7 Days') {
			return formatNumber(collection.volume7Days?.toString()!, 2);
		} else return formatNumber(collection.volume30Days?.toString()!, 2);
	};

	const renderListTopVolumeTrade = (listCollection: Collection[], header: string) => {
		return (
			<SwiperSlide>
				<SwiperSlideItem className="slide-item">
					<Stack
						alignItems="center"
						direction="row"
						sx={{
							width: '100%',
						}}
					>
						<Typography>{header}</Typography>
						<Typography sx={{ ml: 'auto' }}>More</Typography>
						<ArrowForwardIcon sx={{ width: '20px', height: '20px', ml: 0.5 }} />
					</Stack>
					<DividerGradient sx={{ mt: 2 }} />
					<ListCollectionRanking>
						{isLoading
							? new Array(3)
									.fill(null)
									.map((item: any, index: number) => (
										<SkeletonCollectionRankingItem key={index} />
									))
							: listCollection.map((item: Collection, index: number) => (
									<CollectionRankingItemWrapper
										key={index}
										onClick={() => {
											navigate(`/collections/view/${item.collectionId}`);
										}}
									>
										<Typography>#{index + 1}</Typography>
										<CollectionLogo
											src={item.logo}
											variant="rounded"
											alt="collection logo"
										/>
										<Stack
											direction="column"
											justifyContent="space-between"
											sx={{ height: 60, flexGrow: 1, minWidth: 0 }}
										>
											<CollectionName className="active-hover" noWrap>
												{item.collectionName}
											</CollectionName>
											<Box
												sx={{
													display: 'flex',
													flexDirection: 'column',
												}}
											>
												<Typography variant="caption">
													Volume Trade
												</Typography>

												<Typography variant="caption">
													$ {getVolumeTrade(header, item)}
												</Typography>
											</Box>
										</Stack>
									</CollectionRankingItemWrapper>
							  ))}
					</ListCollectionRanking>
				</SwiperSlideItem>
			</SwiperSlide>
		);
	};

	return (
		<Fragment>
			{/* <TextGradient title="Top Collection's Volume Trade">
				<img src="/fire.webp" alt="fire" />
			</TextGradient> */}
			<SwiperWrapper>
				<Swiper
					slidesPerView={3}
					spaceBetween={80}
					loop={true}
					slidesPerGroup={1}
					centeredSlides={true}
					navigation={true}
					modules={[Autoplay, Navigation]}
					className="mySwiper"
					breakpoints={{
						0: {
							slidesPerView: 1.2,
							// spaceBetween: 20,
						},
						547: {
							slidesPerView: 1.5,
						},
						828: {
							slidesPerView: 2,
						},
						1093: {
							slidesPerView: 3,
						},
					}}
				>
					{renderListTopVolumeTrade(list30Days, 'In 30 Days')}
					{renderListTopVolumeTrade(list24Hours, 'In 1 Day')}
					{renderListTopVolumeTrade(list7Days, 'In 7 Days')}
				</Swiper>
			</SwiperWrapper>
		</Fragment>
	);
};

export default TopVolumeTrade;
