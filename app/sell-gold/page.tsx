"use client";

import { useEffect, useState } from "react";

import {
  calculateGoldEquivalent,
  DEFAULT_GOLD_RATE,
} from "@/services/goldService";

import {
  sellGold,
} from "@/services/goldSellService";

import {
  getWalletBalance,
} from "@/services/walletService";

export default function SellGoldPage() {

  const [user,
    setUser] =
    useState("");

  const [grams,
    setGrams] =
    useState("");

  const [walletBalance,
    setWalletBalance] =
    useState(0);

  const [ownedGold,
    setOwnedGold] =
    useState(0);

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

    const total =
      Number(
        localStorage.getItem(
          `${currentUser}_total`
        ) || 0
      );

    const rate =
      Number(
        localStorage.getItem(
          "goldRate"
        ) ||
          DEFAULT_GOLD_RATE
      );

    setGoldRate(rate);

    setOwnedGold(
      calculateGoldEquivalent(
        total,
        rate
      )
    );

    setWalletBalance(
      getWalletBalance(
        currentUser
      )
    );

  }, []);

  const estimatedValue =
    Number(grams || 0) *
    goldRate;

  const handleSellGold =
    () => {

      const value =
        Number(grams);

      if (
        !value ||
        value <= 0
      ) {

        return;
      }

      const result =
        sellGold(
          user,
          value
        );

      alert(
        result.message
      );

      if (
        result.success
      ) {

        const updatedTotal =
          Number(
            localStorage.getItem(
              `${user}_total`
            ) || 0
          );

        setOwnedGold(
          calculateGoldEquivalent(
            updatedTotal,
            goldRate
          )
        );

        setWalletBalance(
          getWalletBalance(
            user
          )
        );

        setGrams("");
      }
    };

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10 pb-28">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-yellow-500">

          Sell Gold

        </h1>

        <p className="text-gray-400 mt-2">

          Convert digital gold into wallet liquidity.

        </p>

      </div>

      {/* GOLD OWNERSHIP */}

      <div className="bg-gray-900 p-6 rounded-3xl border border-yellow-500/10 mb-8">

        <p className="text-yellow-500 font-semibold mb-2">

          Gold Ownership

        </p>

        <h2 className="text-4xl font-bold text-white">

          {ownedGold.toFixed(3)} g

        </h2>

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

      {/* SELL ENGINE */}

      <div className="bg-gray-900 p-6 rounded-3xl border border-red-500/10 mb-8">

        <p className="text-red-400 font-semibold mb-4">

          Sell Digital Gold

        </p>

        <input
          type="number"
          value={grams}
          onChange={(e) =>
            setGrams(
              e.target.value
            )
          }
          placeholder="Enter grams to sell"
          className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white mb-5"
        />

        <div className="bg-black border border-red-500/10 rounded-2xl p-5 mb-5">

          <p className="text-gray-400 text-sm mb-2">

            Estimated Wallet Credit

          </p>

          <h2 className="text-3xl font-bold text-red-400">

            ₹ {estimatedValue.toFixed(2)}

          </h2>

        </div>

        <button
          onClick={
            handleSellGold
          }
          className="w-full bg-red-400 text-black py-4 rounded-2xl font-semibold"
        >

          Sell Gold to Wallet

        </button>

      </div>

      {/* INFO */}

      <div className="bg-gray-900 p-5 rounded-2xl border border-red-500/10">

        <p className="text-red-400 font-semibold mb-3">

          Gold Liquidity Infrastructure

        </p>

        <div className="space-y-3 text-gray-300 text-sm leading-6">

          <p>

            ✔ Sell digital gold holdings

          </p>

          <p>

            ✔ Wallet liquidity generation

          </p>

          <p>

            ✔ Real-time gold valuation

          </p>

          <p>

            ✔ Commerce-ready liquidity architecture

          </p>

        </div>

      </div>

    </div>
  );
}