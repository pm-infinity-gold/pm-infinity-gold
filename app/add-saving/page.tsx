 "use client";
 import { DEFAULT_GOLD_RATE } from "@/services/goldService";
 import { createTransaction } from "@/services/transactionService";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddSaving() {
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState(0);
  const [source, setSource] = useState("Bank");

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");

    if (!user) {
      router.push("/login");
      return;
    }

    const storedTotal = Number(localStorage.getItem(`${user}_total`) || 0);
    setTotal(storedTotal);
  }, []);

  const handleSave = () => {
    if (!amount) {
      alert("Please enter amount");
      return;
    }

    const user = localStorage.getItem("currentUser");

    if (!user) {
      alert("User not found");
      return;
    }

    const existingTotal = Number(localStorage.getItem(`${user}_total`) || 0);
    const existingHistory = JSON.parse(localStorage.getItem(`${user}_history`) || "[]");

    const newTotal = existingTotal + Number(amount);

    const currentUser =
  localStorage.getItem("currentUser") || "guest";

const goldRate = Number(
  localStorage.getItem("goldRate") || DEFAULT_GOLD_RATE
);

const transaction = createTransaction(
  currentUser,
  Number(amount),
  goldRate
);


    const updatedHistory = [transaction, ...history];

    localStorage.setItem(`${user}_total`, newTotal.toString());
    localStorage.setItem(`${user}_history`, JSON.stringify(updatedHistory));

    alert("Saved ₹ " + amount);

    setAmount("");

    // 🔥 IMPORTANT FIX: go back and refresh dashboard
    router.push("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* BACK BUTTON */}
      <button
        onClick={() => {
          router.push("/");
          window.location.reload();
        }}
        className="mb-4 text-yellow-500"
      >
        ← Back
      </button>

      <h1 className="text-2xl text-yellow-500 mb-4">
        Record Your Saving
      </h1>

      <p className="text-gray-400 mb-6 text-sm">
        I have saved this amount today:
      </p>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 rounded-xl text-black bg-white"
      />

      {/* SOURCE */}
      <select
        value={source}
        onChange={(e) => setSource(e.target.value)}
        className="w-full mt-4 p-3 rounded-xl text-black"
      >
        <option>Bank</option>
        <option>Cash</option>
        <option>UPI</option>
        <option>Jewellery Shop</option>
        <option>Other</option>
      </select>

      <button
        onClick={handleSave}
        className="w-full bg-yellow-500 text-black py-3 rounded-xl mt-4 font-semibold"
      >
        Record Saving
      </button>

      {/* SUMMARY */}
      <div className="mt-6 text-lg">
        Total Saved: ₹ {total}
      </div>

    </div>
  );
}