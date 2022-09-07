import { ListParams } from 'models';

export function generateQueryString(params: ListParams) {
	const query = Object.keys(params)
		.map((key) => {
			if (!params[key]) return '';
			return `${key}=${params[key]}`;
		})
		.join('&');

	return query;
}

export const checkHasNextPage = (currentPage: number, totalPages: number) => {
	return currentPage < totalPages ? true : false;
};
