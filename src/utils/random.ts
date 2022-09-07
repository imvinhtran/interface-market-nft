import BigInt from 'big-integer';

const CREATOR_OFFSET_MULTIPLIER = BigInt(2).pow(BigInt(256 - 160));

const IS_NFT_OFFSET_MULTIPLIER = BigInt(2).pow(BigInt(256 - 160 - 1));

const PACK_ID_OFFSET_MULTIPLIER = BigInt(2).pow(BigInt(256 - 160 - 1 - 32 - 40));

const PACK_NUM_FT_TYPES_OFFSET_MULTIPLIER = BigInt(2).pow(BigInt(256 - 160 - 1 - 32 - 40 - 12));

export const generateTokenId = (
	web3: any,
	creator: any,
	supply: any,
	packId: any,
	numFTs: any,
	packIndex: any
) => {
	const c = BigInt(web3.utils.hexToNumberString(creator));
	const _creator = BigInt(c).multiply(CREATOR_OFFSET_MULTIPLIER);
	const _supply = supply === 1 ? BigInt(1).multiply(IS_NFT_OFFSET_MULTIPLIER) : BigInt(0); // minted as NFT (1) or FT (0) // IS_NFT
	const value = _creator
		.add(_supply)
		.add(BigInt(packId).multiply(PACK_ID_OFFSET_MULTIPLIER)) // packId (unique pack) // PACk_ID
		.add(BigInt(numFTs).multiply(PACK_NUM_FT_TYPES_OFFSET_MULTIPLIER))
		.add(
			BigInt(packIndex) // number of fungible token in the pack // PACK_NUM_FT_TYPES
		);
	const id = value.toArray(10).value.join('');
	return id;
};

export const getRandomUint40 = () => {
	return parseInt(Date.now().toString().substring(2));
};

export const getRandomUint32 = (web3: any) => {
	return new web3.utils.BN(web3.utils.randomHex(4), 16);
};

export const randomColor = (hexString: string) => {
	hexString = hexString + getRandomUint40().toString();
	let hex = hexString.substring(37, hexString.length);
	let hexCode = '#';
	for (let i = 0; i < 6; i++) {
		hexCode += hex[Math.floor(Math.random() * hex.length)];
	}
	return hexCode;
};

export const generateGrad = (userAddress: string) => {
	// let c1 = userAddress.substring(0, 13);
	// let c2 = userAddress.substring(14, 27);
	// let c3 = userAddress.substring(28, 42);
	let colorOne = randomColor(userAddress);
	let colorTwo = randomColor(userAddress);
	let colorThree = randomColor(userAddress);
	let angle = Math.floor(Math.random() * 360);
	return `linear-gradient(${angle}deg, ${colorOne} 0%, ${colorTwo}) 50%, ${colorThree} 100%`;
};
