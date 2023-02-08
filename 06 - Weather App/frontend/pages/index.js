import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment-jalaali";
// import moment from "moment";
import { AiFillCloud } from "react-icons/ai";

const inter = Inter({ subsets: ["latin"] });
// moment.loadPersian({dialect: 'persian-modern'})


// data => all of data (weather every 3 hours )
// selected => data for one day(every 3 hours)
// for each entry of hour => { dt: unix time, main : {temp, feels_like}, weather: { main: Cloudy }, city: {name, country}}
export default function Home() {
  const [data, setData] = useState();
  const [selected,setSelected] = useState();
  const getData = async (pos) => {
    const crd = pos.coords;
    try {
      const response = await axios.get("http://localhost:8000", {
        params: { lat: crd.latitude, lon: crd.longitude },
      });
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const getData = (pos)=>{
  //   const crd = pos.coords;

  //   const response = axios.get('http://localhost:8000', {params:{lat:crd.latitude,lon:crd.longitude}}).then((response) => {

  //     setData(response.data)
  //   }).catch((e) => {
  //     console.error(e)

  //   })

  // }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            navigator.geolocation.getCurrentPosition(getData);

            //If granted then you can directly call your function here
          } else if (result.state === "prompt") {
            console.log(result.state);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            if (result.state === "granted") {
              console.log(result.state);
              getData();
            }
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }, []);
  // const select = 1;
  const [state, setState] = useState(false)
  return (
    // we have many days so selected day from days => items whose day differs from the previous item
    // ind == 0 => if index of array shouldn't be negative
    <div className="py-8 bg-slate-900 flex flex-col h-full items-center relative overflow-auto">
      <div className="absolute inset-0 overflow-hidden z-10">
        <AiFillCloud className="text-slate-700 move-rtl absolute text-2xl top-10 w-32 h-32" />
        <AiFillCloud className="text-slate-700 move-rtl absolute ![animation-delay:300ms] text-2xl top-15 w-16 h-16" />
        <AiFillCloud className="text-slate-700 move-rtl absolute ![animation-delay:2s] text-2xl top-4 w-16 h-16" />
        <AiFillCloud className="text-slate-700 move-rtl absolute ![animation-delay:1s] text-2xl top-20 w-20 h-20" />
      </div>

      <div className="flex flex-col jusityf-center items-center my-10 z-20">
        <div className="text-white text-xl">{selected ? moment.unix(selected[0].dt).format("ddd"):'Today'}</div>
        <div className="text-white text-3xl">
          {Math.round(selected ? selected[0].main.temp : data?.response.list[0]?.main.temp, 1)} C&#176;
        </div>
        <div className="text-white text-sm">
          {data?.response.city.name}, {data?.response.city.country}
        </div>
        <div className="text-white text-base">
          Feels like {selected ? Math.round(selected[0].main.feels_like) : Math.round(data?.response.list[0]?.main.feels_like)},{" "}
          {selected ? selected[0]?.weather[0].main : data?.response.list[0]?.weather[0].main}
        </div>
        <div className="text-white text-base">
          {moment().format("MMM, YYYY")}
        </div>
      </div>

      <div className="flex flex-row gap-4 relative justify-center w-full z-20">
        <div className="absolute inset-0 overflow-hidden z-10">
          <AiFillCloud className="text-slate-700 move-rtl ![animation-delay:300ms] absolute text-2xl top-10 w-32 h-32" />
          <AiFillCloud className="text-slate-700 move-rtl absolute ![animation-delay:600ms] text-2xl top-15 w-16 h-16" />
          <AiFillCloud className="text-slate-700 move-rtl absolute ![animation-delay:2.4s] text-2xl top-4 w-16 h-16" />
          <AiFillCloud className="text-slate-700 move-rtl absolute ![animation-delay:1.5s] text-2xl top-20 w-20 h-20" />
        </div>

        {data?.response.list
          .filter(
            (day, ind, arr) =>
              ind == 0 ||
              // 20 !== 21 show 20 dates
              moment.unix(day.dt).format("jDD jMMMM jYYYY") !==
                moment.unix(arr[ind - 1].dt).format("jDD jMMMM jYYYY")
          )
          .map((day, ind) => (
            <div
            className="z-10 w-24 h-32 group"
            
            >
            <button 
              key={day.dt}
              onClick={()=>{
                // 20 ==== 20 
                setSelected(data?.response.list?.filter(v=>moment.unix(v.dt).format("jDD jMMMM jYYYY") == moment.unix(day.dt).format("jDD jMMMM jYYYY")))
                setState(day.dt) // state == date.dt
              }}
              // {selected.filter(v=>(moment.unix(v.dt).format("jDD jMMMM jYYYY") === moment.unix(day.dt).format("jDD jMMMM jYYYY"))).length > 0 ?'' : ''}
              className={`text-white w-full h-full p-4 flex flex-col justify-around items-center rounded-2xl border border-solid  drop-shadow-lg relative transition-all duration-500 bottom-0 group-hover:border-rose-600  ${state == day.dt ? 'bottom-8 bg-rose-600  backdrop-blur-3xl bg-opacity-80' : 'border-slate-500 bg-indigo-900 bg-opacity-20 backdrop-blur-3xl ' }`}
            >
              <div>{moment.unix(day.dt).format("ddd, DD")}</div>
              <div className="">
              <Image alt={day.weather[0].main} title={day.weather[0].main}  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} width={32} height={32}/>

              </div>
              {/* <div className="text-xs">{moment.unix(day.dt).format("YYYY/MM/DD")}</div> */}
              <div>{Math.round(day.main.temp)} C&#176;</div>
            </button>
            </div>
          ))}
      </div>

      <div className="text-white w-full flex flex-col z-10 my-10 px-12 self-center max-w-[500px]">
        {selected?.map((d)=>(<React.Fragment key={d.dt}><div  className="flex justify-between">
          <div className="flex flex-col basis-[30%]" >
            <div className="text-lg">
          {moment.unix(d.dt).format("HH:mm")}
          </div>
            <div className="text-xm text-slate-400">
          {moment.unix(d.dt).format("ddd")}
          </div>
           
          </div>
          <div className="flex flex-col items-center  basis-[30%]" >
            <div className="text-sm text-rose-600">
              <Image alt={d.weather[0].main} title={d.weather[0].main} src={`http://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`} width={32} height={32}/>
              {/* {d.weather[0].main} */}
            </div>
            <div className="text-sm text-rose-600">{Math.round(d.main.feels_like)}</div>
          </div>
          <div className=" basis-[30%] text-right" >
          {Math.round(d.main.temp_min)}&#176;C / {Math.round(d.main.temp_max)}&#176;C
          </div>
          </div>
          <hr className="mx-auto w-[60%] border-slate-800 my-2"/>
          </React.Fragment>))}
      </div>
    </div>
  );
}
