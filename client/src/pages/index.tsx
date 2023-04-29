import React from "react"

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="row py-10">
          <div className="col-6 flex items-center justify-center">
            <h1 className="text-6xl text-white font-bold">
              Decentralized Grading <br /> System on Blockchain
            </h1>
          </div>

          <div className="col-6  flex items-center justify-center">
            <img src="images/hero.png" alt="hero art" className="w-8/12" />
          </div>
        </div>

        <h1 className="text-white text-5xl  font-bold pt-12 pb-8 text-center">Features</h1>
        <div className="row px-20">
          <div className="col-4">
            <div className="bg-slate-800 rounded-xl p-5">
              <div className="bg-slate-800 rounded-xl p-5 text-center">
                <div className="flex justify-center py-5">
                  <img src="images/decen.png" alt="" className="grayscale w-4/12" />
                </div>

                <h1 className="text-white text-2xl  font-bold ">
                  Decentralized
                </h1>
                <p className="text-white">
                  Ethereum is fully decentralized network
                </p>
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="bg-slate-800 rounded-xl p-5">
              <div className="bg-slate-800 rounded-xl p-5 text-center">
                <div className="flex justify-center py-5">
                  <img src="images/scalable.png" alt="" className="grayscale w-4/12" />
                </div>

                <h1 className="text-white text-2xl  font-bold ">Scalable</h1>
                <p className="text-white">Blockchain is highly scalable</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="bg-slate-800 rounded-xl p-5">
              <div className="bg-slate-800 rounded-xl p-5 text-center">
                <div className="flex justify-center py-5">
                  <img src="images/secure.png" alt="" className="grayscale w-4/12" />
                </div>

                <h1 className="text-white text-2xl  font-bold ">Secure</h1>
                <p className="text-white">Backed by proof of work algorithim</p>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-white text-5xl  font-bold mt-20 text-center">
          What is a Dapp?
        </h1>
        <div className="flex justify-center">
          <div className="col-6 text-wrapper w-6/12 py-8">
            <p className="text-xl text-white text-left">
              A decentralized application (dapp) is an application built on a
              decentralized network that combines a smart contract and a
              frontend user interface. On Ethereum, smart contracts are
              accessible and transparent – like open APIs – so your dapp can
              even include a smart contract that someone else has written
            </p>
          </div>
        </div>

        <div className="wrapper flex  justify-center">
          <div className=" w-6/12">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.youtube.com/embed/CDQX8inMCt0"
                frameBorder="0"
                className="rounded-md "
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  )
}

export default Home