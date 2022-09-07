import { Box, Stack, styled } from '@mui/material';

export const SearchGroup = styled(Stack)(({ theme }) => ({
	borderRadius: 10,
	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.main,
		  }
		: {
				backgroundColor: theme.palette.primary.main,
		  }),
}));

export const DropDownContentBS = styled(Box)(({ theme }) => ({
	display: 'none',
	position: 'absolute',
	top: '120%',
	left: 0,
	transition: 'all 0.2s',
	width: '100%',
	zIndex: 100,
	borderRadius: 10,
	boxShadow: theme.customShadows.z24,

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.main,
		  }
		: {
				backgroundImage: theme.palette.gradients.modal,
				border: `1px solid ${theme.palette.primary.main}`,
		  }),

	'&.active': {
		display: 'block',
	},
}));
