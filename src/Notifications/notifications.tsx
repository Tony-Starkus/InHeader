import React, { useEffect, useState, useRef } from "react";
import { IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationItem from "./notificationItem";
import { ButtonNotification, NotificationWrapper } from "./style";
import DoneIcon from "@mui/icons-material/Done";
import ComputerIcon from "@mui/icons-material/Computer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Cookies from "js-cookie";
import socketIOClient from "socket.io-client";
import { decode } from "../utils/crypto";
import { notificationFilterType } from "../utils/types";
import { getNotifications, updateSawNotifications } from "../utils/functions/notifications";
import { useHeaderProvider } from "../hooks/useHeaderProvider";
import { defineLinks } from "../utils/functions";
import incicleModules from "../utils/incicleModules";

interface props {
  openNotifications: any;
  anchorNotifications: any;
  setAnchorNotifications: any;
  setBadge: React.Dispatch<React.SetStateAction<boolean>>;
}

const Notifications: React.FC<props> = ({
  openNotifications,
  anchorNotifications,
  setAnchorNotifications,
  setBadge,
}) => {
  const { api, production, notificationsData, setNotificationsData } = useHeaderProvider();
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
  const menuIsOpen = Boolean(anchorMenuEl);
  const socketRef = useRef(
    socketIOClient(production ? "https://notifications.incicle.com" : "https://notifications-stage.incicle.com/"),
  );
  const socket = socketRef.current;

  // Configs to notifications filters
  const [notificationFilters, setNotificationFilters] = useState({
    type: notificationFilterType.ALL,
    module_filter: "",
  });

  useEffect(() => {
    // Load websocket
    const decodedToken = decode(Cookies.get("authToken") || "");
    const user = JSON.parse(decode(Cookies.get("user") || ""));
    socket.emit("join room", user.id, decodedToken);
    socket.on(user.id, (data: any) => {
      if (data !== "Connected") {
        setBadge(false);
        setNotificationsData(oldState => ({
          ...oldState,
          data: [data, ...oldState.data],
        }));
      }
    });
  }, []);

  useEffect(() => {
    // Load notifications when InHeader is mounted
    getNotifications(api, production, {}).then((response: any) => {
      setNotificationsData(response.data);
      // Check if there is any notification that didnt see by user to show badge
      let badgeValidator = response.data.data.some((item: any) => item.saw === false);
      if (badgeValidator) {
        setBadge(false);
      }
    });
  }, []);

  useEffect(() => {
    if (anchorNotifications) {
      // Load notifications when notifications modal open
      updateSawNotifications(api, production, {}).then(() => {
        setBadge(true);
      });
      checkAllViewed();
    } else {
      // Reset filters on modal close
      setNotificationFilters({
        type: notificationFilterType.ALL,
        module_filter: "",
      });

      // Set notifications as readed
      setNotificationsData(oldValue => ({
        ...oldValue,
        data: oldValue.data.map(notification => {
          notification.saw = true;
          return notification;
        }),
      }));
    }
  }, [anchorNotifications]);

  const handleSetNotificationType = (value: string) => {
    /**
     * This function is used to set filter type on notifications
     */
    setNotificationFilters(oldState => ({ ...oldState, type: value }));
    getNotifications(api, production, {
      params: {
        module: notificationFilters.module_filter,
        read: value === notificationFilterType.UNREADED ? value : null,
      },
    }).then((response: any) => setNotificationsData(response.data));
  };

  const handleSetNotificationsModuleFilter = (value: string) => {
    /**
     * This function is used to set module filter on notifications
     */
    setNotificationFilters(oldState => ({ ...oldState, module_filter: value }));
    handleCloseModuleMenu();
    getNotifications(api, production, {
      params: {
        read: notificationFilters.type,
        module: value,
      },
    }).then((response: any) => setNotificationsData(response.data));
  };

  const handleCheckAllReaded = () => {
    /**
     * This function is used to check all notifications as readed
     */
    api.get(`${defineLinks(production).api.notifications}read`);
    // Set notifications as viewed
    setNotificationsData(oldValue => ({
      ...oldValue,
      data: oldValue.data.map(notification => {
        notification.read = true;
        return notification;
      }),
    }));
  };

  const checkAllViewed = () => {
    /**
     * When user opens the notifications modal, this function is called to check the most recents
     * notifications as viewed.
     */
    api.get(`${defineLinks(production).api.notifications}saw`);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMenuEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorMenuEl(null);
  };

  const [anchorModuleMenuEl, setAnchorModuleMenuEl] = useState<null | HTMLElement>(null);
  const moduleMenuIsOpen = Boolean(anchorModuleMenuEl);

  const handleClickModuleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorModuleMenuEl(event.currentTarget);
  };
  const handleCloseModuleMenu = () => {
    setAnchorModuleMenuEl(null);
  };

  // @ts-ignore
  const getDataReadOrNot = (data: any, read: boolean) => {
    return notificationsData.data.filter((item: any) => item.read === read);
  };

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
          width: 350,
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
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: "0 15px" }}>
        <Typography variant="h6">Notificações</Typography>

        <IconButton onClick={handleClick}>
          <MoreHorizIcon />
        </IconButton>
      </Stack>

      <Menu
        anchorEl={anchorMenuEl}
        open={menuIsOpen}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: { boxShadow: "0 0px 8px 1px rgba(0, 0, 0, 0.1)" },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem sx={{ fontSize: "14px" }} onClick={handleCheckAllReaded}>
          <ListItemIcon>
            <DoneIcon fontSize="small" />
          </ListItemIcon>
          Marcar todas como lidas
        </MenuItem>

        <MenuItem component="a" href={`${defineLinks(production).web.social}notifications`} sx={{ fontSize: "14px" }}>
          <ListItemIcon>
            <ComputerIcon fontSize="small" />
          </ListItemIcon>
          Abrir notificações
        </MenuItem>
      </Menu>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: "0 15px", margin: "10px 0 20px" }}
      >
        <Stack direction="row" spacing={1}>
          <ButtonNotification
            onClick={() => handleSetNotificationType(notificationFilterType.ALL)}
            active={notificationFilters.type === notificationFilterType.ALL}
          >
            Todas
          </ButtonNotification>
          <ButtonNotification
            onClick={() => handleSetNotificationType(notificationFilterType.UNREADED)}
            active={notificationFilters.type === notificationFilterType.UNREADED}
          >
            Não Lidas
          </ButtonNotification>
        </Stack>

        <ButtonNotification onClick={handleClickModuleMenu}>
          <label
            style={{
              whiteSpace: "nowrap",
              display: "block",
              maxWidth: 100,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {incicleModules.find(module => module.slug === notificationFilters.module_filter)?.title}
          </label>
          <ArrowDropDownIcon
            fontSize="small"
            style={{
              transition: "transform 500ms ease",
              transform: moduleMenuIsOpen ? "rotate(180deg)" : "rotate(0)",
              marginLeft: "5px",
            }}
          />
        </ButtonNotification>
      </Stack>

      <Menu
        anchorEl={anchorModuleMenuEl}
        open={moduleMenuIsOpen}
        onClose={handleCloseModuleMenu}
        PaperProps={{
          elevation: 0,
          sx: { boxShadow: "0 0px 8px 1px rgba(0, 0, 0, 0.1)" },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {incicleModules.map(module => (
          <MenuItem
            key={module.slug}
            onClick={() => handleSetNotificationsModuleFilter(module.slug)}
            sx={{ fontSize: "14px" }}
            value={module.slug}
          >
            <ListItemIcon>
              <img src={module.icon} style={{ width: 24, height: 24 }} alt={module.icon} />
            </ListItemIcon>
            {module.title}
          </MenuItem>
        ))}
      </Menu>

      <NotificationWrapper>
        <Typography variant="body2" sx={{ padding: "0 15px", color: "#959595" }}>
          {notificationFilters.type === notificationFilterType.ALL ? "Todas" : "Não lidas"}
        </Typography>
        {notificationsData.data.length > 0 ? (
          notificationsData.data.map(item => <NotificationItem key={item._id} item={item} />)
        ) : (
          <Typography style={{ width: "100%", fontStyle: "italic", textAlign: "center", color: "#a8a8a8" }}>
            Não há notificações no momento
          </Typography>
        )}
      </NotificationWrapper>

      {/* TO-DO -> FEATURE: USE THIS CODE TO DIVIDE ALL NOTIFCATION IN "RECENTS" AND "PREVIOUS" */}
      {/* {notificationsData.data && notificationsData.data.length ? (
        <NotificationWrapper>
          {!!getDataReadOrNot(notificationsData.data, false).length && (
            <Box sx={{ marginBottom: "20px" }}>
              <Typography variant="body2" sx={{ padding: "0 15px", color: "#959595" }}>
                {notificationFilters.type === notificationFilterType.ALL ? "Todas" : "Não lidas"}
              </Typography>

              {getDataReadOrNot(notificationsData.data, false).map((item: any) => (
                <NotificationItem key={item._id} item={item} />
              ))}
            </Box>
          )}

          {!!getDataReadOrNot(notificationsData.data, true).length && (
            <Box sx={{ background: "#f4f4f4", paddingTop: "10px", borderRadius: "5px 5px 0 0" }}>
              <Typography variant="body2" sx={{ padding: "0 15px", color: "#959595" }}>
                Lidas
              </Typography>

              {getDataReadOrNot(notificationsData.data, true).map((item: any) => (
                <NotificationItem key={item._id} item={item} />
              ))}
            </Box>
          )}
        </NotificationWrapper>
      ) : (
        <Typography style={{ width: "100%", fontStyle: "italic", textAlign: "center", color: "#a8a8a8" }}>
          Não há notificações no momento
        </Typography>
      )} */}
    </Menu>
  );
};

export default Notifications;
