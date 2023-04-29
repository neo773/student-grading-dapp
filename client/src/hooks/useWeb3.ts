import { ethers } from "ethers5"


const useWeb3 = () => {
    const web3Provider = new ethers.providers.Web3Provider(window.web3Instance.provider)
    return web3Provider
}


export default useWeb3