export function textStyled(fontSize: number | string, fontWeight: number | string, color: string) {
	return {
		color,
		fontSize,
		fontWeight,
	};
}

export function textGradient(background: string) {
	return {
		background: background,
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
		backgroundClip: 'text',
	};
}

export function buttonStyled(
	padding: string,
	fontSize: number | string,
	fontWeight: number | string,
	color: string
) {
	return {
		padding,
		fontSize,
		fontWeight,
		color,
	};
}

export function flexStyled(justifyContent: string, alignItems: string) {
	return { display: 'flex', justifyContent, alignItems };
}
