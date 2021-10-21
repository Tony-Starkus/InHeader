import { Avatar, MenuItem, Typography } from "@mui/material";
import React from "react";
import buildNotificationUrl from "./buildNotificationUrl";

interface props {
  item: any;
  api: any;
  production: boolean
}

const baseNotifications = process.env.REACT_APP_NOTIFICATIONS_URL;
// const socialUrl = process.env.REACT_APP_SOCIAL_NETWORK_FRONTEND_URL;

const NotificationItem: React.FC<props> = ({ item, api, production }) => {
  // @ts-ignore-next-line
  const notificationAction = async (id: string, nickname: string) => {
    try {
      const response = await api.put(
        `${baseNotifications}/notifications/${id}/accept`,
      );
      if (response?.status === 204) {
        buildNotificationUrl(item, production);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MenuItem
      style={{ whiteSpace: "normal" }}
      onClick={() =>
        notificationAction(item["_id" as any], item.sender.nickname)
      }
    >
      <Avatar src={item.sender.avatar_url} />
      <Typography
        variant="inherit"
        sx={{
          color: item.read ? "#888" : "#555",
        }}
      >
        <strong
          style={{
            fontWeight: 600,
            textTransform: "capitalize",
            color: item.read ? "#888" : "#555",
          }}
        >
          {item.sender.name}
        </strong>
        {item.content}
      </Typography>
      {!item.read && (
        <div>
          <span
            style={{
              width: "10px",
              height: "10px",
              background: "#00adcb",
              display: "block",
              borderRadius: "100%",
            }}
          ></span>
        </div>
      )}
    </MenuItem>
  );
};

export default NotificationItem;
