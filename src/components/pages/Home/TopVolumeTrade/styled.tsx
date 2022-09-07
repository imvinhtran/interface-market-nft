import { Avatar, Box, Stack, styled, Typography } from '@mui/material';

export const SwiperWrapper = styled(Box)(({ theme }) => ({
	marginBottom: '5rem',
	position: 'relative',
	img: {
		display: 'block',
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	'.swiper': {
		position: 'static',
		padding: '50px 0',
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
			cursor: 'pointer',
			opacity: 0.5,
			'&.swiper-slide-active': {
				opacity: 1,
				'.slide-item': {
					// background: 'blue',
					transform: 'scale(1.2)',
				},
			},
		},
	},
}));

export const SwiperSlideItem = styled(Box)(({ theme }) => ({
	transition: 'all 0.6s ease',
	borderRadius: '16px',
	padding: '1rem',
	margin: 4,
	overflow: 'hidden',

	...(theme.palette.mode === 'light'
		? {
				boxShadow: theme.customShadows.cardLight,
		  }
		: {
				border: '1px solid',
				borderColor: theme.palette.primary.light,
		  }),

	'@media screen and (max-width: 512px)': {
		p: {
			fontSize: '14px',
		},
	},
}));

export const TopVolumeContainer = styled(Stack)(({ theme }) => ({
	'.top-volume-slide:nth-of-type(1)': {
		'&:hover': {
			transform: 'translate(20px) scale(1.2)',
		},
	},
	'.top-volume-slide:nth-of-type(3)': {
		'&:hover': {
			transform: 'translate(-20px) scale(1.2)',
		},
	},
}));

export const TopVolumeSlide = styled('div')(({ theme }) => ({
	cursor: 'pointer',
	width: '100%',
	transition: 'all 0.5s ease',
	border: '1px solid',
	borderRadius: '16px',
	padding: '1rem',
	borderColor: theme.palette.primary.light,
	opacity: 0.6,
	'&:hover': {
		opacity: 1,
		transform: 'scale(1.2)',
	},
}));

export const ListCollectionRanking = styled(Box)({
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	gap: '50px',
	padding: '2rem 0',
	'@media screen and (max-width: 512px)': {
		gap: '25px',
		padding: '1rem 0',
	},
});

export const CollectionRankingItemWrapper = styled(Box)(({ theme }) => ({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	gap: '10px',
	borderRadius: 10,

	'&:hover': {
		'& .active-hover': {
			textDecoration: 'underline !important',
		},
	},

	'@media screen and (max-width: 512px)': {
		gap: '8px',
	},
}));

export const CollectionLogo = styled(Avatar)({
	width: 60,
	height: 60,
	'@media screen and (max-width: 512px)': {
		width: 40,
		height: 40,
	},
});

export const CollectionName = styled(Typography)({});
