import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import {BiSearchAlt} from 'react-icons/bi'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] }) 

const CategoryItem = (props) => {
  const {cati} = props;
  const [selected,setSelected] =  useState(false) 
  
  return <button className={`px-4 py-1 rounded-lg hover:bg-slate-400 cursor-pointer ${selected ? 'bg-rose-300' : ''}`} onClick={()=>setSelected(true)}>{cati.name}</button>
}

export default function Home() {
  // image search ,cat
  const [data, setData] = useState();
  // search
  const [search, setSearch] = useState('');
  // list category
  const [catList, setCatList] = useState([]); 
  const [selected,setSelected] =  useState() 
  // image search
  const searchData = async (e) => {
    e?.preventDefault()
    try {
      const response = await axios.get('http://localhost:8000',{params:{q:search,cat:selected}} );
      setData(response.data)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    searchData()
  }, [])
  

  // list category
  const categoryload = async (e) => {
    e?.preventDefault()
    try {
      const response = await axios.get('http://localhost:8000/cat/' );
      setCatList(response.data)
    } catch(e) {
      console.log(e)
    }
  }
  useEffect(() => {
    categoryload()
  }, [])
  // select Category
  const selectCategory =async (cati)=>{
    setSelected(cati.id)
    try {
      const response = await axios.get('http://localhost:8000/',{params:{cat:cati.id,q:search}} );
      setData(response.data)
    } catch(e) {
      console.log(e)
    }
  }
  return (
    <div className='flex flex-col gap-4 h-full w-full p-4'>
      <form className='flex flex-row group' onSubmit={(e)=>searchData(e)}>
        <input className='p-4 pl-6 bg-sky-500 rounded-l-full focus-visible:outline-1 focus-visible:outline-teal-400 flex-grow' type="text" value={search} onChange={e => setSearch(e.target.value)}></input>
        <button className='bg-sky-500 rounded-r-full p-4 '>
          <BiSearchAlt className='text-white text-lg' />
        </button>
      </form>
      <div className='flex gap-4 '>

        <div className='flex flex-col gap-2 bg-white rounded-md p-4 basis-56'>
          {/* {catList.map(cati=> <button className={`px-4 py-1 rounded-lg hover:bg-slate-400 cursor-pointer ${selected == cati.id? 'bg-rose-300' : ''}`} onClick={()=> selectCategory(cati)}>{cati.name}</button>)} */}
          {/* <button className={`px-4 py-1 rounded-lg hover:bg-slate-400 cursor-pointer ${selected ? 'bg-rose-300' : ''}`} onClick={()=>selectCategory(cat[0])}>{cat[0].name}</button> */}
          {/* <button className={`px-4 py-1 rounded-lg hover:bg-slate-400 cursor-pointer ${selected ? 'bg-rose-300' : ''}`} onClick={()=>selectCategory(cat[1])}>{cat[1].name}</button> */}
          {/* {cat.map(cati=> <CategoryItem cati={cati} />)} */}

          <Link
          // href={`/${cati.slug}/`} 
          href={{
            pathname: '/',
          }}
          className={`px-4 py-1 rounded-lg hover:bg-slate-400 cursor-pointer bg-rose-300`}
          >
            {/* <a > */}

            All
            {/* </a> */}
            </Link>
          {catList.map(cati=> <Link
          // href={`/${cati.slug}/`} 
          href={{
            pathname: '/[slug]/',
            query: {
              slug: cati.slug
            }
          }}
          className={`px-4 py-1 rounded-lg hover:bg-slate-400 cursor-pointer ${selected == cati.id? 'bg-rose-300' : ''}`}
          >
            {/* <a > */}

            {cati.name}
            {/* </a> */}
            </Link>)}

         
          
        </div>
        <div className='block columns-6'>
          {data?.map(image => {
            return <div className='relative w-40 h-40 bg-white rounded-2xl overflow-hidden'>
              <img src={image.file} className="absolute top-0 right-0 left-0 bottom-4 object-contain h-36 w-40"/> 
              <div className='bottom-0 left-0 right-0 absolute p-2 bg-white bg-opacity-40 shadow-md backdrop-filter backdrop-blur-xl'>
                {image.name}
              </div>
              </div>
          })}

        </div>
      </div>
    </div>
  )
}
