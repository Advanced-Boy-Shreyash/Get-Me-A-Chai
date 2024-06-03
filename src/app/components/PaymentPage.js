'use client'
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchPayments, fetchUser, initiate } from "@/actions/userActions";
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useRouter } from "next/navigation";
import { HashLoader } from "react-spinners";

const PaymentPage = ({ username }) => {
    document.title = "Support - " + username

    const [loading, setLoading] = useState(true);
    const [paymentform, setPaymentform] = useState({});
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, []);

    // console.log("first","currentUser",currentUser, "\nsetCurrentUser",setCurrentUser)

    useEffect(() => {
        getData()
        console.log(getData())
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentform({ ...paymentform, [name]: sanitizeInput(value) });
    };

    // sanitizing inputs for security
    const sanitizeInput = (input) => {
        return input.replace(/<[^>]*>?/gm, '');
    };

    const getData = async () => {
        try {
            let getUser = await fetchUser(username)
            setCurrentUser(getUser)
            let dbPayments = await fetchPayments(username)
            setPayments(dbPayments)
            // console.log("u", getUser);
            // console.log("dbPayments", dbPayments);
        } catch (error) {
            console.error("Error getting Data :", error)
        }
    }

    const getPayments = async () => {
        let dbPayments = await fetchPayments(username)
        setPayments(dbPayments)
    }

    const pay = async (amount) => {
        // Check if the name field is empty
        if (!paymentform.name) {
            toast.error('Name is Required', {
                position: "bottom-right",
                autoClose: 2500,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
                transition: Slide
            });
            return;
        }

        if (!amount) {
            toast.error('Amount is Required', {
                position: "bottom-right",
                autoClose: 2500,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
                transition: Slide
            });
            return
        }

        if (amount < 100) {
            toast.error('Amount must be greater than ₹1', {
                position: "bottom-right",
                autoClose: 2500,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
                transition: Slide
            });
            return
        }

        if (!currentUser.razrpayId || !currentUser.razrpaySecret) {
            toast.error(`${username} has not set his payment methods`, {
                position: "bottom-right",
                autoClose: 2500,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
                transition: Slide
            });
            return
        }

        try {
            const response = await initiate(amount, username, paymentform)
            // console.log("response here",response)
            const orderId = response.id;
            // console.log("orderId",orderId)

            const options = {
                key: currentUser?.razrpayId,
                amount: amount,
                currency: "INR",
                name: "Get-Me-A-Chai",
                description: "Test Transaction",
                image: `${process.env.NEXT_PUBLIC_URL}/icons/tea.gif`,
                order_id: orderId,
                handler: async function (response) {
                    const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/razorpay`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature
                        })
                    });
                    const result = await paymentResponse.json();
                    // console.log("result",result)
                    if (result.success) {
                        setPaymentform({});
                        getPayments()
                        router.push(result.redirectUrl);
                        toast.success("Payment Confirmed", {
                            position: "bottom-right",
                            autoClose: 2500,
                            closeOnClick: true,
                            pauseOnHover: false,
                            theme: "dark",
                            transition: Slide
                        });
                        getPayments()
                        router.push(`/${username}`)
                    } else {
                        toast.error(result.message, {
                            position: "bottom-right",
                            autoClose: 2500,
                            closeOnClick: true,
                            pauseOnHover: false,
                            theme: "dark",
                            transition: Slide
                        })
                    }
                },
                prefill: {
                    name: paymentform.name,
                    email: paymentform.email || "customer@example.com",
                    contact: paymentform.contact || "9999999999"
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#5DADE2"
                }
            };

            const rzp1 = new Razorpay(options);
            console.log(rzp1)
            rzp1.on('payment.failed', function (response) {
                toast.error(response.error.description, {
                    position: "bottom-right",
                    autoClose: 2500,
                    closeOnClick: true,
                    pauseOnHover: false,
                    theme: "dark",
                    transition: Slide
                })
            });
            rzp1.open();

        } catch (error) {
            toast.error("Payment Initiation Failed", {
                position: "bottom-right",
                autoClose: 2500,
                closeOnClick: true,
                pauseOnHover: false,
                theme: "dark",
                transition: Slide
            })
            console.error("Payment initiation failed:", error);
        }

    }

    return (
        <>
            {loading ? (
                <>
                    <div className="flex justify-center items-center h-screen">
                        <HashLoader color={"#ffffff"} loading={loading} size={30} />
                    </div>
                </>
            ) : (
                <>
                    <Script src="https://checkout.razorpay.com/v1/checkout.js" />
                    <ToastContainer />
                    <div className='cover w-full relative'>
                        <img className="object-cover w-full h-48 md:h-56 lg:h-56 opacity-85" alt="" src={currentUser.coverPic} />
                        <div className="absolute -bottom-10 md:-bottom-20 left-1/2 transform -translate-x-1/2 border-2 border-white rounded-full">
                            <img src={currentUser.profilePic} className='rounded-full w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36' alt="User Image" />
                        </div>
                    </div>

                    <div className='info flex justify-center items-center mt-10 mb-10 md:mt-20 md:mb-24 flex-col'>
                        <div className="font-bold text-lg">@{username}</div>
                        <div className='text-slate-400'>Let's help {username} to get a Chai</div>
                        <div className='text-slate-400'>
                            {payments.length} Payments Received . ₹ {payments.reduce((a, b) => a + b.amount, 0)}  raised
                        </div>
                        <div className="container  font-bold flex flex-col gap-2 bg-slate-900 p-5 mt-5 bg-rgb(0 9 29) rounded-xl w-[70vw]">
                            <div className=" m-auto"> Project : {currentUser.project}</div>
                            <div className=" m-auto">Project Description: {currentUser.projectDescription}</div>
                        </div>
                    </div>


                    <div className='flex items-center justify-around'>
                        <div className="payment flex justify-center gap-5 w-[95%] mb-11 flex-col md:flex-row">
                            <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
                                <h2 className='text-2xl font-bold my-5'>Top Supporters</h2>
                                <ul className='mx-5 text-lg max-h-72 overflow-y-scroll custom-scrollbar'>
                                    {
                                        payments.slice(0, 7).map((p, i) => {
                                            return (
                                                <li key={i} className="my-2 flex gap-2 item-center">
                                                    <img src="icons/avatar.gif" className="h-fit" width={30} alt="user avatar" />
                                                    <span>{p.name} <span className='font-bold'>₹{p.amount}</span>. Here is the message "{p.message}"</span>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>

                            <style jsx>
                                {`
                                    .custom-scrollbar::-webkit-scrollbar {
                                        display: none; /* Hide scrollbar for Chrome, Safari and Opera */
                                    }
                                    
                                    .custom-scrollbar {
                                        -ms-overflow-style: none; /* IE and Edge */
                                        scrollbar-width: none; /* Firefox */
                                    }
                                `}
                            </style>


                            <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg text-white p-10">
                                <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
                                <div className="flex gap-5 md:gap-2 flex-col ">
                                    <div>
                                        <input onChange={handleChange} value={paymentform.name || ''} type="text" className='w-full p-3 rounded-lg bg-slate-800' name="name" placeholder='Enter Name' required />
                                    </div>
                                    <input onChange={handleChange} value={paymentform.message || ''} type="text" className='w-full p-3 rounded-lg bg-slate-800' name="message" placeholder='Enter Message' />
                                    <input onChange={handleChange} value={paymentform.amount || ''} type="number" className='w-full p-3 rounded-lg bg-slate-800' name="amount" placeholder='Enter Amount' />

                                    <div className='flex justify-center items-center'>
                                        <button type="button" onClick={() => pay(paymentform.amount * 100 || 0)} className="text-white w-48 hover:w-[70%] bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 ease-in-out">Pay</button>
                                    </div>
                                </div>
                                <div className="flex gap-5 mt-5 justify-center">
                                    <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { pay(1000) }}>Pay ₹10</button>
                                    <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { pay(10000) }}>Pay ₹100</button>
                                    <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { pay(50000) }}>Pay ₹500</button>
                                    <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { pay(100000) }}>Pay ₹1000</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
            }
        </>
    )
}

export default PaymentPage;
