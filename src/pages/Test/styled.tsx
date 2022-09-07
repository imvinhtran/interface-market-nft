/* eslint-disable @typescript-eslint/no-unused-vars */
import { styled, Card, Typography, Box, Avatar, BoxProps } from '@mui/material';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

interface SwiperWrapperProps extends BoxProps {
	distance: number;
}

export const ItemCardStyle = styled(Card)(({ theme }) => ({
	border: '2px solid #2F68F1',
	backgroundColor: '#012547',
	cursor: 'pointer',
	transition: 'all 0.6s ease',
}));

export const ItemImageStyle = styled('img')(({ theme }) => ({
	top: 0,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	position: 'absolute',
	borderRadius: theme.shape.borderRadiusMd,
}));

export const PriceStyle = styled(Typography)(({ theme }) => ({
	color: '#00ff36',
	lineHeight: '1',
}));

export const PriceChangeStyle = styled(Typography)(({ theme }) => ({
	fontStyle: 'italic',
}));

export const ItemFooterStyle = styled(Box)(({ theme }) => ({
	width: '100%',
	height: '50px',
	backgroundColor: 'white',
	opacity: 0.1,
	borderRadius: theme.shape.borderRadiusMd,
	position: 'relative',
}));

export const ItemFooterContentStyle = styled('div')(({ theme }) => ({
	position: 'absolute',
	bottom: 0,
	zIndex: '2',
	width: '100%',
	height: '50px',
	borderRadius: theme.shape.borderRadiusMd,
}));

export const AvatarStyle = styled(Avatar)({
	width: 30,
	height: 30,
});

export const BoxCountDown = styled(Box)(({ theme }) => ({
	position: 'absolute',
	height: '2.5rem',
	width: '60%',
	zIndex: '2',
	top: 'calc(100% - 2.5rem)',
	left: '0',
	borderRadius: theme.shape.borderRadiusMd,
	padding: '0.5rem',
	border: '1px solid #ffffff',
	backgroundImage:
		'linear-gradient(52deg,rgb(0, 255, 54) 7%,rgb(0, 238, 87) 17%,rgb(0, 197, 173) 37%,rgb(0, 164, 241) 52%,rgb(11, 24, 252) 88%,rgb(13, 0, 255) 94%)',
}));

export const BoxTest = styled('div')(({ theme }) => ({
	position: 'relative',
	width: '300px',
	height: '400px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: '#2F68F1',
	margin: 10,
	overflow: 'hidden',
	borderRadius: theme.shape.borderRadiusMd,
	border: '2px solid',
	'&:hover': {
		'&::before': {
			position: 'absolute',
			content: '""',
			display: 'inline-block',
			width: '200px',
			height: '140%',
			backgroundImage:
				'linear-gradient(52deg,rgb(0, 255, 54) 7%,rgb(0, 238, 87) 17%,rgb(0, 197, 173) 37%,rgb(0, 164, 241) 52%,rgb(11, 24, 252) 88%,rgb(13, 0, 255) 94%)',
			animation: 'animate 4s linear infinite',
		},

		'@keyframes animate': {
			'0%': {
				transform: 'rotate(0deg)',
			},
			'100%': {
				transform: 'rotate(360deg)',
			},
		},

		'&::after': {
			content: '""',
			position: 'absolute',
			inset: '4px',
			background: '#2F68F1',
			borderRadius: theme.shape.borderRadiusMd,
		},
	},
}));

export const BoxGrid = styled(Box)({
	'& .GridList': {
		display: 'grid',
		gridAutoFlow: 'row',
		gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
		gap: 12,
	},
});

// -----------------SwiperWrapper1

export const SwiperContainer = styled(Box)({
	width: 2750,
	position: 'absolute',
	left: '50%',
	top: '50%',
	transform: 'translate(-50%, -50%)',
	'@media screen and (max-width: 1068px)': {
		width: 1670,
	},
	'@media screen and (max-width: 734px)': {
		width: 840,
	},
	'@media screen and (max-width: 320px)': {
		width: 770,
	},
});

