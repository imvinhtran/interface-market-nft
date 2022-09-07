import React from 'react';
import Slider from 'react-slick';
// hooks
import useSettings from 'hooks/useSettings';
// styled
import { SlideButtonStyle, SlideButtonWrapper } from './styled';

export type NFTsArrowProps = {
	className?: any;
	style?: any;
	onClick?: VoidFunction;
};

export type NFTsSliderProps = {
	[key: string]: any;
};

const NFTsNextArrow = ({ className, onClick }: NFTsArrowProps) => {
	const { themeMode } = useSettings();
	return (
		<SlideButtonWrapper className={className} onClick={onClick}>
			<SlideButtonStyle>
				{themeMode === 'dark' ? (
					<img src="/next.png" alt="next" />
				) : (
					<img src="/next-light.png" alt="next" />
				)}
			</SlideButtonStyle>
		</SlideButtonWrapper>
	);
};

const NFTsPreArrow = ({ className, onClick }: NFTsArrowProps) => {
	const { themeMode } = useSettings();
	return (
		<SlideButtonWrapper className={className} onClick={onClick}>
			<SlideButtonStyle>
				{themeMode === 'dark' ? (
					<img src="/_.png" alt="prev" />
				) : (
					<img src="/prev-light.png" alt="prev" />
				)}
			</SlideButtonStyle>
		</SlideButtonWrapper>
	);
};

const NFTsSlider = (props: NFTsSliderProps) => {
	let {
		dots,
		infinite,
		slidesToShow,
		autoplay,
		speed,
		autoplaySpeed,
		slidesToShowPoint1400,
		slidesToShowPoint1025,
		slidesToShowPoint769,
		slidesToShowPoint575,
	} = props;

	return (
		<Slider
			dots={dots}
			lazyLoad="progressive"
			swipeToSlide={true}
			infinite={infinite}
			slidesToShow={slidesToShow}
			slidesToScroll={1}
			autoplay={autoplay}
			speed={speed}
			autoplaySpeed={autoplaySpeed}
			initialSlide={0}
			nextArrow={<NFTsNextArrow />}
			prevArrow={<NFTsPreArrow />}
			responsive={[
				{
					breakpoint: 1400,
					settings: {
						slidesToShow: slidesToShowPoint1400,
						slidesToScroll: 1,
						infinite: infinite,
						dots: dots,
					},
				},
				{
					breakpoint: 1025,
					settings: {
						slidesToShow: slidesToShowPoint1025,
						slidesToScroll: 1,
						dots: dots,
					},
				},
				{
					breakpoint: 1000,
					settings: {
						slidesToShow: slidesToShowPoint1025,
						slidesToScroll: 1,
						dots: dots,
					},
				},
				{
					breakpoint: 991,
					settings: {
						slidesToShow: slidesToShowPoint769,
						slidesToScroll: 1,
						initialSlide: 2,
						dots: dots,
					},
				},
				{
					breakpoint: 575,
					settings: {
						slidesToShow: slidesToShowPoint575,
						slidesToScroll: 1,
						dots: dots,
					},
				},
			]}
		>
			{props.children}
		</Slider>
	);
};

export default NFTsSlider;
