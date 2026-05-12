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

  const [user, setUser] =
    useState("");

  const [requests, setRequests] =
    useState<RedemptionRequest[]>([]);

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

    setUser(currentUser);

    const storedRequests =
      JSON.parse(
        localStorage.getItem(
          `${currentUser}_redemptions`
        ) || "[]"
      );

    setRequests(storedRequests);

  }, []);

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

      {/* EMPTY STATE */}

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
          className="bg-gray-900 p-5 rounded-2xl mb-4"
        >

          <div className="flex justify-between items-start">

            <div>

              <p className="text-yellow-500 font-semibold text-lg">
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
                className={`text-xs uppercase font-semibold ${
                  item.status === "requested"
                    ? "text-yellow-400"
                    : item.status === "approved"
                    ? "text-green-400"
                    : item.status === "processing"
                    ? "text-blue-400"
                    : item.status === "dispatched"
                    ? "text-purple-400"
                    : item.status === "delivered"
                    ? "text-green-500"
                    : "text-red-400"
                }`}
              >
                {item.status}
              </p>

            </div>

          </div>

          <div className="mt-4 text-sm text-gray-400">

            Requested On:
            {" "}
            {new Date(
              item.createdAt
            ).toLocaleDateString()}

          </div>

        </div>

      ))}

      {/* INFO SECTION */}

      <div className="mt-10 bg-gradient-to-r from-yellow-500/10 to-yellow-700/10 border border-yellow-500/20 p-5 rounded-2xl">

        <p className="text-yellow-500 font-semibold mb-2">
          Redemption Process
        </p>

        <div className="space-y-2 text-sm text-gray-400">

          <p>
            1. Submit redemption request
          </p>

          <p>
            2. Admin verification
          </p>

          <p>
            3. Coin processing
          </p>

          <p>
            4. Dispatch preparation
          </p>

          <p>
            5. Delivery completion
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