"use client";

import { useState } from "react";

import {
  loginAdmin,
} from "@/services/adminAuthService";

export default function AdminLoginPage() {

  const [password,
    setPassword] =
    useState("");

  const [error,
    setError] =
    useState("");

  const handleLogin =
    () => {

      const success =
        loginAdmin(
          password
        );

      if (!success) {

        setError(
          "Invalid admin password."
        );

        return;
      }

      window.location.href =
        "/admin";
    };

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-gray-900 p-8 rounded-3xl border border-yellow-500/10">

        <h1 className="text-3xl font-bold text-yellow-500 mb-3">

          Admin Access

        </h1>

        <p className="text-gray-400 mb-8">

          Secure operational access for PM Infinity Gold administrators.

        </p>

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          placeholder="Enter admin password"
          className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white mb-4"
        />

        {error && (

          <p className="text-red-400 text-sm mb-4">

            {error}

          </p>

        )}

        <button
          onClick={handleLogin}
          className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-semibold"
        >

          Login as Admin

        </button>

      </div>

    </div>
  );
}