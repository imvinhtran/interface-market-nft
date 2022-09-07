import TabList from '@mui/lab/TabList';
import { styled, Tab } from '@mui/material';

export const TabListStyled = styled(TabList)(({ theme }) => ({
	'& .MuiTabs-indicator': {
		background:
			'linear-gradient(to right,rgba(7, 104, 255, 0),#0768ff 53%,rgba(7, 104, 255, 0))',
	},

	'& .MuiTabs-scroller button': {
		flexGrow: 1,
	},
}));

export const TabStyled = styled(Tab)(({ theme }) => ({
	color: theme.palette.mode === 'light' ? 'black' : 'white',

	'& .selected': {
		display: 'none',
	},
	'& .unselected': {
		display: 'block',
	},

	'&:hover': {
		color: '#40a9ff',
		opacity: 1,

		'& .selected': {
			display: 'block',
		},
		'& .unselected': {
			display: 'none',
		},
	},
	'&.Mui-selected': {
		color: '#1890ff',
		fontWeight: theme.typography.fontWeightMedium,

		'& .selected': {
			display: 'block',
		},
		'& .unselected': {
			display: 'none',
		},
	},
	'&.Mui-focusVisible': {
		backgroundColor: '#d1eaff',
	},
}));
