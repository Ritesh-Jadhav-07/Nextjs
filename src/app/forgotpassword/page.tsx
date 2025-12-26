"use client"
import axios from "axios";
import { NextResponse } from "next/server";
import React, { useState ,useEffect } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const[flag ,setFlag] = useState(false);

  const sendResetEmail = async()=>{
        try {
            const response = await axios.post("api/users/forgotpassword" , {email})
            setFlag(true);
        } catch (error : any) {
            console.log(error.message);  
        }
        
  }

  useEffect(()=>{
    if(flag){
      setEmail("");
    }
  },[flag])

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="email">Email</label>
      <input
        className="p-1.5 m-2 bg-gray-500 border-none rounded-lg caret-gray-700"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <hr />
      

      <button
        onClick={sendResetEmail}
        className="p-2 m-2 border-2 border-blue-300 bg-none rounded-lg text-blue-300 cursor-pointer"
      >
        Reset Password
      </button>
    </div>
  );
}
