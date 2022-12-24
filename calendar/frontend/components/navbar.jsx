import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";

export default function Navbar(props) {
  const {children}= props;
  const router = useRouter()
  return (
    <div className="flex">
      <Drawer
        variant="persistent"
        open={true}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: "240px",
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
        }}
      >
        <List>
          <ListItem>
            <ListItemButton onClick={()=>router.push('/')}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={"Calender"} />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={"Holiday"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={"Events"} />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      {children}
    </div>
  );
}


