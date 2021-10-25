import { Avatar, MenuItem, Stack } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import React from "react";
import buildNotificationUrl from "./buildNotificationUrl";
import notificationFactory from "./Factories/notificationFactory";

interface props {
  item: any;
  api: any;
  production: boolean;
}

const NotificationItem: React.FC<props> = ({ item, production }) => {

  return (
    <MenuItem
      style={{
        whiteSpace: "normal",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
      component="a"
      href={buildNotificationUrl(item, production)}
    >
      <Stack direction="row" style={{ width: "100%" }} alignItems="center">
        <Avatar src={item.sender.avatar_url} />
        <Stack direction="column" spacing={1} style={{ width: "100%" }}>
          {notificationFactory(item, production)}
        </Stack>
        {!item.read && <CircleIcon sx={{ color: "#00adcb" }} />}
      </Stack>
    </MenuItem>
  );
};

export default NotificationItem;
