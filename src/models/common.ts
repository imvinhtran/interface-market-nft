export interface PaginationParams {
	totalPages: number;
	currentPage: number;
	pageSize: number;
	totalItems: number;
}

export interface Pagination {
	pageSize: number;
	page: number;
}

//Response
export interface ListResponse<T> {
	data: T[];
	pagination: PaginationParams;
}

export interface ListResponseNonPaging<T> {
	data: T[];
}

export interface Response<T> {
	data: T;
}

//Request
export interface ListParams {
	[key: string]: any;
}

// Reducer
export type ActionMap<M extends { [index: string]: any }> = {
	[Key in keyof M]: M[Key] extends undefined
		? {
				type: Key;
		  }
		: {
				type: Key;
				payload: M[Key];
		  };
};

export interface ListValue {
	[key: string]: any;
}

export interface OptionSelectCustom {
	name: number | string;
	value: number | string;
	image?: string;
}

export interface CustomFile extends File {
	path?: string;
	preview?: string;
	raw?: File;
}

export interface UploadItemResponse {
	itemMedia: string;
	itemOriginMedia: string;
}
