import { Dialog, Transition } from "@headlessui/react"
import { Fragment, ReactElement } from "react"

interface ModalProps {
  type: "success" | "error"
  modalTitle: string | null
  modalDescription: string | null
  isOpen: boolean
  actionLink?: string | null
  showAction?: boolean
  closeModal: (value: boolean) => void
}

const Modal = ({
  type,
  modalTitle,
  modalDescription,
  isOpen,
  actionLink,
  showAction,
  closeModal,
}: ModalProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0  backdrop-blur-md	" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="inner bg-[#161e318c] border  border-[#ffffff37] p-6  rounded-xl  text-white relative w-[400px] transition-all">
                  {type === "success" ? (
                    <div className="swal-icon swal-icon--success">
                      <span className="swal-icon--success__line swal-icon--success__line--long"></span>
                      <span className="swal-icon--success__line swal-icon--success__line--tip"></span>

                      <div className="swal-icon--success__ring"></div>
                      <div className="swal-icon--success__hide-corners"></div>
                    </div>
                  ) : (
                    <div
                      className="sa"
                      style={{
                        position: "absolute",
                        left: "50%",
                        transform: "translate(-50%, 0)",
                        top: "19px",
                      }}
                    >
                      <div className="sa-error">
                        <div className="sa-error-x">
                          <div className="sa-error-left"></div>
                          <div className="sa-error-right"></div>
                        </div>
                        <div className="sa-error-placeholder"></div>
                        <div className="sa-error-fix"></div>
                      </div>
                    </div>
                  )}

                  {type === "error" ? (
                    <Dialog.Title className="text-3xl mt-[135px] mb-2">
                      {modalTitle}
                    </Dialog.Title>
                  ) : (
                    <Dialog.Title className="text-3xl mt-4 mb-2">
                      {modalTitle}
                    </Dialog.Title>
                  )}
                  <Dialog.Description className="text-xl  mb-6 opacity-80">
                    {modalDescription}
                  </Dialog.Description>

                  {showAction && actionLink && (
                    <a
                      className="btn mt-5 mb-3 w-full capitalize mr-4 rounded-lg  ring-slate-900/5 hover:ring-slate-900/10 ring-0 shadow-none hover:shadow-none hover:highlight-white/10 hover:shadow-sky-200 hover:bg-sky-400 bg-sky-500 dark:highlight-white/10 text-white outline-0 focus-visible:outline-0 border-0"
                      href={actionLink}
                      target="_blank"
                    >
                      View on Blockchain
                    </a>
                  )}

                  <button
                    className="bg-[#ffffff] w-full py-3 text-gray-800  font-medium rounded-lg hover:opacity-80 transition-all ease-in-out 200"
                    onClick={() => {
                      closeModal(false)
                    }}
                  >
                    Close
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal
