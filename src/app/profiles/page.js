'use client'
import React, { useEffect, useState } from 'react'
import ProfilesPage from '../components/ProfilesPage'
import { HashLoader } from 'react-spinners'

const Profiles = () => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, []);

    return (
        <>
            {
                loading ?
                    <div className="flex justify-center items-center h-screen" >
                        < HashLoader color={"#ffffff"} loading={loading} size={30} />
                    </div > :
                    <ProfilesPage />
            }
        </>
    )
}

export default Profiles
