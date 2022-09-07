export interface Signature {
	_id?: string;
	r: string;
	s: string;
	v: string;
	messageHash: string;
	rawTransaction: string;
	transactionHash: string;
	isDeleted?: boolean;
}

export interface SignatureRSV {
	r: string;
	s: string;
	v: string;
}

export interface getSignatureRequest {
	signatureId: string;
}

export interface AuthSignature {
	signature: string;
	signatureMessageHash: string;
}
