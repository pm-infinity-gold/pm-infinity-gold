 "use client";

import { useEffect, useState } from "react";

import { appConfig } from "@/admin/appConfig";

import {
  updateRedemptionStatus,
} from "@/redemption/redemptionService";

import {
  getAdminAnalytics,
} from "@/services/adminAnalyticsService";

import {
  isAdminLoggedIn,
  logoutAdmin,
} from "@/services/adminAuthService";

interface RedemptionRequest {

  id: string;

  user: string;

  grams: number;

  status: string;

  createdAt: string;
}

export default function AdminPage() {

  const [requests,
    setRequests] =
    useState<
      RedemptionRequest[]
    >([]);

  const [paused,
    setPaused] =
    useState(
      appConfig.appPaused
    );

  const [authorized,
    setAuthorized] =
    useState(false);

  const analytics =
    getAdminAnalytics();

  const loadRequests =
    () => {

      const allRequests:
        RedemptionRequest[] = [];

      for (
        let i = 0;
        i < localStorage.length;
        i++
      ) {

        const key =
          localStorage.key(i);

        if (
          key?.endsWith(
            "_redemptions"
          )
        ) {

          const data =
            JSON.parse(
              localStorage.getItem(
                key
              ) || "[]"
            );

          allRequests.push(
            ...data
          );
        }
      }

      allRequests.sort(
        (a, b) =>
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
      );

      setRequests(
        allRequests
      );
    };

  useEffect(() => {

    const loggedIn =
      isAdminLoggedIn();

    if (!loggedIn) {

      window.location.href =
        "/admin-login";

      return;
    }

    setAuthorized(true);

    loadRequests();

  }, []);

  const handleStatusUpdate =
    (
      requestId: string,
      status: string
    ) => {

      updateRedemptionStatus(
        requestId,
        status
      );

      loadRequests();
    };

  const toggleApp =
    () => {

      appConfig.appPaused =
        !paused;

      setPaused(
        appConfig.appPaused
      );
    };

  const handleLogout =
    () => {

      logoutAdmin();

      window.location.href =
        "/admin-login";
    };

  if (!authorized) {

    return null;
  }

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-yellow-500">

            Admin Operations

          </h1>

          <p className="text-gray-400 mt-2">

            Executive redemption & platform management dashboard.

          </p>

        </div>

        <div className="flex gap-4 items-center">

          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="text-yellow-500"
          >

            ← Dashboard

          </button>

          <button
            onClick={handleLogout}
            className="text-red-400"
          >

            Logout

          </button>

        </div>

      </div>

      {/* EXECUTIVE ANALYTICS */}

      <div className="grid grid-cols-2 gap-4 mb-8">

        <div className="bg-gray-900 p-5 rounded-2xl border border-yellow-500/10">

          <p className="text-gray-400 text-sm">

            Total Users

          </p>

          <h2 className="text-3xl font-bold text-yellow-500 mt-2">

            {analytics.totalUsers}

          </h2>

        </div>

        <div className="bg-gray-900 p-5 rounded-2xl border border-yellow-500/10">

          <p className="text-gray-400 text-sm">

            Platform Savings

          </p>

          <h2 className="text-3xl font-bold text-yellow-500 mt-2">

            ₹ {analytics.totalSavings}

          </h2>

        </div>

        <div className="bg-gray-900 p-5 rounded-2xl border border-yellow-500/10">

          <p className="text-gray-400 text-sm">

            Gold Liability

          </p>

          <h2 className="text-3xl font-bold text-yellow-500 mt-2">

            {analytics.totalGoldLiability.toFixed(3)} g

          </h2>

        </div>

        <div className="bg-gray-900 p-5 rounded-2xl border border-yellow-500/10">

          <p className="text-gray-400 text-sm">

            Pending Requests

          </p>

          <h2 className="text-3xl font-bold text-yellow-500 mt-2">

            {analytics.pendingRedemptions}

          </h2>

        </div>

      </div>

      {/* APP CONTROL */}

      <div className="bg-gray-900 p-6 rounded-3xl border border-yellow-500/10 mb-8">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-yellow-500 font-semibold">

              Platform Status

            </p>

            <p className="text-gray-400 text-sm mt-1">

              Enable or pause platform access globally.

            </p>

          </div>

          <button
            onClick={toggleApp}
            className={`px-5 py-3 rounded-2xl font-semibold ${
              paused
                ? "bg-red-500 text-white"
                : "bg-green-500 text-black"
            }`}
          >

            {paused
              ? "Resume Platform"
              : "Pause Platform"}

          </button>

        </div>

      </div>

      {/* REDEMPTION REQUESTS */}

      <div>

        <h2 className="text-yellow-500 text-xl font-semibold mb-5">

          Redemption Requests

        </h2>

        {requests.length === 0 && (

          <div className="bg-gray-900 p-6 rounded-2xl text-gray-500">

            No redemption requests available.

          </div>

        )}

        <div className="space-y-4">

          {requests.map(
            (request) => (

              <div
                key={request.id}
                className="bg-gray-900 p-5 rounded-2xl border border-yellow-500/10"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <p className="text-yellow-500 font-semibold">

                      {request.user}

                    </p>

                    <p className="text-gray-300 mt-1">

                      {request.grams.toFixed(3)} g

                    </p>

                    <p className="text-xs text-gray-500 mt-2">

                      {new Date(
                        request.createdAt
                      ).toLocaleString()}

                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-gray-400 mb-3">

                      Status:
                      {" "}
                      <span className="text-yellow-500">

                        {request.status}

                      </span>

                    </p>

                    <div className="flex gap-2 flex-wrap justify-end">

                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            request.id,
                            "Approved"
                          )
                        }
                        className="bg-green-500 text-black px-3 py-2 rounded-xl text-sm font-semibold"
                      >

                        Approve

                      </button>

                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            request.id,
                            "Dispatched"
                          )
                        }
                        className="bg-blue-500 text-white px-3 py-2 rounded-xl text-sm font-semibold"
                      >

                        Dispatch

                      </button>

                      <button
                        onClick={() =>
                          handleStatusUpdate(
                            request.id,
                            "Delivered"
                          )
                        }
                        className="bg-yellow-500 text-black px-3 py-2 rounded-xl text-sm font-semibold"
                      >

                        Deliver

                      </button>

                    </div>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}