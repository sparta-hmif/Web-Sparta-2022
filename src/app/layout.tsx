import Navbar from "@/components/Navbar";
import Provider from "../components/Provider";
import UserFetcher from "@/components/UserFetcher";
import "./globals.css";
import { Koulen, Hammersmith_One, Sen } from "next/font/google";
import ToasterContext from "./context/ToasterContext";

const koulen = Koulen({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-koulen",
  weight: "400",
});

const hammersmith = Hammersmith_One({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hammersmith",
  weight: "400",
});

const sen = Sen({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sen",
  weight: "400",
});

export const metadata = {
  title: {
    default: "SPARTA HMIF 2022",
  },
  description: "Simulasi dan Pelatihan Keorganisasian Untuk Anggota HMIF 2022",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${koulen.variable} ${hammersmith.variable} ${sen.variable}`}
      >
        <Provider>
          <ToasterContext />
          <UserFetcher>{({ user }) => <Navbar user={user} />}</UserFetcher>
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
