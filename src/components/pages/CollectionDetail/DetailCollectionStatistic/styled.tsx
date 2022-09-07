import { styled, Box, Stack, Typography } from '@mui/material';
import { breakpointsCollectionInfoStack } from '../InfoCollection/styled';

export const DetailStatistic = styled(Stack)(({ theme }) => ({
	flexGrow: 1,
	alignSelf: 'end',
	flexDirection: 'row',
	justifyContent: 'end',
	'& *': {
		whiteSpace: 'nowrap',
	},

	[theme.breakpoints.down(breakpointsCollectionInfoStack)]: {
		justifyContent: 'center',
		alignSelf: 'unset',
		marginTop: 20,
	},
}));

export const StatisticBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'relative',
	paddingLeft: 20,
	paddingRight: 20,

	[theme.breakpoints.down(500)]: {
		paddingLeft: 10,
		paddingRight: 10,
	},

	'&:not(:last-child)::after': {
		content: '""',
		position: 'absolute',
		top: 0,
		right: 0,
		width: 2,
		height: '100%',
		backgroundImage:
			'linear-gradient(to bottom,rgba(7, 104, 255, 0),#0768ff 53%,rgba(7, 104, 255, 0))',
	},
}));

export const StatisticNumber = styled(Typography)(({ theme }) => ({
	[theme.breakpoints.down(500)]: {
		fontSize: 12,
	},
}));

export const StatisticTitle = styled(Typography)(({ theme }) => ({
	[theme.breakpoints.down(500)]: {
		fontSize: 12,
	},
}));
