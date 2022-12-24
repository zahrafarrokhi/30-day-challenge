import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Navbar from "../components/navbar";
import YearPicker from "../components/YearPicker";
import MonthPicker from "../components/MonthPicker";
import Calendar from "../components/Calendar";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [totalState, setTotalState] = useState(new Date())
  return (
    
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div>
          <YearPicker totalState={totalState} setTotalState={setTotalState}/>
        </div>
        <div>
          <MonthPicker totalState={totalState} setTotalState={setTotalState}/>
        </div>
      </div>
      <div className="flex flex-row">
        <Calendar totalState={totalState} setTotalState={setTotalState}/>
      </div>
    </div>
  );
}

Home.getLayout = (page) => {
  return <Navbar>{page}</Navbar>;
};
