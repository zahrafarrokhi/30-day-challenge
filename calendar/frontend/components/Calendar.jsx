import { useTheme } from "@emotion/react";
import {
  Add,
  CalendarMonth,
  PlusOneRounded,
  Router,
  Task,
} from "@mui/icons-material";
import {
  Badge,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Skeleton,
  TextField,
} from "@mui/material";
import { Box, styled } from "@mui/material";
import { CalendarPicker, PickersDay } from "@mui/x-date-pickers";
import { format } from "date-fns";
import isWeekend from "date-fns/isWeekend";
import { useRouter } from "next/router";
import { list } from "postcss";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, listDays, listTask, updateTask } from "../lib/slices/task";
import Holidays from 'date-holidays'


const StyledPickersDay = styled(PickersDay)(({ theme, selected, weekend, holiday }) => ({
 
  ...(weekend && {
    color: theme.palette.warning.main,
  }),
  ...(weekend && selected && {
    color: 'white',
    // backgroundColor: `${theme.palette.warning.light} !important`,
  }),
  ...(holiday && {
    color: 'white',
    '&.MuiPickersDay-root': {
      backgroundColor: `${theme.palette.warning.light}`,
    },
  }),
}))

const CustomDay = (props) => {
  const holidays = new Holidays('US', 'la', 'no')
  const { day, selectedDays, pickersProps } = props;
  // console.log(pickersProps)
  const [open, setOpen] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskReducer?.tasks);
  const loading = useSelector((state) => state.taskReducer?.loading);
  // create
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  // checkbox
  const [check, setCheck] = useState(false);

  const theme = useTheme();
  const router = useRouter();
  // console.log(pickersProps)

  const List = async () => {
    try {
      await dispatch(
        listTask({
          date__date: format(day, "yyyy-MM-dd"),
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const Create = async () => {
    try {
      await dispatch(
        createTask({
          name: name,
          description: des,
          date: format(day, "yyyy-MM-dd"),
        })
      ).unwrap();
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const Togglecheck = async (z) => {
    try {
      await dispatch(
        updateTask({
          // ...z,
          id: z.id,
          task_complete: z.task_complete ? false : true,
        })
      ).unwrap();
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const days = useSelector((state) => state.taskReducer?.days);
  // console.log(days, days?.map(item=>item.date == format(day, "yyyy-MM-dd")), format(day, "yyyy-MM-dd"))
  const hasTasks =
    days?.findIndex((item) => item.date == format(day, "yyyy-MM-dd")) > -1;

  return (
    <>
      <Badge
        color="secondary"
        variant="dot"
        invisible={!hasTasks}
        sx={{
          "& .MuiBadge-badge": {
            top: "0.5em",
            right: "0.5em",
          },
        }}
      >
        <StyledPickersDay
        sx={{
          'flexGrow': 1,
          height: '60px',
          width: '60px',
          [theme.breakpoints.down('md')]: {
            height: '36px',
            width: '36px',
          },
        }}
          day={day}
          selectedDays={selectedDays}
          {...pickersProps}
          weekend={isWeekend(day)}
          holiday={holidays.isHoliday(day)}
          ref={ref}
          onClick={(e) => {
            setOpen(true);
            // setAnchorEl(e.target);
            List();
          }}
        />
      </Badge>
      {open && (
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={ref.current}
          MenuListProps={{ 
            className: "[&>li]:py-0", 
            sx: {
              '& .MuiTypography-root': {
                fontSize: '0.9em'
              },
              '& .MuiListItemIcon-root': {
                color: 'secondary.main'
              }
            } 
          }}
          PaperProps={{ sx: { borderRadius: "1.5em" } }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon className="justify-center">
                <Task />
              </ListItemIcon>
              <ListItemText primary={"Recent Tasks"} />
            </ListItemButton>
          </ListItem>

          {loading == false &&
            tasks &&
            // recent tasks
            tasks
              ?.filter((item, index, array) => index >= array.length - 3)
              ?.map((t) => (
                <ListItem key={t.id}>
                  <ListItemIcon className="justify-center">
                    {/* <Checkbox checked={check} onChange={(e)=>setCheck(e.target.checked)}/> */}
                    <Checkbox
                      checked={t.task_complete}
                      onChange={() => Togglecheck(t)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={t.name} secondary={t.description} />
                </ListItem>
              ))}

          {loading && (
            <div className="p-3 flex-col flex gap-2">
              <Skeleton variant="rounded" width={100} height={16} />
              <Skeleton variant="rounded" width={100} height={16} />
            </div>
          )}

          <ListItem disablePadding>
            <ListItemButton
              onClick={() =>
                router.push({
                  pathname: "/tasks",
                  query: { date: format(day, "yyyy-MM-dd") },
                })
              }
            >
              <ListItemIcon className="justify-center">
                <CalendarMonth />
              </ListItemIcon>
              <ListItemText primary={"View Tasks"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => setOpenDialog(true)}>
              <ListItemIcon className="justify-center">
                <Add />
              </ListItemIcon>
              <ListItemText primary={"New task"} />
            </ListItemButton>
          </ListItem>
        </Menu>
      )}
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
    </>
  );
};

export default function Calendar(props) {
  const theme = useTheme();
  // const [date,setDate]=useState(new Date())
  const { totalState: date, setTotalState: setDate } = props;
  const dispatch = useDispatch();

  const getDays = async () => {
    try {
      await dispatch(listDays()).unwrap();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDays();
  }, []);
  return (
    <Box sx={{
      // width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .MuiCalendarPicker-root': {
        maxHeight: 'unset',
        width: 'unset',
      },
      '& .MuiDayPicker-weekDayLabel': {
        [theme.breakpoints.down('md')]: {
          height: '36px',
          width: '36px',
        },
        height: '60px',
        width: '60px',
      },
      '& .MuiPickersDay-hiddenDaySpacingFiller': {
        [theme.breakpoints.down('md')]: {
          height: '36px',
          width: '36px',
        },
        height: '60px',
        width: '60px',
      }
    }}>
      <CalendarPicker
        views={['day']}
        renderDay={(day, selectedDays, pickersProps) => {
          return (
            <CustomDay
              day={day}
              selectedDays={selectedDays}
              pickersProps={pickersProps}
            />
          );
        }}
        date={date}
        onChange={(newDate) => setDate(newDate)}
      />
      </Box>
  );
}
