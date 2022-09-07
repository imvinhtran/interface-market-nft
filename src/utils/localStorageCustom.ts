/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthSignature } from 'models';

const LOCAL_STORAGE_VARS = {
	THEME_MODE: 'themeMode',
	AUTH_SIGNATURES: 'authSignature',
	// SIGNATURE: 'signature',
	// SIGNATURE_MESSAGE_HASH: 'signatureMessageHash',
};

// THEME_MODE
const getThemeMode = (): string | null => {
	return localStorage.getItem(LOCAL_STORAGE_VARS.THEME_MODE);
};

const setThemeMode = (value: 'light' | 'dark'): void => {
	localStorage.setItem(LOCAL_STORAGE_VARS.THEME_MODE, value);
};

const removeThemeMode = (): void => {
	localStorage.removeItem(LOCAL_STORAGE_VARS.THEME_MODE);
};

// AUTH_SIGNATURES
const getAuthSignatureByUserAddress = (userAddress: string): AuthSignature | null | undefined => {
	// get data from localStorage
	const localData = localStorage.getItem(LOCAL_STORAGE_VARS.AUTH_SIGNATURES);

	if (localData) {
		// parse data to object
		const authSignatures: { [key: string]: AuthSignature } = JSON.parse(localData);
		return authSignatures[userAddress];
	}

	return null;
};

const setAuthSignature = (
	userAddress: string,
	signature: string,
	signatureMessageHash: string
): void => {
	// get data from localStorage
	const localData = localStorage.getItem(LOCAL_STORAGE_VARS.AUTH_SIGNATURES);

	let authSignatures: { [key: string]: AuthSignature } = {};

	// authSignatures: if localData = truthy => get object, localData = falsy => still empty object
	if (localData) {
		// parse data to object
		authSignatures = JSON.parse(localData);
	}

	// assign value to obj[key] with key = address
	authSignatures[userAddress] = {
		signature,
		signatureMessageHash,
	};

	// update localStorage
	localStorage.setItem(LOCAL_STORAGE_VARS.AUTH_SIGNATURES, JSON.stringify(authSignatures));
};

const removeAuthSignature = (userAddress: string): void => {
	// get data from localStorage
	const localData = localStorage.getItem(LOCAL_STORAGE_VARS.AUTH_SIGNATURES);

	if (localData) {
		// parse data to object
		const authSignatures = JSON.parse(localData);
		delete authSignatures[userAddress];

		// update localStorage
		localStorage.setItem(LOCAL_STORAGE_VARS.AUTH_SIGNATURES, JSON.stringify(authSignatures));
	}
};

export const localStorageCustom = {
	getThemeMode,
	setThemeMode,
	removeThemeMode,
	getAuthSignatureByUserAddress,
	setAuthSignature,
	removeAuthSignature,
};
