import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default function Snackbar(theme: Theme) {
	return {
		MuiSnackbarContent: {
			styleOverrides: {
				root: {},
			},
		},
	};
}
