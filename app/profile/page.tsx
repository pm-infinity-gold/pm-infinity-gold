"use client";

import { useEffect, useState } from "react";

import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {

  const [user, setUser] =
    useState("");

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [city, setCity] =
    useState("");

  const [pincode, setPincode] =
    useState("");

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

    const savedProfile =
      JSON.parse(
        localStorage.getItem(
          `${currentUser}_profile`
        ) || "{}"
      );

    setName(savedProfile.name || "");

    setPhone(savedProfile.phone || "");

    setAddress(savedProfile.address || "");

    setCity(savedProfile.city || "");

    setPincode(savedProfile.pincode || "");

  }, []);

  const handleSave = () => {

    const profile = {

      name,

      phone,

      address,

      city,

      pincode,
    };

    localStorage.setItem(
      `${user}_profile`,
      JSON.stringify(profile)
    );

    alert(
      "Profile saved successfully"
    );
  };

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10 pb-28">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-yellow-500">

          Delivery Profile

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

        Store your delivery details for future redemption processing.

      </p>

      {/* FORM */}

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-4 rounded-2xl bg-gray-900 border border-gray-700"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          className="w-full p-4 rounded-2xl bg-gray-900 border border-gray-700"
        />

        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          className="w-full p-4 rounded-2xl bg-gray-900 border border-gray-700 h-28"
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
          className="w-full p-4 rounded-2xl bg-gray-900 border border-gray-700"
        />

        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) =>
            setPincode(e.target.value)
          }
          className="w-full p-4 rounded-2xl bg-gray-900 border border-gray-700"
        />

      </div>

      {/* SAVE */}

      <button
        onClick={handleSave}
        className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-semibold mt-8"
      >

        Save Profile

      </button>

      {/* INFO */}

      <div className="mt-10 bg-gradient-to-r from-yellow-500/10 to-yellow-700/10 border border-yellow-500/20 p-5 rounded-2xl">

        <p className="text-yellow-500 font-semibold mb-2">

          Operational Readiness

        </p>

        <div className="space-y-2 text-sm text-gray-400">

          <p>
            • Delivery profile helps redemption processing
          </p>

          <p>
            • Address information supports future logistics
          </p>

          <p>
            • Contact details improve operational communication
          </p>

        </div>

      </div>

      {/* BOTTOM NAV */}

      <BottomNav />

    </div>
  );
}