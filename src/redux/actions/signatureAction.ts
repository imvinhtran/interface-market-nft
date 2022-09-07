import signatureApi from 'apis/signatureApi';
import { getSignatureRequest } from 'models';
import { getSignatureSuccess, hasError, startLoading } from 'redux/slices/signatureSlice';
import { dispatch } from '../store';

export function getSignature(data: string) {
	return async () => {
		dispatch(startLoading());
		try {
			const response: any = await signatureApi.getSignature(data);
			dispatch(getSignatureSuccess(response));
		} catch (error) {
			dispatch(hasError(error));
		}
	};
}
