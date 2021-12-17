import React, { useState, useEffect } from "react";
import { MenuItem, Stack, Avatar, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { defineLinks } from "../../utils/functions";
import { useHeaderProvider } from "../../hooks/useHeaderProvider";

interface IProps {
  notification: any;
  url: string;
}

export const preventRedirect = (e: any) => {
  e.preventDefault();
};

const markAsReaded = (e: any, notification: any, api: any, url: string, production: boolean) => {
  e.preventDefault();
  const link = defineLinks(production);
  api
    .patch(`${link.api.notifications}${notification._id}`)
    .then((response: any) => {
      if (response.status === 204) {
        window.location.href = url;
      }
    })
    .catch(() => {
      window.location.href = url;
    });
};

export const NotificationContainer: React.FC<IProps> = ({ notification, url, children }) => {
  const [avatar, setAvatar] = useState("");
  const { api, getS3Object, production } = useHeaderProvider();

  useEffect(() => {
    getS3Object(notification.sender.avatar_url)
      .then(response => {
        setAvatar(response);
      })
      .catch(() => {});
  }, []);

  return (
    <MenuItem
      style={{
        whiteSpace: "normal",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
      component="a"
      href={url}
      onClick={(e: any) => markAsReaded(e, notification, api, url, production)}
    >
      <Stack direction="row" style={{ width: "100%" }} alignItems="center">
        <Avatar src={avatar} />
        <Stack direction="column" spacing={1} style={{ width: "100%" }}>
          {children}
        </Stack>
        {!notification.read && <CircleIcon sx={{ color: "#00adcb", width: 10 }} />}
      </Stack>
    </MenuItem>
  );
};

export const NotificationContentText: React.FC = ({ children }) => {
  return (
    <Typography
      sx={{
        fontSize: "13px",
        width: "100%",
        label: { fontSize: "13px" },
        "*": { cursor: "pointer" },
      }}
    >
      {children}
    </Typography>
  );
};
