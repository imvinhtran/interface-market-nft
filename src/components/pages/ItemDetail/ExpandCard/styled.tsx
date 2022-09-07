/* eslint-disable @typescript-eslint/no-unused-vars */
import { CardActions, CardHeader, IconButton, styled, IconButtonProps } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

export const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(90deg)' : 'rotate(180deg)',
	transition: '0.6s ease',
	position: 'absolute',
	top: 0,
	right: 0,
}));

export const CardActionStyle = styled(CardActions)({
	position: 'relative',
	width: '100%',
	cursor: 'pointer',
});

export const CardHeaderStyle = styled(CardHeader)({
	padding: 0,
	transition: 'all 0.6s ease',
});
