import React, { useEffect } from "react"
import useContract from "../hooks/useContract"
import { useStoreState } from "../store/store"
import { useImmer } from "use-immer"
import { useForm } from "react-hook-form"
import Input from "../components/Input/input"
import Modal from "../components/Modal"
import { Delete } from "react-iconly"

interface Form {
  walletAddress: string
}

interface State {
  showModal: boolean
  modalError: boolean
  title: string | null
  description: string | null
  modalShowAction: boolean
  modalActionLink: string | null
  adminList: string[]
}

const manageAdmin = () => {
  const storeState = useStoreState((state) => state.appState.user)

  const [state, updateState] = useImmer<State>({
    showModal: false,
    modalError: false,
    title: null,
    description: null,
    modalShowAction: false,
    modalActionLink: null,
    adminList: [],
  })

  const { control, handleSubmit, reset } = useForm<Form>()

  const contract = useContract(
    "MainContract",
    process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS
  )

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

  const getAdminList = async () => {
    const response = await contract.methods.getAllWhitelistedAddresses().call()
    updateState((state) => {
      state.adminList = response
    })
  }

  const addRecord = async (data: Form) => {
    try {
      const response = await contract.methods.addUser(data.walletAddress).send({
        from: storeState.walletAddress,
      })

      const txid = `https://testnet.bscscan.com/tx/${response.transactionHash}`

      showModal(false, "Success!", "User successfully added", true, txid)
      getAdminList()
      reset()
    } catch (error) {
      showModal(true, "Error!", (error as Error).message, false, null)
    }
  }

  const deleteRecord = async (address: string, index: number) => {
    try {
      const response = await contract.methods.deleteUser(address).send({
        from: storeState.walletAddress,
      })

      const txid = `https://testnet.bscscan.com/tx/${response.transactionHash}`
      showModal(false, "Success!", "User successfully revoked", true, txid)

      updateState((state) => {
        state.adminList.splice(index, 1)
      })

      getAdminList()
    } catch (error) {
      showModal(true, "Error!", (error as Error).message, false, null)
    }
  }

  useEffect(() => {
    getAdminList()
  }, [])

  return (
    <div>
      <h1 className="text-white text-5xl pb-10 font-bold text-center">
        Manage Admins
      </h1>

      <h1 className="text-white text-3xl pb-10 font-bold text-center">
        Add Admins
      </h1>
      <div className="flex justify-center pb-20">
        <div className="sm:col-5 md:col-5 lg:col-5 xl:col-5 bg-slate-800 rounded-xl px-5 py-8">
          <Input
            name={"walletAddress"}
            placeholder={"Wallet Address"}
            label={"Wallet Address"}
            control={control}
          />

          <button
            className="btn mt-5 w-full capitalize mr-4 rounded-lg  ring-slate-900/5 hover:ring-slate-900/10 ring-0 shadow-none hover:shadow-none hover:highlight-white/10 hover:shadow-sky-200 hover:bg-sky-400 bg-sky-500 dark:highlight-white/10 text-white"
            onClick={handleSubmit(addRecord)}
          >
            Submit
          </button>
        </div>
      </div>

      <h1 className="text-white text-3xl pb-10 font-bold text-center">
        Current Admins
      </h1>

      <div className="flex justify-center pb-20">
        <div className="mt-4 -mb-3 col-5">
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
                        Wallet Address
                      </th>
                      <th className="border-b dark:border-slate-600 p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-center font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-slate-800">
                    {state.adminList.map((record, index) => (
                      <tr key={index}>
                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                          {record}
                        </td>
                        <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                          <button
                            className="flex justify-center gap-1 items-center bg-red-500 hover:bg-red-600 text-white transition all ease-in-out 300 rounded-lg py-3 w-[130px]"
                            onClick={() => deleteRecord(record, index)}
                          >
                            <Delete size={20} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-xl dark:border-white/5"></div>
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
    </div>
  )
}

export default manageAdmin
