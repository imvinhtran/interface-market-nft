import React from 'react';
import { Stack, Box, styled } from '@mui/material';
import DividerGradient from 'components/CustomUI/DividerGradient';

export interface SectionTitleProps {
	title: string;
	icon: any;
	alt: string;
}

const TextTitle = styled('div')({
	fontSize: 18,
	fontWeight: 'bold',
	color: 'white',
	lineHeight: 1,
});

export default function SectionTitle({ title, icon, alt }: SectionTitleProps) {
	return (
		<Box sx={{ width: '100%' }}>
			<Stack
				direction="row"
				justifyContent="flex-start"
				alignItems="flex-end"
				spacing={1}
				sx={{ paddingBottom: 2 }}
			>
				<img src={icon} alt="title icon" width={25} />
				<TextTitle>{title}</TextTitle>
			</Stack>
			<DividerGradient />
		</Box>
	);
}
