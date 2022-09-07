import { BigNumber } from 'ethers';

export function toFixed(x: any) {
	if (Math.abs(x) < 1.0) {
		var e = parseInt(x.toString().split('e-')[1]);
		if (e) {
			x *= Math.pow(10, e - 1);
			x = '0.' + new Array(e).join('0') + x.toString().substring(2);
		}
	} else {
		e = parseInt(x.toString().split('+')[1]);
		if (e > 20) {
			e -= 20;
			x /= Math.pow(10, e);
			x += new Array(e + 1).join('0');
		}
	}
	return x;
}

export const parseUnits = (val: string | Number, decimal?: string | Number) => {
	const e = '1e' + decimal?.toString();
	const a = (Number(val) * Number(e)).toFixed(0);
	const f = toFixed(a);
	const c = BigNumber.from(f);
	return c;
};
