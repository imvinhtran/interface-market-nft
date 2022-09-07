import { styled, Box } from '@mui/material';

export const BoxGrid = styled(Box)({
	'& .GridList': {
		display: 'grid',
		gridAutoFlow: 'row',
		gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
		gap: 12,
	},
});
