import { useEffect } from "react"
import Input from "../components/Input/input"
import { FieldValues, useForm } from "react-hook-form"
import Select from "../components/Select/Select"
import syllabus from "../data/syllabus"
import { useImmer } from "use-immer"
import useContract, { useContractEthers } from "../hooks/useContract"
import { generateBatchMerkleTree } from "../utils/utils"
import { useStoreState } from "../store/store"
import { BatchResponse } from "../../../contracts/contract-types/web3/ResultDapp"
import { objectEntries } from "ts-extras"
import Toggle from "../components/Toggle/Toggle"
import useIPFS from "../hooks/useIPFS"
import { ResultBatch } from "../types/types"

import { ReactSpreadsheetImport } from "react-spreadsheet-import-v2"
import { themeOverrides } from "../utils/theme"
import Modal from "../components/Modal"

type Form = FieldValues & {
  fullName: string
  department: keyof typeof syllabus
  rollNumber: string
  semester: number
  subjectMarks: string[]
  remarks: string
  batchId: string
}

interface State {
  currentBatches: BatchResponse[]
  selectedBatchIndex: number
  selectedSemesterIndex: number
  createNewBatch: boolean
  showResultModal: boolean
  showModal: boolean
  modalError: boolean
  title: string | null
  description: string | null
  modalShowAction: boolean
  modalActionLink: string | null
  showUploadModal: boolean
}

