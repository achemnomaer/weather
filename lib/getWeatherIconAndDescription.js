import {
  faBolt,
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudSun,
  faCloudSunRain,
  faQuestionCircle,
  faSmog,
  faSnowflake,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const getWeatherIconAndDescription = (weatherCode) => {
  switch (weatherCode) {
    case 0:
      return {
        icon: <FontAwesomeIcon icon={faSun} />,
        description: "Clear sky",
      };

    case 1:
      return {
        icon: <FontAwesomeIcon icon={faCloudSun} />,
        description: "Mainly clear",
      };

    case 2:
      return {
        icon: <FontAwesomeIcon icon={faCloudSun} />,
        description: "Partly cloudy",
      };

    case 3:
      return {
        icon: <FontAwesomeIcon icon={faCloud} />,
        description: "Mostly cloudy",
      };

    case 45:
    case 48:
      return {
        icon: <FontAwesomeIcon icon={faSmog} />,
        description: weatherCode === 45 ? "Fog" : "Depositing rime fog",
      };

    case 51:
      return {
        icon: <FontAwesomeIcon icon={faCloudShowersHeavy} />,
        description: "Light drizzle",
      };

    case 53:
      return {
        icon: <FontAwesomeIcon icon={faCloudShowersHeavy} />,
        description: "Moderate drizzle",
      };

    case 55:
      return {
        icon: <FontAwesomeIcon icon={faCloudShowersHeavy} />,
        description: "Dense drizzle",
      };

    case 56:
    case 57:
      return {
        icon: <FontAwesomeIcon icon={faSnowflake} />,
        description:
          weatherCode === 56
            ? "Light freezing drizzle"
            : "Dense freezing drizzle",
      };

    case 61:
    case 63:
    case 65:
      return {
        icon: <FontAwesomeIcon icon={faCloudRain} />,
        description:
          weatherCode === 61
            ? "Slight rain"
            : weatherCode === 63
            ? "Moderate rain"
            : "Heavy rain",
      };

    case 71:
      return {
        icon: <FontAwesomeIcon icon={faSnowflake} />,
        description: "Slight snow fall",
      };

    case 73:
      return {
        icon: <FontAwesomeIcon icon={faSnowflake} />,
        description: "Moderate snow fall",
      };

    case 75:
      return {
        icon: <FontAwesomeIcon icon={faSnowflake} />,
        description: "Heavy snow fall",
      };

    case 77:
      return {
        icon: <FontAwesomeIcon icon={faSnowflake} />,
        description: "Snow grains",
      };

    case 80:
      return {
        icon: <FontAwesomeIcon icon={faCloudSunRain} />,
        description: "Slight rain showers",
      };

    case 81:
    case 82:
      return {
        icon: <FontAwesomeIcon icon={faCloudShowersHeavy} />,
        description:
          weatherCode === 81 ? "Moderate rain showers" : "Violent rain showers",
      };

    case 85:
      return {
        icon: <FontAwesomeIcon icon={faSnowflake} />,
        description: "Slight snow showers",
      };

    case 86:
      return {
        icon: <FontAwesomeIcon icon={faSnowflake} />,
        description: "Heavy snow showers",
      };

    case 95:
    case 96:
    case 99:
      return {
        icon: <FontAwesomeIcon icon={faBolt} />,
        description: "Thunderstorm",
      };

    default:
      return {
        icon: <FontAwesomeIcon icon={faQuestionCircle} />,
        description: "Unknown",
      };
  }
};

export default getWeatherIconAndDescription;
