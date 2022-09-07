import { Box, styled } from '@mui/material';

export const SwiperWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	img: {
		display: 'block',
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	'.swiper': {
		position: 'static',
	},

	'.mySwiper': {
		'.swiper-button-prev, .swiper-button-next': {
			position: 'absolute',
			top: '50%',
			width: 35,
			height: 35,
			borderRadius: '50%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',

			...(theme.palette.mode === 'light'
				? {
						backgroundColor: theme.palette.primaryLight.dark,
				  }
				: {
						backgroundColor: theme.palette.primary.main,
				  }),

			'&::after': {
				fontSize: '15px',
				color: theme.palette.mode === 'light' ? '#000' : '#fff',
				opacity: 0.5,
				fontWeight: 600,
			},

			'&:hover': {
				...(theme.palette.mode === 'light'
					? {
							backgroundColor: theme.palette.primaryLight.darker,
					  }
					: {
							backgroundColor: theme.palette.primary.light,
					  }),
			},
		},
		'.swiper-button-prev': {
			left: -15,
		},
		'.swiper-button-next': {
			right: -15,
		},

		'.swiper-slide': {
			// '&.swiper-slide-active': {
			// 	'.slide-item': {
			// 		background: 'blue',
			// 		transform: 'scale(1)',
			// 	},
			// },
		},
	},
}));

export const SwiperSlideItem = styled(Box)(({ theme }) => ({
	padding: 10,
	transition: 'all 0.6s ease',
}));
