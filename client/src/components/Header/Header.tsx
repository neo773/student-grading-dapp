import React from "react"
import { Home, PaperPlus, Search, User, Show, Lock } from "react-iconly"
import Link from "next/link"
import Account from "../Account/Account"
import { useStoreState } from "../../store/store"
import clsx from "clsx"
import { useRouter } from "next/router"


const Header = () => {
  const storeState = useStoreState((state) => state.appState)
  const router = useRouter()
  return (
    <div className="row text-white py-10 overflow-hidden">
      <div className="col-3 flex gap-2 items-center pl-20 hover:cursor-pointer">
        <img src="images/logo.png" alt="logo" className="w-6 " />
        <h1 className="text-2xl  font-bold">Result Dapp</h1>
      </div>
      <div className="col-6 flex gap-10 ">
        <Link
          href="/"
          className={clsx(
            router.pathname === "/" ? "bg-slate-800 rounded-xl p-4" : "",
            "flex gap-1 items-center hover:opacity-60 transition-opacity ease-in-out 300"
          )}
        >
          <Home size={20} set={"bold"} />
          Home
        </Link>

        {storeState.user.isLoggedIn && (
          <>
            <Link
              href="/add-result"
              className={clsx(
                router.pathname === "/add-result"
                  ? "bg-slate-800 rounded-xl p-4"
                  : "",
                "flex gap-1 items-center hover:opacity-60 transition-opacity ease-in-out 300"
              )}
            >
              <PaperPlus size={20} set={"bold"} />
              Add Result
            </Link>
            <Link
              href="/view-result"
              className={clsx(
                router.pathname === "/view-result"
                  ? "bg-slate-800 rounded-xl p-4"
                  : "",
                "flex gap-1 items-center hover:opacity-60 transition-opacity ease-in-out 300"
              )}
            >
              <Show size={20} set={"bold"} />
              View Result
            </Link>

            <Link
              href="/manage-admins"
              className={clsx(
                router.pathname === "/manage-admins"
                  ? "bg-slate-800 rounded-xl p-4"
                  : "",
                "flex gap-1 items-center hover:opacity-60 transition-opacity ease-in-out 300"
              )}
            >
              <User size={20} set={"bold"} />
              Manage
            </Link>
          </>
        )}

        <Link
          href="/check-result"
          className={clsx(
            router.pathname === "/check-result"
              ? "bg-slate-800 rounded-xl p-4"
              : "",
            "flex gap-1 items-center hover:opacity-60 transition-opacity ease-in-out 300"
          )}
        >
          <Search size={20} set={"bold"} />
          Check Result
        </Link>
      </div>
      <div className="col-3 flex justify-end pr-20">
        <Account />
        {!storeState.user.isLoggedIn && (
          <Link
            href="/signup"
            className="ml-5 flex  justify-center gap-2 items-center bg-sky-800 py-2 w-[130px] rounded-lg h-12 border border-[#ffffff2c] hover:bg-sky-700 transition-all ease-in-out 300"
          >
            <Lock size={20} />
            Sign Up
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
