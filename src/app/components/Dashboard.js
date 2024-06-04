'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchUser2, updateUser } from '@/actions/userActions'
import { ToastContainer, toast, Slide } from 'react-toastify';
import { PuffLoader } from 'react-spinners'

const Dashboard = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [form, setForm] = useState({})
    const [isChange, setIsChange] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [changeInUsername, setChangeInUsername] = useState(false)

    // console.log(session)

    useEffect(() => {
        if (!session) {
            router.push('/login')
        } else {
            getUserData()
        }
    })

    const getUserData = async () => {
        try {
            const user = await fetchUser2(session.user.email)
            if (user) {
                setForm(user)
                // Giving Title to Page
                document.title = "Dashboard - " + session.user.name
            } else {
                toast.error('User data not found', {
                    position: "bottom-right",
                    autoClose: 2500,
                    closeOnClick: true,
                    pauseOnHover: false,
                    theme: "dark",
                    transition: Slide
                })
                document.title = "Dashboard - User Not Found"
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
            toast.error('Error fetching user data', {
                position: "bottom-right",
                autoClose: 2500,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
                transition: Slide
            })
        }
    }

    const handleInput = (e) => {
        e.target.style.height = 'auto'; // Reset height
        e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on scrollHeight
    };

    const handleChange = (e) => {

        const { name, value } = e.target;
        if (name === 'username') {
            setChangeInUsername(true)
        }

        setForm({ ...form, [e.target.name]: e.target.value })
        setIsChange(true)
    }

    const handleSave = async (e) => {
        setIsLoading(true)
        try {
            // console.log("changeInUsername",changeInUsername)
            if (changeInUsername) {
                toast.success('Username updated successfully', {
                    position: "bottom-right",
                    autoClose: 2500,
                    closeOnClick: true,
                    pauseOnHover: false,
                    theme: "dark",
                    transition: Slide
                })
            } else {
                e.preventDefault()
            }

            const updatingUser = await updateUser(form, session.user.username)
            // console.log("updatingUser", updatingUser)

            if (updatingUser) {
                toast.success('Profile updated successfully', {
                    position: "bottom-right",
                    autoClose: 2500,
                    closeOnClick: true,
                    pauseOnHover: false,
                    theme: "dark",
                    transition: Slide
                })
                setIsLoading(false)

            } else {
                setIsLoading(false)
                toast.error('Profile Updation Failed', error, {
                    position: "bottom-right",
                    autoClose: 2500,
                    closeOnClick: true,
                    pauseOnHover: false,
                    theme: "dark",
                    transition: Slide
                })
                getUserData()
            }
        } catch (error) {
            console.error('Error updating user:', error);
            setIsLoading(false);
            toast.error('Profile Updation Failed', {
                position: "bottom-right",
                autoClose: 2500,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
                transition: Slide
            });
        }

    }

    return (
        <>
            <ToastContainer />
            <div className="container mx-auto py-5 px-6 md:px-0">
                <h1 className='text-center my-5 text-3xl font-bold '>Welcome to Your Dashboard</h1>

                <form className='max-w-2xl mx-auto' onSubmit={handleSave}>
                    <div className='my-2'>
                        <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white '>Name</label>
                        <input type="text" value={form.name ? form.name : ""} onChange={handleChange} name='name' id='name' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' />
                    </div>

                    <div className="my-2">
                        <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white '>Email</label>
                        <input type="text" disabled readOnly value={form.email ? form.email : ""} onChange={handleChange} name='email' id='email' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' />
                    </div>

                    <div className="my-2">
                        <label htmlFor="username" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white '>Username</label>
                        <input type="text" value={form.username ? form.username : ""} onChange={handleChange || setChangeInUsername(true)} name='username' id='username' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' />
                    </div>

                    <div className="my-2">
                        <label htmlFor="profilePic" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white '>Profile Picture</label>
                        <input type="text" value={form.profilePic ? form.profilePic : ""} onChange={handleChange} name='profilePic' id='profilePic' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' />
                    </div>

                    <div className="my-2">
                        <label htmlFor="coverPic" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white '>Cover Photo</label>
                        <input type="text" value={form.coverPic ? form.coverPic : ""} onChange={handleChange} name='coverPic' id='coverPic' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' />
                    </div>

                    <div className="my-2">
                        <label htmlFor="project" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white '>Project</label>
                        <input type="text" value={form.project ? form.project : ""} onChange={handleChange} name='project' id='project' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' />
                    </div>

                    <div className="my-2">
                        <label htmlFor="projectLink" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white '>Project Link</label>
                        <input type="text" value={form.projectLink ? form.projectLink : ""} onChange={handleChange} name='projectLink' id='projectLink' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' />
                    </div>

                    <div className="my-2">
                        <label htmlFor="projectDescription" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white '>Project Description</label>
                        <textarea type="text" value={form.projectDescription ? form.projectDescription : ""} onChange={handleChange} onInput={handleInput} name='projectDescription' id='projectDescription' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' />
                    </div>

                    <div className="my-2">
                        <label htmlFor="razrpayId" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white '>RazorPay Id</label>
                        <input type="text" value={form.razrpayId ? form.razrpayId : ""} onChange={handleChange} name='razrpayId' id='razrpayId' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' />
                    </div>

                    <div className="my-2">
                        <label htmlFor="razrpaySecret" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white '>RazorPay Secret</label>
                        <input type="password" value={form.razrpaySecret ? form.razrpaySecret : ""} onChange={handleChange} name='razrpaySecret' id='razrpaySecret' className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' />
                    </div>

                    <div className="my-6 flex justify-center items-center">
                        <button
                            type="submit"
                            disabled={!isChange || isLoading}
                            className={
                                isLoading
                                    ? `w-48 text-white bg-gray-500 cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 flex justify-center items-center`
                                    : isChange
                                        ? `text-white w-48 hover:w-[70%] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 ease-in-out cursor-pointer flex justify-center items-center`
                                        : `w-48 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 flex justify-center items-center`
                            }
                        >
                            {isLoading ? <PuffLoader size={20} color={"#ffffff"} /> : "Save"}
                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default Dashboard
