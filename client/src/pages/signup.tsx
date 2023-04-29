import React from "react"
import { useImmer } from "use-immer"
import { trpc } from "../utils/trpc"
import Modal from "../components/Modal/Modal"
import { useForm } from "react-hook-form"
import Input from "../components/Input/input"
import { TRPCError } from "@trpc/server"

interface State {
  showModal: boolean
  modalShowAction: boolean
  modalActionLink: null | string
  modalError: null | boolean
  title: null | string
  description: null | string
}

interface Form {
  walletAddress: string
  emailAddress: string
}

const signUp = () => {
  const { control, handleSubmit } = useForm<Form>({})

  const SignUpProcedure = trpc.signup.useMutation()

  const [state, updateState] = useImmer<State>({
    showModal: false,
    modalShowAction: false,
    modalActionLink: null,
    modalError: null,
    title: null,
    description: null,
  })

  const signUp = async (data: Form) => {
    const response = await SignUpProcedure.mutateAsync({
      walletAddress: data.walletAddress,
      emailAddress: data.emailAddress,
    })

    if (response.status === "success") {
      return showModal(false, "Success!", response.message, false, null)
    }

    if (response instanceof TRPCError) {
      return showModal(true, "Error!", response.message, false, null)
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

  return (
    <>
      <div className="container">
        <div className="pb-5 pt-5">
          <div className="w-full px-20" id="print">
            <h1 className="text-white text-5xl pb-10 font-bold text-center">
              Sign Up
            </h1>

            <div className="row add text-white justify-center">
              <div className="sm:col-5 md:col-5 lg:col-5 xl:col-5 bg-slate-800 rounded-xl px-5 py-8">
                <Input
                  name={"emailAddress"}
                  placeholder={"Email"}
                  label={"Email"}
                  control={control}
                />

                <Input
                  name={"walletAddress"}
                  placeholder={"Wallet Address"}
                  label={"Wallet Address"}
                  control={control}
                />

                <button
                  className="btn mt-5 w-full capitalize mr-4 rounded-lg ring-slate-900/5 hover:ring-slate-900/10 ring-0 shadow-none hover:shadow-none hover:highlight-white/10 hover:shadow-sky-200 hover:bg-sky-400 bg-sky-500 dark:highlight-white/10 text-white"
                  onClick={handleSubmit(signUp)}
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

export default signUp
