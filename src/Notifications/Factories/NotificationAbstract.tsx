import React, { useState, useEffect } from "react";
import { MenuItem, Stack, Avatar, Typography, Box, Theme } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { defineLinks } from "../../utils/functions";
import { useHeaderProvider } from "../../hooks/useHeaderProvider";
import { NotificationProps } from "../../interfaces/Notification";
import incicleModules from "../../utils/incicleModules";
import { SxProps } from "@mui/system";

// TimeAgo
import ReactTimeAgo from "react-time-ago";
import moment from "moment";

interface IProps {
  notification: NotificationProps;
  url: string;
}

export const preventRedirect = (e: any) => {
  e.preventDefault();
};

const markAsReaded = (e: any, notification: NotificationProps, api: any, url: string, production: boolean) => {
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
        backgroundColor: notification.saw ? "initial" : "#EEEEEE",
      }}
      sx={{
        "&:hover": {
          backgroundColor: "#F2F3F4!important",
        },
      }}
      component="a"
      href={url}
      onClick={(e: any) => markAsReaded(e, notification, api, url, production)}
    >
      <Stack direction="row" style={{ width: "100%" }} alignItems="center">
        <Box sx={{ position: "relative" }}>
          <Avatar src={avatar} />

          {!!notification.module && (
            <Box
              sx={{
                position: "absolute",
                bottom: "-4px",
                left: "-4px",
                width: "14px",
                height: "14px",
                border: "1px solid #00568b",
                backgroundColor: "#fff",
                borderRadius: "50%",
              }}
            >
              <img
                src={incicleModules.find(incicleModule => incicleModule.slug === notification.module)?.icon}
                alt={notification.module}
              />
            </Box>
          )}
        </Box>
        <Stack direction="column" spacing={1} style={{ width: "100%", marginRight: "10px" }}>
          {children}
        </Stack>
        {!notification.read && <CircleIcon sx={{ color: "#00adcb", width: 10 }} />}
      </Stack>
    </MenuItem>
  );
};

export const NotificationContentText: React.FC<{ notification: NotificationProps }> = ({ notification, children }) => {
  return (
    <Typography
      sx={{
        lineHeight: "15px",
        fontSize: "13px",
        width: "100%",
        overflowWrap: "anywhere",
        marginRight: "10px",
        label: { fontSize: "13px" },
        "*": { cursor: "pointer" },
      }}
    >
      {children}
      <small style={{ display: "block", fontSize: 9 }}>
        <ReactTimeAgo date={new Date(notification.createdAt)} timeStyle="mini" />
      </small>
    </Typography>
  );
};

export const NotificationHighlight: React.FC<{ sx?: SxProps<Theme> }> = ({ sx, children }) => {
  return (
    <Typography
      component="label"
      sx={{
        lineHeight: "15px",
        color: "#00558E",
        fontSize: "13px",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export const reduceString = (value = "", length: number) => {
  /**
   * This function is used to add '...' on strings.
   *
   * params:
   *  value: the string to reduce
   *  length: number of max characters for the string
   *
   * return: string reduced
   */
  if (value?.length <= length) return value;
  return `${value.slice(0, length - 3)}...`;
};

export const dateFormat = (date: string | Date, format: string) => {
  /**
   * This function is used to format dates on notifications text
   *
   * params:
   *  date: a valid string date format or a javascript date object
   *  format: string representing the format for date string return (must be an moment valid format)
   *
   * return: formated date as string
   */
  return moment(date).locale("pt-br").format(format);
};
