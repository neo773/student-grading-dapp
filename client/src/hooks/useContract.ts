import MainContractABI from "contracts/abi/ResultDapp.json"
import { ContractContext as MainContextEthers } from "contracts/contract-types/ethers/ResultDapp"
import { ContractContext as MainContext } from "contracts/contract-types/web3/ResultDapp"
import Web3 from "web3"
import { AbiItem } from 'web3-utils/types/index';

import { ContractInterface, ethers, providers } from 'ethers'

type AvailableContracts = 'MainContract'

/* 
 Use Ethers.js for mutation calls to smart contracts as Web3.js can be slow (taking up to 20 seconds),
 while Ethers.js provides instant responses. However, retain Web3.js for query calls, as Ethers.js
 returns BigNumber objects instead of strings, causing potential issues.
 */
export const useContractEthers = (contractName: AvailableContracts, contractAddress: string) => {
    const getContract = <T>(contractABI: ContractInterface, contractAddress: string) => {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum as providers.ExternalProvider);
        const web3Signer = web3Provider.getSigner()

        const Contract = new ethers.Contract(
            contractAddress,
            contractABI,
            web3Signer
        ) as unknown as T
        return Contract
    }

    switch (contractName) {

        case "MainContract": {
            const Contract = getContract<MainContextEthers>(
                MainContractABI.abi,
                contractAddress
            )
            return Contract
        }

    }
}

const useContract = (contractName: AvailableContracts, contractAddress: string) => {

    const getContract = <T>(contractABI: AbiItem, contractAddress: string) => {
        const web3 = new Web3(window.ethereum)

        const Contract = new web3.eth.Contract(
            contractABI,
            contractAddress
        ) as unknown as T

        return Contract
    }

    switch (contractName) {

        case "MainContract": {
            const Contract = getContract<MainContext>(
                MainContractABI.abi as unknown as AbiItem,
                contractAddress
            )
            return Contract
        }

    }
}


export type {
    MainContext,
}

export default useContract