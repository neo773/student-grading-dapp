import React, { useEffect } from "react"
import { useImmer } from "use-immer"
import useContract from "../hooks/useContract"

import ipfsClient from "ipfs-http-client"
import useIPFS from "../hooks/useIPFS"
import { ResultBatch } from "../types/types"
import { printDocument } from "../utils/utils"
import Result from "../components/Result/Result"
import Modal from "../components/Modal/Modal"

interface State {
  rollNumber: null | string
  allRecords: ResultBatch[]
  myRecord: ResultBatch | null
  submitted: boolean
  showModal: boolean
  modalShowAction: boolean
  modalActionLink: null | string
  modalError: null | boolean
  title: null | string
  description: null | string
}

const checkResult = () => {
  const { readFIle } = useIPFS()

  const contract = useContract(
    "MainContract",
    process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS
  )

  const [state, updateState] = useImmer<State>({
    rollNumber: null,
    allRecords: [],
    myRecord: null,
    submitted: false,
    showModal: false,
    modalShowAction: false,
    modalActionLink: null,
    modalError: null,
    title: null,
    description: null,
  })

  const getMarks = async () => {
    const rollNumber = state.rollNumber
    const filtered = state.allRecords.filter(
      (record) => record.roll === rollNumber
    )
    updateState((state) => {
      if (typeof filtered[0] !== "undefined") {
        state.myRecord = filtered[0]
      }
    })
    if (filtered.length === 0) {
      showModal(true, "Error!", "Result not found", false, null)
    } else {
      updateState((state) => {
        state.submitted = true
      })
    }
  }

  const resetForm = () => {
    updateState((state) => {
      state.submitted = false
      state.rollNumber = null
      state.myRecord = null
    })
  }

  const fetchData = async () => {
    try {
      const data = await contract.methods.getAllBatches().call()

      data.map(async (item) => {
        const file = await readFIle<ResultBatch[]>(item.IPFSHash)
        updateState((state) => {
          if (typeof file === "undefined") return
          for (const fileData of file) {
            state.allRecords.push(fileData)
          }
        })
        console.log(state.allRecords)
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

      {state.myRecord !== null && (
        <Result
          isOpen={state.submitted}
          data={state.myRecord}
          closeModal={(value: boolean) => {
            updateState((state) => {
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
