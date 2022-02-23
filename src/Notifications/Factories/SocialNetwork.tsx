import React, { useEffect, useState } from "react";
import { defineLinks } from "../../utils/functions";
import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
  reduceString,
  preventRedirect,
} from "./NotificationAbstract";
import { useHeaderProvider } from "../../hooks/useHeaderProvider";
import { NotificationProps } from "../../interfaces/Notification";
import { Stack, Button } from "@mui/material";

interface IProps {
  notificationItem: NotificationProps;
}

const notificationType = {
  PUBLICATION_TYPE_LIKE: "PUBLICATION_TYPE_LIKE",
  PUBLICATION_TYPE_COMMENT: "PUBLICATION_TYPE_COMMENT",
  PUBLICATION_TYPE_COMMENT_OF_COMMENT: "PUBLICATION_TYPE_COMMENT_OF_COMMENT",
  PUBLICATION_TYPE_LIKE_COMMENT: "PUBLICATION_TYPE_LIKE_COMMENT",
  PUBLICATION_TYPE_SHARE: "PUBLICATION_TYPE_SHARE",
  NEW_FRIEND_REQUEST: "NEW_FRIEND_REQUEST",
  NEW_FRIEND_RESPONSE: "NEW_FRIEND_RESPONSE",
  NEW_RECOMMENDATION_REQUEST: "NEW_RECOMMENDATION_REQUEST",
  NEW_RECOMMENDATION_RECEIVED: "NEW_RECOMMENDATION_RECEIVED",
  BIRTHDAYS_TODAY: "BIRTHDAYS_TODAY",
};

