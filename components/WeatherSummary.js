import getWeatherIconAndDescription from "@/lib/getWeatherIconAndDescription";
import { formatDateAndTime } from "@/lib/utils";
import { LuCalendarClock } from "react-icons/lu";

export default function WeatherSummary({ weatherData }) {
  const temp = Math.round(weatherData?.current?.temperature_2m);
  const feelsTemp = Math.round(weatherData?.current?.apparent_temperature);
  const maxTemp = Math.round(weatherData?.daily?.temperature_2m_max[0]);
  const minTemp = Math.round(weatherData?.daily?.temperature_2m_min[0]);

  const { icon, description } = getWeatherIconAndDescription(
    weatherData.current.weather_code
  );
  return (
    <div className="flex flex-col">
      {/* Date */}
      <div className="flex gap-x-2 text-gray-300 font-medium">
        <span className="my-auto">
          <LuCalendarClock className="w-6 h-6" />
        </span>
        <span className="my-auto">
          {formatDateAndTime(weatherData?.current?.time, weatherData?.timezone)}
        </span>
      </div>

      {/* max, min, feels like and actual temperature */}
      <div className="my-auto flex justify-between sm:justify-center gap-x-4 sm:gap-x-10 sm:mx-auto mt-8">
        <div className="flex flex-col gap-y-3 my-auto">
          <p className="mx-auto text-lg text-slate-300">
            {minTemp} | {maxTemp}°C{" "}
          </p>
          <p className="mx-auto font-medium text-4xl sm:text-6xl">{temp}°C</p>
          <p className="mx-auto text-lg text-slate-300">
            Feels like {feelsTemp}°C
          </p>
        </div>

        {/* Weather Icon and description */}
        <div className="flex flex-col gap-y-2 my-auto">
          <span className="text-blue-400 text-6xl sm:text-9xl">{icon}</span>
          <span className="mx-auto text-lg text-slate-300">{description}</span>
        </div>
      </div>
    </div>
  );
}
