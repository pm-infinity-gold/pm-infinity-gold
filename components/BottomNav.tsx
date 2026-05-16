 "use client";

export default function BottomNav() {

  return (

    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-yellow-500/10 px-1 py-3 flex justify-around items-center z-50 overflow-x-auto">

      <button
        onClick={() => {
          window.location.href = "/";
        }}
        className="flex flex-col items-center text-yellow-500 text-xs min-w-[60px]"
      >

        <span className="text-lg">

          🏠

        </span>

        Home

      </button>

      <button
        onClick={() => {
          window.location.href = "/wallet";
        }}
        className="flex flex-col items-center text-cyan-400 text-xs min-w-[60px]"
      >

        <span className="text-lg">

          💳

        </span>

        Wallet

      </button>

      <button
        onClick={() => {
          window.location.href = "/buy-gold";
        }}
        className="flex flex-col items-center text-yellow-500 text-xs min-w-[60px]"
      >

        <span className="text-lg">

          🪙

        </span>

        Buy

      </button>

      <button
        onClick={() => {
          window.location.href = "/sell-gold";
        }}
        className="flex flex-col items-center text-red-400 text-xs min-w-[60px]"
      >

        <span className="text-lg">

          💰

        </span>

        Sell

      </button>

      <button
        onClick={() => {
          window.location.href = "/profile";
        }}
        className="flex flex-col items-center text-yellow-500 text-xs min-w-[60px]"
      >

        <span className="text-lg">

          👤

        </span>

        Profile

      </button>

      <button
        onClick={() => {
          window.location.href = "/admin";
        }}
        className="flex flex-col items-center text-red-400 text-xs min-w-[60px]"
      >

        <span className="text-lg">

          ⚙️

        </span>

        Admin

      </button>

    </div>
  );
}