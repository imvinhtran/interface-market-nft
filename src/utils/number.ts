import numeral from 'numeral';

export const formatNumberWithText = (
	amount: number | string,
	minNumberLimitAfterComma: number,
	maxNumberLimitAfterComma?: number
): string => {
	if (maxNumberLimitAfterComma) {
		return numeral(amount).format(
			`0.${'0'.repeat(minNumberLimitAfterComma)}[${'0'.repeat(
				maxNumberLimitAfterComma - minNumberLimitAfterComma
			)}]a`
		);
	} else {
		return numeral(amount)
			.format(`0.${'0'.repeat(minNumberLimitAfterComma)}a`)
			.toUpperCase();
	}
};

export const formatNumber = (
	amount: number | string,
	minNumberLimitAfterComma: number,
	maxNumberLimitAfterComma?: number
): string => {
	if (maxNumberLimitAfterComma) {
		return numeral(amount).format(
			`0,0.${'0'.repeat(minNumberLimitAfterComma)}[${'0'.repeat(
				maxNumberLimitAfterComma - minNumberLimitAfterComma
			)}]`
		);
	} else {
		return numeral(amount).format(`0,0.${'0'.repeat(minNumberLimitAfterComma)}`);
	}
};

export function fData(number: string | number) {
	return numeral(number).format('0.0 b');
}
