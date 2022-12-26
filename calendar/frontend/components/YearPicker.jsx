import React, { useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Button} from '@mui/material'
import getYear from 'date-fns/getYear'
import addYears from 'date-fns/addYears'



export default function YearPicker(props) {
  // const [year,setYear]= useState(new Date())
  const {totalState: year, setTotalState: setYear} = props;
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
    <div display="flex flex-row justify-center items-center">
      <Button onClick={calYearNeagative}><ArrowBackIosIcon className='text-slate-300 text-sm flex-shrink'/></Button>
      {getYear(year)}
      <Button onClick={calYearPlus}><ArrowForwardIosIcon className='text-slate-300 text-sm flex-shrink'/></Button>

      {/* <Button onClick={() => updateYear(-1)}><ArrowBackIosIcon/></Button>
      {year}
      <Button onClick={() => updateYear(+1)}><ArrowForwardIosIcon/></Button> */}
    </div>
  )
}
