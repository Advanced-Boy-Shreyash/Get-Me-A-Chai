'use client'
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import { useState } from 'react'

const Navbar = () => {
  const [showdropdown, setShowdropdown] = useState(false)
  const { data: session } = useSession()
  // console.log("session ", session?.user.username)
  // if(session) {
  //   return <>
  //     Signed in as {session.user.name} <br/>
  //     <button onClick={() => signOut()}>Sign out</button>
  //   </>
  // }

  return (
    <nav className=' bg-gray-900 text-white flex justify-between items-center px-4 md:h-16 flex-col md:flex-row'>
      <Link href={'/'} className='logo font-bold flex items-center justify-center'>
        <img src="icons/tea.gif" width={44} alt="" />
        <span className='md:text-xl text-2xl'>GetMeAChai!</span>
      </Link>

      <div className='relative'>
        {/* {session && <span className='mx-4'><img src={session.user.image} width="20" alt='User avatar'/>{session.user.name}</span>} */}
        {/* {session && <div className='flex items-center gap-2 mx-4'>
          <img src={session.user.image} width="20" alt="User Image" />
          <span>{session.user.email || session.user.name}</span>
        </div>} */}

        {session &&
          <>
            <button id="dropdownDefaultButton" onClick={() => { setShowdropdown(!showdropdown) }} onBlur={() => {
              setTimeout(() => {
                setShowdropdown(false)
              }, 100);
            }} data-dropdown-toggle="dropdown" className="text-white mx-4  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome {session.user.username}<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <div id="dropdown"
              className={`z-10 absolute left-14 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 transition-all duration-300 overflow-hidden ${showdropdown ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                </li>
                <li>
                  <Link href={`/${session.user.username}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                </li>
                <li>
                  <Link href="#" onClick={() => { signOut() }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</Link>
                </li>
              </ul>
            </div>
          </>
        }

        {session && <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={() => { signOut() }}>Logout</button>}
        {!session && <Link href={"/login"}>
          <button className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' >Login</button>
        </Link>}
      </div>

    </nav>
  )
}

export default Navbar