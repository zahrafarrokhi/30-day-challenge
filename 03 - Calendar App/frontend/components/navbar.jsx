import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { logout } from "../lib/utils";
import { useDispatch } from "react-redux";

export default function Navbar(props) {
  const {children}= props;
  const router = useRouter()
  const dispatch = useDispatch()
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-300 flex h-full w-full justify-center items-center relative overflow-hidden">
    <div className="flex h-[90%] w-[90%] bg-slate-100 relative overflow-hidden rounded-lg">
      <div className="absolute h-[175%] w-[175%] bg-white rounded-full -right-[120%]"></div>
      <Drawer
      className="bg-slate-700"
        variant="persistent"
        open={true}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: "240px",
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
        }}
        PaperProps={{
          className: "bg-slate-200 text-slate-700 flex flex-col justify-center relative"
        }}
      >
        <List>
          <ListItem >
            <ListItemButton onClick={()=>router.push('/')}>
              <ListItemText primary={"Calender"} />
            </ListItemButton>
          </ListItem>

          <ListItem >
            <ListItemButton onClick={() => {
              router.push('/tasks')
            }}>
              <ListItemText primary={"Tasks"} />
            </ListItemButton>
          </ListItem>
          {/* <ListItem >
            <ListItemButton>
              <ListItemText primary={"Events"} />
            </ListItemButton>
          </ListItem> */}
          <ListItem >
            <ListItemButton onClick={() => {
              logout(dispatch)
              router.push('/auth/login')
            }}>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <main className="overflow-auto flex-grow z-10">

        {children}
      </main >
    </div>
    </div>
  );
}


