import { styled, Box } from '@mui/material';

export const Text = styled('p')(({ theme }) => ({
	fontWeight: 600,
	background:
		'linear-gradient(52deg, #00ff36 7%, #00ee57 17%, #00c5ad 37%, #00a4f1 52%, #0b98fc 88%, #0066ff 94%)',
	backgroundClip: 'text',
	WebkitBackgroundClip: 'text',
	WebkitTextFillColor: 'transparent',
}));

export const Icon = styled(Box)(({ theme }) => ({
	width: 40,
	marginLeft: 5,
}));
