import { Box, styled } from '@mui/material';

export const BoxGrid = styled(Box)({
	display: 'grid',
	gridAutoFlow: 'row',
	gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
	gap: 15,
});
