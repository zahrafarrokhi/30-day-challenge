import { CalendarPicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'

export default function Calendar() {

  const [date,setDate]=useState(new Date())
  return (
    <div>          <CalendarPicker date={date} onChange={(newDate) => setDate(newDate)} />
    </div>
  )
}
