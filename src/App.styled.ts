import { styled } from '@mui/material';
// import BackgroundImage from 'assets/images/home/bg-img.webp';

export const RootPageWrapper = styled('div')(({ theme }) => ({
	width: '100%',
	overflow: 'clip',

	// these code is useless
	// ...(theme.palette.mode === 'light'
	// 	? { background: theme.palette.primaryLight.light }
	// 	: {
	// 			backgroundImage: 'linear-gradient(to right,#020a1a 0%,#00284b 50%,#020a1a 100%)',
	// 	  }),
}));

export const RootPage = styled('div')(({ theme }) => ({
	position: 'relative',

	// Temporarily remove img bg
	// ...(theme.palette.mode === 'light'
	// 	? {
	// 			backgroundImage: 'unset',
	// 	  }
	// 	: {
	// 			backgroundImage: `url('${BackgroundImage}')`,
	// 			backgroundSize: 'cover',
	// 			backgroundRepeat: 'no-repeat',
	// 			backgroundAttachment: 'fixed',
	// 	  }),
}));

// page background
export const PageBackground = styled('div')(({ theme }) => ({
	position: 'fixed',
	top: '0',
	width: '100%',
	height: '100%',
	zIndex: '0',

	...(theme.palette.mode === 'light'
		? { background: theme.palette.background.pageBackground }
		: {
				// opacity gradient background for dark theme
				opacity: '0.9',
				backgroundImage: theme.palette.gradients.secondary,
				// backgroundImage: -moz-linear-gradient(to left, #00284b 0%, #020a1a 100%);
		  }),
}));