export const SwiperWrapper = styled((props: SwiperWrapperProps) => {
	const { distance, ...other } = props;
	return <Box {...other} />;
})(({ theme, distance, ...other }) => ({
	position: 'relative',
	img: {
		display: 'block',
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},

	'.swiper': {
		position: 'relative',
		overflow: 'visible',
		zIndex: 0,
	},
	'.mySwiper': {
		'.swiper-button-prev, .swiper-button-next': {
			position: 'fixed',
			color: 'white',
		},
		'.swiper-button-prev': {
			left: distance,
		},

		'.swiper-button-next': {
			position: 'fixed',
			// right: `calc(${right} - 100vw)`,
			right: distance,
		},

		'.swiper-slide': {
			'&.swiper-slide-active': {
				'.slide-item': {
					// background: 'blue',
					// width: 900,
					// border: '2px solid white',
				},
			},
			'&.swiper-slide-next': {
				position: 'relative',
				zIndex: -1,
			},
		},
	},

	'.active-slider': {
		position: 'relative',
		zIndex: 1000,
		// top: '50%',
		// left: '50%',
		// transform: 'translate(-50%, -50%)',
		border: '2px solid white',
		borderRadius: '10px',
	},

	'.motion': {
		// opacity: 0.5,
	},
}));

export const SwiperSlideItem = styled(Box)(({ theme }) => ({
	position: 'relative',
	// paddingTop: '100%',
	transition: 'all 0.6s ease ',
	borderRadius: '16px',
	height: 500,
	width: '100%',
	overflow: 'hidden',
	// opacity: 0.5,

	'@media screen and (max-width: 1068px)': {
		height: 312,
	},
	'@media screen and (max-width: 734px)': {
		height: 494,
	},
	'@media screen and (max-width: 320px)': {
		width: 250,
	},
	backgroundColor: 'teal',
}));

export const SwiperImage = styled(Box)(({ theme }) => ({
	// position: 'relative',
	// top: 0,
	// left: 0,
	width: '100%',
	height: '100%',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'bottom',
	display: 'block',
	// backgroundColor: 'red',
}));

// -----------------SwiperWrapper2

export const SwiperWrapper2 = styled(Box)(({ theme }) => ({
	img: {
		display: 'block',
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},

	'.mySwiper': {
		'.swiper-button-prev, .swiper-button-next': {
			zIndex: 100,
			backgroundColor: 'green',
		},

		'.swiper-pagination-bullet': {
			backgroundColor: 'red',

			'&.swiper-pagination-bullet-active': {
				backgroundColor: 'yellow',
			},
		},
	},
}));

export const MarqueeItem = styled(Box)({
	width: 300,
	height: 300,
	borderRadius: '10px',
	position: 'relative',
	margin: '10px',
	overflow: 'hidden',
	img: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	'@media screen and (max-width: 1068px)': {
		width: 180,
		height: 180,
	},
});

export const Wrapper = styled('div')({
	width: '150px',
	height: '150px',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translateX(-50%) translateY(-50%)',
});

// export const MotionContainer = styled((props: any) => {
// 	const { ...other } = props;
// 	return <motion.div {...other} />;
// })(({ theme, scaleX, scaleY, opacity, ...other }) => ({
// 	// '&::before': {
// 	scaleX,
// 	scaleY,
// 	opacity,
// 	// },
// }));

export const MotionContainer = styled(motion.div)(({ theme, scaleX, scaleY, opacity }: any) => ({
	scaleX,
	scaleY,
	opacity,
}));

export const MotionItem = styled(motion.div)({
	width: 'inherit',
	height: 'inherit',
	background: 'white',
	transformOrigin: '50% 100%',
});

export const MarqueeItemSecondary = styled(Box)({
	width: 500,
	height: 300,
	borderRadius: '10px',
	position: 'relative',
	margin: '10px',
	overflow: 'hidden',
	img: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	'@media screen and (max-width: 1068px)': {
		width: 210,
		height: 118,
	},
});
