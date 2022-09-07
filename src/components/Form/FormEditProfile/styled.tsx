import { styled, Box, Typography } from '@mui/material';

export const TopPart = styled(Box)(({ theme }) => ({
	paddingBottom: '25px',
	position: 'relative',
	'&::after': {
		content: '""',
		position: 'absolute',
		top: '100%',
		left: 0,
		width: '100%',
		height: '0.9px',
		backgroundImage:
			'linear-gradient(to right,rgba(7, 104, 255, 0),#0768ff 53%,rgba(7, 104, 255, 0))',
	},
}));

export const BoxChangeable = styled(Box)({
	position: 'relative',
	'& input': {
		opacity: 0,
		cursor: 'pointer',
		width: '100%',
		height: '100%',
		borderRadius: '50%',
		position: 'absolute',
		top: 0,
		left: 0,
	},
});

export const AvatarChangeable = styled(BoxChangeable)(({ theme }) => ({
	borderRadius: '50%',
	width: 'fit-content',
	border: '1px solid #0768ff',
}));

export const BackgroundChangeable = styled(BoxChangeable)(({ theme }) => ({}));

export const UserBackground = styled('img')(({ theme }) => ({
	display: 'block',
	width: '100%',
	height: 120,
	objectFit: 'cover',
	borderRadius: 10,
}));

export const InputGroup = styled(Box)(({ theme }) => ({
	marginTop: 10,
}));

export const Label = styled('label')(({ theme }) => ({
	color: theme.palette.mode === 'light' ? 'black' : 'white',
	fontSize: 14,
	fontWeight: 600,
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

// export const AvatarBox
