/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, useState } from 'react';
// mui
import { Box, Collapse, useTheme } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// styled
import { CardActionStyle, CardHeaderStyle, ExpandMore } from './styled';
// components
import DividerGradient from 'components/CustomUI/DividerGradient';

interface ExpandMoreProps {
	children: ReactNode;
	title: string;
	icon: any;
	alt: string;
}

export default function ExpandCard({ children, title, icon, alt }: ExpandMoreProps) {
	const theme = useTheme();
	const [expanded, setExpanded] = useState(true);

	// vars
	const isLightTheme = theme.palette.mode === 'light';

	const handleExpand = () => {
		setExpanded(!expanded);
	};

	return (
		<Box sx={{ width: '100%' }}>
			<CardActionStyle onClick={handleExpand}>
				<CardHeaderStyle
					avatar={<img src={icon} alt={alt} width={25} />}
					titleTypographyProps={{ variant: 'h5', fontWeight: '100', pr: 4 }}
					title={title}
				/>
				<ExpandMore expand={expanded} aria-expanded={expanded} aria-label="show more">
					<KeyboardArrowUpIcon
						sx={{
							width: '40px',
							height: '40px',
							color: isLightTheme ? '#000' : '#fff',
						}}
					/>
				</ExpandMore>
			</CardActionStyle>
			<DividerGradient />
			<Collapse
				in={expanded}
				timeout="auto"
				unmountOnExit
				sx={{ transition: 'all 0.6s ease-out' }}
			>
				{children}
			</Collapse>
		</Box>
	);
}
