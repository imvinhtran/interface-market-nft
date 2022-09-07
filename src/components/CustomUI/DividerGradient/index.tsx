import React from 'react';
import { styled } from '@mui/material';

const DividerGradientStyle = styled('div')(({ theme }) => ({
	width: '100%',
	height: '1px',
	backgroundImage: theme.palette.gradients.line,
}));

export interface DividerGradientProps {
	sx?: object;
}

export default function DividerGradient({ sx }: DividerGradientProps) {
	return <DividerGradientStyle sx={sx}></DividerGradientStyle>;
}
