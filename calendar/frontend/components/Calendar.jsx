import { CalendarPicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'

export default function Calendar(props) {

  // const [date,setDate]=useState(new Date())
  const {totalState: date, setTotalState: setDate} = props;
  return (
    <div>          <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
    </div>
  )
}
