import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { motion, MotionValue } from 'framer-motion';
import { SkeletonNewTopArt, SwiperSlideItem } from 'components/pages/Home/NewTopArt/styled';

export interface SkeletonSliderProps {
	current: number;
	scaleX: MotionValue<number>;
	scaleY: MotionValue<number>;
	opacity: MotionValue<number>;
}

export default function SkeletonSlider({ current, scaleX, scaleY, opacity }: SkeletonSliderProps) {
	return (
		<Swiper
			slidesPerView={3}
			spaceBetween={15}
			loop={true}
			navigation={true}
			centeredSlides={true}
			className="mySwiper"
			allowTouchMove={false}
		>
			{new Array(3).fill(null).map((item: any, index: number) => (
				<SwiperSlide key={index} id={`slider-${index}`}>
					<motion.div
						style={{
							scaleX: current === index ? scaleX : 1,
							scaleY: current === index ? scaleY : 1,
							opacity: current === index ? 1 : opacity,
						}}
					>
						<SwiperSlideItem className="slide-item">
							<SkeletonNewTopArt />
						</SwiperSlideItem>
					</motion.div>
				</SwiperSlide>
			))}
		</Swiper>
	);
}
