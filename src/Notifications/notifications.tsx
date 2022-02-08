import React, { useState } from "react";
import { IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NotificationItem from "./notificationItem";
import { ButtonNotification, NotificationWrapper } from "./style";
import DoneIcon from "@mui/icons-material/Done";
import ComputerIcon from "@mui/icons-material/Computer";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box } from "@mui/system";

interface props {
  openNotifications: any;
  anchorNotifications: any;
  setAnchorNotifications: any;
  data: any;
}

const Notifications: React.FC<props> = ({ openNotifications, anchorNotifications, setAnchorNotifications, data }) => {
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(null);
  const menuIsOpen = Boolean(anchorMenuEl);

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

  const getDataReadOrNot = (data: any, read: boolean) => {
    return data.filter((item: any) => item.read === read);
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
        <MenuItem sx={{ fontSize: "14px" }}>
          <ListItemIcon>
            <DoneIcon fontSize="small" />
          </ListItemIcon>
          Marcar todas como lidas
        </MenuItem>

        <MenuItem sx={{ fontSize: "14px" }}>
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
          <ButtonNotification active>Todas</ButtonNotification>
          <ButtonNotification>Não Lidas</ButtonNotification>
        </Stack>

        <ButtonNotification onClick={handleClickModuleMenu}>
          Módulos
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
        <MenuItem sx={{ fontSize: "14px" }}>
          <ListItemIcon>
            <img src="https://static-incicle.s3.amazonaws.com/agenda.svg" style={{ width: 24, height: 24 }} />
          </ListItemIcon>
          Agenda
        </MenuItem>

        <MenuItem sx={{ fontSize: "14px" }}>
          <ListItemIcon>
            <img
              src="https://static-incicle.s3.amazonaws.com/avaliacao-por-competencia.svg"
              style={{ width: 24, height: 24 }}
            />
          </ListItemIcon>
          Avaliação por competência
        </MenuItem>

        <MenuItem sx={{ fontSize: "14px" }}>
          <ListItemIcon>
            <img
              src="https://static-incicle.s3.amazonaws.com/departamento-pessoal.svg"
              style={{ width: 24, height: 24 }}
            />
          </ListItemIcon>
          Departamento pessoal
        </MenuItem>

        <MenuItem sx={{ fontSize: "14px" }}>
          <ListItemIcon>
            <img src="https://static-incicle.s3.amazonaws.com/endo-marketing.svg" style={{ width: 24, height: 24 }} />
          </ListItemIcon>
          Endo markenting
        </MenuItem>

        <MenuItem sx={{ fontSize: "14px" }}>
          <ListItemIcon>
            <img src="https://static-incicle.s3.amazonaws.com/feedback.svg" style={{ width: 24, height: 24 }} />
          </ListItemIcon>
          Feedback
        </MenuItem>

        <MenuItem sx={{ fontSize: "14px" }}>
          <ListItemIcon>
            <img
              src="https://static-incicle.s3.amazonaws.com/pesquisa-de-clima.svg"
              style={{ width: 24, height: 24 }}
            />
          </ListItemIcon>
          Pesquisa de clima
        </MenuItem>

        <MenuItem sx={{ fontSize: "14px" }}>
          <ListItemIcon>
            <img src="https://static-incicle.s3.amazonaws.com/ouvidoria.svg" style={{ width: 24, height: 24 }} />
          </ListItemIcon>
          Ouvidoria
        </MenuItem>
      </Menu>

      {data.data && data.data.length ? (
        <NotificationWrapper>
          {!!getDataReadOrNot(data.data, false).length && (
            <Box sx={{ marginBottom: "20px" }}>
              <Typography variant="body2" sx={{ padding: "0 15px", color: "#959595" }}>
                Não lidas
              </Typography>

              {getDataReadOrNot(data.data, false).map((item: any) => (
                <NotificationItem key={item._id} item={item} />
              ))}
            </Box>
          )}

          {!!getDataReadOrNot(data.data, true).length && (
            <Box sx={{ background: "#f4f4f4", paddingTop: "10px", borderRadius: "5px 5px 0 0" }}>
              <Typography variant="body2" sx={{ padding: "0 15px", color: "#959595" }}>
                Lidas
              </Typography>

              {getDataReadOrNot(data.data, true).map((item: any) => (
                <NotificationItem key={item._id} item={item} />
              ))}
            </Box>
          )}
        </NotificationWrapper>
      ) : (
        <Typography style={{ width: "100%", fontStyle: "italic", textAlign: "center", color: "#a8a8a8" }}>
          Não há notificações no momento
        </Typography>
      )}
    </Menu>
  );
};

export default Notifications;
