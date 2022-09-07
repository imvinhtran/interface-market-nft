import { Box, Link, styled } from '@mui/material';

// export const mainNavBarBreakpoint = '1200';

export const NavBar = styled(Box)({
	'@media screen and (max-width: 1230px)': {
		'.menuSmallScreen': {
			display: 'block',
		},
		'.menuBigScreen': {
			display: 'none',
		},
	},
	'@media screen and (min-width: 1230px)': {
		'.menuSmallScreen': {
			display: 'none',
		},
		'.menuBigScreen': {
			display: 'block',
		},
	},
});

// -----------------------------BIG SCREEN --------------------------------

export const NavigationBarBigScreen = styled('ul')({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-evenly',
});

export const NavigationItemBigScreen = styled('li')(({ theme }) => ({
	position: 'relative',
	listStyleType: 'none',

	'&:hover .navLink': {
		color: theme.palette.primary.lighter,
	},

	'&:hover .dropdownMenu': {
		opacity: 1,
		visibility: 'visible',
	},
}));

export const NavLinkBigScreen = styled(Link)(({ theme }) => ({
	color: theme.palette.text.primary,

	'&:hover': {
		color: theme.palette.primary.lighter,
	},
}));

export const DropdownMenu = styled('div')(({ theme }) => ({
	border: '1px solid #203f87',
	borderRadius: '5px',
	opacity: 0,
	visibility: 'hidden',
	position: 'absolute',
	top: '150%',
	left: '50%',
	transform: 'translateX(-50%)',
	transition: 'all 0.4s',
	zIndex: 100,

	...(theme.palette.mode === 'light'
		? {
				background: theme.palette.primaryLight.light,
				boxShadow: theme.customShadows.cardLight,
		  }
		: {
				backgroundImage: 'linear-gradient(to left, #00284b 0%, #020a1a 100%)',
		  }),
}));

export const DropdownMenuLink = styled('a')(({ theme }) => ({
	position: 'relative',
	padding: '12px',
	color: theme.palette.text.primary,
	cursor: 'pointer',

	'&:after': {
		content: '""',
		position: 'absolute',
		top: '100%',
		left: 0,
		width: '100%',
		height: '0.9px',
		backgroundImage: 'linear-gradient(90deg,rgba(7,104,255,0),#0768ff 53%,rgba(7,104,255,0))',
	},

	'&:hover': {
		color: theme.palette.primary.light,
	},
}));

// -----------------------------SMALL SCREEN --------------------------------

export const ContentWrapper = styled(Box)(({ theme }) => ({
	width: '100%',
	height: '100%',
	backgroundImage: 'linear-gradient(90deg,rgba(0,40,75,.94902),rgba(2,10,26,.94902))',
	padding: '20px 40px 0 30px',
}));

export const NavigationBarSmallScreen = styled('ul')({});

export const NavigationItemSmallScreen = styled('li')({
	listStyleType: 'none',
	marginBottom: 20,
});

export const NavLinkSmallScreen = styled(Link)(({ theme }) => ({
	color: theme.palette.text.primary,
}));
