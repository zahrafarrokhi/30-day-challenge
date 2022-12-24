import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar";
import YearPicker from "../components/YearPicker";
import MonthPicker from "../components/MonthPicker";
import Calendar from "../components/Calendar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div>
          <YearPicker />
        </div>
        <div>
          <MonthPicker />
        </div>
      </div>
      <div className="flex flex-row">
        <Calendar />
      </div>
    </div>
  );
}

Home.getLayout = (page) => {
  return <Navbar>{page}</Navbar>;
};
