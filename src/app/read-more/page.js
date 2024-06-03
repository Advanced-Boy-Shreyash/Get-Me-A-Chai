'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { HashLoader } from 'react-spinners'
import ReadMorePage from '../components/ReadMorePage'

const ReadMore = () => {
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
                    <ReadMorePage />
            }
        </>
    )
}

export default ReadMore