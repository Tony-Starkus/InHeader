import React, { useEffect, useState } from "react";
import { defineLinks } from "../../utils/functions";
import { NotificationContainer, NotificationContentText } from "./NotificationAbstract";
import { useHeaderProvider } from "../../hooks/useHeaderProvider";

interface IProps {
  notificationItem: any;
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
};

// @ts-ignore
const SocialNetworkNotificationFactory: React.FC<IProps> = ({ notificationItem }) => {
  const { production, profiles: profile } = useHeaderProvider();
  const links = defineLinks(production);
  const [notification, setNotification] = useState(notificationItem);

  // const acceptRequestFriend = (e: any) => {
  //   e.stopPropagation(); // Prevent call parent onClick event.
  //   preventRedirect(e);
  //   api.put(`${links.api.social}connections/${notificationItem.common.connection_id}/accept`).then((response: any) => {
  //     if (response.status === 204) {
  //       api.put(`${links.api.notifications}${notificationItem._id}/accept`, { accept: true }).then((response: any) => {
  //         if (response.status === 200) {
  //           setNotification({
  //             ...notification,
  //             common: {
  //               accept: true
  //             }
  //           });
  //         }
  //       })
  //     }
  //   });
  // }

  // const excludeRequestFriend = (e: any) => {
  //   e.stopPropagation(); // Prevent call parent onClick event.
  //   preventRedirect(e);
  //   api.delete(`${links.api.social}connections/${notificationItem.common.connection_id}`).then((response: any) => {
  //     if (response.status === 204) {
  //       api.put(`${links.api.notifications}${notificationItem._id}/accept`, { accept: false }).then((response: any) => {
  //         if (response.status === 200) {
  //           setNotification({
  //             ...notification,
  //             common: {
  //               accept: false
  //             }
  //           });
  //         }
  //       })
  //     }
  //   });
  // }

  useEffect(() => {
    renderActions();
  }, [notification]);

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.NEW_FRIEND_REQUEST:
        return (
          <NotificationContainer url={`${links.web.social}friends`} notification={notificationItem}>
            <NotificationContentText>
              <label>
                <label style={{ textTransform: "capitalize" }}>{notification.sender.name}</label> te enviou uma
                solicitação de amizade.
              </label>
            </NotificationContentText>
            {/* <Stack direction="row" spacing={1}>
              {notification.common.accept === null &&
                <>
                  <Button variant="contained" size="small" onClick={e => acceptRequestFriend(e)}>Confirmar</Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={e => excludeRequestFriend(e)}
                  >
                    Excluir
                  </Button>
                </>
              }
              {notification.common.accept === true && "Pedido aceito"}
              {notification.common.accept === false && "Pedido recusado"}
            </Stack> */}
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
            <NotificationContentText>
              <label>
                <label style={{ textTransform: "capitalize" }}>{notification.sender.name}</label>
                {notificationItem.type === notificationType.PUBLICATION_TYPE_LIKE && " curtiu a "}
                {notificationItem.type === notificationType.PUBLICATION_TYPE_COMMENT && " comentou na "}
                {notificationItem.type === notificationType.PUBLICATION_TYPE_SHARE && " compartilhou "}
                sua publicação
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_RECOMMENDATION_REQUEST:
      case notificationType.NEW_RECOMMENDATION_RECEIVED:
        return (
          <NotificationContainer url={`${links.web.social}p/${profile?.username}`} notification={notificationItem}>
            <NotificationContentText>
              <label>
                <label style={{ textTransform: "capitalize" }}>{notification.sender.name}</label>
                {notificationItem.type === notificationType.NEW_RECOMMENDATION_REQUEST &&
                  " solicitou uma recomendação de você"}
                {notificationItem.type === notificationType.NEW_RECOMMENDATION_RECEIVED &&
                  " enviou uma recomendação para você"}
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
            <NotificationContentText>
              <label>
                <label style={{ textTransform: "capitalize" }}>{notification.sender.name}</label>
                {" curtiu seu comentário"}
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PUBLICATION_TYPE_COMMENT_OF_COMMENT:
        return (
          <NotificationContainer
            url={`${links.web.social}publication/${notificationItem.common.publication_id}`}
            notification={notificationItem}
          >
            <NotificationContentText>
              <label>
                <label style={{ textTransform: "capitalize" }}>{notification.sender.name}</label>
                {" respondeu seu comentário"}
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_FRIEND_RESPONSE:
        return (
          <NotificationContainer url={`${links.web.social}p/${profile?.username}`} notification={notificationItem}>
            <NotificationContentText>
              <label>
                <label style={{ textTransform: "capitalize" }}>{notification.sender.name}</label>
                {" aceitou seu pedido de amizade"}
              </label>
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
