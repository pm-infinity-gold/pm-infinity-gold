"use client";

export default function AboutPage() {

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-yellow-500">

          About PM Infinity Gold

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

      {/* INTRO */}

      <div className="bg-gray-900 p-6 rounded-2xl mb-6">

        <h2 className="text-yellow-500 text-xl font-semibold mb-3">

          Smart Gold Saving Platform

        </h2>

        <p className="text-gray-300 leading-7">

          PM Infinity Gold is a micro gold saving platform designed to help users gradually build gold ownership through disciplined savings.

          Users can save step-by-step, track gold equivalent, monitor progress toward milestone goals, and request redemption once eligible.

        </p>

      </div>

      {/* HOW IT WORKS */}

      <div className="bg-gray-900 p-6 rounded-2xl mb-6">

        <h2 className="text-yellow-500 text-xl font-semibold mb-4">

          How It Works

        </h2>

        <div className="space-y-3 text-gray-300">

          <p>
            1. Save money gradually starting from small amounts.
          </p>

          <p>
            2. Track your gold equivalent based on gold rate.
          </p>

          <p>
            3. Reach your milestone target.
          </p>

          <p>
            4. Submit redemption request.
          </p>

          <p>
            5. Redemption workflow is processed operationally.
          </p>

        </div>

      </div>

      {/* REDEMPTION */}

      <div className="bg-gray-900 p-6 rounded-2xl mb-6">

        <h2 className="text-yellow-500 text-xl font-semibold mb-4">

          Redemption & Delivery

        </h2>

        <p className="text-gray-300 leading-7">

          Eligible users may request redemption of hallmark 916 gold coin products subject to operational processing, verification, and delivery workflow.

          Delivery timelines may vary depending on operational processing and logistics availability.

        </p>

      </div>

      {/* SECURITY */}

      <div className="bg-gray-900 p-6 rounded-2xl mb-6">

        <h2 className="text-yellow-500 text-xl font-semibold mb-4">

          Transparency & Operational Control

        </h2>

        <p className="text-gray-300 leading-7">

          PM Infinity Gold follows a controlled operational workflow model with redemption tracking, request lifecycle visibility, and administrative monitoring for transparency and operational safety.

        </p>

      </div>

      {/* DISCLAIMER */}

      <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-2xl mb-6">

        <h2 className="text-yellow-500 text-xl font-semibold mb-4">

          Important Note

        </h2>

        <p className="text-gray-300 leading-7">

          PM Infinity Gold is currently under progressive development and operational expansion.

          Features, redemption availability, delivery regions, and processing workflows may evolve over time.

        </p>

      </div>

      {/* FUTURE */}

      <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-700/10 border border-yellow-500/20 p-6 rounded-2xl">

        <h2 className="text-yellow-500 text-xl font-semibold mb-4">

          Future Vision

        </h2>

        <p className="text-gray-300 leading-7">

          PM Infinity Gold aims to build a trusted AI-integrated gold savings and ownership ecosystem supporting disciplined savings, operational transparency, and future global expansion possibilities for Indian families.

        </p>

      </div>

    </div>
  );
}