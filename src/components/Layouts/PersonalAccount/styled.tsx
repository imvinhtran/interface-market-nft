import { Stack, styled, Box } from '@mui/material';

const breakpointsShowCloseButton = 350;

export const DrawerContent = styled('div')(({ theme }) => ({
	position: 'relative',
	width: 350,
	padding: '1.5rem',
	borderRadius: '10px',

	[theme.breakpoints.down(450)]: {
		width: '80vw',
	},

	[theme.breakpoints.down(breakpointsShowCloseButton)]: {
		width: 'unset !important',
	},

	...(theme.palette.mode === 'light'
		? {
				background: theme.palette.primaryLight.main,
		  }
		: {
				backgroundImage: theme.palette.gradients.modal,
		  }),
}));

export const CloseButton = styled(Box)(({ theme }) => ({
	display: 'none',
	position: 'absolute',
	top: 10,
	right: 10,

	[theme.breakpoints.down(breakpointsShowCloseButton)]: {
		display: 'block',
	},
}));

export const AccountContent = styled('div')({
	position: 'relative',

	'&:hover .OutlineList': {
		opacity: 1,
		visibility: 'visible',
	},
});

export const LogoutButton = styled('div')({
	position: 'absolute',
	bottom: 0,
	width: '100%',
});

export const ListLink = styled(Stack)({
	p: {
		cursor: 'pointer',
		'&:hover': {
			color: '#186ca5',
		},
	},
});

export const LinkItem = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	gap: 10,
	cursor: 'pointer',

	p: { transition: 'all 0.2s' },

	'& .hovered': {
		display: 'none',
	},

	'& .non-hovered': {
		display: 'block',
	},

	'&:hover': {
		p: { marginLeft: 5, color: '#40a9ff' },

		'& .hovered': {
			display: 'block',
		},

		'& .non-hovered': {
			display: 'none',
		},
	},
});

export const GradIcon = styled(Box)({
	cursor: 'pointer',
	width: '100%',
	height: '100%',
	borderRadius: '50%',
});
