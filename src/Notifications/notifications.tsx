import React from "react";
import { Menu } from "@mui/material";
// import api from "services/api";
import NotificationItem from "./notificationItem";

interface props {
  openNotifications: any;
  anchorNotifications: any;
  setAnchorNotifications: any;
  data: any;
}

const Notifications: React.FC<props> = ({ openNotifications, anchorNotifications, setAnchorNotifications, data }) => {
  return (
    <Menu
      open={openNotifications}
      anchorEl={anchorNotifications}
      onClose={() => setAnchorNotifications(null)}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          width: 300,
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 40,
            height: 40,
            ml: -0.5,
            mr: 1,
          },

          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
          "& li, & a": {
            fontFamily: '"Open Sans", sans-serif',
            fontSize: "13px",
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {data && data.map((item: any) => <NotificationItem item={item} />)}
    </Menu>
  );
};

export default Notifications;