const AddResult = () => {
  const storeState = useStoreState((state) => state.appState.user)

  const [state, updateState] = useImmer<State>({
    currentBatches: [],
    selectedBatchIndex: 0,
    selectedSemesterIndex: 0,
    createNewBatch: false,
    showResultModal: false,
    showModal: false,
    modalError: false,
    title: null,
    description: null,
    modalShowAction: false,
    modalActionLink: null,
    showUploadModal: false,
  })

  const { readFIle, uploadFile } = useIPFS()

  const { control, handleSubmit, watch } = useForm<Form>({
    defaultValues: {
      department: "if",
      semester: 1,
      batchId: "1",
    },
  })

  const formData = watch()

  const contract = useContract(
    "MainContract",
    process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS
  )

  const contractEthers = useContractEthers(
    "MainContract",
    process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS
  )

  const fetchAllBatches = async () => {
    const currentBatches = await contract.methods.getAllBatches().call()
    updateState((state) => {
      state.currentBatches = currentBatches
    })
  }

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

  const submitMarks = async (data: Form | Form[]) => {
    try {
      const currentBatchId =
        state.currentBatches[state.currentBatches.length - 1]?.batchId ?? "0"

      const studentsData: ResultBatch[] = []

      const subjectsData = Array.isArray(data)
        ? syllabus[data[0]!.department].semesters[data[0]!.semester]
        : syllabus[data.department].semesters[data.semester]

      if (typeof subjectsData === "undefined") return

      const prepareData = (data: Form) => ({
        name: data.fullName,
        roll: data.rollNumber,
        dep: data.department,
        sem: data.semester,
        subjectsData: objectEntries(subjectsData)
          .map(([key, value], index) => {
            const sbcode = `${value} (${key})`
            const marks = data.subjectMarks[index]
            if (typeof sbcode === "undefined" && typeof marks === "undefined") return
            return {
              sbcode: sbcode,
              marks: marks,
            }
          })
          .filter(
            (item): item is { sbcode: string; marks: string } =>
              item !== undefined
          ),
      })

      if (Array.isArray(data)) {
        for (const item of data) {
          studentsData.push(prepareData(item))
        }
      } else {
        studentsData.push(prepareData(data))
      }

      if (state.createNewBatch || state.currentBatches.length === 0) {
        const newBatchId = (Number(currentBatchId) + 1).toString()

        const file = await uploadFile(JSON.stringify(studentsData))
        const batchTree = generateBatchMerkleTree(studentsData)
        const batchRoot = batchTree.getHexRoot()

        const response = await contractEthers.addBatch(
          newBatchId,
          batchRoot,
          file.cid.toString()
        )

        const txid = `https://testnet.bscscan.com/tx/${response.hash}`
        showModal(false, "Success!", "Batch successfully added", true, txid)

        updateState((state) => {
          state.currentBatches.push({
            batchId: newBatchId,
            IPFSHash: file.cid.toString(),
            studentRecordsRoot: batchRoot,
          })
        })

        return fetchAllBatches()
      }

      const currentData = await readFIle<ResultBatch[]>(
        state.currentBatches[state.selectedBatchIndex]?.IPFSHash as string
      )

      if (typeof currentData === "undefined") return

      currentData.push(...studentsData)

      const file = await uploadFile(JSON.stringify(currentData))
      const batchTree = generateBatchMerkleTree(currentData)
      const batchRoot = batchTree.getHexRoot()

      const response = await contractEthers.editBatch(
        currentBatchId,
        batchRoot,
        file.cid.toString()
      )

      const txid = `https://testnet.bscscan.com/tx/${response.hash}`
      showModal(false, "Success!", "Batch successfully edited", true, txid)

      updateState((state) => {
        state.currentBatches.push({
          batchId: currentBatchId,
          IPFSHash: file.cid.toString(),
          studentRecordsRoot: batchRoot,
        })
      })

      return fetchAllBatches()
    } catch (error) {
      showModal(true, "Error!", (error as Error).message, false, null)
    }
  }

  useEffect(() => {
    fetchAllBatches()
  }, [])

  useEffect(() => {
    updateState((state) => {
      const selectedBatchIndex = state.currentBatches.findIndex(
        (batch) => batch.batchId === formData.batchId
      )
      state.selectedBatchIndex = selectedBatchIndex
    })
  }, [formData.batchId])

  return (
    <>
      <div className="container ">
        <div className="pb-5 pt-5">
          <div className="w-full px-20">
            <div className="flex justify-between items-center pb-10">
              <h1 className="text-white text-5xl  font-bold ">Add Result</h1>
              {state.currentBatches.length > 0 ? (
                <div className="flex items-center">
                  <Select
                    defaultValue={"1"}
                    name={"batchId"}
                    listData={state.currentBatches.map((batch) => {
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

            <div className="row add text-white">
              <div
                className=" border-[3px] border-dashed border-[#8b8b8b3b] cursor-pointer  bg-[#ffffff22] rounded-lg text-white p-4"
                onClick={() => {
                  updateState((state) => {
                    state.showUploadModal = true
                  })
                }}
              >
                <span>Upload file</span>
              </div>
              <ReactSpreadsheetImport
                customTheme={themeOverrides}
                isOpen={state.showUploadModal}
                onClose={() => {
                  updateState((state) => {
                    state.showUploadModal = false
                  })
                }}
                onSubmit={(rows) => {
                  // TODO: WATCH FOR SEMESTER COLUMN MAP EVENT AND UPDATE REACT HOOK FORM
                  const data = rows.validData as unknown as Form[]
                  const finalData = data.map((row, index) => {
                    row.TempsubjectMarks = []
                    for (const key in row) {
                      if (
                        row.hasOwnProperty(key) &&
                        key.startsWith("subjectMarks")
                      ) {
                        row.TempsubjectMarks.push(row[key])
                      }
                    }
                    row.subjectMarks = row.TempsubjectMarks
                    return row
                  })
                  submitMarks(finalData)
                }}
                fields={[
                  {
                    key: "fullName",
                    label: "Name",
                    alternateMatches: ["name", "student name"],
                    fieldType: {
                      type: "input",
                    },
                  },
                  {
                    key: "department",
                    label: "Department",
                    fieldType: {
                      type: "input",
                    },
                  },
                  {
                    key: "rollNumber",
                    label: "Roll No",
                    alternateMatches: ["roll", "roll number", "roll no"],
                    fieldType: {
                      type: "input",
                    },
                  },
                  {
                    key: "semester",
                    label: "Semester",
                    fieldType: {
                      type: "input",
                    },
                  },
                  ...objectEntries(
                    syllabus[formData.department].semesters[
                      formData.semester - 1
                    ] as Record<PropertyKey, unknown>
                  ).map(([key, value], index) => {
                    return {
                      key: `subjectMarks[${index}]`,
                      label: `Subject (${key})`,
                      alternateMatches: [
                        key.toLowerCase(),
                        `(${key})`,
                        `Subject (${key})`,
                        `Subject`,
                      ],
                      fieldType: {
                        type: "input",
                      },
                    } as const
                  }),
                ]}
              />
            </div>

            <div className="flex items-center justify-center my-8">
              <hr className="border-gray-400 border-1 w-full mr-3" />
              <span className="text-gray-400 font-medium">OR</span>
              <hr className="border-gray-400 border-1 w-full ml-3" />
            </div>

            <div className="row add text-white bg-slate-800 rounded-xl p-6">
              <h1 className="text-left text-3xl font-medium py-3">
                Student Info
              </h1>

              <div className="sm:col-6 md:col-6 lg:col-6 xl:col-6">
                <Input
                  name={"fullName"}
                  placeholder={"Student Name"}
                  label={"Student Name"}
                  control={control}
                />

                <Select
                  name={"department"}
                  defaultValue={"if"}
                  listData={[
                    {
                      if: "Information Technology",
                      co: "Computer Engineering",
                      ej: "Electronics Engineering",
                      me: "Mechanical Engineering",
                    },
                  ]}
                  placeholder={"Department"}
                  label={"Department"}
                  control={control}
                />
              </div>
              <div className="sm:col-6 md:col-6 lg:col-6 xl:col-6 ">
                <Input
                  name={"rollNumber"}
                  placeholder={"Roll Number"}
                  label={"Roll Number"}
                  control={control}
                />

                <Select
                  control={control}
                  listData={[
                    {
                      1: 1,
                      2: 2,
                      3: 3,
                      4: 4,
                      5: 5,
                      7: 7,
                      8: 8,
                    },
                  ]}
                  defaultValue={1}
                  placeholder={"Semester"}
                  name={"semester"}
                  label={"Semester"}
                />
              </div>
              <hr className="mt-12 mb-5 opacity-50" />
              <h1 className="text-left text-3xl font-medium py-3">
                Student Marks
              </h1>

              {objectEntries(
                syllabus[formData.department].semesters[
                  formData.semester - 1
                ] as Record<PropertyKey, unknown>
              ).map(([key, value], index) => (
                <div className="sm:col-6 md:col-6 lg:col-6 xl:col-6" key={key}>
                  <Input
                    name={`subjectMarks[${index}]`}
                    control={control}
                    placeholder={"Marks"}
                    label={`${value} (${key})`}
                  />
                </div>
              ))}

              <br />
              <div className="sm:col-6 md:col-6 lg:col-6 xl:col-6">
                <Input
                  name={"remarks"}
                  placeholder={"Remarks"}
                  label={"Remarks"}
                  control={control}
                />
              </div>
              <br />
              <br />
              <br />
            </div>

            <div className="col-12 justify-end text-right pb-10">
              <div className=" flex-row inline-block">
                <Toggle
                  title={"New Batch"}
                  isEnabled={state.createNewBatch}
                  toggleSwitch={(value: boolean) => {
                    updateState((state) => {
                      state.createNewBatch = value
                    })
                  }}
                />

                <button
                  className="btn mt-5 w-[400px] capitalize mr-4 rounded-lg ring-slate-900/5 hover:ring-slate-900/10 ring-0 shadow-none hover:shadow-none hover:highlight-white/10 hover:shadow-sky-200 hover:bg-sky-400 bg-sky-500 dark:highlight-white/10 text-white"
                  onClick={handleSubmit(submitMarks)}
                >
                  Submit
                </button>
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
    </>
  )
}

export default AddResult
