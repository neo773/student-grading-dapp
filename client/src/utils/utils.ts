import { MerkleTree } from "merkletreejs"
import keccak from "keccak"
import { ResultBatch } from "../types/types"

// Converts wei to ether values eg: 100000000000000000 -> 0.1
const weiToEther = (amount: number, decimals: number) => {
    const parsedUnit = amount / Math.pow(10, decimals)
    return parsedUnit
}

// Converts ether values to wei eg: 0.1 -> 100000000000000000
const etherToWei = (amount: number, decimals: number) => {
    const parsedUnit = amount * Math.pow(10, decimals)
    return parsedUnit
}

const addPlatformFees = (amount: number) => {
    return amount * (1 + 0.075/100)
}

const subtractPlatformFees = (amount: number) => {
    return amount / (1 + 0.075/100)
}


const keccak256 = (data: string | Buffer) => {
  return keccak("keccak256").update(data).digest()
}

const generateMerkleTree = (subjectsData: ResultBatch["subjectsData"]) => {
  const leaves = subjectsData.map((subject) =>
    keccak256(Buffer.from(`${subject.sbcode}:${subject.marks}`))
  )
  return new MerkleTree(leaves, keccak256, { sort: true })
}

const generateBatchMerkleTree = (data: ResultBatch[]) => {
  const leaves = data.map((student) => {
    const tree = generateMerkleTree(student.subjectsData)
    const studentData = `${student.name}:${student.roll}:${student.dep}:${student.sem}`
    return keccak256(Buffer.from(`${studentData}:${tree.getHexRoot()}`))
  })
  return new MerkleTree(leaves, keccak256, { sort: true })
}

const printDocument = () => {
    // @ts-ignore
    const prtHtml = document.getElementById("print").innerHTML

    let stylesHtml = ""
    for (const node of [
      ...document.querySelectorAll('link[rel="stylesheet"], style'),
    ]) {
      stylesHtml += node.outerHTML
    }

    // Open the print window
    const WinPrint = window.open(
      "",
      "",
      "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
    )

    WinPrint?.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        {${stylesHtml}}
      </head>
      <body>
        {${prtHtml}}
      </body>
    </html>
    `)

    WinPrint?.document.close()
    WinPrint?.focus()
    WinPrint?.print()
    WinPrint?.close()
  }

export {
    etherToWei,
    weiToEther,
    subtractPlatformFees,
    addPlatformFees,
    generateBatchMerkleTree,
    generateMerkleTree,
    keccak256,
    printDocument
}