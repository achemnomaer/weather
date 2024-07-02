import { useGlobalContext } from "@/context/globalContext";
import { fetchCurrentWeather, fetchLocation } from "@/lib/fetchData";
import {
  getHumidityText,
  getPressureDescription,
  getUvIndexCategory,
} from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  LuGaugeCircle,
  LuSunDim,
  LuSunrise,
  LuSunset,
  LuWind,
} from "react-icons/lu";
import { WiHumidity } from "react-icons/wi";
import Location from "./Location";
import WeatherSummary from "./WeatherSummary";
import { CurrentWeatherSkeleton } from "./skeleton/Skeleton";

const CurrentWeather = () => {
  const { activeCityCoords } = useGlobalContext();
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLocation(activeCityCoords[0], activeCityCoords[1], setLocation);
    fetchCurrentWeather(
      activeCityCoords[0],
      activeCityCoords[1],
      setWeatherData,
      setLoading,
      setError
    );
  }, [activeCityCoords]);

  if (loading) {
    return <CurrentWeatherSkeleton />;
  }

  if (error) {
    return (
      <div className="w-full h-[600px] bg-blue-900 rounded-md shadow-md text-white font-medium text-center my-auto">
        {error}
      </div>
    );
  }

  const humidity = weatherData?.current?.relative_humidity_2m;
  const pressure = weatherData?.current?.pressure_msl;
  const uvIndexMax = weatherData?.daily?.uv_index_max[0].toFixed(0);

  const windSpeed = weatherData?.current?.wind_speed_10m;
  const windDir = weatherData?.current?.wind_direction_10m;

  const todaysWeather = [
    {
      id: "humidity",
      name: "Humidity",
      icon: <WiHumidity className=" w-5 h-5" />,
      value: `${humidity}%`,
      desc: getHumidityText(humidity),
    },

    {
      id: "pressure",
      name: "Pressure",
      icon: <LuGaugeCircle className=" w-5 h-5" />,
      value: `${pressure} hPa`,
      desc: getPressureDescription(pressure),
    },
    {
      id: "uv-index",
      name: "UV Index",
      icon: <LuSunDim className=" w-5 h-5" />,
      value: `${uvIndexMax} of 11 (${getUvIndexCategory(uvIndexMax).text})`,
      desc: `${getUvIndexCategory(uvIndexMax).protection}`,
    },
    {
      id: "wind",
      name: "Wind",
      icon: <LuWind className=" w-5 h-5" />,
      value: `${windSpeed} km/h`,
      desc: "",
    },

    {
      id: "sunrise",
      name: "Sunrise",
      icon: <LuSunrise className=" w-5 h-5" />,
      value: new Date(weatherData.daily.sunrise[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      desc: "",
    },
    {
      id: "sunset",
      name: "Sunset",
      icon: <LuSunset className=" w-5 h-5" />,
      value: new Date(weatherData.daily.sunset[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      desc: "",
    },
  ];

  return (
    <div className="flex flex-col gap-y-2">
      {/* Location */}
      <Location location={location} />

      {/* Current weather data */}
      <div className="px-4 py-4 rounded-md bg-blue-900 shadow-md min-h-[500px]">
        <WeatherSummary weatherData={weatherData} />

        <div className=" grid grid-cols-2 gap-x-4 gap-y-4 mt-8">
          {todaysWeather.map((item, index) => (
            <div
              key={index}
              className="flex-grow px-2 py-2 bg-white/20 backdrop-blur-sm rounded-md shadow-md flex flex-col gap-y-2"
            >
              <div className="flex gap-x-2">
                <span>{item.icon}</span> <span>{item.name}</span>
              </div>
              <p className="font-bold text-lg">{item.value}</p>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
