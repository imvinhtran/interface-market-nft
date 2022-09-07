/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Autoplay, Pagination } from 'swiper';
import { AdvertiseSectionWrapper, SliderItem } from './styled';
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';
//api
import advertiseApi from 'apis/advertiseApi';
//model
import { Response } from 'models';
//utils
import { compressImage } from 'utils';
//components
import LoadingPage from 'components/CustomUI/LoadingPage';
//redux
import { selectLoadingPage, setLoading } from 'redux/slices/loadingSlice';
import { useDispatch, useSelector } from 'react-redux';

const AdvertiseSection: React.FC = () => {
	const [listVideo, setListVideo] = useState<any>([]);
	// const [isLoading, setIsLoading] = useState<boolean>(false);

	const dispatch = useDispatch();
	const isLoadingPage = useSelector(selectLoadingPage);

	useEffect(() => {
		(async () => {
			try {
				dispatch(setLoading(true));
				const listVideoRes: Response<string> = await advertiseApi.getListVideo();
				setListVideo(listVideoRes.data);
				setTimeout(() => dispatch(setLoading(false)), 1000);
			} catch (error: any) {
				dispatch(setLoading(false));
				toast.error(error.message);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderListSlider = (listVideo: string[]) => {
		return listVideo.map((video: string, index: number) => (
			<SwiperSlide key={index}>
				<Box sx={{ position: 'relative', pt: '100%' }}>
					<SliderItem>
						<ReactPlayer
							url={compressImage(video, 967, 'best')}
							muted={true}
							playing={true}
							playsinline={true}
							loop={true}
							width="100%"
							height="100%"
						/>
					</SliderItem>
				</Box>
			</SwiperSlide>
		));
	};

	return (
		<AdvertiseSectionWrapper>
			{isLoadingPage ? (
				// <Box sx={{ position: 'relative', pt: '100%', width: '100%' }}>
				// 	<Skeleton
				// 		sx={{
				// 			position: 'absolute',
				// 			top: 0,
				// 			left: 0,
				// 			width: '100%',
				// 			height: '100%',
				// 			WebkitTransform: 'scale(1,1)',
				// 			transform: 'scale(1,1)',
				// 		}}
				// 	/>
				// </Box>
				<LoadingPage />
			) : (
				<Swiper
					pagination={true}
					modules={[Pagination, Autoplay]}
					className="mySwiper"
					autoplay={{ delay: 5000, disableOnInteraction: false }}
				>
					{renderListSlider(listVideo)}
				</Swiper>
			)}
		</AdvertiseSectionWrapper>
	);
};

export default React.memo(AdvertiseSection);
