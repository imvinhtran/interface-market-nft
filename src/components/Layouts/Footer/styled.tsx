import { Grid, Stack, styled, Link } from '@mui/material';

export const FooterHome = styled(Grid)({
	fontSize: '16px',
	fontWeight: 300,
	marginTop: 100,
	paddingBottom: 50,
	width: '100%',

	a: {
		color: 'rgb(18, 101, 171)',
		textDecoration: 'none',
	},
	'@media screen and (max-width: 1080px)': {
		fontSize: '12px',
	},
	'@media screen and (max-width: 400px)': {
		fontSize: '10px',
		marginBottom: '50px',
		marginTop: '50px',
	},
});

export const Column1 = styled(Stack)({
	lineHeight: 1,
	// img: {
	// 	width: 16,
	// 	height: 16,
	// },
	'@media screen and (max-width: 1080px)': {
		lineHeight: 1.5,
	},
});

export const Column1Item = styled('div')({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	color: 'rgb(18, 101, 171)',
	a: {
		fontStyle: 'italic',
	},
});

export const Column1Link = styled(Link)(({ theme }) => ({
	marginLeft: '5px',

	'&:hover': {
		color: theme.palette.primary.lighter,
	},
}));

export const Column2 = styled('div')({
	width: '100%',
	textAlign: 'center',
	'@media screen and (max-width: 992px)': {
		paddingRight: 0,
	},
});

export const Column3 = styled(Stack)(({ theme }) => ({
	a: {
		img: {
			width: 24,
			height: 20,
			transition: 'all 0.2s',
		},

		'&:hover': {
			img: {
				transform: 'scale(1.4)',
			},
		},
	},

	'@media screen and (max-width: 400px)': {
		img: {
			width: 20,
			height: 17,
		},
	},
}));
