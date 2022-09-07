import { styled, Typography, Box } from '@mui/material';

export const PageTitle = styled(Typography)({
	fontSize: '2.5rem',
	fontWeight: 700,
	padding: '1.5rem 0',
});

export const FieldTitleName = styled(Typography)({
	fontSize: '1.2rem',
	fontWeight: 600,
});

export const FieldSubTitle = styled(Typography)({
	fontSize: '0.9rem',
	opacity: 0.5,
	fontWeight: 600,
});

export const LogoBox = styled(Box)(({ theme }) => ({
	position: 'relative',
	margin: '1.5rem 0',
	padding: 10,
	width: 300,
	height: 300,
	borderRadius: '50%',
	overflow: 'hidden',
	backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='${
		theme.palette.mode === 'light' ? 'black' : 'white'
	}' stroke-width='5' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
	img: {
		borderRadius: '50%',
	},
}));

export const BannerBox = styled(Box)(({ theme }) => ({
	margin: '1.5rem 0',
	padding: 10,
	maxWidth: '700px',
	height: '230px',
	borderRadius: '20px',
	backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='${
		theme.palette.mode === 'light' ? 'black' : 'white'
	}' stroke-width='5' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,

	img: {
		borderRadius: '20px',
	},
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
	color: 'red',
	fontStyle: 'italic',
	fontSize: 14,
	marginTop: 3,
	'&::before': {
		content: '"*"',
	},
}));

export const Asterisk = styled('span')(({ theme }) => ({
	color: 'red',
	'&::before': {
		content: '"*"',
		fontSize: 18,
	},
}));
