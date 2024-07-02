"use client";

import { GlobalContextProvider } from "@/context/globalContext";

const Provider = ({ children }) => {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
};

export default Provider;
