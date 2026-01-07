"use client"

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';



const page = () => {

    const [data, setData] = useState("")
    const router = useRouter();

    const getUserProfile = async () => {
        try {
            const response = await axios.post("/api/user/me");
            console.log("Response : ", response.data);
            setData(response.data._id);
            toast.error("Profile fetched successfully");
        } catch (error: any) {
             console.log(error.message);
            toast.error("Error in fetching profile")
        }
    }

    useEffect(() => {
        getUserProfile();
    }, [])

    const logout = async () => {
        try {
            const response = await axios.get("/api/user/logout");
            console.log("Response : ", response.data);
    
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error("Error while logging out.")
        }
    }
  return (
    <div className='flex flex-col justify-center items-center py-2 min-h-screen'>
       <h1>Profile page.</h1>
       <hr />
       <h2>{data === "nothing"? "Nothing": <Link href={`/profile/${data}`}>{data}</Link>}</h2>
       <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={logout}>Logout</button>
    </div>
  )
}

export default page
