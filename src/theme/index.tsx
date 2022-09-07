/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, ReactNode } from 'react';
//mui
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider, StyledEngineProvider } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
//
import shape from './shape';
import palette from './palette';
import typography from './typography';
import breakpoints from './breakpoints';
import GlobalStyles from './globalStyles';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------

type ThemeConfigProps = {
	children: ReactNode;
};

export default function ThemeConfig({ children }: ThemeConfigProps) {
	const { themeMode } = useSettings();
	const isLight = themeMode === 'light';

	const themeOptions: any = useMemo(
		() => ({
			palette: isLight
				? { ...palette.light, mode: 'light' }
				: { ...palette.dark, mode: 'dark' },
			shape,
			typography,
			breakpoints,
			shadows: isLight ? shadows.light : shadows.dark,
			customShadows: isLight ? customShadows.light : customShadows.dark,
		}),
		[isLight]
	);

	const theme = createTheme(themeOptions);
	theme.components = componentsOverride(theme);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<GlobalStyles />
				{children}
			</ThemeProvider>
		</StyledEngineProvider>
	);
}
