// ----------------------------------------------------------------------

declare module '@mui/system' {
	interface Shape {
		borderRadiusSm: number | string;
		borderRadiusMd: number | string;
		borderRadiusLg: number | string;
	}
}

const shape = {
	borderRadius: 8,
	borderRadiusSm: 12,
	borderRadiusMd: 16,
	borderRadiusLg: 20,
};

export default shape;
