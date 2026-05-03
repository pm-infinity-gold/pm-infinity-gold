 "use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [total, setTotal] = useState(0);

  const goldRate = 14050;
  const targetGold = 10;

  useEffect(() => {
    const loadData = () => {
      const stored = Number(localStorage.getItem("total") || 0);
      setTotal(stored);
    };

    loadData();
    window.addEventListener("focus", loadData);

    return () => {
      window.removeEventListener("focus", loadData);
    };
  }, []);

  const currentGold = total / goldRate;
  const progress = (currentGold / targetGold) * 100;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <h1 className="text-3xl font-bold text-yellow-500 mb-4">
        PM Infinity Gold
      </h1>

      <p className="text-gray-400 mb-6">
        Track your gold savings journey 💛
      </p>

      {/* TOTAL */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-6">
        <p>Total Saved</p>
        <h2 className="text-2xl">₹ {total}</h2>
      </div>

      {/* GOLD */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-6">
        <p>Gold Equivalent</p>
        <h2 className="text-2xl text-yellow-500">
          {currentGold.toFixed(3)} grams
        </h2>
      </div>

      {/* PROGRESS */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-6">
        <p className="mb-2">Goal Progress</p>

        <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>{currentGold.toFixed(3)} g</span>
          <span>{targetGold} g</span>
        </div>

        <p className="mt-2 text-center text-yellow-500 font-semibold">
          {progress.toFixed(1)}% completed
        </p>
      </div>

      {/* BUTTON */}
      <a
        href="/add-saving"
        className="block w-full text-center bg-yellow-500 text-black py-3 rounded-xl font-semibold"
      >
        Record Saving
      </a>

      {/* HOW IT WORKS */}
      <div className="mt-10 text-sm text-gray-400 space-y-2">
        <p className="text-yellow-500 font-semibold">How it works:</p>
        <p>1. Save money on your own (bank / cash / UPI)</p>
        <p>2. Record your savings in this app</p>
        <p>3. Track your gold value over time</p>
        <p>4. Buy gold anytime from your preferred jeweller</p>
      </div>

      {/* TRUST */}
      <div className="mt-6 text-xs text-gray-500 text-center">
        This app helps you track your savings.  
        We do not collect or hold your money.
      </div>

      {/* FUTURE */}
      <div className="mt-4 text-center text-yellow-500 text-sm">
        🚀 Coming Soon: Direct gold purchase features
      </div>

    </div>
  );
}