import { styled, Box, Stack, Typography } from '@mui/material';

export const CollectionBackground = styled(Box)(({ theme }) => ({
	overflow: 'hidden',
	position: 'relative',
	borderRadius: '10px',
	height: 250,
	[theme.breakpoints.down('lg')]: {
		height: 200,
	},
	[theme.breakpoints.down('md')]: {
		height: 150,
	},
	// boxShadow: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
	// boxShadow: '0px 0px 6px 2px rgba(66,66,66,0.81)',
	boxShadow: '0px 0px 5px rgba(20, 86, 163)',
	// boxShadow: '0px 4px 8px 6px rgba(255,255,255,0.49)',
	// WebkitBoxShadow: '0px 4px 8px 6px rgba(255,255,255,0.49)',
	// MozBoxShadow: '0px 4px 8px 6px rgba(255,255,255,0.49)',
}));

export const CollectionMoreInfoWrapper = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	marginTop: '-40px',
}));

export const CollectionMoreInfo = styled(Stack)(({ theme }) => ({
	alignItems: 'center',
	maxWidth: 800,
}));

export const CollectionDescription = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
	marginTop: 25,
}));

export const ReadMoreButton = styled(Typography)(({ theme }) => ({
	cursor: 'pointer',
	...(theme.palette.mode === 'light'
		? {
				color: theme.palette.primary.lighter,
		  }
		: {
				color: theme.palette.success.main,
		  }),
}));
