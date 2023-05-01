import React, { useEffect } from "react"
import useIPFS from "../hooks/useIPFS"
import useContract, { useContractEthers } from "../hooks/useContract"
import { useImmer } from "use-immer"
import { createDraft, finishDraft } from "immer"
import { ResultBatch } from "../types/types"
import { useStoreState } from "../store/store"
import Result, { ModalProps } from "../components/Result/Result"
import Modal from "../components/Modal"
import { Delete, InfoCircle } from "react-iconly"
import { generateBatchMerkleTree } from "../utils/utils"
import Select from "../components/Select"
import { FieldValues, useForm } from "react-hook-form"
import { useRouter } from "next/router"

export type batch = {
  batchId: string
  IPFSHash: string
  data: ResultBatch[]
  merkleRootTree: string
}

interface State {
  modalData: {
    data: ResultBatch
    metaData: batch
  } | null
  showResultModal: boolean
  showModal: boolean
  modalError: boolean
  title: string | null
  description: string | null
  modalShowAction: boolean
  modalActionLink: string | null
  batchList: batch[]
}

type Form = FieldValues & {
  batchId: string
}

const ViewResults = () => {
  const storeState = useStoreState((state) => state.appState.user)

  const { control, watch } = useForm<Form>({
    defaultValues: {
      batchId: "1",
    },
  })

  const [state, updateState] = useImmer<State>({
    modalData: null,
    showResultModal: false,
    showModal: false,
    modalError: false,
    title: null,
    description: null,
    modalShowAction: false,
    modalActionLink: null,
    batchList: [],
  })

  const contract = useContract(
    "MainContract",
    process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS
  )

  const contractEthers = useContractEthers(
    "MainContract",
    process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS
  )

  const { readFIle, uploadFile } = useIPFS()

  const activeFormData = watch()

  const router = useRouter()

  const showModal = (
    error: boolean,
    title: string | null,
    description: string | null,
    showAction: boolean,
    actionLink: null | string
  ) => {
    updateState((state) => {
      state.modalError = error
      state.title = title
      state.description = description
      state.modalShowAction = showAction
      state.modalActionLink = actionLink
      state.showModal = true
    })
  }

  const viewResult = (data: ResultBatch, batchIndex: number) => {
    const batch = state.batchList[batchIndex]!
    updateState((state) => {
      state.modalData = {
        data: data,
        metaData: batch,
      }
      state.showResultModal = true
    })
  }

  const deleteRecord = async (recordIndex: number, batchIndex: number) => {
    try {
      const batch = createDraft<State["batchList"][0]>(
        state.batchList[batchIndex]!
      )

      batch.data.splice(recordIndex, 1)

      if (typeof batch?.data === "undefined") return
      const final = finishDraft(batch)

      const batchTree = generateBatchMerkleTree(final.data)
      const batchRoot = batchTree.getHexRoot()

      const newFile = await uploadFile(JSON.stringify(final.data))

      const response = await contractEthers.editBatch(
        final.batchId,
        batchRoot,
        newFile.cid.toString()
      )

      const txid = `https://testnet.bscscan.com/tx/${response.hash}`

      showModal(false, "Success!", "Record successfully deleted", true, txid)

      updateState((state) => {
        state.batchList[batchIndex]?.data.splice(recordIndex, 1)
      })
    } catch (error) {
      console.log(error)
      showModal(true, "Error!", "Action was cancelled by user", false, null)
    }
  }

  const fetchData = async () => {
    try {
      const data = await contract.methods.getAllBatches().call()

      updateState((state) => {
        state.batchList = []
      })

      data.map(async (item) => {
        const file = await readFIle<ResultBatch[]>(item.IPFSHash)
        if (typeof file !== "undefined") {
          updateState((state) => {
            state.batchList.push({
              batchId: item.batchId,
              IPFSHash: item.IPFSHash,
              merkleRootTree: item.studentRecordsRoot,
              data: file,
            })
          })
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="container">
        <div className="pb-5 pt-5">
          <div className="flex justify-between items-center pb-10">
            <h1 className="text-white text-5xl pb-10 font-bold">Result List</h1>
            {state.batchList.length > 0 ? (
              <div className="flex items-center">
                <Select
                  name={"batchId"}
                  defaultValue={"1"}
                  listData={state.batchList.map((batch) => {
                    return {
                      [batch.batchId]: batch.batchId,
                    }
                  })}
                  placeholder={"Batch ID"}
                  label={"Batch ID"}
                  control={control}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="w-full px-20 flex justify-center">
            <div className="mt-4 -mb-3 col-9">
              <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25">
                <div
                  style={{ backgroundPosition: "10px 10px" }}
                  className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
                ></div>
                <div className="relative rounded-xl overflow-auto">
                  <div className="shadow-sm overflow-hidden my-8">
                    <table className="border-collapse table-auto w-full text-sm ">
                      <thead>
                        <tr>
                          <th className="border-b dark:border-slate-600 p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center font-semibold">
                            Name
                          </th>
                          <th className="border-b dark:border-slate-600 p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center font-semibold">
                            Roll No
                          </th>
                          <th className="border-b dark:border-slate-600 p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center font-semibold">
                            Semester
                          </th>
                          <th className="border-b dark:border-slate-600 p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center font-semibold">
                            Department
                          </th>
                          <th className="border-b dark:border-slate-600 p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center font-semibold">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      {state.batchList.length === 0 ? (
                        <tbody>
                          <tr>
                            <td colSpan={5} className="text-center">
                              <div className="flex flex-col flex-grow justify-center items-center p-4 pb-0">
                                <h1 className="text-3xl text-white font-semibold">
                                  No Results Declared
                                </h1>
                                <button
                                  className="btn mt-5  w-[180px] capitalize mr-4 rounded-lg ring-slate-900/5 hover:ring-slate-900/10 ring-0 shadow-none hover:shadow-none hover:highlight-white/10 hover:shadow-sky-200 hover:bg-sky-400 bg-sky-500 dark:highlight-white/10 text-white"
                                  onClick={() => {
                                    router.push("/add-result")
                                  }}
                                >
                                  Add Result
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      ) : (
                        <tbody className="bg-white dark:bg-slate-800">
                          {state.batchList
                            .filter(
                              (batch) =>
                                batch.batchId === activeFormData.batchId
                            )
                            .map((batch, batchIndex) => {
                              return batch.data.map((record, recordIndex) => (
                                <tr key={recordIndex}>
                                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                    {record.name}
                                  </td>
                                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                    {record.roll}
                                  </td>
                                  {record.sem === 0 ? (
                                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                      {record.sem + 1}
                                    </td>
                                  ) : (
                                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                      {record.sem}
                                    </td>
                                  )}
                                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                    {record.dep === "if"
                                      ? "Information Technology"
                                      : record.dep === "co"
                                      ? "Computer Engineering"
                                      : "Electronic Engineering"}
                                  </td>

                                  <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400 text-center">
                                    <div className="flex gap-5">
                                      <button
                                        onClick={() =>
                                          viewResult(record, batchIndex)
                                        }
                                        className="flex justify-center gap-1 items-center bg-sky-500 hover:bg-sky-600 text-white transition all ease-in-out 300 rounded-lg py-3 w-[130px]"
                                      >
                                        <InfoCircle size={20} />
                                        View
                                      </button>
                                      <button
                                        onClick={() =>
                                          deleteRecord(recordIndex, batchIndex)
                                        }
                                        className="flex justify-center gap-1 items-center bg-red-500 hover:bg-red-600 text-white transition all ease-in-out 300 rounded-lg py-3 w-[130px]"
                                      >
                                        <Delete size={20} />
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            })}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={state.showModal}
        type={state.modalError ? "error" : "success"}
        showAction={state.modalShowAction}
        actionLink={state.modalActionLink ?? undefined}
        modalTitle={state.title}
        modalDescription={state.description}
        closeModal={(value: boolean) => {
          updateState((state) => {
            state.showModal = value
          })
        }}
      />
      {state.modalData !== null && (
        <Result
          key={state.modalData.data.roll}
          isOpen={state.showResultModal}
          modalData={{
            data: state.modalData.data,
            metaData: state.modalData.metaData,
          }}
          closeModal={(value: boolean) => {
            updateState((state) => {
              state.showResultModal = value
            })
          }}
        />
      )}
    </>
  )
}

export default ViewResults
