/// <reference types="react-scripts" />

declare module 'jazzicon' {
  export default function(diameter: number, seed: number): HTMLElement;
}

interface Window {
  ethereum?: {
    isMetamask?: true;
    on?: (...args: any[]) => avoid;
    removeListener?: (...args: any[]) => void;
    _handleChainChanged?: object;
    chainId?: string;
  };
  web3?: {};
  BinanceChain?: any;
}

declare module 'content-hash' {
  declare function decode(x: string): string;
  declare function getCodec(x: string): string;
}

declare module 'multihashes' {
  declare function decode(
    buff: Uint8Array,
  ): { code: number; name: string; length: number; digest:Uint8Array };
  declare function toB58String(hash: Uint8Array): string;
}