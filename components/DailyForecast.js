import { useGlobalContext } from "@/context/globalContext";
import { fetchDailyWeather } from "@/lib/fetchData";
import getWeatherIconAndDescription from "@/lib/getWeatherIconAndDescription";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { LuCalendar } from "react-icons/lu";
import { DailyWeatherSkeleton } from "./skeleton/Skeleton";

export default function DailyForecast() {
  const [dailyData, setDailyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { activeCityCoords } = useGlobalContext();

  useEffect(() => {
    fetchDailyWeather(
      activeCityCoords[0],
      activeCityCoords[1],
      setDailyData,
      setLoading,
      setError
    );
  }, [activeCityCoords]);

  if (loading) {
    return <DailyWeatherSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full h-[600px] bg-blue-900 rounded-md shadow-md text-white font-medium text-center my-auto">
        {error}
      </div>
    );
  }

  return (
    <div className="px-3 py-6 bg-blue-900 rounded-md shadow-md w-full">
      <h2 className="text-gray-300 font-medium flex gap-x-2 pb-2 border-b border-b-slate-400">
        <span>
          <LuCalendar className="w-5 h-5" />
        </span>
        <span>7-DAY FORECAST</span>
      </h2>

      <div className="flex flex-col mt-4">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <tbody>
                  {dailyData &&
                    dailyData.time.map((date, index) => {
                      const { icon, description } =
                        getWeatherIconAndDescription(
                          dailyData.weather_code[index]
                        );
                      const isToday = moment(date).isSame(moment(), "day");
                      const dayName = isToday
                        ? "Today"
                        : moment(date).format("dddd"); // Format day name using moment

                      const minTemp = Math.round(
                        dailyData.temperature_2m_min[index]
                      );
                      const maxTemp = Math.round(
                        dailyData.temperature_2m_max[index]
                      );

                      return (
                        <tr key={index}>
                          <td className="py-1.5 px-2 font-medium">{dayName}</td>
                          <td className="py-1.5 flex gap-x-2 px-2">
                            <span className="text-blue-400 text-2xl">
                              {icon}
                            </span>
                            <span className="text-slate-200 my-auto">
                              {description}
                            </span>
                          </td>
                          <td className="py-1.5 px-2 font-medium whitespace-nowrap">
                            {minTemp} | {maxTemp}°C
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