// @ts-ignore
const SocialNetworkNotificationFactory: React.FC<IProps> = ({ notificationItem }) => {
  const { production, profiles: profile, api } = useHeaderProvider();
  const links = defineLinks(production);
  // @ts-ignore
  const [notification, setNotification] = useState(notificationItem);

  const acceptRequestFriend = (e: any) => {
    e.stopPropagation(); // Prevent call parent onClick event.
    preventRedirect(e);
    api.put(`${links.api.social}friends/${notificationItem.common.connection_id}`).then((response: any) => {
      if (response.status === 204) {
        api.put(`${links.api.notifications}${notificationItem._id}/accept`, { accept: true }).then((response: any) => {
          if (response.status === 200) {
            setNotification({
              ...notification,
              common: {
                accept: true,
              },
            });
          }
        });
      }
    });
  };

  const excludeRequestFriend = (e: any) => {
    e.stopPropagation(); // Prevent call parent onClick event.
    preventRedirect(e);
    api.delete(`${links.api.social}connections/${notificationItem.common.connection_id}`).then((response: any) => {
      if (response.status === 204) {
        api.put(`${links.api.notifications}${notificationItem._id}/accept`, { accept: false }).then((response: any) => {
          if (response.status === 200) {
            setNotification({
              ...notification,
              common: {
                accept: false,
              },
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    renderActions();
  }, [notification]);

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.NEW_FRIEND_REQUEST:
        return (
          <NotificationContainer
            url={`${links.web.social}p/${notificationItem.sender.username}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <label>
                <label style={{ textTransform: "capitalize" }}>{notification.sender.name}</label> te enviou uma
                solicitação de amizade.
              </label>
            </NotificationContentText>
            <Stack direction="row" spacing={1} style={{ marginTop: 0 }}>
              {notification.common.status === "pending" && (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "rgb(0, 133, 176)",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#0177ac",
                        color: "#FFF",
                        filter: "brightness(0.85)",
                      },
                    }}
                    size="small"
                    onClick={e => acceptRequestFriend(e)}
                  >
                    Aceitar
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{ color: "rgb(0, 133, 176)", borderColor: "1px solid rgb(0, 133, 176)" }}
                    onClick={e => excludeRequestFriend(e)}
                  >
                    Recusar
                  </Button>
                </>
              )}
              {notification.common.status === "accepted" && <small>Pedido aceito</small>}
              {notification.common.status === "refused" && <small>Pedido recusado</small>}
            </Stack>
          </NotificationContainer>
        );

      case notificationType.PUBLICATION_TYPE_LIKE:
      case notificationType.PUBLICATION_TYPE_COMMENT:
      case notificationType.PUBLICATION_TYPE_SHARE:
        return (
          <NotificationContainer
            url={`${links.web.social}publication/${notificationItem.common.publication_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <label>
                <NotificationHighlight>{notification.sender.name}</NotificationHighlight>
                {notificationItem.type === notificationType.PUBLICATION_TYPE_LIKE && " gostou da "}
                {notificationItem.type === notificationType.PUBLICATION_TYPE_COMMENT && " comentou na "}
                {notificationItem.type === notificationType.PUBLICATION_TYPE_SHARE && " compartilhou "}
                sua publicação
                {notificationItem.common.content && (
                  <>
                    : "
                    <NotificationHighlight>{reduceString(notificationItem.common.content, 60)}</NotificationHighlight>"
                  </>
                )}
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_RECOMMENDATION_REQUEST:
      case notificationType.NEW_RECOMMENDATION_RECEIVED:
        return (
          <NotificationContainer
            url={`${links.web.social}p/${
              notificationItem.type === notificationType.NEW_RECOMMENDATION_RECEIVED
                ? profile?.username
                : notification.sender.username
            }`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <label>
                <NotificationHighlight>{notification.sender.name}</NotificationHighlight>
                {notificationItem.type === notificationType.NEW_RECOMMENDATION_REQUEST &&
                  " solicitou para você uma recomendação"}
                {notificationItem.type === notificationType.NEW_RECOMMENDATION_RECEIVED && (
                  <>
                    {" "}
                    fez uma recomendação sobre você:{" "}
                    <NotificationHighlight>"{reduceString(notification.common.content, 55)}"</NotificationHighlight>
                  </>
                )}
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PUBLICATION_TYPE_LIKE_COMMENT:
        return (
          <NotificationContainer
            url={`${links.web.social}publication/${notificationItem.common.publication_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight>
              {" gostou do seu comentário"}{" "}
              {notificationItem.common.publication_owner_id === profile?.profile_id ? (
                " na sua publicação "
              ) : (
                <>
                  na publicação de{" "}
                  <NotificationHighlight>{notificationItem.common.publication_owner_name}, </NotificationHighlight>
                </>
              )}
              <NotificationHighlight>"{reduceString(notificationItem.common.content, 35)}"</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PUBLICATION_TYPE_COMMENT_OF_COMMENT:
        return (
          <NotificationContainer
            url={`${links.web.social}publication/${notificationItem.common.publication_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name} </NotificationHighlight>
              respondeu seu comentário{" "}
              {notificationItem.common.publication_owner_id === profile?.profile_id ? (
                "na sua publicação"
              ) : (
                <>
                  na publicação de{" "}
                  <NotificationHighlight>{notificationItem.common.publication_owner_name}</NotificationHighlight>.{" "}
                  <NotificationHighlight>"{reduceString(notificationItem.common.content, 35)}"</NotificationHighlight>
                </>
              )}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_FRIEND_RESPONSE:
        return (
          <NotificationContainer
            url={`${links.web.social}p/${notificationItem.sender.username}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <label>
                <label style={{ textTransform: "capitalize" }}>{notification.sender.name}</label>
                {" aceitou seu pedido de amizade"}
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.BIRTHDAYS_TODAY:
        return (
          <NotificationContainer
            url={`${links.web.social}p/${notificationItem.sender.username}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> está fazendo aniversário
              hoje!
            </NotificationContentText>
          </NotificationContainer>
        );

      default:
        return <></>;
    }
  };

  return <React.Fragment>{renderActions()}</React.Fragment>;
};

export default SocialNetworkNotificationFactory;
