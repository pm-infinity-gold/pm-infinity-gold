 "use client";

import { useEffect, useState } from "react";

import BottomNav from "@/components/BottomNav";

import {
  getStatusMessage,
} from "@/services/statusMessageService";

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

export default function RedemptionsPage() {

  const [requests, setRequests] =
    useState<RedemptionRequest[]>([]);

  useEffect(() => {

    const loadRequests = () => {

      const currentUser =
        localStorage.getItem(
          "currentUser"
        );

      if (!currentUser) {

        window.location.href =
          "/login";

        return;
      }

      const storedRequests =
        JSON.parse(
          localStorage.getItem(
            `${currentUser}_redemptions`
          ) || "[]"
        );

      setRequests(
        Array.isArray(storedRequests)
          ? storedRequests
          : []
      );
    };

    loadRequests();

    window.addEventListener(
      "focus",
      loadRequests
    );

    return () => {

      window.removeEventListener(
        "focus",
        loadRequests
      );

    };

  }, []);

  const getStatusColor = (
    status: RedemptionRequest["status"]
  ) => {

    switch (status) {

      case "requested":
        return "text-yellow-400";

      case "approved":
        return "text-green-400";

      case "processing":
        return "text-blue-400";

      case "dispatched":
        return "text-purple-400";

      case "delivered":
        return "text-green-500";

      case "rejected":
        return "text-red-400";

      default:
        return "text-gray-400";
    }
  };

  const timelineSteps = [
    "requested",
    "approved",
    "processing",
    "dispatched",
    "delivered",
  ];

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10 pb-28">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold text-yellow-500">

          Redemption Requests

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

        Track your gold redemption journey 💛

      </p>

      {/* EMPTY */}

      {requests.length === 0 && (

        <div className="bg-gray-900 p-6 rounded-2xl text-center">

          <p className="text-gray-400">

            No redemption requests yet.

          </p>

        </div>

      )}

      {/* REQUESTS */}

      {requests.map((item, index) => (

        <div
          key={index}
          className="bg-gray-900 p-6 rounded-2xl mb-6 border border-yellow-500/10"
        >

          {/* TOP */}

          <div className="flex justify-between items-start">

            <div>

              <p className="text-yellow-500 text-2xl font-semibold">

                {item.grams.toFixed(3)} g

              </p>

              <p className="text-gray-400 text-sm mt-2">

                Request ID:
                {" "}
                {item.id}

              </p>

              <p className="text-gray-400 text-sm mt-1">

                Receipt:
                {" "}
                <span className="text-yellow-500">

                  {item.receiptNumber}

                </span>

              </p>

            </div>

            <p
              className={`text-xs uppercase font-semibold ${getStatusColor(item.status)}`}
            >

              {item.status}

            </p>

          </div>

          {/* STATUS MESSAGE */}

          <div className="mt-5 bg-black/30 p-4 rounded-2xl border border-yellow-500/10">

            <p className="text-sm text-gray-300 leading-6">

              {getStatusMessage(item.status)}

            </p>

          </div>

          {/* TIMELINE */}

          {item.status !== "rejected" && (

            <div className="mt-8">

              <div className="flex justify-between items-center">

                {timelineSteps.map(
                  (step, stepIndex) => {

                    const active =
                      timelineSteps.indexOf(
                        item.status
                      ) >= stepIndex;

                    return (

                      <div
                        key={step}
                        className="flex flex-col items-center flex-1"
                      >

                        <div
                          className={`w-4 h-4 rounded-full ${
                            active
                              ? "bg-yellow-500"
                              : "bg-gray-700"
                          }`}
                        />

                        <p
                          className={`text-[10px] mt-2 capitalize text-center ${
                            active
                              ? "text-yellow-500"
                              : "text-gray-500"
                          }`}
                        >

                          {step}

                        </p>

                      </div>

                    );
                  }
                )}

              </div>

              <div className="relative h-1 bg-gray-800 mt-[-32px] mx-2">

                <div
                  className="absolute top-0 left-0 h-1 bg-yellow-500"
                  style={{
                    width: `${
                      (
                        timelineSteps.indexOf(
                          item.status
                        ) /
                        (timelineSteps.length - 1)
                      ) * 100
                    }%`,
                  }}
                />

              </div>

            </div>

          )}

          {/* REJECTED */}

          {item.status === "rejected" && (

            <div className="mt-6 bg-red-500/10 border border-red-500/20 p-4 rounded-xl">

              <p className="text-red-400 text-sm">

                Redemption request was rejected during operational review.

              </p>

            </div>

          )}

          {/* DATE */}

          <div className="mt-8 text-xs text-gray-500">

            Requested On:
            {" "}
            {new Date(
              item.createdAt
            ).toLocaleDateString()}

          </div>

        </div>

      ))}

      {/* INFO */}

      <div className="mt-10 bg-gradient-to-r from-yellow-500/10 to-yellow-700/10 border border-yellow-500/20 p-5 rounded-2xl">

        <p className="text-yellow-500 font-semibold mb-2">

          Redemption Workflow

        </p>

        <div className="space-y-2 text-sm text-gray-400">

          <p>
            • Request submission
          </p>

          <p>
            • Verification & approval
          </p>

          <p>
            • Coin preparation
          </p>

          <p>
            • Dispatch & delivery
          </p>

        </div>

      </div>

      {/* BOTTOM NAV */}

      <BottomNav />

    </div>
  );
}