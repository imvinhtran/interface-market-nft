import { styled, Box, BoxProps } from '@mui/material';
// import { textStyled } from 'components/Theme/CustomStyled';

interface ActiveBoxProps extends BoxProps {
	active: boolean;
}

// export const LightBoxShadow = styled((props: ActiveBoxProps) => {
// 	const { ...others } = props;
// 	return <Box {...others} />;
// })(({ theme, active }) => ({
// 	borderRadius: '16px',
// 	width: '100%',
// 	boxShadow: active ? '0px 0px 8px 0px rgb(0,137,255)' : '',
// 	webkitBoxShadow: active ? '0px 0px 8px 0px rgb(0,137,255)' : '',
// 	mozBoxShadow: active ? '0px 0px 8px 0px rgb(0,137,255)' : '',
// }));

export const SellMethodWrapper = styled(Box)(({ theme }) => ({
	padding: '5px',
	width: '100%',
	height: '230px',
	borderRadius: '16px',

	...(theme.palette.mode === 'light'
		? {
				boxShadow: theme.customShadows.cardLightHover,
		  }
		: {
				backgroundColor: theme.palette.primary.darker,
				border: '2px solid',
				borderColor: theme.palette.primary.main,
		  }),

	'@media screen and (max-width: 500px)': {
		height: '200px',
	},
	'@media screen and (max-width: 450px)': {
		height: '150px',
		fontSize: 20,
	},
	'@media screen and (max-width: 400px)': {
		height: '120px',
	},
}));

export const SellMethodBox = styled((props: ActiveBoxProps) => {
	const { ...others } = props;
	return <Box {...others} />;
})(({ theme, active }) => ({
	display: 'flex',
	cursor: 'pointer',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	height: '100%',
	borderRadius: '10px',

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: active ? theme.palette.primaryLight.main : 'none',
		  }
		: {
				backgroundColor: active ? theme.palette.primary.dark : 'none',
		  }),
}));

// export const SellMethodText = styled(Typography)({
// 	paddingTop: 3,
// 	...textStyled(20, 600, '#0061FE'),
// 	'@media screen and (max-width: 400px)': {
// 		...textStyled(15, 500, '#0061FE'),
// 	},
// });
