import { Stack, Typography } from '@mui/material';
import * as React from 'react';

export interface IHeaderSectionProps {
	mainHeader: string;
	subHeader?: string;
}

export default function HeaderSection({ mainHeader, subHeader }: IHeaderSectionProps) {
	return (
		<Stack justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
			<Typography variant="h2" sx={{ textAlign: 'center' }}>
				{mainHeader}
			</Typography>
			<Typography variant="h5" sx={{ opacity: 0.5, maxWidth: '60%', textAlign: 'center' }}>
				{subHeader}
			</Typography>
		</Stack>
	);
}
