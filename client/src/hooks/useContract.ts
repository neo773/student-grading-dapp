import MainContractABI from "../../../contracts/abi/ResultDapp.json"
// import { ContractContext as MainContext } from "../../../contracts/contract-types/ethers/ResultDapp"
import { ContractContext as MainContext } from "../../../contracts/contract-types/web3/ResultDapp"
import Web3 from "web3"
import detectEthereumProvider from '@metamask/detect-provider';
import { AbiItem } from 'web3-utils';

import { ContractInterface, ethers } from 'ethers'

type AvailableContracts = 'MainContract'



const useContract = (contractName: AvailableContracts, contractAddress: string) => {

    const getContract = <T>(contractABI: unknown, contractAddress: string) => {
        const web3 = new Web3(window.ethereum)

        const Contract = new web3.eth.Contract(
            contractABI as AbiItem,
            contractAddress
        ) as unknown as T

        return Contract
    }

    switch (contractName) {

        case "MainContract": {
            const Contract = getContract<MainContext>(
                MainContractABI.abi,
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