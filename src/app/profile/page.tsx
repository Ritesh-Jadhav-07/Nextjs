"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import React from "react"

export default function ProfilePage(){
    const router = useRouter();
    const [data ,setData] = React.useState("nothing")
    const  Logout = async()=>{
        try {
            await axios.get("/api/users/logout")

            toast.success("Logout Successful")
            router.push("/login")
        } catch (error : any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async()=>{
        const res = await axios.get("/api/users/me");
        console.log(res.data)

        //res.data is response returned by me
        //res.data.data is data (key) of response object
        // that data is also a object which has _id
        setData(res.data.data._id)
    }

    return (
        <div
         className="flex flex-col items-center justify-center min-h-screen py-2"
         >
            <h1 className="text-3xl">Profile Page</h1>
            <h2 
            className="p-1 rounded bg-green-500"
            >{data==="nothing" ? "nothing" : <Link href = {`/profile/${data}`}>{data}</Link>}</h2>
            <hr />

            <button
            onClick={Logout}
            className="p-2 border-1 border-white bg-none text-white mt-2 rounded-lg hover:bg-green-300 cursor-pointer"
            >Logout</button>

            <button
            onClick={getUserDetails}
            className="p-2 border-1 border-white bg-none text-white mt-2 rounded-lg hover:bg-blue-300 cursor-pointer"
            >Get User Detail</button>

        </div>
    )
}