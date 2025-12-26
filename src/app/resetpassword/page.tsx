"use client";
import React, { useState, useEffect } from "react";

import axios from "axios";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");

  const resetPassword = async () => {
    try {
      await axios.post("/api/users/resetpassword", { token, newPassword });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token"); // null if not found
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <label htmlFor="password">New Password</label>
      <input
        className="p-1.5 m-2 bg-gray-500 border-none rounded-lg caret-gray-700"
        type="password"
        placeholder="Enter password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <hr />

      <button
        onClick={resetPassword}
        className="p-2 m-2 border-2 border-blue-300 bg-none rounded-lg text-blue-300 cursor-pointer"
      >
        Reset Password
      </button>
    </div>
  );
}
