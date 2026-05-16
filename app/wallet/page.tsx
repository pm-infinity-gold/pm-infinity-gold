"use client";

import { useEffect, useState } from "react";

import {
  createWalletTransaction,
  saveWalletTransaction,
  getWalletTransactions,
  getWalletBalance,
} from "@/services/walletService";

export default function WalletPage() {

  const [user,
    setUser] =
    useState("");

  const [amount,
    setAmount] =
    useState("");

  const [transactions,
    setTransactions] =
    useState<any[]>([]);

  const [balance,
    setBalance] =
    useState(0);

  const loadWallet =
    (
      currentUser: string
    ) => {

      const txns =
        getWalletTransactions(
          currentUser
        );

      setTransactions(
        txns
      );

      setBalance(
        getWalletBalance(
          currentUser
        )
      );
    };

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

    loadWallet(
      currentUser
    );

  }, []);

  const handleTopUp =
    () => {

      const value =
        Number(amount);

      if (
        !value ||
        value <= 0
      ) {

        return;
      }

      /* SIMULATED RAZORPAY */

      const transaction =
        createWalletTransaction(
          "Credit",
          value
        );

      saveWalletTransaction(
        user,
        transaction
      );

      setAmount("");

      loadWallet(user);

      alert(
        "Wallet funded successfully."
      );
    };

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10 pb-28">

      {/* HEADER */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-cyan-400">

          Digital Wallet

        </h1>

        <p className="text-gray-400 mt-2">

          Wallet funding and transaction infrastructure.

        </p>

      </div>

      {/* BALANCE */}

      <div className="bg-gray-900 p-6 rounded-3xl border border-cyan-500/10 mb-8">

        <p className="text-cyan-400 font-semibold mb-2">

          Wallet Balance

        </p>

        <h2 className="text-4xl font-bold text-white">

          ₹ {balance}

        </h2>

      </div>

      {/* TOPUP */}

      <div className="bg-gray-900 p-6 rounded-3xl border border-cyan-500/10 mb-8">

        <p className="text-cyan-400 font-semibold mb-4">

          Add Funds

        </p>

        <input
          type="number"
          value={amount}
          onChange={(e) =>
            setAmount(
              e.target.value
            )
          }
          placeholder="Enter amount"
          className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white mb-4"
        />

        <button
          onClick={
            handleTopUp
          }
          className="w-full bg-cyan-400 text-black py-4 rounded-2xl font-semibold"
        >

          Simulate Razorpay Top-Up

        </button>

      </div>

      {/* TRANSACTIONS */}

      <div>

        <h2 className="text-cyan-400 text-xl font-semibold mb-5">

          Wallet Transactions

        </h2>

        {transactions.length === 0 && (

          <div className="bg-gray-900 p-5 rounded-2xl text-gray-500">

            No wallet transactions available.

          </div>

        )}

        <div className="space-y-4">

          {transactions.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="bg-gray-900 p-5 rounded-2xl border border-cyan-500/10"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <p className="text-cyan-400 font-semibold">

                      {item.type}

                    </p>

                    <p className="text-white mt-2">

                      ₹ {item.amount}

                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-green-400">

                      {item.status}

                    </p>

                    <p className="text-xs text-gray-500 mt-2">

                      {new Date(
                        item.createdAt
                      ).toLocaleString()}

                    </p>

                  </div>

                </div>

                <p className="text-xs text-gray-600 mt-4">

                  TXN:
                  {" "}
                  {item.id}

                </p>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}