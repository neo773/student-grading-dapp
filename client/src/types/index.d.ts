import { JsonRpcSigner, Provider } from '@ethersproject/providers'
import { Web3Provider } from '@ethersproject/providers'
import { provider } from 'web3-core';


declare global {
    interface Window {
        ethereum: provider;
        web3Instance: Web3Provider
        web3Signer: JsonRpcSigner
    }
}