const { create } = require('ipfs-http-client');

export const baseIpfsUrl = 'https://ipfs.io/ipfs/';

const ipfs = create({
	host: 'ipfs.infura.io',
	port: 5001,
	protocol: 'https',
	keepAlive: true,
});

export const addIPFS = async (file: any) => {
	return ipfs.add(file);
};
