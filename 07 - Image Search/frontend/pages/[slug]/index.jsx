import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
function Index() {
  const router = useRouter()
  const { slug } = router.query
  console.log("Slug: ", slug)
   // image search ,cat
   const [data, setData] = useState();
  // list category
  const [cat, setCat] = useState([]); 
    // list category
  const categoryload = async () => {
    
    try {
      const response = await axios.get('http://localhost:8000/cat/' );
      setCat(response.data)
    } catch(e) {
      console.log(e)
    }
  }
  // const catId = useMemo(() => cat.filter(item => item.slug.toLowerCase()==slug?.toLowerCase())[0]?.id, [cat])
  const category = useMemo(() => cat.filter(item => item.slug.toLowerCase()==slug?.toLowerCase())[0], [cat])

  useEffect(() => {
    categoryload()
  }, [])


   // image search
   const load = async () => {
    // e?.preventDefault()
    try {
      // const response = await axios.get('http://localhost:8000',{params:{cat:catId}} );
      const response = await axios.get('http://localhost:8000',{params:{cat:category.id}} );
      setData(response.data)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    // if(catId){load()}
    if(category){load()}
    return () => {

    }    
  // }, [catId])
  }, [category])

  return (
    <div>{category?.name}
    {/* <h1>{slug}</h1> */}
    <div className='block columns-5'>
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
  )
}

export default Index