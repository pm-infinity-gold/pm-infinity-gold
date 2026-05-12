 "use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  DEFAULT_GOLD_RATE,
} from "@/services/goldService";

import {
  createTransaction,
} from "@/services/transactionService";

export default function AddSavingPage() {

  const router = useRouter();

  const [user, setUser] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [source, setSource] =
    useState("Bank");

  const [total, setTotal] =
    useState(0);

  const [history, setHistory] =
    useState<any[]>([]);

  useEffect(() => {

    const currentUser =
      localStorage.getItem(
        "currentUser"
      );

    if (!currentUser) {
      router.push("/login");
      return;
    }

    setUser(currentUser);

    const storedTotal = Number(
      localStorage.getItem(
        `${currentUser}_total`
      ) || 0
    );

    const storedHistory =
      JSON.parse(
        localStorage.getItem(
          `${currentUser}_history`
        ) || "[]"
      );

    setTotal(storedTotal);

    setHistory(
      Array.isArray(storedHistory)
        ? storedHistory
        : []
    );

  }, [router]);

  const handleSave = () => {

    if (!amount) {
      alert("Please enter amount");
      return;
    }

    const numericAmount =
      Number(amount);

    const newTotal =
      total + numericAmount;

    const goldRate = Number(
      localStorage.getItem(
        "goldRate"
      ) || DEFAULT_GOLD_RATE
    );

    const transaction =
      createTransaction(
        user,
        numericAmount,
        goldRate
      );

    const updatedHistory = [
      transaction,
      ...history,
    ];

    localStorage.setItem(
      `${user}_total`,
      newTotal.toString()
    );

    localStorage.setItem(
      `${user}_history`,
      JSON.stringify(
        updatedHistory
      )
    );

    setTotal(newTotal);

    setHistory(updatedHistory);

    alert(
      `Saved ₹ ${numericAmount}`
    );

    setAmount("");

    router.push("/");
  };

  return (

    <div className="min-h-screen bg-black text-white p-6">

      {/* BACK BUTTON */}

      <button
        onClick={() => {
          router.push("/");
        }}
        className="mb-4 text-yellow-500"
      >
        ← Back
      </button>

      {/* TITLE */}

      <h1 className="text-2xl text-yellow-500 mb-4">

        Record Your Saving

      </h1>

      <p className="text-gray-400 mb-6 text-sm">

        I have saved this amount today:

      </p>

      {/* AMOUNT */}

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) =>
          setAmount(
            e.target.value
          )
        }
        className="w-full p-3 rounded-xl text-black bg-white"
      />

      {/* SOURCE */}

      <select
        value={source}
        onChange={(e) =>
          setSource(
            e.target.value
          )
        }
        className="w-full mt-4 p-3 rounded-xl text-black"
      >

        <option>
          Bank
        </option>

        <option>
          Cash
        </option>

        <option>
          UPI
        </option>

        <option>
          Jewellery Shop
        </option>

        <option>
          Other
        </option>

      </select>

      {/* SAVE BUTTON */}

      <button
        onClick={handleSave}
        className="w-full bg-yellow-500 text-black py-3 rounded-xl mt-4 font-semibold"
      >

        Record Saving

      </button>

      {/* TOTAL */}

      <div className="mt-6 text-lg">

        Total Saved:
        {" "}
        ₹ {total}

      </div>

    </div>
  );
}