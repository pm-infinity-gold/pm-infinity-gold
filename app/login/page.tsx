"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!name) {
      alert("Enter your name or phone");
      return;
    }

    localStorage.setItem("currentUser", name);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center px-6">

      <h1 className="text-3xl text-yellow-500 mb-6">
        PM Infinity Gold
      </h1>

      <p className="mb-4 text-gray-400">
        Enter your name or mobile number
      </p>

      <input
         
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full p-3 rounded-xl bg-gray-900 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
  placeholder="Enter your name or mobile"
/>
      

      <button
        onClick={handleLogin}
        className="mt-4 bg-yellow-500 text-black py-3 rounded-xl"
      >
        Continue
      </button>

    </div>
  );
}