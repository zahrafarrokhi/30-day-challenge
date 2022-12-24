import { ListItem, ListItemText, Menu } from '@mui/material'
import { CalendarPicker, PickersDay } from '@mui/x-date-pickers'
import { list } from 'postcss'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listTask } from '../lib/slices/task'

const CustomDay = (props) => {
  const {day, selectedDays, pickersProps} = props
  console.log(pickersProps)
  const [open,setOpen]= useState(false)
  const [anchorEl,setAnchorEl]= useState(false)
  const ref = useRef(null)
  const dispatch = useDispatch()
  const tasks = useSelector(state=> state.taskReducer?.tasks)
  const List = async()=>{
    try {
      await dispatch(listTask()).unwrap()
    } catch (error) {
      
    }
  }
  return <>
    <PickersDay day={day} selectedDays={selectedDays} {...pickersProps} onClick={(e) => {
      setOpen(true)
      setAnchorEl(e.target)
      List()
      }}  />
    {open && <Menu open={open} onClose={()=>setOpen(false)} anchorEl={anchorEl}
    >
      {tasks?.map((t)=><ListItem>
        <ListItemText primary={t.name}/>
      </ListItem>)}
    </Menu>}
  </>
}

export default function Calendar(props) {

  // const [date,setDate]=useState(new Date())
  const {totalState: date, setTotalState: setDate} = props;
  return (
    <div>          
      <CalendarPicker renderDay={(day, selectedDays, pickersProps) => {
        return <CustomDay day={day} selectedDays={selectedDays} pickersProps={pickersProps} />
      }} date={date} onChange={(newDate) => setDate(newDate)} />
    </div>
  )
}
