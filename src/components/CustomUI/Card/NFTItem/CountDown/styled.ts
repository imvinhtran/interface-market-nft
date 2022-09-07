import { styled, Typography } from '@mui/material';

export const CountdownContain = styled('div')({
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
});

export const TimeValue = styled(Typography)({
	fontSize: '14px',
	fontWeight: '900',
	'@media screen and (max-width:650px)': {
		fontSize: '13px',
		fontWeight: '500',
	},
	'@media screen and (max-width:540px)': {
		fontSize: '12px',
		fontWeight: '500',
	},
});

export const TimeArticle = styled('div')({
	textAlign: 'center',
});

export const TimeTitle = styled(Typography)({
	fontSize: '10px',
	'@media screen and (max-width:420px)': {
		fontSize: '8px',
	},
});

export const LeftText = styled(Typography)({
	fontSize: '14px',
	fontWeight: '900',
	'@media screen and (max-width:650px)': {
		fontSize: '13px',
		fontWeight: '500',
	},
	'@media screen and (max-width:540px)': {
		fontSize: '12px',
		fontWeight: '500',
	},
});

export const FireIcon = styled('img')({
	paddingBottom: '4px',
	width: '20px',
	height: '24px',
	'@media screen and (max-width:650px)': {
		width: '18px',
		height: '20px',
		paddingBottom: '3px',
	},
	'@media screen and (max-width:420px)': {
		width: '16px',
		height: '18px',
		paddingBottom: '3px',
	},
});
