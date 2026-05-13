 "use client";

import { useEffect, useState } from "react";

import {
  calculateGoldEquivalent,
  DEFAULT_GOLD_RATE,
} from "@/services/goldService";

import { Transaction } from "@/types/transaction";

import {
  isEligibleForRedemption,
  gramsRemaining,
} from "@/redemption/redemptionEngine";

import {
  createRedemptionRequest,
} from "@/redemption/redemptionService";

import { appConfig } from "@/admin/appConfig";

export default function Home() {

  const appPaused = appConfig.appPaused;

  const [total, setTotal] = useState(0);

  const [history, setHistory] =
    useState<Transaction[]>([]);

  const [goldRate, setGoldRate] =
    useState(DEFAULT_GOLD_RATE);

  const [user, setUser] = useState("");

  const targetGold = 10;

  const currentGold =
    calculateGoldEquivalent(
      total,
      goldRate
    );

  const progress =
    (currentGold / targetGold) * 100;

  const eligibleForRedemption =
    isEligibleForRedemption(
      currentGold
    );

  const remainingGold =
    gramsRemaining(currentGold);

  const handleRedemptionRequest = () => {

    if (!user) return;

    const request =
      createRedemptionRequest(
        user,
        currentGold
      );

    const existingRequests =
      JSON.parse(
        localStorage.getItem(
          `${user}_redemptions`
        ) || "[]"
      );

    const updatedRequests = [
      request,
      ...existingRequests,
    ];

    localStorage.setItem(
      `${user}_redemptions`,
      JSON.stringify(updatedRequests)
    );

    alert(
      "Redemption request submitted successfully."
    );
  };

  useEffect(() => {

    const loadData = () => {

      const currentUser =
        localStorage.getItem(
          "currentUser"
        );

      if (!currentUser) {

        window.location.href =
          "/login";

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

      const storedRate = Number(
        localStorage.getItem(
          "goldRate"
        ) || DEFAULT_GOLD_RATE
      );

      setTotal(storedTotal);

      setHistory(storedHistory);

      setGoldRate(storedRate);
    };

    loadData();

    window.addEventListener(
      "focus",
      loadData
    );

    return () => {

      window.removeEventListener(
        "focus",
        loadData
      );

    };

  }, []);

  if (appPaused) {

    return (

      <div className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-xl text-yellow-500">

          App is temporarily under maintenance

        </h1>

      </div>

    );
  }

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10">

      {/* HEADER */}

      <h1 className="text-3xl font-bold text-yellow-500 mb-2">

        PM Infinity Gold

      </h1>

      <div className="flex justify-between items-center mb-4">

        <p className="text-gray-400">

          Welcome, {user}

        </p>

        <button
          onClick={() => {

            localStorage.removeItem(
              "currentUser"
            );

            window.location.href =
              "/login";

          }}
          className="text-sm text-red-400"
        >
          Logout
        </button>

      </div>

      <p className="text-gray-400 mb-6">

        Track your gold savings journey 💛

      </p>

      {/* GOLD RATE */}

      <div className="bg-gray-900 p-4 rounded-2xl mb-6">

        <p className="text-yellow-500 font-semibold mb-2">

          Today’s Gold Rate (22K / 916)

        </p>

        <input
          type="number"
          value={goldRate}
          onChange={(e) => {

            const value = Number(
              e.target.value
            );

            setGoldRate(value);

            localStorage.setItem(
              "goldRate",
              value.toString()
            );

          }}
          className="w-full p-3 rounded-xl bg-gray-800 text-yellow-400 font-semibold text-lg border border-gray-700"
          placeholder="Enter today's gold rate"
        />

        <p className="text-xs text-gray-400 mt-2">

          You can update this anytime based on current market rate

        </p>

      </div>

      {/* TOTAL SAVED */}

      <div className="bg-gray-900 p-6 rounded-2xl mb-6">

        <p>Total Saved</p>

        <h2 className="text-2xl">

          ₹ {total}

        </h2>

      </div>

      {/* GOLD EQUIVALENT */}

      <div className="bg-gray-900 p-6 rounded-2xl mb-6">

        <p>Gold Equivalent</p>

        <h2 className="text-2xl text-yellow-500">

          {currentGold.toFixed(3)} grams

        </h2>

      </div>

      {/* PROGRESS */}

      <div className="bg-gray-900 p-6 rounded-2xl mb-6">

        <p className="mb-2">

          Goal Progress

        </p>

        <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">

          <div
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-4 rounded-full"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <div className="flex justify-between mt-2 text-sm text-gray-400">

          <span>

            {currentGold.toFixed(3)} g

          </span>

          <span>

            {targetGold} g

          </span>

        </div>

        <p className="mt-2 text-center text-yellow-500 font-semibold">

          {progress.toFixed(1)}% completed

        </p>

        <div className="mt-4 text-center">

          {eligibleForRedemption ? (

            <div>

              <p className="text-green-400 font-semibold mb-3">

                🎉 Eligible for 10g Gold Coin Redemption

              </p>

              <button
                onClick={
                  handleRedemptionRequest
                }
                className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-semibold"
              >

                Request Redemption

              </button>

            </div>

          ) : (

            <p className="text-yellow-500 text-sm">

              {remainingGold.toFixed(3)} g remaining for redemption

            </p>

          )}

        </div>

      </div>

      {/* ACTION BUTTONS */}

      <div className="grid grid-cols-1 gap-4">

        {/* RECORD SAVING */}

        <a
          href="/add-saving"
          className="block w-full text-center bg-yellow-500 text-black py-3 rounded-xl font-semibold"
        >

          Record Saving

        </a>

        {/* REDEMPTIONS */}

        <a
          href="/redemptions"
          className="block w-full text-center border border-yellow-500 text-yellow-500 py-3 rounded-xl font-semibold"
        >

          View Redemption Requests

        </a>

        {/* ABOUT */}

        <a
          href="/about"
          className="block w-full text-center border border-gray-700 text-gray-300 py-3 rounded-xl font-semibold"
        >

          About PM Infinity Gold

        </a>

      </div>

      {/* COMING SOON */}

      <div className="mt-6 bg-gradient-to-r from-yellow-500/10 to-yellow-700/10 border border-yellow-500/30 p-5 rounded-2xl">

        <p className="text-yellow-400 font-semibold text-sm mb-1">

          🚀 Coming Soon

        </p>

        <p className="text-white font-medium">

          Trusted gold saving & redemption

        </p>

        <p className="text-gray-400 text-sm mt-1">

          Own 22K gold coins or jewellery through verified partners.

        </p>

      </div>

      {/* HISTORY */}

      <div className="mt-10">

        <h2 className="text-yellow-500 mb-3 font-semibold">

          Saving History

        </h2>

        {history.length === 0 && (

          <p className="text-gray-500 text-sm">

            No savings recorded yet.

          </p>

        )}

        {history.map((item, index) => (

          <div
            key={index}
            className="bg-gray-900 p-4 rounded-xl mb-3 flex justify-between"
          >

            <div>

              <p className="text-white">

                ₹ {item.amount}

              </p>

              <p
                className={`text-xs uppercase ${
                  item.status === "success"
                    ? "text-green-400"
                    : item.status === "failed"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >

                {item.status}

              </p>

            </div>

            <div className="text-right text-sm text-gray-400">

              {item.createdAt
                ? new Date(
                    item.createdAt
                  ).toLocaleDateString()
                : ""}

            </div>

          </div>

        ))}

      </div>

      {/* HOW IT WORKS */}

      <div className="mt-10 text-sm text-gray-400 space-y-2">

        <p className="text-yellow-500 font-semibold">

          How it works:

        </p>

        <p>
          1. Save money step by step
        </p>

        <p>
          2. Record savings in the app
        </p>

        <p>
          3. Track your gold equivalent
        </p>

        <p>
          4. Reach your 10g goal
        </p>

        <p>
          5. Redeem your hallmark gold coin
        </p>

      </div>

      {/* TRUST */}

      <div className="mt-6 text-xs text-gray-500 text-center">

        PM Infinity Gold helps you track and grow your gold ownership journey.

      </div>

    </div>
  );
}