import { styled } from '@mui/material';

export const TableWrapper = styled('div')({
	width: '100%',
	maxHeight: '100vh',
	overflow: 'auto',
	WebkitOverflowScrolling: 'touch',

	'&::-webkit-scrollbar': {
		display: 'block',
		height: 5,
		width: 5,
	},
	'&::-webkit-scrollbar-track': {
		display: 'block',
		background: '#0c5599',
		borderRadius: 5,
	},
	'&::-webkit-scrollbar-thumb': {
		display: 'block',
		background: '#65b8ff',
		borderRadius: 5,
	},
});

export const TableScrollable = styled('table')(({ theme }) => ({
	overflow: 'auto',
	// backgroundColor: theme.palette.primary.dark,
	tableLayout: 'fixed',
	position: 'relative',
	borderCollapse: 'separate',
	thead: {
		borderSpacing: '0px',
		th: {
			...(theme.palette.mode === 'light'
				? {
						backgroundColor: theme.palette.primaryLight.main,
				  }
				: {
						backgroundColor: theme.palette.primary.main,
				  }),
			whiteSpace: 'nowrap',
			position: 'sticky',
			top: 0,
			zIndex: 1,
			width: '25vw',
			':first-of-type': {
				position: 'sticky',
				left: 0,
				zIndex: 3,
			},
		},
		tr: {
			border: '2px solid',
			borderColor: theme.palette.primary.main,
			borderRadius: 16,
		},
	},
	tbody: {
		th: {
			position: 'sticky',
			left: 0,
			zIndex: 2,
			whiteSpace: 'nowrap',
			fontWeight: 400,
			backgroundColor: '#004078',
		},
		tr: {
			borderTopRightRadius: 16,
			borderBottomRightRadius: 16,

			':nth-of-type(even)': {
				...(theme.palette.mode === 'light'
					? {
							backgroundColor: theme.palette.primaryLight.main,
					  }
					: {
							backgroundColor: theme.palette.primary.dark,
					  }),
				// th: {
				// 	...(theme.palette.mode === 'light'
				// 		? {
				// 				backgroundColor: theme.palette.primaryLight.main,
				// 		  }
				// 		: {
				// 				backgroundColor: theme.palette.primary.light,
				// 		  }),
				// },
			},
			':nth-of-type(odd)': {
				// ...(theme.palette.mode === 'light'
				// 	? {
				// 			backgroundColor: theme.palette.primaryLight.main,
				// 	  }
				// 	: {
				// 			backgroundColor: theme.palette.primary.dark,
				// 	  }),
				// th: {
				// 	...(theme.palette.mode === 'light'
				// 		? {
				// 				backgroundColor: theme.palette.primaryLight.dark,
				// 		  }
				// 		: {
				// 				backgroundColor: theme.palette.primary.light,
				// 		  }),
				// },
			},
		},
	},

	'td, th': {
		padding: '10px 1rem',
	},
}));

export const FlexBox = styled('div')({
	width: '100%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});
