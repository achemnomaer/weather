import moment from "moment-timezone";

export const formatDateAndTime = (time, timezone) => {
  // Use moment-timezone to create a moment object with the specified timezone
  const date = moment.tz(time, timezone);

  // Format the time, day, and date
  const timeString = moment.tz(timezone).format("h:mm A");
  //const timeString = date.format("h:mm A"); // Format as 12-hour time with AM/PM
  const dayString = date.format("dddd"); // Format as full weekday name
  const dateString = date.format("MMMM D, YYYY"); // Format as full month name, day, and year

  return `${timeString}, ${dayString}, ${dateString}`;
};

export const getHumidityText = (humidity) => {
  if (humidity < 30) return "Dry: May cause skin irritation";
  if (humidity >= 30 && humidity < 50)
    return "Comfortable: Ideal for health and comfort";
  if (humidity >= 50 && humidity < 70)
    return "Moderate: Sticky, may increase allergens";
  if (humidity >= 70) return "High: Uncomfortable, mold growth risk";
  return "Unavailable: Humidity data not available";
};

export const getPressureDescription = (pressure) => {
  if (pressure < 1000) return "Very low pressure";

  if (pressure >= 1000 && pressure < 1015)
    return "Low pressure. Expect weather changes.";

  if (pressure >= 1015 && pressure < 1025)
    return "Normal pressure. Expect weather changes.";

  if (pressure >= 1025 && pressure < 1040)
    return "High pressure. Expect weather changes.";

  if (pressure >= 1040) return "Very high pressure. Expect weather changes.";

  return "Unavailable pressure data";
};

export const getUvIndexCategory = (uvIndex) => {
  if (uvIndex <= 2) {
    return {
      text: "Low",
      protection: "No protection required",
    };
  } else if (uvIndex <= 5) {
    return {
      text: "Moderate",
      protection: "Stay in shade near midday.",
    };
  } else if (uvIndex <= 7) {
    return {
      text: "High",
      protection: "Wear a hat and sunglasses.",
    };
  } else if (uvIndex <= 10) {
    return {
      text: "Very High",
      protection: "Apply sunscreen SPF 30+ every 2 hours.",
    };
  } else if (uvIndex > 10) {
    return {
      text: "Extreme",
      protection: "Avoid being outside.",
    };
  } else {
    return {
      text: "Extreme",
      protection: "Avoid being outside.",
    };
  }
};
