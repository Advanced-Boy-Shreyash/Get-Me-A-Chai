'use client'
import Link from "next/link";
import HashLoader from "react-spinners/HashLoader";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <HashLoader color={"#ffffff"} loading={loading} size={30} />
        </div>
      ) : (
        <>
          <div className="flex justify-center flex-col gap-4 items-center text-white h-fit mt-3 mb-5 px-5 md:px-0">
            <div className="font-bold flex gap-6 md:gap-5 justify-center items-center md:text-5xl text-4xl">
              Buy Me a Chai <span><img src="icons/tea.gif" width="88" alt="" /></span>
            </div>
            <p className="text-center">A crowdfunding platform for creators. Get funded by your fans and followers. Start now!</p>
            <div>
              <Link href={'/login'}>
                <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here </button>
              </Link>

              <Link href={'/read-more'}>
                <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
              </Link>
              <div className="flex flex-col justify-center items-center ">
                <Link href={'/profiles'}>
                  <button type="button" className="w-48 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Fund Raisers</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white h-1 opacity-10 "></div>

          <div className="text-white container mx-auto pb-32 pt-14 px-10">
            <h2 className="text-3xl font-bold text-center mb-14"> Your Fans can buy your a Chai</h2>
            <div className="flex gap-5 justify-around">
              <div className="item space-y-3 flex flex-col items-center justify-center">
                <img src="icons/man.gif" alt="" className="bg-slate-400 rounded-full p-1 text-black" width={88} />
                <p className="font-bold text-center">Fans want to help</p>
                <p className="text-center">Your Fans are available for you to help you</p>
              </div>
              <div className="item space-y-3 flex flex-col items-center justify-center">
                <img src="icons/coin.gif" alt="" className="bg-slate-400 rounded-full p-1 text-black" width={88} />
                <p className="font-bold text-center">Fans want to help</p>
                <p className="text-center">Your Fans are available for you to help you</p>
              </div>
              <div className="item space-y-3 flex flex-col items-center justify-center">
                <img src="icons/group.gif" alt="" className="bg-slate-400 rounded-full p-1 text-black" width={88} />
                <p className="font-bold text-center">Fans want to help</p>
                <p className="text-center">Your Fans are available for you to help you</p>
              </div>
            </div>
          </div>

          <div className="bg-white h-1 opacity-10 "></div>

          <div className="text-white container mx-auto pb-32 pt-14 flex flex-col justify-center items-center px-4">
            <h2 className="text-3xl font-bold text-center mb-14">Learn more about us</h2>
            <div className="w-full max-w-4xl">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/qaTB_u1THVs?si=mCpcEpb4arO6xG85"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

        </>
      )}
    </>
  );
}