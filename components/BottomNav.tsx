 "use client";

export default function BottomNav() {

  return (

    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-yellow-500/20 flex justify-around items-center py-3 z-50">

      <a
        href="/"
        className="text-yellow-500 text-sm font-medium"
      >

        Home

      </a>

      <a
        href="/add-saving"
        className="text-gray-300 text-sm"
      >

        Save

      </a>

      <a
        href="/redemptions"
        className="text-gray-300 text-sm"
      >

        Redeem

      </a>

      <a
        href="/profile"
        className="text-gray-300 text-sm"
      >

        Profile

      </a>

      <a
        href="/about"
        className="text-gray-300 text-sm"
      >

        About

      </a>

      <a
        href="/admin"
        className="text-gray-300 text-sm"
      >

        Admin

      </a>

    </div>

  );
}