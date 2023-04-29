import { store } from "../../store/store"
import useContract from "../../hooks/useContract"
import Blockies from "react-blockies"

import React from "react"
import { Logout, User } from "react-iconly"
import { useRouter } from "next/router"
import { useImmer } from "use-immer"
import { useStoreState } from "../../store/store"
import Modal from "../Modal"
import {
  HttpProvider,
  provider,
  IpcProvider,
  AbstractProvider,
} from "web3-core"
import truncateEthAddress from "truncate-eth-address"

interface State {
  showModal: boolean
  modalShowAction: boolean
  modalActionLink: null | string
  modalError: boolean | null
  title: null | string
  description: null | string
}

const Account = () => {
  const router = useRouter()

  const storeState = useStoreState((state) => state.appState)

  const [state, updateState] = useImmer<State>({
    showModal: false,
    modalShowAction: false,
    modalActionLink: null,
    modalError: null,
    title: null,
    description: null,
  })

  const connectWallet = async () => {
    try {
      // @ts-expect-error
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      const ethAddress = accounts[0] as string

      const contract = useContract(
        "MainContract",
        process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS
      )

      const response = await contract.methods.verifyUser(ethAddress).call()

      if (response === false) {
        showModal(true, "Error!", "User not found", false, null)
      } else {
        store.getActions().appState.login({
          walletAddress: ethAddress,
          isLoggedIn: true,
        })
        router.push("/")
      }
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

  const disconnectWallet = async () => {
    console.log("logged out")
    store.getActions().appState.logout()
    router.push("/")
  }

  const formatAddressShort = (address: string) => {
      const lastCharactersIndex = address.length - 4
      let firstCharacters = address.substring(0, 6)
      let lastCharacters = address.substring(lastCharactersIndex)
      return `${firstCharacters}...${lastCharacters}`
  }

  return (
    <>
      <div className="account-wrapper">
        {!storeState.user.isLoggedIn ? (
          <button
            onClick={connectWallet}
            className="flex  justify-center gap-2 items-center bg-slate-800 py-2 w-[130px] rounded-lg h-12 border border-[#ffffff2c] hover:bg-slate-700 transition-all ease-in-out 300"
          >
            <User size={20} />
            Sign In
          </button>
        ) : (
          <div className="main text-white flex space-x-10">
            <div className="account-info bg-[#8f8f8f33] flex place-content-between w-65 rounded-lg h-12 items-center">
              <div className="bg-[#8b8b8b24] p-2 rounded-lg flex space-x-3 h-12 items-center">
                <div className="address">
                  <p>
                    {formatAddressShort(
                      storeState.user?.walletAddress ?? ''
                    )}
                  </p>
                </div>

                <div className="ml-2 icon">
                  <Blockies
                    seed={storeState.user.walletAddress ?? ""}
                    className={"rounded-full"}
                    scale={3}
                  />
                </div>
              </div>
            </div>

            <br />

            <button
              className="flex  justify-center gap-2 items-center btn capitalize text-red-600 border-none h-12 w-[120px] bg-[#e359593d] hover:bg-[#e359596b] rounded-lg"
              onClick={disconnectWallet}
            >
              Logout
              <Logout size={18} />
            </button>
          </div>
        )}
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

export default Account
