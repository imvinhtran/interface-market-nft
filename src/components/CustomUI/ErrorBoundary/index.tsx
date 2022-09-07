import { IconButton, Typography } from '@mui/material';
import React from 'react';
import { ErrorBoundaryContainer, ErrorBoundaryWrapper } from './styled';
import RefreshIcon from '@mui/icons-material/Refresh';

export interface IErrorBoundaryProps {
	callbackFn: Function;
	title: string;
	content: string;
}

export default function ErrorBoundary({ callbackFn, title, content }: IErrorBoundaryProps) {
	return (
		<ErrorBoundaryContainer>
			<ErrorBoundaryWrapper>
				<Typography variant="h4">{title}</Typography>
				<Typography variant="body1">{content}</Typography>
				<IconButton aria-label="refresh" onClick={(e) => callbackFn(e)}>
					<RefreshIcon />
				</IconButton>
			</ErrorBoundaryWrapper>
		</ErrorBoundaryContainer>
	);
}
