import { Dialog, Transition } from "@headlessui/react"
import { Fragment, ReactElement } from "react"
import { ResultBatch } from "../../types/types"
import { printDocument } from "../../utils/utils"

interface ModalProps {
  isOpen: boolean
  data: ResultBatch
  closeModal: (value: boolean) => void
}

const Result = ({ isOpen, closeModal, data }: ModalProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0  backdrop-blur-md	" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4" />
          {/* <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
          </Transition.Child> */}
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
                <Dialog.Panel className="inner p-6  rounded-xl  text-white relative w-[90%] flex justify-center items-center">
                  <div
                    className="sm:col-12 md:col-8 lg:col-8 xl:col-8 bg-slate-800 rounded-xl px-5 py-8 mb-20  print "
                    id="print"
                  >
                    <button
                      className="print:hidden mt-5 capitalize bg-transparent flex gap-1 items-center text-sky-500 hover:brightness-125"
                      onClick={() => {
                        closeModal(false)
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        role="presentation"
                      >
                        <g transform="translate(15.5 5) rotate(90)">
                          <path
                            className="stroke-sky-500"
                            d="M14,0,7,7,0,0"
                            fill="none"
                            stroke="#e5e5e5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            strokeWidth="1.5px"
                          ></path>
                        </g>
                      </svg>
                      Go Back
                    </button>
                    <br />

                      <div>
                        <div className="border-b dark:border-slate-600  p-4 pl-8 text-slate-400 dark:text-slate-200 text-center font-semibold">
                          <div className="flex">
                            <div>
                              <p className="font-bold text-xl">
                                Student Name:{" "}
                              </p>
                            </div>
                            <div>
                              <p className="font-bold text-xl pl-10">
                                {data.name}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="border-b dark:border-slate-600  p-4 pl-8 text-slate-400 dark:text-slate-200 text-center font-semibold">
                          <div className="flex">
                            <div>
                              <p className="font-bold text-xl">
                                Student Roll No:{" "}
                              </p>
                            </div>
                            <div>
                              <p className="font-bold text-xl pl-10">
                                {data.roll}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="border-b dark:border-slate-600  p-4 pl-8 text-slate-400 dark:text-slate-200 text-center font-semibold">
                          <div className="flex">
                            <div>
                              <p className="font-bold text-xl">Department: </p>
                            </div>
                            <div>
                              {data.dep === "if" ? (
                                <p className="font-bold text-xl pl-10">
                                  Information Technology
                                </p>
                              ) : data.dep === "co" ? (
                                <p className="font-bold text-xl pl-10">
                                  Computer Engineering
                                </p>
                              ) : data.dep === "ej" ? (
                                <p className="font-bold text-xl pl-10">
                                  Electronic Engineering
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="border-b dark:border-slate-600     font- medium p-4 pl-8 text-slate-400 dark:text-slate-200 text-center font-semibold">
                          <div className="flex">
                            <div>
                              <p className="font-bold text-xl">Semester: </p>
                            </div>
                            <div>
                              <p className="font-bold text-xl pl-10">
                                {data.sem}
                              </p>
                            </div>
                          </div>
                        </div>

                        <br />
                        <br />
                        <div className="flex justify-between px-5 ">
                          <div>
                            <p className="font-bold text-xl text-white">
                              Subject{" "}
                            </p>
                          </div>
                          <div>
                            <p className="font-bold text-xl text-white">
                              Marks{" "}
                            </p>
                          </div>
                        </div>

                        <div>
                          {data.subjectsData.map((subject, index) => (
                            <div key={index} className="pt-5">
                              <div className="border-b dark:border-slate-600  p-4 pl-8  text-slate-400 dark:text-slate-200 text-center font-semibold">
                                <div className="flex justify-between">
                                  <div>
                                    <p> {subject.sbcode} </p>
                                  </div>
                                  <div>
                                    <p>{subject.marks}/20 </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between  items-center pt-2">
                          <img
                            src={`http://bwipjs-api.metafloor.com/?bcid=code128&text=${data}`}
                            alt=""
                            className="bg-white h-14 ml-8"
                          />
                          <button
                            className="print:hidden btn mt-5  w-[150px] capitalize mr-4 rounded-lg  ring-slate-900/5 hover:ring-slate-900/10 ring-0 shadow-none hover:shadow-none hover:highlight-white/10 hover:shadow-sky-200 hover:bg-sky-400 bg-sky-500 dark:highlight-white/10 text-white"
                            onClick={printDocument}
                          >
                            Print
                          </button>
                        </div>
                      </div>

                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Result
