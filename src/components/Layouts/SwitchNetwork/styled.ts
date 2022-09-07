import { styled } from '@mui/material';
import backgroundImage from 'assets/images/network/switch-network.webp';

export const NetworkSwitchStyle = styled('div')({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-evenly',
	position: 'relative',
	padding: '1rem 0 2rem 0',
});

export const NetworkSwitchBackground = styled('div')({
	backgroundImage: `url(${backgroundImage})`,
	position: 'relative',
	backgroundSize: 'cover',
	width: '250px',
	height: '250px',
	animation: 'rotateAnimate 2s',
	'@keyframes rotateAnimate': {
		from: { transform: 'rotate(120deg)' },
		to: { transform: 'rotate(0deg)' },
	},
});

export const NetworkSwitchContent = styled('div')({
	width: '100px',
	height: '100px',
	transition: '0.5s all',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	cursor: 'pointer',
	position: 'absolute',
});

export const ColumnStyle = styled('div')({
	position: 'absolute',
	top: '22px',
	width: '50px',
	height: '205px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
});

export const CollumnOne = styled(ColumnStyle)({
	left: '41px',
});

export const CollumnTwo = styled(ColumnStyle)({
	left: '161px',
});

export const NetworkSwitchIcon = styled('div')({
	'.icon-small': {
		padding: '5px',
		width: '50px !important',
		height: '50px !important',
		cursor: 'pointer',
	},
	'&:hover': {
		borderRadius: '50px',
		backgroundColor: 'rgba(12, 179, 201, 0.5)',
		transition: '0.5s all',
	},
});
