 "use client";

import { useState } from "react";

import {
  calculateGoldEquivalent,
  DEFAULT_GOLD_RATE,
} from "@/services/goldService";

import {
  generateTransactionId,
} from "@/services/transactionVerificationService";

import { Transaction } from "@/types/transaction";

export default function AddSavingPage() {

  const [amount, setAmount] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSave = () => {

    const currentUser =
      localStorage.getItem(
        "currentUser"
      );

    if (!currentUser) {

      window.location.href =
        "/login";

      return;
    }

    const numericAmount =
      Number(amount);

    if (
      !numericAmount ||
      numericAmount <= 0
    ) {

      alert(
        "Please enter valid amount."
      );

      return;
    }

    setLoading(true);

    setTimeout(() => {

      const existingTotal =
        Number(
          localStorage.getItem(
            `${currentUser}_total`
          ) || 0
        );

      const goldRate =
        Number(
          localStorage.getItem(
            "goldRate"
          ) || DEFAULT_GOLD_RATE
        );

      const goldGrams =
        calculateGoldEquivalent(
          numericAmount,
          goldRate
        );

      const transaction:
        Transaction = {

        transactionId:
          generateTransactionId(),

        amount:
          numericAmount,

        goldGrams,

        source: "Bank",

        status: "success",

        createdAt:
          new Date().toISOString(),
      };

      const history =
        JSON.parse(
          localStorage.getItem(
            `${currentUser}_history`
          ) || "[]"
        );

      const updatedHistory = [
        transaction,
        ...history,
      ];

      localStorage.setItem(
        `${currentUser}_history`,
        JSON.stringify(
          updatedHistory
        )
      );

      localStorage.setItem(
        `${currentUser}_total`,
        (
          existingTotal +
          numericAmount
        ).toString()
      );

      setLoading(false);

      alert(
        "Savings recorded successfully."
      );

      window.location.href =
        "/";

    }, 1000);
  };

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-md mx-auto">

        <h1 className="text-3xl font-bold text-yellow-500 mb-3">

          Record Saving

        </h1>

        <p className="text-gray-400 mb-8">

          Add your savings to grow your gold ownership journey.

        </p>

        <div className="bg-gray-900 p-6 rounded-3xl border border-yellow-500/10">

          <label className="block text-sm text-gray-400 mb-3">

            Savings Amount (₹)

          </label>

          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
            placeholder="Enter amount"
            className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white mb-6"
          />

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-semibold"
          >

            {loading
              ? "Processing..."
              : "Save Now"}

          </button>

        </div>

      </div>

    </div>
  );
}