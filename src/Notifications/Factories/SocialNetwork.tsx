import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { defineLinks } from "../../utils/functions";
import { NotificationContainer } from './NotificationAbstract';

interface IProps {
  production: boolean
  api: any
  profile: any
  notificationItem: any
}

const notificationType = {
  activity_in_publication: "activity_in_publication",
  friendship_request: "friendship_request",
  publication: "publication",
  send_recommendation: "send_recommendation"
}

const renderText = (notification: any) => {

  let text;

  switch (notification.content) {

    case "NEW_FRIEND_REQUEST":
      text =
        <label>
          <label style={{ textTransform: 'capitalize' }}>{notification.sender.name}</label> te enviou uma solicitação de amizade.
        </label>;
      break;

    case "PUBLICATION_TYPE_LIKE":
      text =
        <label>
          <label style={{ textTransform: 'capitalize' }}>{notification.sender.name}</label> curtiu sua publicação.
        </label>;
      break;

    case "PUBLICATION_TYPE_COMMENT":
      text =
        <label>
          <label style={{ textTransform: 'capitalize' }}>{notification.sender.name}</label> comentou na sua publicação.
        </label>;
      break;

    case "PUBLICATION_TYPE_SHARE":
      text =
        <label>
          <label style={{ textTransform: 'capitalize' }}>{notification.sender.name}</label> compartilhou  sua publicação.
        </label>;
      break;

    case "NEW_RECOMMENDATION_RECEIVED":
      text =
        <label>
          <label style={{ textTransform: 'capitalize' }}>{notification.sender.name}</label> escreveu uma recomendação para você.
        </label>;

  }

  return (
    <Typography
      sx={{
        fontSize: "13px",
        width: "100%",
      }}
    >
      {text}
    </Typography>
  )
}

const SocialNetworkNotificationFactory: React.FC<IProps> = ({ production, api, profile, notificationItem }) => {
  const links = defineLinks(production);
  // @ts-ignore
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

      case notificationType.friendship_request:
        return (
          <NotificationContainer
            url={`${links.web.social}friends`}
            notification={notificationItem}
            api={api}
            production={production}
          >
            {renderText(notificationItem)}
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

      case notificationType.publication:
        return (
          <NotificationContainer
            url={`${links.web.social}publication/${notificationItem.common.publication_id}`}
            notification={notificationItem}
            api={api}
            production={production}
          >
            {renderText(notificationItem)}
          </NotificationContainer>
        );

      case notificationType.send_recommendation:
        return (
          <NotificationContainer
            url={`${links.web.social}p/${profile.nickname}`}
            notification={notificationItem}
            api={api}
            production={production}
          >
            {renderText(notificationItem)}
          </NotificationContainer>
        );

      default:
        return (<></>);

    }
  }

  return (
    <React.Fragment>
      {renderActions()}
    </React.Fragment>
  )
}

export default SocialNetworkNotificationFactory;
