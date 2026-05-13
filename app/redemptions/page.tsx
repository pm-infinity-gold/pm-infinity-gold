"use client";

import { useEffect, useState } from "react";

interface RedemptionRequest {

  id: string;

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

  const getStatusMessage = (
    status: RedemptionRequest["status"]
  ) => {

    switch (status) {

      case "requested":
        return "Your request has been received.";

      case "approved":
        return "Your redemption has been approved.";

      case "processing":
        return "Your gold coin is being prepared.";

      case "dispatched":
        return "Your coin has been dispatched.";

      case "delivered":
        return "Your redemption has been completed.";

      case "rejected":
        return "Your redemption request was rejected.";

      default:
        return "";
    }
  };

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10">

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
          className="bg-gray-900 p-6 rounded-2xl mb-5 border border-yellow-500/10"
        >

          <div className="flex justify-between items-start">

            <div>

              <p className="text-yellow-500 text-2xl font-semibold">

                {item.grams.toFixed(3)} g

              </p>

              <p className="text-gray-400 text-sm mt-1">

                Request ID:
                {" "}
                {item.id}

              </p>

            </div>

            <div>

              <p
                className={`text-xs uppercase font-semibold ${getStatusColor(item.status)}`}
              >

                {item.status}

              </p>

            </div>

          </div>

          {/* STATUS MESSAGE */}

          <div className="mt-5">

            <p
              className={`text-sm font-medium ${getStatusColor(item.status)}`}
            >

              {getStatusMessage(item.status)}

            </p>

          </div>

          {/* DATE */}

          <div className="mt-4 text-xs text-gray-500">

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

      {/* TRUST */}

      <div className="mt-8 text-center text-xs text-gray-500">

        PM Infinity Gold redemption requests are processed through controlled operational workflows.

      </div>

    </div>
  );
}