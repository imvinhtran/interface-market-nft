import { styled, Typography, Box } from '@mui/material';

export const screenBreakpoint = 1150;

export const FilterWrapper = styled(Box)(({ theme }) => ({
	'& .big-screen': {
		display: 'block',
	},

	'& .small-screen': {
		display: 'none',
	},

	[theme.breakpoints.down(screenBreakpoint)]: {
		'& .big-screen': {
			display: 'none',
		},

		'& .small-screen': {
			display: 'block',
		},
	},
}));

export const FilterBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '10px',
	marginRight: 10,
	borderRadius: '10px',
	cursor: 'pointer',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.dark,
		  }
		: {
				backgroundColor: theme.palette.primary.main,
		  }),
}));

export const DropdownContentStyled = styled(Box)(({ theme }) => ({
	[theme.breakpoints.down(screenBreakpoint)]: {
		padding: 15,
		borderRadius: 10,

		...(theme.palette.mode === 'light'
			? {
					background: theme.palette.primaryLight.dark,
					boxShadow: theme.customShadows.cardLight,
			  }
			: {
					background: theme.palette.primary.dark,
					boxShadow: theme.customShadows.cardDark,
			  }),

		// ko de o day dc, vi bam vao cai nay thi no van tinh la bam trong dropdown
		// '&::after': {
		// 	content: '""',
		// 	position: 'fixed',
		// 	top: 0,
		// 	left: 0,
		// 	width: '100vw',
		// 	height: '100vh',
		// 	backgroundColor: 'black',
		// 	zIndex: -1,
		// },
	},
}));

export const FilterStack = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'start',

	'& > *': {
		marginRight: 15,
	},

	[theme.breakpoints.down(screenBreakpoint)]: {
		flexDirection: 'column',
		alignItems: 'start',

		'& > *': {
			marginBottom: 15,
		},
	},
}));

export const ButtonReset = styled(Typography)(({ theme }) => ({
	cursor: 'pointer',
	color: theme.palette.primary.light,

	'&:hover': {
		color: theme.palette.primary.lighter,
	},
}));
