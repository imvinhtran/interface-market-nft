import { styled, Box, Typography } from '@mui/material';

export const PageTitle = styled(Typography)({
	fontSize: '2.5rem',
	fontWeight: 700,
	padding: '1.5rem 0',
});

export const FieldTitleName = styled(Typography)(({ theme }) => ({
	fontSize: '1.2rem',
	fontWeight: 600,
}));

export const FieldSubTitle = styled(Typography)({
	fontSize: '0.9rem',
	opacity: 0.5,
	fontWeight: 600,
});

export const FieldIcon = styled(Box)({
	width: 40,
	marginRight: 10,
	flexShrink: 0,
});

export const LogoBox = styled(Box)(({ theme }) => ({}));

export const InputGroup = styled(Box)(({ theme }) => ({
	marginTop: 40,
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

export const PreviewItemContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'start',
	justifyContent: 'space-between',
	gap: 40,
	minHeight: 400,

	[theme.breakpoints.down(765)]: {
		display: 'block',
	},
}));

export const PreviewItemWrapper = styled(Box)(({ theme }) => ({
	width: 320,
	flexShrink: 0,

	[theme.breakpoints.down(765)]: {
		width: 'auto',
	},
}));
