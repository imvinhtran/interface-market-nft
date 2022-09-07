import { styled } from '@mui/material';
import { motion } from 'framer-motion';

export const ModalOverlay = styled('div')({
	position: 'fixed',
	width: '100vw',
	height: '100vh',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 1000,
	backgroundColor: '#000000bf',
});

export const ModalContain = styled('div')({
	width: '500px',
	height: '500px',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	backgroundColor: 'transparent',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	'@media screen and (max-width: 1140px)': {
		height: 450,
		width: 450,
	},
	'@media screen and (max-width: 960px)': {
		height: 400,
		width: 400,
	},
	'@media screen and (max-width: 720px)': {
		height: 350,
		width: 350,
	},
	'@media screen and (max-width: 540px)': {
		height: 300,
		width: 300,
	},
	'@media screen and (max-width: 376px)': {
		height: 250,
		width: 250,
	},
});

export const ModalClose = styled('div')({
	cursor: 'pointer',
	position: 'absolute',
	top: 0,
	right: 0,
	borderRadius: '50%',
	width: '1.7rem',
	height: '1.7rem',
	background: 'rgba(2, 28, 56, 0.9)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const ImgPoint = styled('div')({
	width: '25px',
	height: '25px',
	borderRadius: '50%',
	backgroundColor: 'white',
	opacity: '0.3',
	'@media screen and (max-width: 1140px)': {
		height: 23,
		width: 23,
	},
	'@media screen and (max-width: 960px)': {
		height: 21,
		width: 21,
	},
	'@media screen and (max-width: 720px)': {
		height: 19,
		width: 19,
	},
	'@media screen and (max-width: 540px)': {
		height: 17,
		width: 17,
	},
	'@media screen and (max-width: 376px)': {
		height: 15,
		width: 15,
	},
});

export const SpinnerBox = styled(motion.div)({
	position: 'absolute',
	height: 530,
	width: 530,
	borderRadius: '50%',
	'@media screen and (max-width: 1140px)': {
		height: 480,
		width: 480,
	},
	'@media screen and (max-width: 960px)': {
		height: 420,
		width: 420,
	},
	'@media screen and (max-width: 720px)': {
		height: 370,
		width: 370,
	},
	'@media screen and (max-width: 540px)': {
		height: 320,
		width: 320,
	},
	'@media screen and (max-width: 376px)': {
		height: 270,
		width: 270,
	},
});

export const ComingSoonImg = styled('img')({
	width: '100%',
	height: '100%',
});
