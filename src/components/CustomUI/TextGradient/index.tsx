import { ReactNode } from 'react';
import React from 'react';
import { Stack } from '@mui/material';
import { Text } from './styled';

export interface TextGradientProps {
	children?: ReactNode;
	title: string;
}

const TextGradient = ({ children, title }: TextGradientProps) => {
	return (
		<Stack direction="row" alignItems="center" justifyContent="center">
			<Text sx={{ fontSize: { xs: 18, sm: 22 } }}>{title}</Text>
			{/* <Icon>{children}</Icon> */}
		</Stack>
	);
};

export default TextGradient;
