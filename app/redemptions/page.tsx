 "use client";

import { useEffect, useState } from "react";

import BottomNav from "@/components/BottomNav";

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

  const timelineSteps = [
    "requested",
    "approved",
    "processing",
    "dispatched",
    "delivered",
  ];

  const getStepStatus = (
    currentStatus: string,
    step: string
  ) => {

    const currentIndex =
      timelineSteps.indexOf(
        currentStatus
      );

    const stepIndex =
      timelineSteps.indexOf(step);

    return stepIndex <= currentIndex;
  };

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

              <p className="text-gray-400 text-sm mt-1">

                Request ID:
                {" "}
                {item.id}

              </p>

            </div>

            <div>

              <p className="text-xs uppercase text-yellow-400 font-semibold">

                {item.status}

              </p>

            </div>

          </div>

          {/* TIMELINE */}

          {item.status !== "rejected" && (

            <div className="mt-8">

              <div className="flex justify-between items-center">

                {timelineSteps.map((step, stepIndex) => {

                  const active =
                    getStepStatus(
                      item.status,
                      step
                    );

                  return (

                    <div
                      key={stepIndex}
                      className="flex