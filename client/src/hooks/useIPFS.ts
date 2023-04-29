
import { create } from 'ipfs-http-client'
import { API } from 'ipfs-core-types/src/root'

const useIPFS = () => {
    const auth = Buffer.from(`${process.env.NEXT_PUBLIC_INFURA_ID}:${process.env.NEXT_PUBLIC_INFURA_SECRET_KEY}`).toString('base64')

    const ipfs = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: `Basic ${auth}`,
        }
    })

    const clientIPFS = ipfs

    const uploadFile: API['add'] = (entry, options) => {
        return clientIPFS.add(entry, options)
    }

    const readFIle = async  <TData>(fileHash: string) => {
        try {
            const response = await fetch(`https://cloudflare-ipfs.com/ipfs/${fileHash}`);
            const data = await response.json();
            return data as TData
        } catch (error) {
            console.error(error)
        }
    }

    return {
        uploadFile,
        readFIle
    }
}

export default useIPFS