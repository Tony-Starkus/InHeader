import React from "react";
import { Menu } from "@mui/material";
// import api from "services/api";
import NotificationItem from "./notificationItem";

interface props {
  openNotifications: any;
  anchorNotifications: any;
  setAnchorNotifications: any;
  data: any;
  api: any
  production: boolean
}

const Notifications: React.FC<props> = ({
  openNotifications,
  anchorNotifications,
  setAnchorNotifications,
  data,
  api,
  production
}) => {

  const notificationData = [
    { // PEDIDO DE AMIZADE
      common: {
        accept: null
      },
      sender: {
        avatar_url: "https://socialnetwork-adonis-stage.incicle.com/api/v1/files/9xbsgmqim0gc76m0vve5c_1633359671752.jpeg"
      },
      content: "Fulano te enviou um pedido de amizade",
      module: "social_network",
      read: false,
      type: "friendship_request"
    },

    { // PEDIDO DE AMIZADE
      common: {
        accept: true
      },
      sender: {
        avatar_url: "https://socialnetwork-adonis-stage.incicle.com/api/v1/files/9xbsgmqim0gc76m0vve5c_1633359671752.jpeg"
      },
      content: "Fulano de tal te enviou um pedido de amizade",
      module: "social_network",
      read: false,
      type: "friendship_request"
    }
  ]

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
      {data && notificationData.map((item: any) => <NotificationItem item={item} api={api} production={production} />)}
    </Menu>
  );
};

export default Notifications;
