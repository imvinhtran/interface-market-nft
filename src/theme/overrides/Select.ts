import ExpandMoreRoundedIcon from '@mui/material/Icon';
import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default function Select(theme: Theme) {
	return {
		MuiSelect: {
			defaultProps: {
				IconComponent: ExpandMoreRoundedIcon,
			},

			styleOverrides: {
				root: {},
			},
		},
	};
}
