import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/navbar";
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import addDays from "date-fns/addDays";
import { createTask, deleteTask, listTask, updateTask } from "../lib/slices/task";
import { flushSync } from "react-dom";
import { Add, Delete, Edit, Save } from "@mui/icons-material";
import { useRouter } from "next/router";

// edit for specific edit
const Pencil = (props) => {
  const {row} = props;
  const dispatch = useDispatch();
  // update
  const [edit, setEdit] = useState(false);
  const [total,setTotal] = useState({
    ...row
  })

  const update = async (e) => {
    e.preventDefault()
    try {
      await dispatch(
        updateTask({
          ...total,
          id: row.id,
         
        })

      ).unwrap();
      setEdit(false)
    } catch (error) {
      console.log(error);
    }
  };

  const Togglecheck = async (check) => {
    try {
      await dispatch(
        updateTask({
          id: row.id,
          task_complete: check
        })

      ).unwrap();
      
    } catch (error) {
      console.log(error);
    }
  };
  // delete
  const deleteT = async () => {
    
    try {
      await dispatch(
        deleteTask(row.id)

      ).unwrap();
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableRow key={row.id} >
      <TableCell>{row.id}</TableCell>
      <TableCell>
        <Checkbox checked={row.task_complete} onChange={(e)=>Togglecheck(e.target.checked)}/>
      </TableCell>
      <TableCell>
        {!edit ? (
          row.name
        ) : (
          <form onSubmit={(e)=>update(e)}>
          <TextField
            label="Name"
            value={total.name}
            onChange={(e) => setTotal({...total,name:e.target.value})}
          ></TextField>
          </form>
        )}
      </TableCell>
      <TableCell>
        {!edit ? (
          row.description
        ) : (
          <form onSubmit={(e)=>update(e)}>
          <TextField
            label="Description"
            multiline
            rows={3}
            value={total.description}
            onChange={(e) => setTotal({...total,description:e.target.value})}
          ></TextField>
          </form>
        )}
      </TableCell>
      <TableCell>{format(new Date(row.date), "yyyy-MM-dd")}</TableCell>
      <TableCell>
        <div className="flex flex-row items-center">
          <IconButton className="text-sm" size="small" onClick={()=>deleteT()}>
            <Delete className="text-lg" />
          </IconButton>
       {!edit &&<IconButton
            className="text-sm"
            size="small"
            onClick={() => setEdit(true)}
          >
            <Edit className="text-lg" />
          </IconButton>}   
          {edit &&<IconButton
            className="text-sm"
            size="small"
            onClick={(e) => update(e)}
          >
            <Save className="text-lg" />
          </IconButton>}  
        </div>
      </TableCell>
    </TableRow>
  );
};

export default function Tasks() {
  const router = useRouter()  

  const {date} = router.query
  
  // const [totalState, setTotalState] = useState(new Date());
  const totalState = useMemo(() => {
    if (date) {
      const day = new Date(date)
      return day
    } else return new Date()
  }, [date])
  const tasks = useSelector((state) => state.taskReducer?.tasks);
  const dispatch = useDispatch();

  console.log(totalState, router.query)

  const List = async (day) => {
    try {
      console.log(day, totalState);
      await dispatch(
        listTask({
          date__date: format(day, "yyyy-MM-dd"),
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log( date, format(totalState, 'yyyy-MM-dd'),date !== format(totalState, 'yyyy-MM-dd'))
  //   if (date && date !== format(totalState, 'yyyy-MM-dd')) {
  //     const day = new Date(date)
  //     console.log("updating", date, day)
  
  //     List(day)
  //     setTotalState(day)
  //   }
  // }, [date, totalState]) 
  useEffect(() => {
    List()
  }, [])

  const calYearPlus = () => {
    const newDay = addDays(totalState, 1);
    // setTotalState(newDay);
    List(newDay);
    router.push({
      pathname: '/tasks',
      query: { date:format(newDay, "yyyy-MM-dd")  },
    })
  };

  const calYearNeagative = () => {
    const newDay = addDays(totalState, -1);
    // setTotalState(newDay);
    List(newDay);
    router.push({
      pathname: '/tasks',
      query: { date:format(newDay, "yyyy-MM-dd")  },
    })
  };

  // create
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [des, setDes] = useState("");

  const Create = async () => {
    try {
      await dispatch(
        createTask({
          name: name,
          description: des,
          date: format(totalState, "yyyy-MM-dd"),
        })
      ).unwrap();
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 gap-5">
      <div className="flex items-center justify-center">
        <Button onClick={calYearNeagative}>
          <ArrowBackIosIcon className="text-slate-300 text-sm" />
        </Button>
        {totalState && format(totalState, "dd MMMM yyyy")}
        <Button onClick={calYearPlus}>
          <ArrowForwardIosIcon className="text-slate-300 text-sm" />
        </Button>
      </div>
      <TableContainer
        component={Paper}
        variant="outlined"
        className="border-0 md:border md:rounded-3xl md:border-t-0"
      >
        <Table>
          <TableHead className="hidden md:table-header-group">
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks?.map((row) => (
              <Pencil key={row.id} row ={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ADD */}
      <div className="flex justify-end">
        <IconButton onClick={() => setOpenDialog(true)}>
          <Add />
        </IconButton>
      </div>

      {/*  Dialog*/}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent className="flex flex-col gap-4">
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <TextField
            label="Description"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            multiline
            rows={3}
          ></TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={Create}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Tasks.getLayout = (page) => {
  return <Navbar>{page}</Navbar>;
};
