import React, { MouseEventHandler } from 'react';
// mui
import { Typography } from '@mui/material';
// styled
import { LoadmoreBtnStyle } from './styled';

export interface IButtonLoadmoreProps {
	text?: string;
	onClick: MouseEventHandler<HTMLDivElement>;
}

export default function ButtonLoadmore({ text = 'Load more', onClick }: IButtonLoadmoreProps) {
	return (
		<LoadmoreBtnStyle onClick={onClick}>
			<Typography variant="body1">{text}</Typography>
		</LoadmoreBtnStyle>
	);
}
