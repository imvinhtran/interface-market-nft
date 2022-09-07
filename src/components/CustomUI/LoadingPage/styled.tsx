import { styled } from '@mui/material';

export const LoadingPageStyled = styled('div')(({ theme }) => ({
	position: 'fixed',
	width: '100vw',
	height: '100vh',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 10000,

	...(theme.palette.mode === 'light'
		? {
				background: theme.palette.background.pageBackground,
		  }
		: {
				backgroundImage: theme.palette.gradients.secondary,
				backdropFilter: 'blur(1000px)',
				WebkitBackdropFilter: 'blur(1000px)',
		  }),
}));

export const Point = styled('div')({
	position: 'absolute',
	width: '15px',
	height: '15px',
	borderRadius: '100%',
	backgroundColor: 'white',
	zIndex: 2000,
});

export const ImgLoading = styled('img')({
	width: '200px',
	height: '200px',
	position: 'absolute',
});

export const LoadingContent = styled('div')({
	width: '500px',
	height: '500px',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	backgroundColor: 'transparent',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});
