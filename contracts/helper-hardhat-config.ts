export interface networkConfigItem {
    ethUsdPriceFeed?: string
    blockConfirmations?: number
}

export interface networkConfigInfo {
    [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
    localhost: {},
    hardhat: {},
    goerli: {
        ethUsdPriceFeed: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
        blockConfirmations: 3
    },
    mumbai: {
        blockConfirmations: 3
    },
    testnet: {
        blockConfirmations: 3
    }
}

export const developmentChains = ['hardhat', 'localhost']