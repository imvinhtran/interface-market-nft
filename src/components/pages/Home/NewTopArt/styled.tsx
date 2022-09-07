/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, BoxProps, Skeleton, styled, Typography } from '@mui/material';

interface SwiperWrapperProps extends BoxProps {
	distance: number;
}

export const NewTopArtContainer = styled(Box)(({ theme }) => ({
	width: '100%',
	height: '100vh',
	position: 'sticky',
	zIndex: 2,
	minHeight: '506px',
	top: 0,
	overflow: 'hidden',
	// backgroundImage: theme.palette.gradients.secondary,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '10px',
}));

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
		width: 750,
	},
});

export const SwiperWrapper = styled((props: SwiperWrapperProps) => {
	const { distance, ...other } = props;
	return <Box {...other} />;
})(({ theme, distance, ...other }) => ({
	position: 'relative',

	'.swiper': {
		position: 'relative',
		overflow: 'visible',
		zIndex: 0,
	},
	'.mySwiper': {
		'.swiper-button-prev, .swiper-button-next': {
			position: 'fixed',
			color: 'white',
			// '@media screen and (max-width: 734px)': {
			// 	width: 40,
			// 	height: 40,
			// },
			// '@media screen and (max-width: 320px)': {
			// 	width: 35,
			// 	height: 35,
			// },
			'&::after': {
				// fontSize: '35px',
				'@media screen and (max-width: 734px)': {
					fontSize: '35px',
				},
				'@media screen and (max-width: 320px)': {
					fontSize: '30px',
				},
			},
		},
		'.swiper-button-prev': {
			left: distance,
		},

		'.swiper-button-next': {
			position: 'fixed',
			right: distance,
		},

		'.swiper-slide': {
			'&.swiper-slide-active': {
				'.slide-item': {},
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
		border: '2px solid white',
		borderRadius: '10px',
	},
}));

export const SwiperSlideItem = styled(Box)(({ theme }) => ({
	position: 'relative',
	transition: 'all 0.6s ease ',
	borderRadius: '16px',
	height: 500,
	width: '100%',
	overflow: 'hidden',
	'@media screen and (max-width: 1068px)': {
		height: 312,
	},
	'@media screen and (max-width: 734px)': {
		height: 494,
	},
	'@media screen and (max-width: 320px)': {
		height: 430,
		// width: 250,
	},
}));

export const SwiperImage = styled(Box)(({ theme }) => ({
	width: '100%',
	height: '100%',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'bottom',
	position: 'absolute',
	top: 0,
	// display: 'block',
	img: {
		width: '100%',
		height: '100%',
	},
}));

export const SwiperInfo = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '45px',
	left: '10%',
	zIndex: 100,
	height: 60,
	// width: 340,
	img: {
		objectFit: 'contain',
		width: 'auto',
		height: 'auto',
		maxHeight: '100%',
	},
	// transformOrigin: 'top left',
	'@media screen and (max-width: 1068px)': {
		// width: '100%',
		height: 40,
	},
	'@media screen and (max-width: 734px)': {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		top: '10%',
		left: '50%',
		transform: 'translateX(-50%)',
		// height: 50,
		width: '75%',
		img: {
			position: 'absolute',
			top: 0,
			left: '50%',
			transform: 'translateX(-50%)',
		},
	},
}));

export const CollectionName = styled(Typography)({
	height: 85,
	width: 340,
});

export const ViewButton = styled(Box)({
	position: 'absolute',
	zIndex: 101,
	bottom: '50px',
	right: '50px',
	transition: 'all 0.6 ease',
	'@media screen and (max-width: 734px)': {
		bottom: '10%',
		right: '50%',
		transform: 'translateX(50%)',
	},
});

export const SkeletonNewTopArt = styled(Skeleton)({
	width: '100%',
	height: '100%',
	WebkitTransform: 'scale(1,1)',
	transform: 'scale(1,1)',
});
