import { Stack, styled, Typography } from '@mui/material';

// -------------------- COMMON --------------------------------
export const Divider = styled(Typography)(({ theme }) => ({
	width: '100%',
	height: 1,
	borderBottom: `1px solid ${theme.palette.grey['500']}`,
	opacity: 0.3,
}));

export const CloseIconStyled = styled(Stack)({
	cursor: 'pointer',

	':hover': {
		opacity: 0.5,
	},
});

export const SearchIconStyled = styled(Stack)(({ theme }) => ({
	cursor: 'pointer',
	borderRadius: 10,
	padding: '5px 8px 5px 8px',
}));
