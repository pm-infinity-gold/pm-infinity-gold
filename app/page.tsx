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

import {
  getSavingsInsight,
} from "@/services/insightService";

import {
  getAchievementBadges,
} from "@/services/badgeService";

import {
  getGoalPrediction,
} from "@/services/predictionService";

import BottomNav from "@/components/BottomNav";

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

  const savingsInsight =
    getSavingsInsight(
      progress,
      remainingGold
    );

  const badges =
    getAchievementBadges(
      total,
      progress
    );

  const prediction =
    getGoalPrediction(total);

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

      setHistory(
        Array.isArray(storedHistory)
          ? storedHistory
          : []
      );

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

    <div className="min-h-screen bg-black text-white px-6 py-10 pb-28">

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

      {/* SMART INSIGHT */}

      <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-700/10 border border-yellow-500/20 p-5 rounded-2xl mb-6">

        <p className="text-yellow-500 font-semibold mb-2">

          Smart Savings Insight

        </p>

        <p className="text-gray-300 leading-7">

          {savingsInsight}

        </p>

      </div>

      {/* PREDICTION */}

      <div className="bg-gray-900 p-5 rounded-2xl mb-6 border border-yellow-500/10">

        <p className="text-yellow-500 font-semibold mb-2">

          Goal Prediction

        </p>

        <p className="text-gray-300 leading-7">

          {prediction}

        </p>

      </div>

      {/* BADGES */}

      <div className="bg-gray-900 p-5 rounded-2xl mb-6">

        <p className="text-yellow-500 font-semibold mb-4">

          Achievement Badges

        </p>

        <div className="flex flex-wrap gap-3">

          {badges.map((badge, index) => (

            <div
              key={index}
              className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-4 py-2 rounded-xl text-sm"
            >

              {badge}

            </div>

          ))}

        </div>

      </div>

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

        <p className="mt-3 text-center text-yellow-500 font-semibold">

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

      {/* ACTION BUTTON */}

      <div className="grid grid-cols-1 gap-4 mb-10">

        <a
          href="/add-saving"
          className="block w-full text-center bg-yellow-500 text-black py-3 rounded-xl font-semibold"
        >

          Record Saving

        </a>

      </div>

      {/* HISTORY */}

      <div className="mb-10">

        <h2 className="text-yellow-500 mb-4 font-semibold text-lg">

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
            className="bg-gray-900 p-4 rounded-xl mb-3 border border-yellow-500/10"
          >

            <div className="flex justify-between items-start">

              <div>

                <p className="text-white text-lg font-semibold">

                  ₹ {item.amount}

                </p>

                <p className="text-xs text-gray-400 mt-1">

                  Source:
                  {" "}
                  {item.source || "Bank"}

                </p>

              </div>

              <div className="text-right">

                <p
                  className={`text-xs uppercase font-semibold ${
                    item.status === "success"
                      ? "text-green-400"
                      : item.status === "failed"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >

                  {item.status}

                </p>

                <p className="text-xs text-gray-500 mt-1">

                  {item.createdAt
                    ? new Date(
                        item.createdAt
                      ).toLocaleDateString()
                    : ""}

                </p>

              </div>

            </div>

            <div className="mt-3 text-sm text-gray-400">

              Gold Added:
              {" "}
              <span className="text-yellow-500">

                {item.goldGrams?.toFixed(3)} g

              </span>

            </div>

          </div>

        ))}

      </div>

      {/* BRAND MESSAGE */}

      <div className="mt-12 text-center space-y-3">

        <p className="text-yellow-500 text-lg font-semibold">

          “Ellorum Ellamum Pera Vendum”

        </p>

        <p className="text-gray-500 text-sm">

          “எல்லோரும் எல்லாமும் பெற வேண்டும்”

        </p>

        <p className="text-gray-600 text-xs max-w-md mx-auto leading-6">

          PM Infinity Gold is designed to make disciplined gold ownership simple, accessible, and operationally transparent for everyone.

        </p>

      </div>

      {/* BOTTOM NAV */}

      <BottomNav />

    </div>
  );
}