import React, { useEffect } from "react"
import { useImmer } from "use-immer"
import useContract from "../hooks/useContract"

import ipfsClient from "ipfs-http-client"
import useIPFS from "../hooks/useIPFS"
import { ResultBatch } from "../types/types"
import { printDocument } from "../utils/utils"
import Result from "../components/Result/Result"
import Modal from "../components/Modal/Modal"
import { batch } from "./view-result"

interface State {
  modalData: {
    data: ResultBatch | null
    metaData: batch | null
  }
  showResultModal: boolean
  showModal: boolean
  modalError: boolean
  submitted: boolean
  title: string | null
  description: string | null
  modalShowAction: boolean
  modalActionLink: string | null
  batchList: batch[]
  rollNumber: string | null
}

const checkResult = () => {
  const { readFIle } = useIPFS()

  const contract = useContract(
    "MainContract",
    process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS
  )

  const [state, updateState] = useImmer<State>({
    modalData: {
      data: null,
      metaData: null,
    },
    rollNumber: null,
    submitted: false,
    showModal: false,
    modalShowAction: false,
    modalActionLink: null,
    showResultModal: false,
    modalError: false,
    title: null,
    description: null,
    batchList: [],
  })

  const getMarks = async () => {
    const rollNumber = state.rollNumber

    const result = {} as State["modalData"]

    const resultCheck = state.batchList.some((batch) => {
      const data = batch.data.find((record) => record.roll === rollNumber)
      if (typeof data !== "undefined") {
        result.data = data
        result.metaData = batch
        return true
      }
    })

    if (!resultCheck) {
      return showModal(true, "Error!", "Result not found", false, null)
    }

    updateState((state) => {
      state.modalData = {
        data: result.data,
        metaData: result.metaData,
      }
      state.showResultModal = true
      state.submitted = true
    })
  }

  const resetForm = () => {
    updateState((state) => {
      state.submitted = false
      state.rollNumber = null
    })
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

  const showModal = (
    error: boolean,
    title: string | null,
    description: string | null,
    showAction: boolean,
    actionLink: null
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
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className="container">
        <div className="pb-5 pt-5">
          <div className="w-full px-20" id="print">
            <h1 className="text-white text-5xl pb-10 font-bold text-center">
              Check Result
            </h1>

            <div className="row add text-white justify-center">
              {!state.submitted && (
                <div className="sm:col-5 md:col-5 lg:col-5 xl:col-5 bg-slate-800 rounded-xl px-5 py-8">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-lg text-white">
                        Enter Roll Number
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Roll Number"
                      className="input input-bordered bg-[#ffffff22] rounded-lg border border-[#8b8b8b3b]"
                      value={state.rollNumber ?? ""}
                      onChange={(e) => {
                        updateState((state) => {
                          state.rollNumber = e.target.value
                        })
                      }}
                    />
                  </div>

                  <button
                    className="btn mt-5 w-full capitalize mr-4 rounded-lg ring-slate-900/5 hover:ring-slate-900/10 ring-0 shadow-none hover:shadow-none hover:highlight-white/10 hover:shadow-sky-200 hover:bg-sky-400 bg-sky-500 dark:highlight-white/10 text-white"
                    onClick={getMarks}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {state.submitted && (
        <Result
          key={state.modalData?.data?.roll}
          isOpen={state.showResultModal}
          modalData={{
            data: state.modalData.data!,
            metaData: state.modalData.metaData!,
          }}
          closeModal={(value: boolean) => {
            updateState((state) => {
              state.showResultModal = value
              state.submitted = value
            })
          }}
        />
      )}

      <Modal
        isOpen={state.showModal}
        type={state.modalError ? "error" : "success"}
        showAction={state.modalShowAction}
        actionLink={state.modalActionLink ?? undefined}
        modalTitle={state.title}
        modalDescription={state.description}
        closeModal={(value: boolean) => {
          updateState((state) => {
            state.submitted = value
            state.showModal = value
          })
        }}
      />
    </>
  )
}

export default checkResult
