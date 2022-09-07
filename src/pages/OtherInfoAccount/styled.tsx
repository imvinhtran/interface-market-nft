import { styled, Box } from '@mui/material';

export const UserBackground = styled(Box)(({ theme }) => ({
	overflow: 'hidden',
	position: 'relative',
	height: 250,
	// boxShadow: '0px 0px 6px 2px rgba(66,66,66,0.81)',
	boxShadow: '0px 0px 5px rgba(20, 86, 163)',
	borderRadius: 10,
	[theme.breakpoints.down('lg')]: {
		height: 200,
	},
	[theme.breakpoints.down('md')]: {
		height: 150,
	},
}));
