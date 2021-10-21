import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Badge,
  Stack,
  Paper,
  Link,
  Chip,
  Box,
} from "@mui/material";
import { useToasts } from "react-toast-notifications";
import { Settings } from "@mui/icons-material";
import ExitToApp from "@mui/icons-material/ExitToApp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import WorkIcon from "@mui/icons-material/Work";
import logoImage from './assets/logo_incicle.svg';
import Notifications from "./Notifications/notifications";
import { HeaderInStyle } from "./styles";

interface props {
  user: any;
  profiles: any;
  companySelected: any;
  api: any;
  signOut: Function;
  production: boolean;
}

export const InHeader: React.FC<props> = ({ user, profiles, companySelected, api, signOut, production }) => {

  const baseUrl = production ? "https://socialnetwork-adonis.incicle.com/api/v1" : "https://socialnetwork-adonis-stage.incicle.com/api/v1";
  const baseNotifications = production ? "https://notifications.incicle.com/api/v1/" : "https://notifications-stage.incicle.com/api/v1/";

  const { addToast } = useToasts();
  const [myProfile, setMyProfile] = useState({}) as any;
  const [resultPerson, setResultPerson] = useState([]) as any;
  const [hasResult, setHasResult] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);
  const [accountType, setAccountType] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<any>();
  const [links, setLinks] = useState({} as any);

  const [anchorProfileEl, setAnchorProfileEl] = React.useState(null);
  const openMenuProfile = Boolean(anchorProfileEl);

  const [anchorCompanysEl, setAnchorCompanysEl] = React.useState(null);
  const openMenuCompanys = Boolean(anchorCompanysEl);

  const [anchorNotifications, setAnchorNotifications] = useState(null);
  const openNotifications = Boolean(anchorNotifications);

  const [allNotifications, setAllNotifications] = useState([]) as any;
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(
    null,
  ) as any;

  const defineLinks = () => {
    if(production) {
      setLinks({
        web: {
          social: "https://social-network-frontend.incicle.com/",
          schedule: "https://schedule.incicle.com/",
          project: "https://projects.incicle.com/",
        }
      });
    } else {
      setLinks({
        web: {
          social: "https://social-network-frontend-stage.incicle.com/",
          schedule: "https://schedule-stage.incicle.com/",
          project: "https://projects-stage.incicle.com/",
        }
      });
    }
  }

  useEffect(() => {
    defineLinks();
  }, []);

  useEffect(() => {
    if (user.config.default_profile_type === "person") {
      setAccountType("person");
      if (user.companies.length > 0) {
        const companysIds = user.companies.map(
          (pos: any) => pos.id,
        ) as string[];

        if (companySelected && companysIds.includes(companySelected)) {
          const localCompanySelected =
            user.companies[
              user.companies.findIndex((pos: any) => pos.id === companySelected)
            ];
          setSelectedCompany(localCompanySelected);
        } else {
          setSelectedCompany(user.companies[0]);
        }
        setCompanies(user.companies);
      }

      if (!unreadNotificationsCount) {
        api.get(`${baseNotifications}notifications/me`).then((response: any) => {
          setUnreadNotificationsCount(response.data.unread);
        });
      }
    }
  }, [companySelected, user]); // eslint-disable-line

  // SEARCH RESULT
  const anchorRef = useRef(null);
  const searchFunction = async (nickname: string) => {
    if (nickname.trim().length >= 3) {
      try {
        const response = await api.get(
          `${baseUrl}/profiles/search/all?search=${nickname}`,
        );
        if (response?.status === 200) {
          setResultPerson(response?.data.data);
          setHasResult(true);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      setHasResult(false);
      return;
    }
    setHasResult(false);
  };

  const handleOpenMenuProfile = (event: any) => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleCloseMenuProfile = () => {
    setAnchorProfileEl(null);
  };

  const showNotifications = async (event: any) => {
    setAnchorNotifications(event.currentTarget);
    try {
      const response = await api.get(`${baseNotifications}notifications/me`);
      if (response?.status === 200) {
        setAllNotifications(response?.data?.data);
      }
    } catch (err) {
      addToast(
        `O sistema de notificações não está disponível no momento. Tente novamente mais tarde.`,
        { appearance: "error" },
      );
      console.error(err);
    }
  };

  const handleOpenMenuCompanys = (event: any) => {
    setAnchorCompanysEl(event.currentTarget);
  };

  const handleCloseMenuCompanys = () => {
    setAnchorCompanysEl(null);
  };

  function changeChipContent(index: number) {
    const company = companies[index];
    localStorage.setItem("companySelected", company.id);
    window.location.reload();
  }

  useEffect(() => {
    const initMyProfile = async () => {
      try {
        const response = await api.get(`${baseUrl}/profiles`);
        if (response?.status === 200) {
          setMyProfile(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    initMyProfile();
  }, [profiles.avatar]);

  const companiesAvatar = () => {
    return (
      <Avatar
        alt={selectedCompany.name}
        sx={{
          width: "24px !important",
          height: "24px !important",
          marginLeft: "2px !important",
          marginRight: "1px !important",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WorkIcon sx={{ width: "62%" }} />
      </Avatar>
    );
  };

  return (
    <HeaderInStyle>
      <Grid container>
        <Grid item xs={6} sx={{ alignItems: "center", display: "flex" }}>
          <Link
            href={`${links.web?.social}`}
            sx={{
              alignItems: "center",
              display: "flex",
              marginRight: "8px",
              marginLeft: "15px",
              paddingBottom: "2px",
            }}
          >
            <img src={logoImage} className="logo" alt="logo" />
          </Link>
          <Stack spacing={0} direction="row" sx={{ alignItems: "center" }}>
            {[
              {
                text: "Feed",
                link: links.web?.social,
              },
              {
                text: "Agenda",
                link: links.web?.schedule,
              },
              {
                text: "Projetos",
                link: links.web?.project,
              },
            ].map((anchor: any) => (
              <Link
                key={`${anchor.text}`}
                href={`${anchor.link}`}
                underline="none"
                sx={{
                  p: "6px 8px",
                  color: "#747474",
                  borderRadius: "3px",
                  "&:hover": {
                    background: "#f2f3f5",
                  },
                  "&:active": {
                    fontWeight: 600,
                    color: "#007fa1",
                  },
                }}
              >
                {anchor.text}
              </Link>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Stack
            spacing={1}
            direction="row"
            sx={{ justifyContent: "flex-end", alignItems: "center" }}
          >
            {companies.length > 0 && accountType === "person" && (
              <Chip
                onClick={handleOpenMenuCompanys}
                size="small"
                clickable
                avatar={companiesAvatar()}
                label={
                  <span style={{ fontSize: "0.5rem !important" }}>
                    {selectedCompany.name}
                  </span>
                }
                onDelete={handleOpenMenuCompanys}
                deleteIcon={<ArrowDropDownIcon />}
                variant="outlined"
                sx={{ padding: "2px !important", height: "32px" }}
              />
            )}

            <Menu
              anchorEl={anchorCompanysEl}
              open={openMenuCompanys}
              onClose={handleCloseMenuCompanys}
              onClick={handleCloseMenuCompanys}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
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
                    fontSize: "12px",
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {companies.map((company, index) => (
                <MenuItem
                  key={`${company.id}`}
                  component="li"
                  onClick={() => changeChipContent(index)}
                >
                  <Avatar alt={company.name}>
                    <WorkIcon />
                  </Avatar>
                  <span style={{ padding: "0 !important" }}>
                    {company.name}
                  </span>
                </MenuItem>
              ))}
            </Menu>
            <Paper
              component="form"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: 250,
                padding: "2px",
                border: "none",
                background: "#f2f3f5",
                boxShadow: "none",
              }}
              ref={anchorRef}
            >
              <Autocomplete
                options={resultPerson}
                open={hasResult}
                noOptionsText="Nenhum resultado encontrado"
                sx={{
                  "& input": {
                    background: "none",
                    border: "none",
                    outline: "none",
                  },
                }}
                renderInput={params => (
                  <Box
                    ref={params.InputProps.ref}
                    sx={{
                      marginLeft: "12px",
                      "& input::placeholder": {
                        color: "#ddd !important",
                      },
                    }}
                  >
                    <input
                      type="text"
                      {...params.inputProps}
                      placeholder="Encontre alguém na InCicle"
                      style={{
                        fontSize: "14px",
                      }}
                    />
                  </Box>
                )}
                renderOption={(propss, option: any) => (
                  <li {...propss} key={`${option.nickname}`}>
                    <a
                      href={`${links.web?.social}p/${option.nickname}`}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "#747474",
                      }}
                    >
                      <Avatar src={option.avatar} />
                      <div
                        style={{
                          marginLeft: "5px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "14px",
                            textTransform: "capitalize",
                          }}
                        >
                          {option.name}
                        </span>
                        {option.type === "company" && (
                          <span style={{ fontSize: "11px", marginTop: "-2px" }}>
                            Perfil de empresa
                          </span>
                        )}
                      </div>
                    </a>
                  </li>
                )}
                getOptionLabel={(option: any) => option.name}
                // @ts-ignore-next-line
                onInputChange={(e: any, value: string) => searchFunction(value)}
                fullWidth
              />

              <IconButton type="submit" sx={{ p: "6px" }} aria-label="search">
                <SearchIcon sx={{ width: "16px" }} />
              </IconButton>
            </Paper>

            <IconButton
              size="medium"
              sx={{ width: 35, height: 35 }}
              href={`${links.web?.social}friends`}
            >
              <PeopleAltIcon sx={{ width: 25, height: 25 }} />
            </IconButton>

            {/* NOTIFICATIONS AREA */}

            <IconButton
              size="medium"
              sx={{ width: 35, height: 35 }}
              onClick={showNotifications}
            >
              <Badge badgeContent={unreadNotificationsCount} color="primary">
                <NotificationsIcon sx={{ width: 25, height: 25 }} />
              </Badge>
            </IconButton>

            <Notifications
              openNotifications={openNotifications}
              anchorNotifications={anchorNotifications}
              setAnchorNotifications={setAnchorNotifications}
              data={allNotifications}
              api={api}
              production={production}
            />

            {/* NOTIFICATIONS AREA */}

            <IconButton
              onClick={handleOpenMenuProfile}
              size="small"
              style={{ marginRight: 15 }}
            >
              <Avatar sx={{ width: 35, height: 35 }} src={myProfile.avatar} />
            </IconButton>

            <Menu
              anchorEl={anchorProfileEl}
              open={openMenuProfile}
              onClose={handleCloseMenuProfile}
              onClick={handleCloseMenuProfile}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
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
              <MenuItem
                component="a"
                href={`/p/${myProfile.nickname}`}
                sx={{
                  width: "initial !important",
                  textTransform: "capitalize",
                }}
              >
                <Avatar
                  src={myProfile.avatar}
                  sx={{
                    width: "32px !important",
                    height: "32px !important",
                    marginRight: 15,
                  }}
                />
                {myProfile.first_name
                  ? `${myProfile.first_name} ${myProfile.last_name}`
                  : myProfile.name}
              </MenuItem>
              <Divider />
              <MenuItem component="a" href="/settings">
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Configurações
              </MenuItem>
              <MenuItem onClick={() => signOut()}>
                <ListItemIcon>
                  <ExitToApp fontSize="small" />
                </ListItemIcon>
                Sair da InCicle
              </MenuItem>
            </Menu>
          </Stack>
        </Grid>
      </Grid>
    </HeaderInStyle>
  );
};