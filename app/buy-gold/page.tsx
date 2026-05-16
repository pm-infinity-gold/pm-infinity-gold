"use client";

import { useEffect, useState } from "react";

import {
  getWalletBalance,
} from "@/services/walletService";

import {
  buyGold,
} from "@/services/goldPurchaseService";

import {
  calculateGoldEquivalent,
  DEFAULT_GOLD_RATE,
} from "@/services/goldService";

export default function BuyGoldPage() {

  const [user,
    setUser] =
    useState("");

  const [walletBalance,
    setWalletBalance] =
    useState(0);

  const [amount,
    setAmount] =
    useState("");

  const [goldRate,
    setGoldRate] =
    useState(
      DEFAULT_GOLD_RATE
    );

  useEffect(() => {

    const currentUser =
      localStorage.getItem(
        "currentUser"
      );

    if (!currentUser) {

      window.location.href =
        "/login";

      return;
    }

    setUser(
      currentUser
    );

    setWalletBalance(
      getWalletBalance(
        currentUser
      )
    );

    const rate =
      Number(
        localStorage.getItem(
          "goldRate"
        ) ||
          DEFAULT_GOLD_RATE
      );

    setGoldRate(rate);

  }, []);

  const estimatedGold =
    calculateGoldEquivalent(
      Number(amount || 0),
      goldRate
    );

  const handleBuyGold =
    () => {

      const value =
        Number(amount);

      if (
        !value ||
        value <= 0
      ) {

        return;
      }

      const result =
        buyGold(
          user,
          value
        );

      alert(
        result.message
      );

      if (
        result.success
      ) {

        setWalletBalance(
          getWalletBalance(
            user
          )
        );

        setAmount("");
      }
    };

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10 pb-28">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-yellow-500">

          Buy Gold

        </h1>

        <p className="text-gray-400 mt-2">

          Convert wallet funds into digital gold ownership.

        </p>

      </div>

      {/* WALLET */}

      <div className="bg-gray-900 p-6 rounded-3xl border border-cyan-500/10 mb-8">

        <p className="text-cyan-400 font-semibold mb-2">

          Wallet Balance

        </p>

        <h2 className="text-4xl font-bold text-white">

          ₹ {walletBalance}

        </h2>

      </div>

      {/* PURCHASE */}

      <div className="bg-gray-900 p-6 rounded-3xl border border-yellow-500/10 mb-8">

        <p className="text-yellow-500 font-semibold mb-4">

          Purchase Digital Gold

        </p>

        <input
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          placeholder="Enter purchase amount"
          className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white mb-5"
        />

        <div className="bg-black border border-yellow-500/10 rounded-2xl p-5 mb-5">

          <p className="text-gray-400 text-sm mb-2">

            Estimated Gold

          </p>

          <h2 className="text-3xl font-bold text-yellow-500">

            {estimatedGold.toFixed(3)} g

          </h2>

        </div>

        <button
          onClick={
            handleBuyGold
          }
          className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-semibold"
        >

          Buy Gold from Wallet

        </button>

      </div>

      {/* INFO */}

      <div className="bg-gray-900 p-5 rounded-2xl border border-yellow-500/10">

        <p className="text-yellow-500 font-semibold mb-3">

          Gold Purchase Infrastructure

        </p>

        <div className="space-y-3 text-gray-300 text-sm leading-6">

          <p>

            ✔ Wallet-backed gold acquisition

          </p>

          <p>

            ✔ Real-time gold conversion engine

          </p>

          <p>

            ✔ Ledger-based purchase accounting

          </p>

          <p>

            ✔ Commerce-ready architecture

          </p>

        </div>

      </div>

    </div>
  );
}