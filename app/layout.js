import Provider from "@/components/Provider";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weather",
  description:
    "It provides current weather condition and weather forecast for cities.",

  openGraph: {
    title: "Weather",
    description:
      "It provides current weather condition and weather forecast for cities.",
    url: "https://weather-rho-ashen.vercel.app/",
    siteName: "Weather",
    locale: "bn_BD",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
