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
