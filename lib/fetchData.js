import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;

//fetch the location based on the coordinates
const fetchLocation = async (lat, lon, setState) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`
    );
    const { _normalized_city, state, country } =
      response.data?.results[0]?.components;

    setState(`${_normalized_city}, ${state}, ${country}`);
  } catch (error) {
    setState("Unable to retrieve location");
  }
};

//fetch the current weather condition
const fetchCurrentWeather = async (
  lat,
  lon,
  setState,
  setLoading,
  setError
) => {
  setLoading(true);
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m,apparent_temperature,relative_humidity_2m,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`
    );
    setState(response.data);
    setLoading(false);
  } catch (error) {
    setError("Failed to fetch weather data!");
    setLoading(false);
  }
};

//fetch the hourly forecast data
const fetchHourlyWeather = async (lat, lon, setState, setLoading, setError) => {
  setLoading(true);
  try {
    // Fetch hourly data
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code&timezone=auto&forecast_days=2`
    );
    const data = response.data;

    // Get the current time in the specified timezone
    const currentTime = new Date().toLocaleString("en-US", {
      timeZone: data.timezone,
    });
    const currentTimeInLocal = new Date(currentTime);

    // Filter hourly data for the next 24 hours
    const filteredHourlyData = data.hourly.time
      .map((time, index) => ({
        time,
        temperature: data.hourly.temperature_2m[index],
        weatherCode: data.hourly.weather_code[index],
      }))
      .filter((hour) => new Date(hour.time) >= currentTimeInLocal)
      .slice(0, 24);

    setState(filteredHourlyData);
    setLoading(false);
  } catch (error) {
    setError("Failed to fetch hourly forecast data!");
    setLoading(false);
  }
};

const fetchDailyWeather = async (lat, lon, setState, setLoading, setError) => {
  setLoading(true);
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
    );
    setState(response.data.daily);
    setLoading(false);
  } catch (error) {
    setError("Error fetching forecast data!");
    setLoading(false);
  }
};

export {
  fetchCurrentWeather,
  fetchDailyWeather,
  fetchHourlyWeather,
  fetchLocation,
};
