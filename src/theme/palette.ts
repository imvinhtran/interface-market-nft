/* eslint-disable @typescript-eslint/no-unused-vars */
import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function createGradient(color1: string, color2: string) {
	return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

interface GradientsPaletteOptions {
	main: string;
	modal: string;
	line: string;
	secondary: string;
	third: string;
	fourth: string;
}

declare module '@mui/material/styles/createPalette' {
	interface TypeBackground {
		neutral: string;
		pageBackground: string;
	}
	interface SimplePaletteColorOptions {
		lighter: string;
		darker: string;
	}
	interface PaletteColor {
		lighter: string;
		darker: string;
	}

	interface BorderColor {
		cardDark: string;
	}
	interface TypeText {
		special: string;
	}
	interface Palette {
		gradients: GradientsPaletteOptions;
		primaryLight: PaletteColor;
		border: BorderColor;
	}
	interface PaletteOptions {
		gradients?: GradientsPaletteOptions;
	}
}

declare module '@mui/material' {
	interface Color {
		0: string;
		500_8: string;
		500_12: string;
		500_16: string;
		500_24: string;
		500_32: string;
		500_48: string;
		500_56: string;
		500_80: string;
	}
}

// SETUP COLORS
const PRIMARY = {
	lighter: '#33B9FF',
	light: '#0768ff',
	main: '#004078',
	dark: '#0B2E4B',
	darker: '#001426',
};

const PRIMARY_LIGHT = {
	lighter: '#fff',
	light: '#F5F5F7',
	main: '#EBEBEB',
	dark: '#D9D9D9',
	darker: '#707070',
};

const GREY = {
	0: '#FFFFFF',
	100: '#F9FAFB',
	200: '#F4F6F8',
	300: '#DFE3E8',
	400: '#C4CDD5',
	500: '#919EAB',
	600: '#637381',
	700: '#454F5B',
	800: '#212B36',
	900: '#161C24',
	500_8: alpha('#919EAB', 0.08),
	500_12: alpha('#919EAB', 0.12),
	500_16: alpha('#919EAB', 0.16),
	500_24: alpha('#919EAB', 0.24),
	500_32: alpha('#919EAB', 0.32),
	500_48: alpha('#919EAB', 0.48),
	500_56: alpha('#919EAB', 0.56),
	500_80: alpha('#919EAB', 0.8),
};

const GRADIENTS = {
	main: 'linear-gradient(52deg,rgb(0, 255, 54) 7%,rgb(0, 238, 87) 17%,rgb(0, 197, 173) 37%,rgb(0, 164, 241) 52%,rgb(11, 24, 252) 88%,rgb(13, 0, 255) 94%)',
	modal: 'linear-gradient(to left, #00284b 0%, #020a1a 100%)',
	line: 'linear-gradient(to right,rgba(7, 104, 255, 0),#0768ff 53%,rgba(7, 104, 255, 0))',
	secondary: 'linear-gradient(to right,#020a1a 0%, #00284b 50%, #020a1a 100%)',
	third: 'linear-gradient(135deg, #0A2A49 0%, #074387 50%, #0A2A49 100%)',
	fourth: 'linear-gradient(135deg, rgba(0, 40, 75, 0) 0%, rgba(0, 40, 75, 0.502) 50%, #00284B 100%);',
};

const BORDER = {
	cardDark: '#004078',
};

const COMMON = {
	common: { black: '#1D1D1F', white: '#fff' },
	primary: { ...PRIMARY, contrastText: '#fff' },
	primaryLight: { ...PRIMARY_LIGHT, contrastText: GREY['800'] },
	grey: GREY,
	gradients: GRADIENTS,
	divider: GREY[500_24],
	border: BORDER,
	action: {
		hover: GREY[500_8],
		selected: GREY[500_16],
		disabled: GREY[500_80],
		disabledBackground: GREY[500_24],
		focus: GREY[500_24],
		hoverOpacity: 0.08,
		disabledOpacity: 0.48,
	},
};

const palette = {
	light: {
		...COMMON,
		text: {
			primary: '#1D1D1F',
			secondary: GREY['600'],
			disabled: GREY['500'],
			special: '#0066CC',
		},
		background: {
			paper: '#fff',
			default: '#fff',
			neutral: GREY['200'],
			pageBackground: '#F5F5F7',
		},
		action: { active: GREY['600'], ...COMMON.action },
	},
	dark: {
		...COMMON,
		text: {
			primary: '#fff',
			secondary: GREY['500'],
			disabled: GREY['600'],
			special: '#27FF00',
		},
		background: {
			paper: GREY['800'],
			default: GREY['900'],
			neutral: GREY['50016'],
			pageBackground: 'none',
		},
		action: { active: GREY['500'], ...COMMON.action },
	},
};

export default palette;
