/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useSpring, useTransform, useViewportScroll } from 'framer-motion';
// swiper lib
import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { SwiperModule } from 'swiper/types';
// components
import ButtonGradient from 'components/CustomUI/ButtonGradient';
// styled
import {
	NewTopArtContainer,
	SkeletonNewTopArt,
	SwiperContainer,
	SwiperImage,
	SwiperInfo,
	SwiperSlideItem,
	SwiperWrapper,
	ViewButton,
} from './styled';
import advertiseApi from 'apis/advertiseApi';
import { toast } from 'react-toastify';
import { AdvertiseBanner } from 'models/advertise';
//context
import { SizeContext } from 'contexts/SizeObserver';
//components
import SkeletonSlider from 'components/CustomUI/Skeleton/Page/NewTopArt/SkeletonSlider';
import LazyImageCustom from 'components/CustomUI/LazyImages/LazyImageCustom';

interface NewTopArtProps {
	displayGallery: boolean | object;
	setDisplayGallery: Function;
	setDistance: Function;
	sectionHeight: number;
}

const NewTopArt = ({
	displayGallery,
	setDisplayGallery,
	setDistance,
	sectionHeight,
}: NewTopArtProps) => {
	const navigate = useNavigate();
	const { scrollY } = useViewportScroll();

	const swiperRef = useRef<HTMLDivElement>(null);

	const [left, setLeft] = useState<number>(0);
	const [slideChange, setSlideChange] = useState<boolean>(false);
	const [current, setCurrent] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [listBanner, setListBanner] = useState<AdvertiseBanner[]>([]);

	const [width, setWidth] = useState<number>(0);
	const [height, setHeight] = useState<number>(0);
	const [ratio, setRatio] = useState<number>(1);

	const { innerWidth, innerHeight } = useContext(SizeContext);

	const scaleX = useTransform(
		scrollY,
		[50 + sectionHeight, 100 + sectionHeight, 100 + sectionHeight + window.innerHeight / 3],
		[width, width, 1]
	);

	const scaleY = useTransform(
		scrollY,
		[50 + sectionHeight, 100 + sectionHeight, 100 + sectionHeight + window.innerHeight / 3],
		[height, height, 1]
	);

	const scaleImgX = useTransform(
		scrollY,
		[100 + sectionHeight, 100 + sectionHeight + window.innerHeight / 3],
		[height / width, 1]
	);

	const scaleImgY = useTransform(
		scrollY,
		[100 + sectionHeight, 100 + sectionHeight + window.innerHeight / 3],
		[width / height, 1]
	);

	const opacity = useTransform(
		scrollY,
		[
			100 + sectionHeight,
			100 + sectionHeight + window.innerHeight / 4,
			100 + sectionHeight + window.innerHeight / 3,
		],
		[0, 0, 1]
	);

	const yRange = useTransform(
		scrollY,
		[100 + sectionHeight - window.innerHeight / 2, 100 + sectionHeight],
		[150, 0]
	);

	const y = useSpring(yRange, { stiffness: 2000, damping: 500 });

	//Calculate ratio between image in slider and current size of window
	const calculateRatio = (widthImg: number, heightImg: number) => {
		const width = (innerWidth + 100) / widthImg;
		const height = (innerHeight + 100) / heightImg;
		const ratio = width / height;
		setWidth(width);
		setHeight(height);
		setRatio(ratio);
	};

	//Calculate for showing gallery and navigate arrows
	const calculateScroll = () => {
		const prevArrow: any = document.getElementsByClassName('swiper-button-prev');
		const nextArrow: any = document.getElementsByClassName('swiper-button-next');
		if (swiperRef.current) {
			const bottomSwiper = swiperRef.current.getBoundingClientRect().bottom;
			const topSwiper = swiperRef.current.getBoundingClientRect().top;
			const leftSwiper = swiperRef.current.getBoundingClientRect().left;

			const middleSwiperCordinate = (bottomSwiper - topSwiper) / 2;

			//The gap between navigate arrows to 2 sides of window screen
			setLeft((leftSwiper - 10) * -1);

			if (middleSwiperCordinate + topSwiper + 1 <= innerHeight / 2) {
				setDisplayGallery(true);
				if (prevArrow[0] && nextArrow[0]) {
					prevArrow[0].style.display = 'block';
					nextArrow[0].style.display = 'block';
				}
			} else {
				setDisplayGallery(false);
				if (prevArrow[0] && nextArrow[0]) {
					prevArrow[0].style.display = 'none';
					nextArrow[0].style.display = 'none';
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	};

	//Calculate distance between NewTopArt and GalleryItem
	const calculateDistance = () => {
		if (swiperRef.current) {
			// Height of swtiper
			const height = swiperRef.current.clientHeight;
			const dist = ((innerHeight - height) * -1) / 2;
			setDistance(dist.toString() + 'px');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	};

	const handleEventListener = () => {
		calculateScroll();
		calculateDistance();
	};

	//Calculate size of each image in slider
	useEffect(() => {
		if (innerWidth >= 1068) {
			calculateRatio(906.66, 500);
		} else if (innerWidth >= 734 && innerWidth < 1068) {
			calculateRatio(546.66, 312);
		} else {
			calculateRatio(270, 494);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [innerWidth, innerHeight]);

	//Call API
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const res: AdvertiseBanner[] = await advertiseApi.getListBanner();
				setListBanner(res);
				setIsLoading(false);
			} catch (error: any) {
				setIsLoading(false);
				toast.error(error.message);
			}
		})();
	}, []);

	//Handle scroll window event
	useEffect(() => {
		window.addEventListener('scroll', handleEventListener, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleEventListener);
		};
	});

	//Handle resize window event
	useEffect(() => {
		window.addEventListener('resize', handleEventListener, { passive: true });
		handleEventListener();
		return () => {
			window.removeEventListener('resize', handleEventListener);
		};
	});

	return (
		<NewTopArtContainer>
			<SwiperContainer ref={swiperRef}>
				<SwiperWrapper distance={left}>
					{isLoading && (
						<SkeletonSlider
							current={current}
							scaleX={scaleX}
							scaleY={scaleY}
							opacity={opacity}
						/>
					)}
					{!isLoading && listBanner.length > 0 && (
						<Swiper
							slidesPerView={3}
							spaceBetween={15}
							loop={true}
							autoplay={
								// toggle
								// 	? {
								// 			delay: 5000,
								// 			disableOnInteraction: false,
								// 	  }
								// 	: false
								false
							}
							// autoplay={false}
							centeredSlides={true}
							navigation={true}
							modules={[Autoplay, Navigation]}
							className="mySwiper"
							onSlideChange={(e: any) => {
								setSlideChange(!slideChange);
								setCurrent(e.realIndex);
							}}
							allowTouchMove={false}
						>
							{listBanner.map((image: AdvertiseBanner, index: number) => (
								<SwiperSlide key={index}>
									<motion.div
										style={{
											scaleX: current === index ? scaleX : 1,
											scaleY: current === index ? scaleY : 1,
											opacity: current === index ? 1 : opacity,
										}}
									>
										<SwiperSlideItem className="slide-item">
											<SwiperInfo>
												<motion.div
													style={{
														y,
														width: '100%',
														height: '100%',
														scaleX: ratio < 1 ? scaleImgX : 1,
														scaleY: ratio > 1 ? scaleImgY : 1,
													}}
												>
													<LazyImageCustom
														src={`${image.title}`}
														alt="text info"
														wrapperPosition="relative"
														type="skeleton"
													/>
												</motion.div>
											</SwiperInfo>

											<AnimatePresence>
												<ViewButton
													sx={{
														display: displayGallery ? 'block' : 'none',
													}}
												>
													<motion.div
														initial={{ y: 50, opacity: 0 }}
														animate={{ y: 0, opacity: 1 }}
														exit={{ y: 50, opacity: 0 }}
														transition={{
															duration: 1.5,
															type: 'spring',
														}}
													>
														<ButtonGradient
															onClick={() =>
																navigate(
																	`/collections/view/${image.collectionId}`
																)
															}
														>
															View now
														</ButtonGradient>
													</motion.div>
												</ViewButton>
											</AnimatePresence>

											<motion.div
												style={{
													width: '100%',
													height: '100%',
													scaleX: ratio < 1 ? scaleImgX : 1,
													scaleY: ratio > 1 ? scaleImgY : 1,
												}}
											>
												<SwiperImage
													sx={{
														backgroundImage: `url('${image.mainImage}')`,
													}}
												></SwiperImage>
											</motion.div>
										</SwiperSlideItem>
									</motion.div>
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</SwiperWrapper>
			</SwiperContainer>
		</NewTopArtContainer>
	);
};

export default React.memo(NewTopArt);
