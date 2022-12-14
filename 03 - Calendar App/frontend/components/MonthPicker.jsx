import React, { useState } from 'react'
import getMonth from 'date-fns/getMonth'
import addMonths from 'date-fns/addMonths'
import {Button} from '@mui/material'
import format from 'date-fns/format'

const OPACITY = [1, 0.5, 0.25, 0]
const FONT_SIZE = ['1.25em', '1em', '0.75em', ]

export default function MonthPicker(props) {
  

  // const [month,setMonth]= useState(new Date())
  const {totalState: month, setTotalState: setMonth} = props;

  const updateMonth = (value)=>{
    
    setMonth(y => addMonths(y, value))
  }

  return (
    <div className='flex flex-col [&>*]:transition-all  [&>*]:duration-300'>
      {/* <Button onClick={()=>updateMonth(-2)}> {format(addMonths(month, -2), 'MMMM')}</Button>
      <Button onClick={()=>updateMonth(-1)}> {format(addMonths(month, -1), 'MMMM')}</Button>
      <Button onClick={()=>updateMonth(0)}> {format(month, 'MMMM')}</Button>
      <Button onClick={()=>updateMonth(1)}> {format(addMonths(month, 1), 'MMMM')}</Button>
      <Button onClick={()=>updateMonth(2)}> {format(addMonths(month, 2), 'MMMM')}</Button> */}
      {[-2, -1, 0, 1, 2, ].map((val,) => {
        const day = addMonths(month, val)
        return (

          <Button key={format(day, "MMM")} className="transition-all duration-150 capitalize" onClick={()=>updateMonth(val)} sx={{
            opacity: OPACITY[Math.abs(val)],
            fontSize: FONT_SIZE[Math.abs(val)],
          }}> {format(day, 'MMMM')}</Button>
        )
      })}

    </div>
  )
}
