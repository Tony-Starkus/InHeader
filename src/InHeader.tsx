import React, { useState, useEffect, useRef } from 'react';
import {
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Stack,
  Paper,
  Link,
  Chip,
  Box,
  ClickAwayListener,
  Icon,
} from '@mui/material';
import { Settings } from '@mui/icons-material';
import ExitToApp from '@mui/icons-material/ExitToApp';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import WorkIcon from '@mui/icons-material/Work';

import HeaderProvider from './Context/HeaderContext';
import Notifications from './Notifications/notifications';
import { HeaderInStyle } from './styles';

import { defineLinks } from './utils/functions';
import maxLetters from './utils/maxLettes';
import { SearchPersons } from './utils/types';
import RenderPerson from './RenderPerson/RenderPerson';
import { User } from './interfaces/User';
import { MeProps } from './interfaces/Me';
import RenderAvatar from './RenderImage/RenderAvatar';
interface props {
  user: User;
  profiles: MeProps;
  companySelected: string;
  api: any;
  production: boolean;
  noAvatar?: string;
  signOut: Function;
}

export const InHeader: React.FC<props> = ({
  user,
  profiles,
  companySelected,
  api,
  production,
  noAvatar,
  signOut,
}) => {
  const [badge, setBadge] = useState(true);

  useEffect(() => {
    const contentSideBarElement = document.querySelector(
      '.contentSidebar > div'
    ) as any;
    const handleResize = () => {
      if (contentSideBarElement) {
        if (window.innerWidth < 800) {
          contentSideBarElement!.style.display = 'none';
          return;
        }

        contentSideBarElement!.style.display = 'initial';
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [myProfile, setMyProfile] = useState({}) as any;
  const [resultPerson, setResultPerson] = useState([] as SearchPersons[]);
  const [hasResult, setHasResult] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);
  const [accountType, setAccountType] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<any>();
  const links = defineLinks(production);

  const [anchorProfileEl, setAnchorProfileEl] = React.useState(null);
  const openMenuProfile = Boolean(anchorProfileEl);

  const [anchorCompanysEl, setAnchorCompanysEl] = React.useState(null);
  const openMenuCompanys = Boolean(anchorCompanysEl);

  const [anchorNotifications, setAnchorNotifications] = useState(null);
  const openNotifications = Boolean(anchorNotifications);

  const [inputBoxClassName, setInputBoxClassName] = useState('');
  const [showModules, setShowModules] = useState(false);

  useEffect(() => {
    setMyProfile(profiles);
  }, [profiles]);

  useEffect(() => {
    if (myProfile.type === 'PERSON') {
      setAccountType('PERSON');
      if (myProfile.companies.length > 0) {
        const companysIds = myProfile.companies.map(
          (pos: any) => pos.id
        ) as string[];

        if (companySelected && companysIds.includes(companySelected)) {
          const localCompanySelected =
            myProfile.companies[
              myProfile.companies.findIndex(
                (pos: any) => pos.id === companySelected
              )
            ];
          setSelectedCompany(localCompanySelected);
        } else {
          setSelectedCompany(myProfile.companies[0]);
        }
        setCompanies(myProfile.companies);
      }
    }
  }, [companySelected, myProfile]); // eslint-disable-line

  // SEARCH RESULT
  const anchorRef = useRef(null);
  // @ts-ignore-next-line
  const searchFunction = async (username: string) => {
    setResultPerson([]);
    setHasResult(false);
    if (username.trim().length >= 3) {
      api
        .get(
          `${
            defineLinks(production).api.social
          }profile/name/search?search=${username}`
        )
        .then((response: any) => {
          setResultPerson(response?.data);
          setHasResult(true);
        })
        .catch((err: any) => {
          console.error(err);
          setHasResult(false);
        });

      setHasResult(false);
    }
  };

  const handleOpenMenuProfile = (event: any) => {
    setAnchorProfileEl(event.currentTarget);
  };

  const handleCloseMenuProfile = () => {
    setAnchorProfileEl(null);
  };

  const showNotifications = async (event: any) => {
    setAnchorNotifications(event.currentTarget);
  };

  const handleOpenMenuCompanys = (event: any) => {
    setAnchorCompanysEl(event.currentTarget);
  };

  const handleCloseMenuCompanys = () => {
    setAnchorCompanysEl(null);
  };

  function changeChipContent(index: number) {
    const company = companies[index];
    localStorage.setItem('companySelected', company.id);
    window.location.reload();
  }

  const companiesAvatar = () => {
    return (
      <Avatar
        alt={selectedCompany.name}
        sx={{
          width: '24px !important',
          height: '24px !important',
          marginLeft: '2px !important',
          marginRight: '1px !important',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <WorkIcon sx={{ width: '62%' }} />
      </Avatar>
    );
  };

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1200 && inputBoxClassName.length)
        setInputBoxClassName('');
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = () => {
    setShowModules((prev) => !prev);
  };

  const handleClickAway = () => {
    setShowModules(false);
  };

  return (
    <HeaderProvider
      value={
        {
          user,
          profiles,
          companySelected,
          api,
          production,
          noAvatar,
          signOut,
        } as any
      }
    >
      <HeaderInStyle className="incicleheader">
        {/* COMPONENTS DESKTOP - COMPONENTS MOBILE */}
        {window.innerWidth > 670 ? (
          <>
            <section className="incicleheader-content">
              <nav style={{ alignItems: 'center', display: 'flex' }}>
                {/* LOGO ICON */}
                <Link
                  href={`${links.web?.social}`}
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    marginRight: '8px',
                    marginLeft: '15px',
                    paddingBottom: '2px',
                  }}
                >
                  <img
                    src="https://static-incicle.s3.amazonaws.com/logo_incicle.svg"
                    className="logo"
                    alt="logo"
                  />
                </Link>

                {/* MODULOS MENU */}
                <Stack
                  spacing={0}
                  direction="row"
                  className="incicleheader-modules"
                  sx={{ alignItems: 'center' }}
                >
                  <div
                    className={`incicleheader-modules-content original ${
                      showModules ? 'view' : ''
                    }`}
                  >
                    {[
                      {
                        text: 'Feed',
                        link: links.web?.social,
                      },
                      {
                        text: 'Agenda',
                        link: links.web?.schedule,
                      },
                      {
                        text: 'Projetos',
                        link: links.web?.project,
                      },
                      {
                        text: 'Feedbacks',
                        link: `${links.web?.social}feedback`,
                      },
                    ].map((anchor: any) => {
                      if (anchor.text === 'Projetos') {
                        if (user.type === 'PERSON') {
                          return (
                            <Link
                              key={`${anchor.text}`}
                              href={`${anchor.link}`}
                              underline="none"
                              sx={{
                                p: '6px 8px',
                                color: '#747474',
                                borderRadius: '3px',
                                '&:hover': {
                                  background: '#f2f3f5',
                                },
                                '&:active': {
                                  fontWeight: 600,
                                  color: '#007fa1',
                                },
                              }}
                            >
                              {anchor.text}
                            </Link>
                          );
                        }
                      } else {
                        return (
                          <Link
                            key={`${anchor.text}`}
                            href={`${anchor.link}`}
                            underline="none"
                            sx={{
                              p: '6px 8px',
                              color: '#747474',
                              borderRadius: '3px',
                              '&:hover': {
                                background: '#f2f3f5',
                              },
                              '&:active': {
                                fontWeight: 600,
                                color: '#007fa1',
                              },
                            }}
                          >
                            {anchor.text}
                          </Link>
                        );
                      }
                      return <></>;
                    })}
                  </div>

                  <label
                    className="incicleheader-modules-label"
                    htmlFor="incicleheader-modules-checkbox"
                  >
                    <IconButton
                      onClick={() =>
                        setShowModules((oldShowModules) => !oldShowModules)
                      }
                    >
                      <AppsIcon
                        sx={{
                          width: '24px !important',
                          height: '24px !important',
                        }}
                      />
                    </IconButton>
                  </label>
                  {showModules && (
                    <ClickAwayListener
                      {...{
                        onClickAway: () => showModules && setShowModules(false),
                      }}
                    >
                      <div
                        className={`incicleheader-modules-content toggle ${
                          showModules ? 'view' : ''
                        }`}
                      >
                        {[
                          {
                            text: 'Feed',
                            link: links.web?.social,
                            icon: 'https://social.incicle.com/static/media/SocialNetwork.13674f9c.svg',
                          },
                          {
                            text: 'Agenda',
                            link: links.web?.schedule,
                            icon: 'https://social.incicle.com/static/media/IconSchedule.9195d460.svg',
                          },
                          {
                            text: 'Projetos',
                            link: links.web?.project,
                            icon: 'https://social.incicle.com/static/media/IconProjects.72b93d23.svg',
                          },
                          {
                            text: 'Feedbacks',
                            link: `${links.web?.social}feedback`,
                            icon: 'https://social.incicle.com/static/media/feedback-icon.5128afb5.svg',
                          },
                          {
                            text: 'Gest??o por compet??ncia',
                            link:
                              user.type === 'PERSON'
                                ? `${links.web.competency}/user_view`
                                : links.web.competency,
                            icon: 'https://social.incicle.com/static/media/Avalia%C3%A7%C3%A3o_por_Competencia.cc36acdf.svg',
                          },
                        ].map((anchor) => {
                          if (anchor.text === 'Projetos') {
                            if (user.type === 'PERSON') {
                              return (
                                <IconButton
                                  key={anchor.text}
                                  sx={{
                                    justifyContent: 'flex-start',
                                    height: 'max-content',
                                    borderRadius: '0 !important',
                                    fontSize: '18px',
                                  }}
                                >
                                  <Icon>
                                    <img
                                      src={anchor.icon}
                                      alt={anchor.text}
                                      style={{
                                        width: '24px !important',
                                        height: '24px !important',
                                      }}
                                    />
                                  </Icon>
                                  <Link
                                    key={`${anchor.text}`}
                                    href={`${anchor.link}`}
                                    underline="none"
                                    sx={{
                                      p: '6px 8px',
                                      color: '#747474',
                                      borderRadius: '3px',
                                      '&:hover': {
                                        background: '#f2f3f5',
                                      },
                                      '&:active': {
                                        fontWeight: 600,
                                        color: '#007fa1',
                                      },
                                    }}
                                  >
                                    {anchor.text}
                                  </Link>
                                </IconButton>
                              );
                            }
                          } else {
                            return (
                              <IconButton
                                sx={{
                                  justifyContent: 'flex-start',
                                  height: 'max-content',
                                  borderRadius: '0 !important',
                                  fontSize: '18px',
                                }}
                              >
                                <Icon>
                                  <img
                                    src={anchor.icon}
                                    alt={anchor.text}
                                    style={{
                                      width: '24px !important',
                                      height: '24px !important',
                                    }}
                                  />
                                </Icon>
                                <Link
                                  key={`${anchor.text}`}
                                  href={`${anchor.link}`}
                                  underline="none"
                                  sx={{
                                    p: '6px 8px',
                                    color: '#747474',
                                    borderRadius: '3px',
                                    '&:hover': {
                                      background: '#f2f3f5',
                                    },
                                    '&:active': {
                                      fontWeight: 600,
                                      color: '#007fa1',
                                    },
                                  }}
                                >
                                  {anchor.text}
                                </Link>
                              </IconButton>
                            );
                          }
                          return <></>;
                        })}
                      </div>
                    </ClickAwayListener>
                  )}
                </Stack>
              </nav>
            </section>

            <section className="incicleheader-content flex-end">
              <nav>
                <Stack
                  spacing={1}
                  direction="row"
                  sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
                >
                  {/* COMPANIES */}
                  <div className="incicleheader-companies">
                    {companies.length > 0 && accountType === 'PERSON' && (
                      <Chip
                        onClick={handleOpenMenuCompanys}
                        size="small"
                        clickable
                        avatar={companiesAvatar()}
                        label={
                          <span style={{ fontSize: '13px' }}>
                            {maxLetters(selectedCompany.name, 200)}
                          </span>
                        }
                        onDelete={handleOpenMenuCompanys}
                        deleteIcon={<ArrowDropDownIcon />}
                        variant="outlined"
                        sx={{ padding: '2px !important', height: '32px' }}
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
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },

                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                          '& li, & a': {
                            fontFamily: '"Open Sans", sans-serif',
                            fontSize: '12px',
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
                          <span style={{ padding: '0 !important' }}>
                            {company.name}
                          </span>
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>

                  {/* SEARCH INPUT */}
                  <Paper
                    elevation={0}
                    className="incicleheader-inputbutton"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <IconButton onClick={() => setInputBoxClassName('view')}>
                      <SearchIcon
                        sx={{
                          width: '24px !important',
                          height: '24px !important',
                        }}
                      />
                    </IconButton>
                  </Paper>

                  {/* SEARCH CARD MODAL */}
                  <Paper
                    component="form"
                    className={`incicleheader-inputbox ${inputBoxClassName}`}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      // width: 250,
                      padding: '2px',
                      border: 'none',
                      background: '#f2f3f5',
                      boxShadow: 'none',
                    }}
                    ref={anchorRef}
                  >
                    <Autocomplete
                      options={resultPerson}
                      open={hasResult}
                      noOptionsText="Nenhum resultado encontrado"
                      sx={{
                        '& input': {
                          background: 'none',
                          border: 'none',
                          outline: 'none',
                        },
                      }}
                      renderInput={(params) => (
                        <Box
                          ref={params.InputProps.ref}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: '12px',
                            '& input::placeholder': {
                              color: '#ddd !important',
                            },
                          }}
                        >
                          {inputBoxClassName && (
                            <>
                              <IconButton
                                onClick={() => setInputBoxClassName('')}
                              >
                                <CloseIcon
                                  sx={{
                                    width: '16px !important',
                                    height: '16px !important',
                                  }}
                                />
                              </IconButton>
                            </>
                          )}
                          <input
                            type="text"
                            {...params.inputProps}
                            className="incicleheader-inputsearch"
                            placeholder="Encontre algu??m na InCicle"
                            style={{
                              fontSize: '14px',
                            }}
                          />
                        </Box>
                      )}
                      renderOption={(propss, person) => {
                        return (
                          <RenderPerson
                            liProps={propss}
                            person={person}
                            noAvatar={noAvatar || ''}
                          />
                        );
                      }}
                      getOptionLabel={(option: any) => option.name}
                      // @ts-ignore-next-line
                      onInputChange={(e, value: string) =>
                        searchFunction(value)
                      }
                      fullWidth
                    />

                    <IconButton
                      type="submit"
                      sx={{ p: '6px' }}
                      aria-label="search"
                    >
                      <SearchIcon
                        sx={{
                          width: '24px !important',
                          height: '24px !important',
                          color: '#747474 !important',
                        }}
                      />
                    </IconButton>
                  </Paper>

                  {/* FRIENDS */}
                  <IconButton
                    size="medium"
                    sx={{ width: 35, height: 35 }}
                    href={`${links.web?.social}friends`}
                  >
                    <PeopleAltIcon sx={{ width: 25, height: 25 }} />
                  </IconButton>

                  {/* NOTIFICATIONS AREA */}
                  {
                    <IconButton
                      size="medium"
                      sx={{ width: 35, height: 35 }}
                      onClick={showNotifications}
                    >
                      <Badge
                        color="primary"
                        variant="dot"
                        invisible={badge}
                        badgeContent=" "
                        overlap="circular"
                      >
                        <NotificationsIcon sx={{ width: 25, height: 25 }} />
                      </Badge>
                    </IconButton>
                  }
                  <Notifications
                    openNotifications={openNotifications}
                    anchorNotifications={anchorNotifications}
                    setAnchorNotifications={setAnchorNotifications}
                    setBadge={setBadge}
                  />

                  {/* AVATAR PROFILE */}
                  <IconButton
                    className="incicleheader-avatar"
                    onClick={handleOpenMenuProfile}
                    size="small"
                    style={{ marginRight: 15 }}
                  >
                    <RenderAvatar
                      sx={{ width: 35, height: 35 }}
                      src={profiles?.avatar}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorProfileEl}
                    open={openMenuProfile}
                    onClose={handleCloseMenuProfile}
                    onClick={handleCloseMenuProfile}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        maxWidth: '250px',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },

                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                        '& li, & a': {
                          fontFamily: '"Open Sans", sans-serif',
                          fontSize: '13px',
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem
                      component="a"
                      href={`${links.web.social}p/${myProfile.username}`}
                      sx={{
                        width: 'initial !important',
                        textTransform: 'capitalize',
                        overflowWrap: 'anywhere',
                        whiteSpace: 'break-spaces',
                      }}
                    >
                      <RenderAvatar
                        src={profiles?.avatar}
                        sx={{
                          width: '32px !important',
                          height: '32px !important',
                          marginRight: 15,
                        }}
                      />
                      {myProfile.name && myProfile.name.length > 40
                        ? `${myProfile.name.substring(0, 40)}...`
                        : myProfile.name}
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      component="a"
                      href={`${links.web.social}settings`}
                    >
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Configura????es
                    </MenuItem>
                    <MenuItem onClick={() => signOut()}>
                      <ListItemIcon>
                        <ExitToApp fontSize="small" />
                      </ListItemIcon>
                      Sair da InCicle
                    </MenuItem>
                  </Menu>
                </Stack>
              </nav>
            </section>
          </>
        ) : (
          <>
            <section className="incicleheader-content">
              <nav style={{ alignItems: 'center', display: 'flex' }}>
                {/* MODULOS MENU */}
                <Stack
                  spacing={0}
                  direction="row"
                  className="incicleheader-modules"
                  sx={{ alignItems: 'center' }}
                >
                  <div
                    className={`incicleheader-modules-content original ${
                      showModules ? 'view' : ''
                    }`}
                  >
                    {[
                      {
                        text: 'Feed',
                        link: links.web?.social,
                      },
                      {
                        text: 'Agenda',
                        link: links.web?.schedule,
                      },
                      {
                        text: 'Projetos',
                        link: links.web?.project,
                      },
                      {
                        text: 'Feedbacks',
                        link: `${links.web?.social}feedback`,
                      },
                    ].map((anchor: any) => {
                      if (anchor.text === 'Projetos') {
                        if (user.type === 'PERSON') {
                          return (
                            <Link
                              key={`${anchor.text}`}
                              href={`${anchor.link}`}
                              underline="none"
                              sx={{
                                p: '6px 8px',
                                color: '#747474',
                                borderRadius: '3px',
                                '&:hover': {
                                  background: '#f2f3f5',
                                },
                                '&:active': {
                                  fontWeight: 600,
                                  color: '#007fa1',
                                },
                              }}
                            >
                              {anchor.text}
                            </Link>
                          );
                        }
                      } else {
                        return (
                          <Link
                            key={`${anchor.text}`}
                            href={`${anchor.link}`}
                            underline="none"
                            sx={{
                              p: '6px 8px',
                              color: '#747474',
                              borderRadius: '3px',
                              '&:hover': {
                                background: '#f2f3f5',
                              },
                              '&:active': {
                                fontWeight: 600,
                                color: '#007fa1',
                              },
                            }}
                          >
                            {anchor.text}
                          </Link>
                        );
                      }
                      return <></>;
                    })}
                  </div>

                  <ClickAwayListener
                    onClickAway={handleClickAway}
                    mouseEvent="onMouseDown"
                    touchEvent="onTouchStart"
                  >
                    <>
                      <IconButton onClick={handleClick}>
                        <AppsIcon
                          sx={{
                            width: '24px !important',
                            height: '24px !important',
                          }}
                        />
                      </IconButton>
                      {showModules ? (
                        <div
                          className={`incicleheader-modules-content toggle ${
                            showModules ? 'view' : ''
                          }`}
                        >
                          {[
                            {
                              text: 'Feed',
                              link: links.web?.social,
                              icon: 'https://static-incicle.s3.amazonaws.com/rede-social.svg',
                            },
                            {
                              text: 'Agenda',
                              link: links.web?.schedule,
                              icon: 'https://social.incicle.com/static/media/IconSchedule.9195d460.svg',
                            },
                            {
                              text: 'Projetos',
                              link: links.web?.project,
                              icon: 'https://static-incicle.s3.amazonaws.com/projetos.svg',
                            },
                            {
                              text: 'Feedbacks',
                              link: `${links.web?.social}feedback`,
                              icon: 'https://social.incicle.com/static/media/feedback-icon.5128afb5.svg',
                            },
                            {
                              text: 'Gest??o por compet??ncia',
                              link:
                                user.type === 'PERSON'
                                  ? `${links.web.competency}/user_view`
                                  : links.web.competency,
                              icon: 'https://social.incicle.com/static/media/Avalia%C3%A7%C3%A3o_por_Competencia.cc36acdf.svg',
                            },
                          ].map((anchor) => {
                            if (anchor.text === 'Projetos') {
                              if (user.type === 'PERSON') {
                                return (
                                  <IconButton
                                    key={anchor.text}
                                    sx={{
                                      justifyContent: 'flex-start',
                                      height: 'max-content',
                                      borderRadius: '0 !important',
                                      fontSize: '18px',
                                    }}
                                  >
                                    <Icon>
                                      <img
                                        src={anchor.icon}
                                        alt={anchor.text}
                                        style={{
                                          width: '24px !important',
                                          height: '24px !important',
                                        }}
                                      />
                                    </Icon>
                                    <Link
                                      key={`${anchor.text}`}
                                      href={`${anchor.link}`}
                                      underline="none"
                                      sx={{
                                        p: '6px 8px',
                                        color: '#747474',
                                        borderRadius: '3px',
                                        '&:hover': {
                                          background: '#f2f3f5',
                                        },
                                        '&:active': {
                                          fontWeight: 600,
                                          color: '#007fa1',
                                        },
                                      }}
                                    >
                                      {anchor.text}
                                    </Link>
                                  </IconButton>
                                );
                              }
                            } else {
                              return (
                                <IconButton
                                  key={anchor.text}
                                  sx={{
                                    justifyContent: 'flex-start',
                                    height: 'max-content',
                                    borderRadius: '0 !important',
                                    fontSize: '18px',
                                  }}
                                >
                                  <Icon>
                                    <img
                                      src={anchor.icon}
                                      alt={anchor.text}
                                      style={{
                                        width: '24px !important',
                                        height: '24px !important',
                                      }}
                                    />
                                  </Icon>
                                  <Link
                                    key={`${anchor.text}`}
                                    href={`${anchor.link}`}
                                    underline="none"
                                    sx={{
                                      p: '6px 8px',
                                      color: '#747474',
                                      borderRadius: '3px',
                                      '&:hover': {
                                        background: '#f2f3f5',
                                      },
                                      '&:active': {
                                        fontWeight: 600,
                                        color: '#007fa1',
                                      },
                                    }}
                                  >
                                    {anchor.text}
                                  </Link>
                                </IconButton>
                              );
                            }
                            return <></>;
                          })}
                        </div>
                      ) : (
                        ''
                      )}
                    </>
                  </ClickAwayListener>
                </Stack>

                {/* SEARCH INPUT */}
                <Paper
                  elevation={0}
                  className="incicleheader-inputbutton"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <IconButton onClick={() => setInputBoxClassName('view')}>
                    <SearchIcon
                      sx={{
                        width: '24px !important',
                        height: '24px !important',
                      }}
                    />
                  </IconButton>
                </Paper>

                {/* SEARCH CARD MODAL */}
                <Paper
                  component="form"
                  className={`incicleheader-inputbox ${inputBoxClassName}`}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    // width: 250,
                    padding: '2px',
                    border: 'none',
                    background: '#f2f3f5',
                    boxShadow: 'none',
                  }}
                  ref={anchorRef}
                >
                  <Autocomplete
                    options={resultPerson}
                    open={hasResult}
                    noOptionsText="Nenhum resultado encontrado"
                    sx={{
                      '& input': {
                        background: 'none',
                        border: 'none',
                        outline: 'none',
                      },
                    }}
                    renderInput={(params) => (
                      <Box
                        ref={params.InputProps.ref}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          marginLeft: '12px',
                          '& input::placeholder': {
                            color: '#ddd !important',
                          },
                        }}
                      >
                        {inputBoxClassName && (
                          <>
                            <IconButton
                              onClick={() => setInputBoxClassName('')}
                            >
                              <CloseIcon
                                sx={{
                                  width: '16px !important',
                                  height: '16px !important',
                                }}
                              />
                            </IconButton>
                          </>
                        )}
                        <input
                          type="text"
                          {...params.inputProps}
                          className="incicleheader-inputsearch"
                          placeholder="Encontre algu??m na InCicle"
                          style={{
                            fontSize: '14px',
                          }}
                        />
                      </Box>
                    )}
                    renderOption={(propss, person) => {
                      return (
                        <RenderPerson
                          liProps={propss}
                          person={person}
                          noAvatar={noAvatar || ''}
                        />
                      );
                    }}
                    getOptionLabel={(option: any) => option.name}
                    // @ts-ignore-next-line
                    onInputChange={(e, value: string) => searchFunction(value)}
                    fullWidth
                  />

                  <IconButton
                    type="submit"
                    sx={{ p: '6px' }}
                    aria-label="search"
                  >
                    <SearchIcon
                      sx={{
                        width: '24px !important',
                        height: '24px !important',
                        color: '#747474 !important',
                      }}
                    />
                  </IconButton>
                </Paper>
              </nav>
            </section>

            <section className="incicleheader-content center">
              <nav style={{ alignItems: 'center', display: 'flex' }}>
                {/* LOGO ICON */}
                <Link
                  href={`${links.web?.social}`}
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    marginRight: '8px',
                    marginLeft: '15px',
                    paddingBottom: '2px',
                  }}
                >
                  <img
                    src="https://static-incicle.s3.amazonaws.com/logo_incicle.svg"
                    className="logo"
                    alt="logo"
                  />
                </Link>
              </nav>
            </section>

            <section className="incicleheader-content flex-end">
              <nav>
                <Stack
                  spacing={1}
                  direction="row"
                  sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
                >
                  {/* NOTIFICATIONS AREA */}
                  {
                    <IconButton
                      size="medium"
                      sx={{ width: 35, height: 35 }}
                      onClick={showNotifications}
                    >
                      <Badge
                        color="primary"
                        variant="dot"
                        invisible={badge}
                        badgeContent=" "
                        overlap="circular"
                      >
                        <NotificationsIcon sx={{ width: 25, height: 25 }} />
                      </Badge>
                    </IconButton>
                  }
                  <Notifications
                    openNotifications={openNotifications}
                    anchorNotifications={anchorNotifications}
                    setAnchorNotifications={setAnchorNotifications}
                    setBadge={setBadge}
                  />

                  {/* AVATAR PROFILE */}
                  <IconButton
                    className="incicleheader-avatar"
                    onClick={handleOpenMenuProfile}
                    size="small"
                    style={{ marginRight: 15 }}
                  >
                    <RenderAvatar
                      sx={{ width: 35, height: 35 }}
                      src={profiles?.avatar}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorProfileEl}
                    open={openMenuProfile}
                    onClose={handleCloseMenuProfile}
                    onClick={handleCloseMenuProfile}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        maxWidth: '250px',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },

                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                        '& li, & a': {
                          fontFamily: '"Open Sans", sans-serif',
                          fontSize: '13px',
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem
                      component="a"
                      href={`${links.web.social}p/${myProfile.username}`}
                      sx={{
                        width: 'initial !important',
                        textTransform: 'capitalize',
                        overflowWrap: 'anywhere',
                        whiteSpace: 'break-spaces',
                      }}
                    >
                      <RenderAvatar
                        src={profiles?.avatar}
                        sx={{
                          width: '32px !important',
                          height: '32px !important',
                          marginRight: 15,
                        }}
                      />
                      {myProfile.name?.length > 40
                        ? `${myProfile.name.substring(0, 40)}...`
                        : myProfile.name}
                    </MenuItem>
                    <Divider />

                    {/* FRIENDS */}
                    <MenuItem
                      component="a"
                      href={`${links.web?.social}friends`}
                    >
                      <ListItemIcon>
                        <PeopleAltIcon fontSize="small" />
                      </ListItemIcon>
                      Conex??es
                    </MenuItem>
                    <MenuItem
                      component="a"
                      href={`${links.web.social}settings`}
                    >
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Configura????es
                    </MenuItem>
                    <MenuItem onClick={() => signOut()}>
                      <ListItemIcon>
                        <ExitToApp fontSize="small" />
                      </ListItemIcon>
                      Sair da InCicle
                    </MenuItem>
                  </Menu>
                </Stack>
              </nav>
            </section>
          </>
        )}
      </HeaderInStyle>
    </HeaderProvider>
  );
};
