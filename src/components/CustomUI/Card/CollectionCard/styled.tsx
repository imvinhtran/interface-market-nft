import { styled, Box, Avatar, Stack, Typography } from '@mui/material';

export const CollectionCardWrapper = styled(Box)(({ theme }) => ({
	borderRadius: 15,
	overflow: 'hidden',
	cursor: 'pointer',
	transition: 'all 0.5s ease',
	img: {
		display: 'block',
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	...(theme.palette.mode === 'light'
		? {
				boxShadow: theme.customShadows.cardLight,
				background: theme.palette.primaryLight.lighter,
		  }
		: {
				background: theme.palette.gradients.fourth,
		  }),

	'&:hover': {
		...(theme.palette.mode === 'light'
			? {
					boxShadow: theme.customShadows.cardLightHover,
			  }
			: {
					background: theme.palette.gradients.third,
			  }),
	},
}));

export const BottomPart = styled(Box)(({ theme }) => ({
	// background: 'rgba(100,100,100, 0.2)',
}));

export const CollectionBackground = styled(Box)(({ theme }) => ({
	height: 150,
	position: 'relative',

	[theme.breakpoints.down('md')]: {
		height: 140,
	},
}));

export const CollectionLogoWrapper = styled(Box)(({ theme }) => ({
	position: 'relative',
	transform: 'translateY(-50%)',
	display: 'flex',
	justifyContent: 'center',
}));

export const CollectionLogo = styled(Avatar)(({ theme }) => ({
	border: '4px solid #75aaff',
	boxShadow: '0 0 10px grey',
	backgroundColor: theme.palette.primary.main,
}));

export const CollectionInfo = styled(Stack)(({ theme }) => ({
	marginTop: '-40px',
	padding: '0 15px 15px 15px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
}));

export const CollectionName = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
}));

export const CollectionOwner = styled(Stack)(({ theme }) => ({
	flexDirection: 'row',
	justifyContent: 'center',
}));

export const OwnerName = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.special,
	display: 'inline-block',
	marginLeft: 4,

	'&:hover': {
		textDecoration: 'underline !important',
	},
}));

export const CollectionNumberItem = styled(Typography)(({ theme }) => ({
	textAlign: 'center',
	marginTop: 20,
	width: '80%',

	[theme.breakpoints.down('md')]: {
		marginTop: 20,
	},
}));
