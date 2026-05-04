 "use client";

import { useEffect, useState } from "react";

export default function Home() {
  const appPaused = false;
  const [total, setTotal] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [goldRate, setGoldRate] = useState(14050);
  const [user, setUser] = useState("");

  const targetGold = 10;

  useEffect(() => {
    const loadData = () => {
      const currentUser = localStorage.getItem("currentUser");

      if (!currentUser) {
        window.location.href = "/login";
       if (appPaused) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-xl text-yellow-500">
        App is temporarily under maintenance
      </h1>
    </div>
  );
} 
             
        return;
      }

      setUser(currentUser);

      const storedTotal = Number(localStorage.getItem(`${currentUser}_total`) || 0);
      const storedHistory = JSON.parse(localStorage.getItem(`${currentUser}_history`) || "[]");
      const storedRate = Number(localStorage.getItem("goldRate") || 14050);

      setTotal(storedTotal);
      setHistory(storedHistory);
      setGoldRate(storedRate);
    };

    loadData();
    window.addEventListener("focus", loadData);

    return () => {
      window.removeEventListener("focus", loadData);
    };
  }, []);

  const currentGold = total / goldRate;
  const progress = (currentGold / targetGold) * 100;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      <h1 className="text-3xl font-bold text-yellow-500 mb-2">
        PM Infinity Gold
      </h1>

<div className="flex justify-between items-center mb-4">
  <p className="text-gray-400">
    Welcome, {user}
  </p>

  <button
    onClick={() => {
      localStorage.removeItem("currentUser");
      window.location.href = "/login";
    }}
    className="text-sm text-red-400"
  >
    Logout
  </button>
</div>
      <p className="text-gray-400 mb-6">
        Track your gold savings journey 💛
      </p>

      {/* GOLD RATE INPUT */}
      <div className="bg-gray-900 p-4 rounded-2xl mb-6">
        <p className="text-yellow-500 font-semibold mb-2">
          Today’s Gold Rate (22K / 916)
        </p>

        <input
          
  type="number"
  value={goldRate}
  onChange={(e) => {
    const value = Number(e.target.value);
    setGoldRate(value);
    localStorage.setItem("goldRate", value.toString());
  }}
  className="w-full p-3 rounded-xl bg-gray-800 text-yellow-400 font-semibold text-lg border border-gray-700"
  placeholder="Enter today's gold rate"
/>
        

        <p className="text-xs text-gray-400 mt-2">
          You can update this anytime based on current market rate
        </p>
      </div>

      {/* TOTAL */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-6">
        <p>Total Saved</p>
        <h2 className="text-2xl">₹ {total}</h2>
      </div>

      {/* GOLD */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-6">
        <p>Gold Equivalent</p>
        <h2 className="text-2xl text-yellow-500">
          {currentGold.toFixed(3)} grams
        </h2>
      </div>

      {/* PROGRESS */}
      <div className="bg-gray-900 p-6 rounded-2xl mb-6">
        <p className="mb-2">Goal Progress</p>

        <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>{currentGold.toFixed(3)} g</span>
          <span>{targetGold} g</span>
        </div>

        <p className="mt-2 text-center text-yellow-500 font-semibold">
          {progress.toFixed(1)}% completed
        </p>
      </div>

      {/* BUTTON */}
      <a
        href="/add-saving"
        className="block w-full text-center bg-yellow-500 text-black py-3 rounded-xl font-semibold"
      >
        Record Saving
      </a>

      {/* PREMIUM BANNER */}
      <div className="mt-6 bg-gradient-to-r from-yellow-500/10 to-yellow-700/10 border border-yellow-500/30 p-5 rounded-2xl">
        <p className="text-yellow-400 font-semibold text-sm mb-1">
          🚀 Coming Soon
        </p>
        <p className="text-white font-medium">
          Trusted gold saving & redemption
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Own 22K gold coins or jewellery through verified partners.
        </p>
      </div>

      {/* HISTORY */}
      <div className="mt-10">
        <h2 className="text-yellow-500 mb-3 font-semibold">
          Saving History
        </h2>

        {history.length === 0 && (
          <p className="text-gray-500 text-sm">
            No savings recorded yet.
          </p>
        )}

        {history.map((item, index) => (
          <div
            key={index}
            className="bg-gray-900 p-4 rounded-xl mb-3 flex justify-between"
          >
            <div>
              <p className="text-white">₹ {item.amount}</p>
              <p className="text-xs text-gray-400">{item.source}</p>
            </div>
            <div className="text-right text-sm text-gray-400">
              {item.date}
            </div>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <div className="mt-10 text-sm text-gray-400 space-y-2">
        <p className="text-yellow-500 font-semibold">How it works:</p>
        <p>1. Save money on your own (bank / cash / UPI)</p>
        <p>2. Record your savings in this app</p>
        <p>3. Track your gold value over time</p>
        <p>4. Buy gold anytime from your preferred jeweller</p>
      </div>

      {/* TRUST */}
      <div className="mt-6 text-xs text-gray-500 text-center">
        This app helps you track your savings.
        We do not collect or hold your money.
      </div>

    </div>
  );
}