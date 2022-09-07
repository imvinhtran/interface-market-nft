import { styled } from '@mui/material';

const widthData = 150;

export const TableStyled = styled('div')({
	overflowX: 'auto',
	WebkitOverflowScrolling: 'touch',

	'&::-webkit-scrollbar': {
		display: 'block',
		marginLeft: '10px',
		height: 3,
	},
	'&::-webkit-scrollbar-track': {
		display: 'block',
		marginLeft: 10,
		background: '#0c5599',
		borderRadius: 5,
	},
	'&::-webkit-scrollbar-thumb': {
		display: 'block',
		marginLeft: 10,
		background: '#65b8ff',
		borderRadius: 5,
	},

	'.AppearElement': {
		display: 'block',
		'@media screen and (max-width: 1200px)': {
			display: 'none',
		},
	},
});

export const TableContainerScrollable = styled('table')({
	width: '100%',
	borderCollapse: 'collapse',
});

export const TableHeadStyle = styled('thead')(({ theme }) => ({
	tr: {
		padding: '15px 0px !important',
		border: '2px solid',
		borderColor: theme.palette.primary.main,
		borderRadius: 16,
	},
}));

export const TableRowStyle = styled('tr')({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-around',
	borderRadius: 16,
	paddingTop: 10,
	paddingBottom: 10,
});

export const ThData = styled('th')({
	width: widthData,
	display: 'block',
	fontSize: 16,
	fontWeight: 100,
	':first-of-type': {
		width: 300,
	},
	':not(:last-child)': {
		borderRight: 'none',
	},
	'@media screen and (max-width: 540px)': {
		fontSize: 14,
	},
	'@media screen and (max-width: 320px)': {
		fontSize: 12,
	},
});

export const TableBodyStyle = styled('tbody')(({ theme }) => ({
	display: 'block',
	overflowY: 'auto',
	maxHeight: 600,
	position: 'relative',
	msOverflowStyle: '-ms-autohiding-scrollbar',

	[theme.breakpoints.down(900)]: {
		maxHeight: 400,
	},

	[theme.breakpoints.down(600)]: {
		maxHeight: 300,
	},

	'&::-webkit-scrollbar': {
		display: 'block',
		width: 3,
	},
	'&::-webkit-scrollbar-track': {
		display: 'block',
		background: '#0c5599',
	},
	'&::-webkit-scrollbar-thumb': {
		display: 'block',
		background: '#65b8ff',
		borderRadius: '5px',
	},

	th: {
		borderTop: 'none',
	},
	td: {
		borderTop: 'none',
	},

	tr: {
		':nth-of-type(even)': {
			...(theme.palette.mode === 'light'
				? {
						background: theme.palette.primaryLight.main,
				  }
				: {
						background: theme.palette.primary.dark,
				  }),
		},
	},
}));

export const TableData = styled('td')({
	textAlign: 'center',
	fontWeight: '100',
	fontSize: 14,
	width: widthData,
	display: 'block',
	':first-of-type': {
		width: 300,
	},

	':not(:last-child)': {
		borderRight: 'none',
	},
	'@media screen and (max-width: 540px)': {
		fontSize: 13,
	},
	'@media screen and (max-width: 320px)': {
		fontSize: 12,
	},
});

export const BoxNoData = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	marginTop: 30,
});
