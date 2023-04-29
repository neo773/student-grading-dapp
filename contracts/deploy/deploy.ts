import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { developmentChains, networkConfig } from '../helper-hardhat-config'
import verify from '../utils/verify'


const mainContractArgs = []

const contractsDeployer: DeployFunction = async (
    hre: HardhatRuntimeEnvironment
) => {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log('Deploying ResulDapp and waiting for confirmations...')

    const mainContract = await deploy('ResultDapp', {
        from: deployer,
        args: mainContractArgs,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 0
    })

    log(`✅ ResulDapp deployed at ${mainContract.address} from deployer ${deployer}`)

    await verify('ResultDapp', mainContract.address, mainContractArgs)

    log(`Replace .env with new contracts \nNEXT_PUBLIC_MAIN_CONTRACT_ADDRESS='${mainContract.address}'`)

}


export default contractsDeployer