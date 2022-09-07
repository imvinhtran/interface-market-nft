import { styled, Stack, Link, Box } from '@mui/material';

export const SelectOptionBox = styled(Box)(({ theme }) => ({
	position: 'relative',
}));

export const IconDots = styled(Stack)(({ theme }) => ({
	cursor: 'pointer',
	borderRadius: 10,
	padding: '5px 2px 5px 2px',
	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.main,
		  }
		: {
				backgroundColor: theme.palette.primary.main,
		  }),
}));

export const DropDownContent = styled(Stack)(({ theme }) => ({
	display: 'none',
	position: 'absolute',
	marginTop: '2.5rem',
	right: 0,
	minWidth: 180,
	borderRadius: 10,
	zIndex: 100,

	...(theme.palette.mode === 'light'
		? {
				backgroundColor: theme.palette.primaryLight.main,
				boxShadow: theme.customShadows.cardLightHover,
		  }
		: {
				border: `1px solid ${theme.palette.border.cardDark}`,
				backgroundImage: theme.palette.gradients.third,
		  }),

	'&.active': {
		display: 'block',
	},
}));

export const DropdownList = styled(Box)({
	padding: '8px 12px',
	borderRadius: '8px',
	listStyleType: 'none',
	li: {
		padding: '5px 20px',
		a: {
			color: 'white',
			fontWeight: 250,
			fontSize: '1rem',
			textDecoration: 'none',
			whiteSpace: 'nowrap',
		},
	},
});

export const ListItem = styled(Link)(({ theme }) => ({
	color: theme.palette.text.primary,
	'&:hover': {
		color: theme.palette.primary.light,
	},
}));

export const SmallNavigationRender = styled('div')({
	width: '100%',
	display: 'none',
	'@media screen and (max-width: 1230px)': {
		display: 'block',
	},
});
