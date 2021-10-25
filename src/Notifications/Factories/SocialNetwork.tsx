import React, { useEffect, useState } from "react";
import { Stack, Button, Typography } from "@mui/material";

const notificationType = {
  friendship_request: "friendship_request"
}

interface IProps {
  production: boolean
  notificationItem: any
}

const renderText = (content: string) => {
  return (
    <Typography
      sx={{
        fontSize: "13px",
        width: "100%",
      }}
    >
      {content}
    </Typography>
  )
}

const SocialNetworkNotificationFactory: React.FC<IProps> = ({ production, notificationItem }) => {

  const [notification, setNotification] = useState(notificationItem);

  const preventRedirect = (e: any) => {
    e.preventDefault();
  }

  const acceptRequestFriend = (e: any) => {
    preventRedirect(e)
    if(production) {
      
    }
    setNotification({
      ...notification,
      common: {
        accept: true
      }
    });
  }

  const excludeRequestFriend = (e: any) => {
    preventRedirect(e);
    setNotification({
      ...notification,
      common: {
        accept: false
      }
    });
  }

  useEffect(() => {
    renderText(notification.content)
    renderActions();
  }, [notification]);

  const renderActions = () => {

    switch (notificationItem.type) {

      case notificationType.friendship_request:
        return (
          <Stack direction="row" spacing={1}>
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
          </Stack>
        );

      default:
        return (<></>);

    }
  }

  return (
    <React.Fragment>
      {renderText(notification.content)}
      {renderActions()}
    </React.Fragment>
  )
}

export default SocialNetworkNotificationFactory;
