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

import {
  calculateSavingStreak,
} from "@/services/streakService";

import {
  getMarketInsight,
} from "@/services/marketInsightService";

import {
  getMilestones,
} from "@/services/milestoneService";

import {
  generateSavingsReport,
} from "@/services/exportService";

import {
  getFinancialSummary,
} from "@/services/summaryService";

import {
  getNotifications,
} from "@/services/notificationService";

import {
  getLastLogin,
} from "@/services/sessionService";

import {
  getAccountTrustStatus,
} from "@/services/accountTrustService";

import {
  getProfileCompletion,
} from "@/services/profileCompletionService";

import {
  generateActivities,
} from "@/services/activityService";
import {
  getAnnouncements,
} from "@/services/announcementService";

import {
  getDailyMotivation,
} from "@/services/motivationService";
import {
  getUserLevel,
} from "@/services/userLevelService";
import BottomNav from "@/components/BottomNav";

import SavingsChart from "@/components/SavingsChart";

export default function Home() {

  const appPaused =
    appConfig.appPaused;

  const [total, setTotal] =
    useState(0);

  const [history, setHistory] =
    useState<Transaction[]>([]);

  const [redemptions,
    setRedemptions] =
    useState<any[]>([]);

  const [goldRate,
    setGoldRate] =
    useState(
      DEFAULT_GOLD_RATE
    );

  const [user, setUser] =
    useState("");

  const [lastLogin,
    setLastLogin] =
    useState("");

  const [profileCompleted,
    setProfileCompleted] =
    useState(false);

  const targetGold = 10;

  const currentGold =
    calculateGoldEquivalent(
      total,
      goldRate
    );

  const progress =
    (currentGold /
      targetGold) *
    100;

  const eligibleForRedemption =
    isEligibleForRedemption(
      currentGold
    );

  const remainingGold =
    gramsRemaining(
      currentGold
    );

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
    getGoalPrediction(
      total
    );

  const streak =
    calculateSavingStreak(
      history
    );

  const marketInsight =
    getMarketInsight(
      goldRate
    );

  const milestones =
    getMilestones(
      total,
      currentGold
    );

  const summary =
    getFinancialSummary(
      history
    );

  const notifications =
    getNotifications(
      total,
      currentGold,
      streak
    );

  const activities =
    generateActivities(
      history,
      redemptions
    );
const announcements =
  getAnnouncements();
const motivation =
  getDailyMotivation();
  const trustStatus =
    getAccountTrustStatus({
      total,
      profileCompleted,
      transactions:
        history.length,
    });
const userLevel =
  getUserLevel({
    total,
    transactions:
      history.length,
  });
  const handleDownloadReport =
    () => {

      const report =
        generateSavingsReport(
          history
        );

      const blob =
        new Blob(
          [report],
          {
            type:
              "text/plain",
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        "pm-infinity-savings-report.txt";

      link.click();

      URL.revokeObjectURL(
        url
      );
    };

  const handleRedemptionRequest =
    () => {

      if (!user) return;

      const profile =
        JSON.parse(
          localStorage.getItem(
            `${user}_profile`
          ) || "{}"
        );

      if (
        !profile.name ||
        !profile.phone ||
        !profile.address ||
        !profile.city ||
        !profile.pincode
      ) {

        alert(
          "Please complete your delivery profile before requesting redemption."
        );

        window.location.href =
          "/profile";

        return;
      }

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
        JSON.stringify(
          updatedRequests
        )
      );

      setRedemptions(
        updatedRequests
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

      setLastLogin(
        getLastLogin(
          currentUser
        )
      );

      const storedProfile =
        JSON.parse(
          localStorage.getItem(
            `${currentUser}_profile`
          ) || "{}"
        );

      const completion =
        getProfileCompletion(
          storedProfile
        );

      setProfileCompleted(
        completion.completed
      );

      const storedTotal =
        Number(
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

      const storedRedemptions =
        JSON.parse(
          localStorage.getItem(
            `${currentUser}_redemptions`
          ) || "[]"
        );

      const storedRate =
        Number(
          localStorage.getItem(
            "goldRate"
          ) ||
            DEFAULT_GOLD_RATE
        );

      setTotal(
        storedTotal
      );

      setHistory(
        Array.isArray(
          storedHistory
        )
          ? storedHistory
          : []
      );

      setRedemptions(
        Array.isArray(
          storedRedemptions
        )
          ? storedRedemptions
          : []
      );

      setGoldRate(
        storedRate
      );
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

    <div className="min-h-screen bg-black text-white px-5 py-8 pb-28">

      {/* HEADER */}

      <div className="flex justify-between items-start mb-6">

        <div>

          <h1 className="text-3xl font-bold text-yellow-500">

            PM Infinity Gold

          </h1>

          <p className="text-gray-400 mt-1">

            Welcome, {user}

          </p>

          <p className="text-gray-500 text-xs mt-2">

            Last Login:
            {" "}
            {lastLogin}

          </p>

        </div>

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
{/* USER LEVEL */}

<div className="bg-gray-900 p-4 rounded-2xl mb-4 border border-cyan-500/10">

  <p className={`${userLevel.color} font-semibold text-lg`}>

    {userLevel.level}

  </p>

</div>
      {/* TRUST BADGE */}

      <div className="bg-gray-900 p-4 rounded-2xl mb-6 border border-yellow-500/10">

        <p className={`${trustStatus.color} font-semibold`}>

          {trustStatus.badge}

        </p>

      </div>

      {/* NOTIFICATIONS */}

      {notifications.length > 0 && (

        <div className="mb-6 space-y-3">

          {notifications.map(
            (item, index) => (

              <div
                key={index}
                className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-2xl"
              >

                <p className="text-yellow-400 text-sm">

                  {item}

                </p>

              </div>

            )
          )}

        </div>

      )}
{/* PLATFORM ANNOUNCEMENTS */}

{announcements.length > 0 && (

  <div className="bg-gray-900 p-5 rounded-2xl mb-6 border border-yellow-500/10">

    <p className="text-yellow-500 font-semibold mb-4">

      Platform Announcements

    </p>

    <div className="space-y-4">

      {announcements
        .slice(0, 3)
        .map(
          (
            item: any,
            index: number
          ) => (

            <div
              key={index}
              className="border-l-2 border-yellow-500 pl-4"
            >

              <p className="text-gray-200 text-sm leading-6">

                {item.message}

              </p>

              <p className="text-xs text-gray-500 mt-1">

                {new Date(
                  item.createdAt
                ).toLocaleString()}

              </p>

            </div>

          )
        )}

    </div>

  </div>

)}
      
{/* DAILY MOTIVATION */}

<div className="bg-gradient-to-r from-yellow-500/10 to-yellow-700/10 border border-yellow-500/20 p-5 rounded-2xl mb-6">

  <p className="text-yellow-500 font-semibold mb-2">

    Daily Motivation

  </p>

  <p className="text-gray-200 leading-7">

    {motivation}

  </p>

</div>
      {/* HERO */}

      <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-700/10 border border-yellow-500/20 rounded-3xl p-6 mb-6">

        <p className="text-yellow-400 text-sm mb-2">

          Gold Ownership Progress

        </p>

        <h2 className="text-4xl font-bold text-white mb-2">

          ₹ {total}

        </h2>

        <p className="text-yellow-500 text-lg font-semibold">

          {currentGold.toFixed(3)} grams

        </p>

        <div className="mt-5">

          <div className="w-full bg-gray-800 h-4 rounded-full overflow-hidden">

            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-4 rounded-full"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          <div className="flex justify-between mt-2 text-sm text-gray-400">

            <span>

              {progress.toFixed(1)}% completed

            </span>

            <span>

              Target: 10g

            </span>

          </div>

        </div>

        <div className="mt-5">

          {eligibleForRedemption ? (

            <div>

              <p className="text-green-400 font-semibold mb-3">

                🎉 Eligible for Redemption

              </p>

              <button
                onClick={
                  handleRedemptionRequest
                }
                className="bg-yellow-500 text-black px-5 py-2 rounded-xl font-semibold"
              >

                Request Gold Coin

              </button>

            </div>

          ) : (

            <p className="text-yellow-400 text-sm">

              {remainingGold.toFixed(3)} g remaining for redemption

            </p>

          )}

        </div>

      </div>

      {/* ACTIVITY TIMELINE */}

      <div className="bg-gray-900 p-5 rounded-2xl mb-6 border border-yellow-500/10">

        <p className="text-yellow-500 font-semibold mb-4">

          Activity Timeline

        </p>

        <div className="space-y-4">

          {activities.length === 0 && (

            <p className="text-gray-500 text-sm">

              No activity yet.

            </p>

          )}

          {activities.map(
            (item, index) => (

              <div
                key={index}
                className="border-l-2 border-yellow-500 pl-4"
              >

                <p className="text-gray-200 text-sm">

                  {item.message}

                </p>

                <p className="text-xs text-gray-500 mt-1">

                  {new Date(
                    item.createdAt
                  ).toLocaleString()}

                </p>

              </div>

            )
          )}

        </div>

      </div>

      {/* FINANCIAL SUMMARY */}

      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="bg-gray-900 p-4 rounded-2xl border border-yellow-500/10">

          <p className="text-gray-400 text-sm">

            Transactions

          </p>

          <h2 className="text-2xl font-bold text-yellow-500 mt-2">

            {summary.totalTransactions}

          </h2>

        </div>

        <div className="bg-gray-900 p-4 rounded-2xl border border-yellow-500/10">

          <p className="text-gray-400 text-sm">

            Avg Saving

          </p>

          <h2 className="text-2xl font-bold text-yellow-500 mt-2">

            ₹ {summary.averageSaving.toFixed(0)}

          </h2>

        </div>

        <div className="bg-gray-900 p-4 rounded-2xl border border-yellow-500/10">

          <p className="text-gray-400 text-sm">

            Highest Saving

          </p>

          <h2 className="text-2xl font-bold text-yellow-500 mt-2">

            ₹ {summary.highestSaving}

          </h2>

        </div>

        <div className="bg-gray-900 p-4 rounded-2xl border border-yellow-500/10">

          <p className="text-gray-400 text-sm">

            Total Gold

          </p>

          <h2 className="text-2xl font-bold text-yellow-500 mt-2">

            {summary.totalGold.toFixed(3)} g

          </h2>

        </div>

      </div>

      {/* MARKET INSIGHT */}

      <div className="bg-gray-900 p-5 rounded-2xl mb-6 border border-yellow-500/10">

        <p className="text-yellow-500 font-semibold mb-2">

          Gold Market Insight

        </p>

        <p className="text-gray-300 leading-7">

          {marketInsight}

        </p>

      </div>

      {/* STREAK */}

      <div className="bg-gray-900 p-5 rounded-2xl mb-6 border border-orange-500/20">

        <p className="text-orange-400 font-semibold mb-2">

          Saving Discipline

        </p>

        <h2 className="text-3xl font-bold text-white">

          🔥 {streak}-Day Streak

        </h2>

      </div>

      {/* MILESTONES */}

      <div className="bg-gray-900 p-5 rounded-2xl mb-6 border border-yellow-500/10">

        <p className="text-yellow-500 font-semibold mb-4">

          Milestone Achievements

        </p>

        <div className="flex flex-wrap gap-3">

          {milestones.map(
            (item, index) => (

              <div
                key={index}
                className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 px-4 py-3 rounded-2xl text-sm"
              >

                {item}

              </div>

            )
          )}

        </div>

      </div>

      {/* ANALYTICS */}

      <div className="mb-6">

        <SavingsChart
          history={history}
        />

      </div>

      {/* EXPORT */}

      <div className="mb-6">

        <button
          onClick={
            handleDownloadReport
          }
          className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-semibold"
        >

          Download Savings Report

        </button>

      </div>

      {/* INSIGHT */}

      <div className="bg-gray-900 p-5 rounded-2xl mb-6 border border-yellow-500/10">

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

      <div className="bg-gray-900 p-5 rounded-2xl mb-6">

        <p className="text-yellow-500 font-semibold mb-3">

          Today’s Gold Rate (22K / 916)

        </p>

        <input
          type="number"
          value={goldRate}
          onChange={(e) => {

            const value =
              Number(
                e.target.value
              );

            setGoldRate(value);

            localStorage.setItem(
              "goldRate",
              value.toString()
            );

          }}
          className="w-full p-3 rounded-xl bg-gray-800 text-yellow-400 font-semibold border border-gray-700"
        />

      </div>

      {/* ACTION */}

      <a
        href="/add-saving"
        className="block w-full text-center bg-yellow-500 text-black py-4 rounded-2xl font-semibold mb-8"
      >

        Record Saving

      </a>

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

        {history.map(
          (item, index) => (

            <div
              key={index}
              className="bg-gray-900 p-4 rounded-2xl mb-3 border border-yellow-500/10"
            >

              <div className="flex justify-between items-start">

                <div>

                  <p className="text-white text-lg font-semibold">

                    ₹ {item.amount}

                  </p>

                </div>

                <div className="text-right">

                  <p className="text-xs text-gray-500">

                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}

                  </p>

                </div>

              </div>

              <div className="mt-3 text-sm text-gray-400 space-y-1">

                <p>

                  Gold Added:
                  {" "}
                  <span className="text-yellow-500">

                    {item.goldGrams?.toFixed(3)} g

                  </span>

                </p>

                <p className="text-xs text-gray-500">

                  TXN:
                  {" "}
                  {item.transactionId || "N/A"}

                </p>

              </div>

            </div>

          )
        )}

      </div>

      {/* BRAND */}

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
