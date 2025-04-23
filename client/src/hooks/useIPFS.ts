import { create } from 'ipfs-http-client'
import { API } from 'ipfs-core-types/src/root'

const useIPFS = () => {
    const ipfs = create({
        host: 'localhost',
        port: 5001,
        protocol: 'http'
    })

    const clientIPFS = ipfs

    const uploadFile: API['add'] = (entry, options) => {
        return clientIPFS.add(entry, options)
    }

    const readFIle = async <TData>(fileHash: string) => {
      try {
        const response = await fetch(`https://ipfs.io/ipfs/${fileHash}`);
        const data = await response.json();
        return data as TData;
      } catch (error) {
        console.error(error);
      }
    }

    return {
        uploadFile,
        readFIle
    }
}

export default useIPFS