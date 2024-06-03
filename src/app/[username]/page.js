'use client'
import React, { useEffect, useState } from 'react'
import HashLoader from "react-spinners/HashLoader";
import { PacmanLoader } from 'react-spinners';
import PaymentPage from '../components/PaymentPage'
import { fetchUser } from '@/actions/userActions'

const Username = ({ params }) => {
  const [userExists, setUserExists] = useState(null)

  // console.log(params)

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const user = await fetchUser(params.username)
        setUserExists(user)
      } catch (error) {
        console.error("Error Fetching User :", error)
        setUserExists(user)
      }
    }
    checkUserExists()
  }, [params.username])

  if (userExists === null) {
    return <div className='flex justify-center items-center h-screen'>
      <HashLoader
        color="#ffffff"
        size={30}
      />
    </div>
  }

  return (
    <>
      {
        userExists ?
          < PaymentPage username={params.username} /> :
          <>
            <div className='flex justify-center items-center mt-2 font-bold text-2xl'>
              Sorry User does not exist with username '{params.username}'
            </div>
            <div className='flex justify-center items-center h-screen'>
            <PacmanLoader  color="#ffffff" size={30}/>
            </div>
          </>
      }

    </>
  )
}

export default Username