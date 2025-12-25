"use client";

import Link from "next/link";
import React , {useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import toast from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();
    const [user , setUser] = React.useState({
        email : "",
        password : "",
        
    })

    const[buttonDisabled , setButtonDisabled] = React.useState(false)

    const [loading , setLoading] = React.useState(false);

    const onLogin = async()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login" , user)

            console.log("Login Success" , response.data)
            toast.success("Login Successful");
            router.push("/profile");
            
        } catch (error : any) {
            console.log("Login Failed",error.message);
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[user])



    return (
     <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="">{loading ? "Processing" : "Login"}</h1>
        <hr />
        
        <hr />
        <label htmlFor="email">Email</label>
        <input className="p-1.5 m-2 bg-gray-500 border-none rounded-lg caret-gray-700"
        type="text"
        id="email"
        value={user.email}
        onChange={(e)=>setUser({...user , email : e.target.value})}
        placeholder="Email"
        />
        <hr />
        <label htmlFor="password">Password</label>
        <input className="p-1.5 m-2 bg-gray-500 border-none rounded-lg caret-gray-700"
        type="password"
        id="password"
        value={user.password}
        onChange={(e)=>setUser({...user , password : e.target.value})}
        placeholder="Password"
        />
        <hr />
        <hr />
    
        <button
        onClick={onLogin}
        className="p-2 m-2 border-2 border-blue-300 bg-none rounded-lg text-blue-300 cursor-pointer"
        >Login Here</button>
        <hr />
       <Link href="/signup">Visit Signup Page</Link>
     </div>   
    )
}


