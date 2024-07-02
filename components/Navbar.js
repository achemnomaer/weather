/* eslint-disable react-hooks/exhaustive-deps */
import { useGlobalContextUpdate } from "@/context/globalContext";
import { useEffect, useState } from "react";
import { LuLocateFixed } from "react-icons/lu";
import SearchDialog from "./SearchDialog";

export default function Navbar() {
  const { setActiveCityCoords } = useGlobalContextUpdate();
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setActiveCityCoords([latitude, longitude]);
      });
    } else {
      console.log("Please turn on your location!");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="py-2">
      <div className="bg-blue-900 px-4 py-2 shadow-md rounded-md">
        <nav className="relative py-2 flex flex-wrap items-center justify-between mx-auto ">
          {/* Logo  */}

          <div className="text-2xl text-blue-200 font-extrabold">Weather.</div>

          {/* menu item */}

          <div className="flex gap-x-4 sm:gap-x-8">
            <SearchDialog />
            <button onClick={getLocation} className="">
              <LuLocateFixed className="w-8 h-8 text-gray-200 hover:text-white " />
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
