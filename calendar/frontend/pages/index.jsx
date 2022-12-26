  import Head from "next/head";
  import Image from "next/image";
  import { Inter } from "@next/font/google";
  import styles from "../styles/Home.module.css";
  import Navbar from "../components/navbar";
  import YearPicker from "../components/YearPicker";
  import MonthPicker from "../components/MonthPicker";
  import Calendar from "../components/Calendar";
  import { useState } from "react";

  export default function Home() {
    const [totalState, setTotalState] = useState(new Date())
    return (
      
      <div className="flex flex-row h-full justify-center lg:gap-32 md:gap-4 [&_*]:transition-all [&_*]:duration-300 transition-all duration-300">

        <div className="flex flex-col relative mx-4">
        <h1 className=" font-bold text-lg absolute p-6 top-[20%] text-purple-500">Calendar</h1>
        <div className="flex flex-col items-center justify-center gap-4 my-auto">
            <YearPicker totalState={totalState} setTotalState={setTotalState}/>
            <MonthPicker totalState={totalState} setTotalState={setTotalState}/>
        </div>
        </div>
        <div className="flex flex-col justify-center items-center  h-full">
          <Calendar totalState={totalState} setTotalState={setTotalState}/>
        </div>
      </div>
    );
  }

  Home.getLayout = (page) => {
    return <Navbar>{page}</Navbar>;
  };
