import { JsonRpcSigner, Provider } from '@ethersproject/providers'
import { Web3Provider } from '@ethersproject/providers'
import { provider } from 'web3-core';


declare global {
    interface Window {
        // ethereum: import('ethers').providers.ExternalProvider;
        ethereum: provider;
        web3Instance: Web3Provider
        web3Signer: JsonRpcSigner
    }

    declare module '@conveyorhq/react-spreadsheet-import/dist' {
        export * from '@conveyorhq/react-spreadsheet-import'
    }
}