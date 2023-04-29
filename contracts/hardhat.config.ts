import '@nomicfoundation/hardhat-toolbox'
import '@nomiclabs/hardhat-solhint'
import './config/env'
import 'hardhat-deploy'
import '@nomiclabs/hardhat-etherscan'
import { HardhatUserConfig } from 'hardhat/config'


const BSC_TESTNET_RPC_URL = process.env.BSC_TESTNET_RPC_URL
const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY 

const config: HardhatUserConfig = {
    defaultNetwork: 'hardhat',
    networks: {
        hardhat: {
            chainId: 31337
        },
        testnet: {
            url: BSC_TESTNET_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 97
        }
    },
    solidity: {
        compilers: [
            {
                version: '0.8.16'
            },
            {
                version: '0.8.15'
            },
        ]
    },
    etherscan: {
        apiKey: {
            bscTestnet: BSCSCAN_API_KEY
        }
    },
    namedAccounts: {
        deployer: {
            default: 0,
            1: 0
        }
    },
    paths: {
        sources: "./solidity",
      },
}


export default config