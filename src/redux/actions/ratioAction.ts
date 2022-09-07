import { dispatch } from '../store';
import commonApi from 'apis/commonApi';
import { startLoading, hasError, setRatioSuccess } from 'redux/slices/ratioSlice';

export function fetchRatio(data: any) {
	const { base, quote } = data;
	return async () => {
		dispatch(startLoading());
		try {
			const response = await commonApi.getQuote(data);
			dispatch(setRatioSuccess({ [`${base}${quote}`]: response }));
		} catch (error) {
			dispatch(hasError(error));
		}
	};
}
