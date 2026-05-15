 "use client";

import { useState } from "react";

import {
  saveLoginSession,
} from "@/services/sessionService";

export default function LoginPage() {

  const [user, setUser] =
    useState("");

  const handleLogin = () => {

    if (!user.trim()) {

      alert(
        "Please enter username."
      );

      return;
    }

    localStorage.setItem(
      "currentUser",
      user
    );

    saveLoginSession(user);

    window.location.href = "/";
  };

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-gray-900 p-8 rounded-3xl border border-yellow-500/10">

        <h1 className="text-3xl font-bold text-yellow-500 mb-3">

          PM Infinity Gold

        </h1>

        <p className="text-gray-400 mb-8">

          Secure access to your gold savings ecosystem.

        </p>

        <input
          type="text"
          value={user}
          onChange={(e) =>
            setUser(
              e.target.value
            )
          }
          placeholder="Enter username"
          className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-semibold"
        >

          Login

        </button>

      </div>

    </div>
  );
}