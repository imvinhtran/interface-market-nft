import { styled, Box, Typography, Stack } from '@mui/material';

export const InfoAccountUserWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	transform: 'translateY(-30%)',
	borderRadius: 25,
	padding: '20px 40px',
	margin: '0 100px',
	boxShadow: '0px 0px 5px rgba(20, 86, 163)',

	[theme.breakpoints.down('lg')]: {
		margin: '0 100px',
	},
	[theme.breakpoints.down('md')]: {
		boxShadow: 'unset',
		margin: 'unset',
		padding: 'unset',
		top: -70,
		transform: 'unset',
		backgroundColor: 'unset',
		textAlign: 'center',
	},

	...(theme.palette.mode === 'light'
		? {
				background: theme.palette.primaryLight.main,
		  }
		: {
				background: 'rgba(2, 28, 56, 0.7)',
				color: 'white',
		  }),
}));

export const MoreOptions = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: 20,
	right: 20,
	...(theme.palette.mode === 'light'
		? {
				borderColor: '#000',
		  }
		: {
				borderColor: '#fff',
		  }),

	[theme.breakpoints.down('md')]: {
		top: 80,
		right: 10,
		border: '1px solid',
		borderRadius: 10,
		padding: '5px 10px',
	},

	[theme.breakpoints.down('sm')]: {
		border: 'unset',
		padding: 0,
	},
}));

export const InfoStack = styled(Stack)(({ theme }) => ({}));

export const AvatarWrapper = styled(Box)(({ theme }) => ({
	borderRadius: '50%',
	[theme.breakpoints.down('md')]: {
		boxShadow: `0px 0px 5px ${theme.palette.grey['500']}`,
	},
}));

export const UserInfo = styled(Stack)(({ theme }) => ({
	flexGrow: 1,
	marginLeft: '20px',

	[theme.breakpoints.down('md')]: {
		marginLeft: 0,
		alignItems: 'center',
	},
}));

export const Username = styled(Typography)(({ theme }) => ({}));

export const UserBio = styled(Typography)(({ theme }) => ({}));

export const UserAddress = styled(Typography)(({ theme }) => ({}));

export const GradIcon = styled(Box)({
	cursor: 'pointer',
	width: '100%',
	height: '100%',
	borderRadius: '50%',
});
