 "use client";

import { useEffect, useState } from "react";

import BottomNav from "@/components/BottomNav";

import {
  getProfileCompletion,
} from "@/services/profileCompletionService";

interface UserProfile {

  name: string;

  phone: string;

  address: string;

  city: string;

  pincode: string;
}

export default function ProfilePage() {

  const [user, setUser] =
    useState("");

  const [profile, setProfile] =
    useState<UserProfile>({
      name: "",
      phone: "",
      address: "",
      city: "",
      pincode: "",
    });

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

    const storedProfile =
      JSON.parse(
        localStorage.getItem(
          `${currentUser}_profile`
        ) || "{}"
      );

    setProfile({
      name:
        storedProfile.name || "",
      phone:
        storedProfile.phone || "",
      address:
        storedProfile.address || "",
      city:
        storedProfile.city || "",
      pincode:
        storedProfile.pincode || "",
    });

  }, []);

  const completion =
    getProfileCompletion(
      profile
    );

  const handleSave = () => {

    if (!user) return;

    localStorage.setItem(
      `${user}_profile`,
      JSON.stringify(profile)
    );

    alert(
      "Profile updated successfully."
    );
  };

  return (

    <div className="min-h-screen bg-black text-white px-6 py-10 pb-28">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-yellow-500">

          My Profile

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

        Maintain accurate delivery and identity information for redemption operations.

      </p>

      {/* PROFILE COMPLETION */}

      <div className="bg-gray-900 p-5 rounded-2xl mb-6 border border-yellow-500/10">

        <div className="flex justify-between items-center mb-3">

          <p className="text-yellow-500 font-semibold">

            Profile Completion

          </p>

          <p className="text-yellow-400 text-sm">

            {completion.percentage}%

          </p>

        </div>

        <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">

          <div
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-3 rounded-full"
            style={{
              width: `${completion.percentage}%`,
            }}
          />

        </div>

        <div className="mt-4">

          {completion.completed ? (

            <p className="text-green-400 text-sm font-semibold">

              ✅ KYC Ready & Redemption Eligible

            </p>

          ) : (

            <p className="text-gray-400 text-sm">

              Complete all profile fields to enable redemption operations.

            </p>

          )}

        </div>

      </div>

      {/* PROFILE FORM */}

      <div className="bg-gray-900 p-6 rounded-3xl border border-yellow-500/10 space-y-5">

        <div>

          <label className="block text-sm text-gray-400 mb-2">

            Full Name

          </label>

          <input
            type="text"
            value={profile.name}
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value,
              })
            }
            placeholder="Enter full name"
            className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white"
          />

        </div>

        <div>

          <label className="block text-sm text-gray-400 mb-2">

            Phone Number

          </label>

          <input
            type="text"
            value={profile.phone}
            onChange={(e) =>
              setProfile({
                ...profile,
                phone:
                  e.target.value,
              })
            }
            placeholder="Enter phone number"
            className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white"
          />

        </div>

        <div>

          <label className="block text-sm text-gray-400 mb-2">

            Address

          </label>

          <textarea
            value={profile.address}
            onChange={(e) =>
              setProfile({
                ...profile,
                address:
                  e.target.value,
              })
            }
            placeholder="Enter delivery address"
            className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white min-h-[120px]"
          />

        </div>

        <div>

          <label className="block text-sm text-gray-400 mb-2">

            City

          </label>

          <input
            type="text"
            value={profile.city}
            onChange={(e) =>
              setProfile({
                ...profile,
                city:
                  e.target.value,
              })
            }
            placeholder="Enter city"
            className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white"
          />

        </div>

        <div>

          <label className="block text-sm text-gray-400 mb-2">

            Pincode

          </label>

          <input
            type="text"
            value={profile.pincode}
            onChange={(e) =>
              setProfile({
                ...profile,
                pincode:
                  e.target.value,
              })
            }
            placeholder="Enter pincode"
            className="w-full p-4 rounded-2xl bg-black border border-gray-700 text-white"
          />

        </div>

        <button
          onClick={handleSave}
          className="w-full bg-yellow-500 text-black py-4 rounded-2xl font-semibold"
        >

          Save Profile

        </button>

      </div>

      {/* INFO */}

      <div className="mt-8 bg-gradient-to-r from-yellow-500/10 to-yellow-700/10 border border-yellow-500/20 p-5 rounded-2xl">

        <p className="text-yellow-500 font-semibold mb-2">

          Why Profile Completion Matters

        </p>

        <div className="space-y-2 text-sm text-gray-400">

          <p>
            • Enables secure redemption fulfillment
          </p>

          <p>
            • Improves operational verification
          </p>

          <p>
            • Supports delivery readiness
          </p>

          <p>
            • Strengthens account trust & security
          </p>

        </div>

      </div>

      {/* BOTTOM NAV */}

      <BottomNav />

    </div>
  );
}