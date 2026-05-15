 "use client";

import { useEffect, useState } from "react";

import BottomNav from "@/components/BottomNav";

import {
  getAdminAnalytics,
} from "@/services/adminAnalyticsService";

interface RedemptionRequest {

  id: string;

  receiptNumber: string;

  userId: string;

  grams: number;

  status:
    | "requested"
    | "approved"
    | "processing"
    | "dispatched"
    | "delivered"
    | "rejected";

  createdAt: string;
}

interface UserProfile {

  name: string;

  phone: string;

  address: string;

  city: string;

  pincode: string;
}

export default function AdminPage() {

  const [requests, setRequests] =
    useState<RedemptionRequest[]>([]);

  useEffect(() => {

    const allRequests:
      RedemptionRequest[] = [];

    for (let key in localStorage) {

      if (
        key.endsWith(
          "_redemptions"
        )
      ) {

        const data =
          JSON.parse(
            localStorage.getItem(
              key
            ) || "[]"
          );

        if (Array.isArray(data)) {

          allRequests.push(
            ...data
          );

        }

      }

    }

    setRequests(allRequests);

  }, []);

  const analytics =
    getAdminAnalytics(
      requests
    );

  const updateStatus = (
    id: string,
    status: RedemptionRequest["status"]
  ) => {

    const updatedRequests =
      requests.map((item) => {

        if (item.id === id) {

          return {
            ...item,
            status,
          };

        }

        return item;
      });

    setRequests(updatedRequests);

    const groupedByUser:
      Record<
        string,
        RedemptionRequest[]
      > = {};

    updatedRequests.forEach(
      (item) => {

        if (
          !groupedByUser[
            item.userId
          ]
        ) {

          groupedByUser[
            item.userId
          ] = [];

        }

        groupedByUser[
          item.userId
        ].push(item);

      }
    );

    Object.keys(
      groupedByUser
    ).forEach((userId) => {

      localStorage.setItem(
        `${userId}_redemptions`,
        JSON.stringify(
          groupedByUser[
            userId
          ]
        )
      );

    });

    alert("Status updated");
  };

  const getProfile = (
    userId: string
  ): UserProfile => {

    return JSON.parse(
      localStorage.getItem(
        `${userId}_profile`
      ) || "{}"
    );
  };

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10 pb-28">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-yellow-500">

          Admin Dashboard

        </h1>

        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="text-yellow-500"
        >

          ← Back

        </button>

      </div>

      <p className="text-gray-400 mb-8">

        Manage redemption requests and operational workflow.

      </p>

      {/* ANALYTICS */}

      <div className="grid grid-cols-2 gap-4 mb-8">

        <div className="bg-gray-900 p-4 rounded-2xl border border-yellow-500/10">

          <p className="text-gray-400 text-sm">

            Total Requests

          </p>

          <h2 className="text-2xl font-bold text-yellow-500 mt-2">

            {analytics.totalRequests}

          </h2>

        </div>

        <div className="bg-gray-900 p-4 rounded-2xl border border-yellow-500/10">

          <p className="text-gray-400 text-sm">

            Gold Requested

          </p>

          <h2 className="text-2xl font-bold text-yellow-500 mt-2">

            {analytics.totalGoldRequested.toFixed(3)} g

          </h2>

        </div>

        <div className="bg-gray-900 p-4 rounded-2xl border border-yellow-500/10">

          <p className="text-gray-400 text-sm">

            Delivered

          </p>

          <h2 className="text-2xl font-bold text-green-400 mt-2">

            {analytics.deliveredCount}

          </h2>

        </div>

        <div className="bg-gray-900 p-4 rounded-2xl border border-yellow-500/10">

          <p className="text-gray-400 text-sm">

            Pending

          </p>

          <h2 className="text-2xl font-bold text-orange-400 mt-2">

            {analytics.pendingCount}

          </h2>

        </div>

      </div>

      {/* EMPTY */}

      {requests.length === 0 && (

        <div className="bg-gray-900 p-6 rounded-2xl text-center">

          <p className="text-gray-400">

            No redemption requests found.

          </p>

        </div>

      )}

      {/* REQUESTS */}

      {requests.map((item, index) => {

        const profile =
          getProfile(
            item.userId
          );

        return (

          <div
            key={index}
            className="bg-gray-900 p-5 rounded-2xl mb-5 border border-yellow-500/10"
          >

            {/* TOP */}

            <div className="flex justify-between items-start">

              <div>

                <p className="text-yellow-500 text-xl font-semibold">

                  {item.grams.toFixed(3)} g

                </p>

                <p className="text-gray-400 text-sm mt-1">

                  User:
                  {" "}
                  {item.userId}

                </p>

                <p className="text-gray-500 text-xs mt-1">

                  {item.id}

                </p>

                <p className="text-yellow-500 text-xs mt-1">

                  Receipt:
                  {" "}
                  {item.receiptNumber}

                </p>

              </div>

              <div>

                <p
                  className={`text-xs uppercase font-semibold ${
                    item.status ===
                    "requested"
                      ? "text-yellow-400"
                      : item.status ===
                        "approved"
                      ? "text-green-400"
                      : item.status ===
                        "processing"
                      ? "text-blue-400"
                      : item.status ===
                        "dispatched"
                      ? "text-purple-400"
                      : item.status ===
                        "delivered"
                      ? "text-green-500"
                      : "text-red-400"
                  }`}
                >

                  {item.status}

                </p>

              </div>

            </div>

            {/* PROFILE */}

            <div className="mt-5 bg-black/30 p-4 rounded-2xl border border-yellow-500/10">

              <p className="text-yellow-500 font-semibold mb-3">

                Customer Delivery Profile

              </p>

              <div className="space-y-2 text-sm text-gray-300">

                <p>
                  Name:
                  {" "}
                  {profile.name || "-"}
                </p>

                <p>
                  Phone:
                  {" "}
                  {profile.phone || "-"}
                </p>

                <p>
                  Address:
                  {" "}
                  {profile.address || "-"}
                </p>

                <p>
                  City:
                  {" "}
                  {profile.city || "-"}
                </p>

                <p>
                  Pincode:
                  {" "}
                  {profile.pincode || "-"}
                </p>

              </div>

            </div>

            {/* ACTIONS */}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-5">

              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "approved"
                  )
                }
                className="bg-green-600 py-2 rounded-xl"
              >

                Approve

              </button>

              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "processing"
                  )
                }
                className="bg-blue-600 py-2 rounded-xl"
              >

                Processing

              </button>

              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "dispatched"
                  )
                }
                className="bg-purple-600 py-2 rounded-xl"
              >

                Dispatch

              </button>

              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "delivered"
                  )
                }
                className="bg-yellow-600 py-2 rounded-xl"
              >

                Delivered

              </button>

              <button
                onClick={() =>
                  updateStatus(
                    item.id,
                    "rejected"
                  )
                }
                className="bg-red-600 py-2 rounded-xl"
              >

                Reject

              </button>

            </div>

          </div>

        );
      })}

      {/* INFO */}

      <div className="mt-10 bg-gradient-to-r from-yellow-500/10 to-yellow-700/10 border border-yellow-500/20 p-5 rounded-2xl">

        <p className="text-yellow-500 font-semibold mb-2">

          Admin Operations

        </p>

        <div className="space-y-2 text-sm text-gray-400">

          <p>
            • Verify redemption eligibility
          </p>

          <p>
            • Review delivery profile
          </p>

          <p>
            • Manage fulfillment lifecycle
          </p>

          <p>
            • Maintain operational transparency
          </p>

        </div>

      </div>

      {/* BOTTOM NAV */}

      <BottomNav />

    </div>
  );
}