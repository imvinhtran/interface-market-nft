import { styled } from '@mui/material';

export const LoadmoreBtnStyle = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	transition: 'all 0.5s',
	width: 400,
	borderRadius: '10px',
	cursor: 'pointer',
	height: '3rem',
	position: 'relative',
	zIndex: 0,

	...(theme.palette.mode === 'light'
		? {
				boxShadow: theme.customShadows.cardLight,
		  }
		: {
				border: `1px solid ${theme.palette.border.cardDark}`,
		  }),

	'@keyframes animate': {
		'0%': {
			backgroundPosition: '0% 50%',
		},

		'50%': {
			backgroundPosition: '100% 50%',
		},
	},

	'&::before': {
		content: '""',
		position: 'absolute',
		top: '-2px',
		left: '-2px',
		zIndex: -1,
		filter: 'blur(5px)',
		width: 'calc(100% + 4px)',
		height: 'calc(100% + 4px)',
		opacity: 1,
		// background:
		//	'linear-gradient(45deg,rgb(0, 255, 34),rgb(0, 255, 64),rgb(0, 255, 149),rgb(0, 225, 255),rgb(0, 102, 255),rgb(0, 43, 255),rgb(68, 0, 255),rgb(183, 0, 255),rgb(204, 0, 255))0% 0% / 400%',
		// background: 'rgb(0, 102, 255)',
		// animation: '5s linear 0s infinite normal none running animate',
		transition: 'opacity 0.3s easeIn-out 0s',
	},

	'&::after': {
		zIndex: -1,
		content: '""',
		position: 'absolute',
		width: '100%',
		height: '100%',
		left: '0px',
		top: '0px',
		borderRadius: '10px',

		...(theme.palette.mode === 'light'
			? {
					background: theme.palette.primaryLight.dark,
			  }
			: {
					backgroundImage: 'linear-gradient(to left,#011125 0%,#012444 100%)',
			  }),
	},

	'&:hover': {
		color: theme.palette.primary.light,
	},

	'@media screen and (max-width: 680px)': {
		width: '100%',
	},
}));
