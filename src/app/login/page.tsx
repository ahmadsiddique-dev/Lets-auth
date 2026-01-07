"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

const page = () => {

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false)
    }
    else {
      setButtonDisabled(true)
    }
  }, [user])

  const onLogin = async () => {
    try {
      console.log("User : ", user)
      setLoading(true);
      const response = await axios.post("/api/user/login", user);
      console.log("Login Successfull", response.data);
      router.push("/profile")

    } catch (error: any) {
      console.log("Login Failed.");
      toast.error(error.message || "Login failed.")
    }
  }
  return (
    <div className="flex flex-col justify-center items-center py-2 min-h-screen">
      <h1>{loading ? "Processing...": "Login"}</h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
      className="p-2 border border-y-gray-300 bg-white rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      placeholder="email"
      id="email"
      name="username"
      value={user.email}
      onChange={(e) => setUser({...user, email : e.target.value})}
      type="email"
       />

      <label htmlFor="password">password</label>
      <input
      className="p-2 border border-y-gray-300 bg-white rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      placeholder="password"
      id="password"
      name="password"
      value={user.password}
      onChange={(e) => setUser({...user, password : e.target.value})}
      type="password"
       />

       <button
       onClick={onLogin}
       className="p-2 border border-y-gray-300  mb-4 focus:outline-none focus:border-gray-600 "
       >
        {buttonDisabled ? "No Login": "Login"}
       </button>
       <Link href={"signup"}>"Signup"</Link>
    </div>
  )
}

export default page
