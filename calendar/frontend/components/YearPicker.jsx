import React, { useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Button} from '@mui/material'
import getYear from 'date-fns/getYear'
import addYears from 'date-fns/addYears'



export default function YearPicker() {
  const [year,setYear]= useState(new Date())

  const calYearPlus = ()=>{
    
    setYear(y => addYears(y, 1))
  }

  const calYearNeagative = ()=>{
    
    setYear(y => addYears(y, -1))
  }

  // const updateYear = (val) => {
  //   setYear(y => y + val)

  // }
  return (
    <div>
      <Button onClick={calYearNeagative}><ArrowBackIosIcon/></Button>
      {getYear(year)}
      <Button onClick={calYearPlus}><ArrowForwardIosIcon/></Button>

      {/* <Button onClick={() => updateYear(-1)}><ArrowBackIosIcon/></Button>
      {year}
      <Button onClick={() => updateYear(+1)}><ArrowForwardIosIcon/></Button> */}
    </div>
  )
}
