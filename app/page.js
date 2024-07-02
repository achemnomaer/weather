/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CurrentWeather from "@/components/CurrentWeather";
import DailyForecast from "@/components/DailyForecast";
import HourlyForecast from "@/components/HourlyForecast";
import Navbar from "@/components/Navbar";
import { GlobalSkeleton } from "@/components/skeleton/Skeleton";
import { useGlobalContext } from "@/context/globalContext";

export default function Home() {
  const { activeCityCoords } = useGlobalContext();

  return (
    <div className="bg-[url('/bg.jpg')] bg-cover bg-no-repeat min-h-screen">
      <div className="w-full px-1 mx-auto max-w-6xl sm:px-6  xl:px-0 pb-10">
        <Navbar />

        {activeCityCoords ? (
          <div className="sm:bg-[#667BC6] sm:rounded-md sm:shadow-md grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2 sm:px-4 sm:py-8">
            <div>
              <CurrentWeather />
            </div>

            <div className="flex flex-col gap-y-2">
              <div>
                <HourlyForecast />
              </div>
              <div>
                <DailyForecast />
              </div>
            </div>
          </div>
        ) : (
          <GlobalSkeleton />
        )}
      </div>
    </div>
  );
}
