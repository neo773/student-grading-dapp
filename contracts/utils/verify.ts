import { run } from 'hardhat'

const verify = async (contractName: string, contractAddress: string, args: any[]) => {
    console.log('Verifying contract...')
    try {
        await run('verify:verify', {
            contract: `solidity/${contractName}.sol:${contractName}`,
            address: contractAddress,
            constructorArguments: args
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes('already verified')) {
            console.log('Already verified!')
        } else {
            console.log(e)
        }
    }
}

export default verify