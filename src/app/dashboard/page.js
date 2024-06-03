'use client'
import React, { useEffect, useState } from 'react'
import { HashLoader } from 'react-spinners'
import Dashboard from '../components/Dashboard'

const DashboardPage = ({ params }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, []);

  return (
    <>
      {
        loading ? (
          <div className="flex justify-center items-center h-screen" >
            < HashLoader color={"#ffffff"} loading={loading} size={30} />
          </div >
        ) : (
          <Dashboard />
        )
      }
    </>
  )
}

export default DashboardPage

