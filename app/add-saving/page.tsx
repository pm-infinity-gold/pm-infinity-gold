 "use client";

import { useState, useEffect } from "react";

export default function AddSaving() {
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState(0);

  const goldRate = 14050; // 22K Chennai gold rate

  // Load existing total when page opens
  useEffect(() => {
    const stored = Number(localStorage.getItem("total") || 0);
    setTotal(stored);
  }, []);

  const handleSave = () => {
    if (!amount) {
      alert("Please enter amount");
      return;
    }

    const newTotal = total + Number(amount);

    // Save to localStorage
    localStorage.setItem("total", newTotal.toString());

    // Update state
    setTotal(newTotal);

    alert("Total Saved ₹ " + newTotal);

    setAmount("");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      
      <h1 className="text-2xl text-yellow-500 mb-6">
        Record Saving
      </h1>

      <div className="mb-4 text-sm text-gray-400">
        Gold Rate (22K Chennai): ₹ {goldRate} / gram
      </div>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 rounded-xl text-black bg-white"
      />

      <button
        onClick={handleSave}
        className="w-full bg-yellow-500 text-black py-3 rounded-xl mt-4 font-semibold"
      >
        Save
      </button>

      <div className="mt-6 text-lg">
        Total Saved: ₹ {total}
      </div>

      <div className="mt-2 text-lg text-yellow-500">
        Gold Equivalent: {(total / goldRate).toFixed(3)} grams
      </div>

    </div>
  );
}