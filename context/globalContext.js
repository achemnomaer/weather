"use Client";
import defaultStates from "@/lib/defaultStates";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

import { debounce } from "lodash";

const GlobalContext = createContext();
const GlobalContextUpdate = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [geoCodedList, setGeoCodedList] = useState(defaultStates);
  const [inputValue, setInputValue] = useState("");

  const [activeCityCoords, setActiveCityCoords] = useState();

  //geocoded list
  const fetchGeoCodedList = async (search) => {
    try {
      const res = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=5&language=en&format=json`
      );

      setGeoCodedList(res.data.results);
    } catch (error) {
      console.log("Error fetching geocoded list: ", error.message);
    }
  };

  // handle input
  const handleInput = (e) => {
    setInputValue(e.target.value);

    if (e.target.value === "") {
      setGeoCodedList(defaultStates);
    }
  };

  // debounce function
  useEffect(() => {
    const debouncedFetch = debounce((search) => {
      fetchGeoCodedList(search);
    }, 500);

    if (inputValue) {
      debouncedFetch(inputValue);
    }

    // cleanup
    return () => debouncedFetch.cancel();
  }, [inputValue]);

  return (
    <GlobalContext.Provider
      value={{
        geoCodedList,
        inputValue,
        handleInput,
        activeCityCoords,
        setActiveCityCoords,
      }}
    >
      <GlobalContextUpdate.Provider
        value={{
          setActiveCityCoords,
        }}
      >
        {children}
      </GlobalContextUpdate.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export const useGlobalContextUpdate = () => useContext(GlobalContextUpdate);
