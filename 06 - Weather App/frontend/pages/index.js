import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import moment from 'moment-jalaali'
const inter = Inter({ subsets: ['latin'] })
moment.loadPersian()

export default function Home() {

  const [data, setData] = useState();
  const getData = async (pos)=>{
    const crd = pos.coords;
    try {
      const response = await axios.get('http://localhost:8000', {params:{lat:crd.latitude,lon:crd.longitude}})
      setData(response.data)
    } catch (error) {
      console.error(error)
    }
  }
 
  useEffect(()=>{
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            navigator.geolocation.getCurrentPosition(getData)
            
            //If granted then you can directly call your function here
          } else if (result.state === "prompt") {
            console.log(result.state);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            if (result.state === "granted") {
              console.log(result.state);
              getData()
            }
          };
        });
    } else {
      alert("Sorry Not available!");
    }

   
  },[])
  return (
    <>
    {data?.response.list.map((day)=><div>{moment.unix(day.dt).format("jDD jMMMM jYYYY")} {day.main.temp}</div>)}
    
    </>
  )
}
