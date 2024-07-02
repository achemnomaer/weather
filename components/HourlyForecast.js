import { useGlobalContext } from "@/context/globalContext";
import { fetchHourlyWeather } from "@/lib/fetchData";
import getWeatherIconAndDescription from "@/lib/getWeatherIconAndDescription";
import { useEffect, useState } from "react";
import { LuClock } from "react-icons/lu";
import { HourlyWeatherSkeleton } from "./skeleton/Skeleton";

const HourlyForecast = () => {
  const [hourlyData, setHourlyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { activeCityCoords } = useGlobalContext();

  useEffect(() => {
    fetchHourlyWeather(
      activeCityCoords[0],
      activeCityCoords[1],
      setHourlyData,
      setLoading,
      setError
    );
  }, [activeCityCoords]);

  if (loading) {
    return <HourlyWeatherSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full h-48 bg-blue-900 rounded-md shadow-md text-white font-medium text-center my-auto">
        {error}
      </div>
    );
  }

  return (
    <div className="px-3 py-6 bg-blue-900 rounded-md shadow-md">
      <h2 className="text-gray-300 font-medium flex gap-x-2 pb-2 border-b border-b-slate-400">
        <span>
          <LuClock className="w-5 h-5" />
        </span>
        <span>HOURLY FORECAST</span>
      </h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 py-4 px-2 ">
          {hourlyData.map((hour, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center min-w-[100px] bg-white/20 backdrop-blur-sm rounded-md shadow-md p-2"
            >
              <span className="text-lg font-medium">
                {new Date(hour.time).getHours()}:00
              </span>
              <span className="text-2xl text-blue-300">
                {getWeatherIconAndDescription(hour.weatherCode).icon}
              </span>
              <span className="text-lg">{Math.round(hour.temperature)}°C</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
