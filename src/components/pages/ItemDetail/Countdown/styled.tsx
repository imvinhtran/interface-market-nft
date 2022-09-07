import { styled, Typography } from '@mui/material';

export const ForBitAuctionEnd = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItem: 'center',
	marginTop: '20px',

	width: 300,
	'@media screen and (max-width:540px)': {
		width: 240,
	},
	border: '1px solid',
	borderColor: theme.palette.primary.light,
	borderRadius: '10px',
	padding: '10px',
}));

export const CountdownContain = styled('div')({
	width: '100%',
	display: 'flex',
	// alignItems: 'center',
	// justifyContent: 'space-between',
});

export const TitleArticle = styled(Typography)({
	fontSize: '18px',
	// background:
	// 	'linear-gradient(52deg,#00ff36 7%,#00ee57 17%,#00c5ad 37%,#00a4f1 52%,#0b98fc 88%,#06f 94%)',
	// WebkitBackgroundClip: 'text',
	// WebkitTextFillColor: 'transparent',
	// backgroundClip: 'text',
});

export const TimeValue = styled(Typography)({
	fontSize: '1.8rem',
	fontWeight: '600',
	'@media screen and (max-width: 960px)': {
		fontSize: '1.6rem',
	},
	'@media screen and (max-width: 540px)': {
		fontSize: '1.2rem',
	},
});

export const TimeArticle = styled('article')({
	textAlign: 'center',
});

export const TimeTitle = styled(Typography)({
	fontSize: '0.8rem',
	fontStyle: 'italic',
	'@media screen and (max-width: 540px)': {
		paddingTop: '0.5rem',
		fontSize: '0.6rem',
	},
});
