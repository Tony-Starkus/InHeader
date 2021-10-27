import React, { useEffect, useState } from "react";
import { defineLinks } from "../../utils/functions";
import { NotificationContainer, NotificationContentText } from './NotificationAbstract';

interface IProps {
  production: boolean
  api: any
  notificationItem: any
}

const notificationType = {
  RECEIVED_FEEDBACK: "RECEIVED_FEEDBACK",
  REQUEST_FEEDBACK: "REQUEST_FEEDBACK"
}

// @ts-ignore
const FeedbackNotificationFactory: React.FC<IProps> = ({ production, api, notificationItem }) => {
  const links = defineLinks(production);
  // @ts-ignore
  const [notification, setNotification] = useState(notificationItem);

  useEffect(() => {
    renderActions();
  }, [notification]);

  const renderActions = () => {

    switch (notificationItem.type) {

      case notificationType.RECEIVED_FEEDBACK:
        return (
          <NotificationContainer
            url={`${links.web.social}feedback`}
            notification={notificationItem}
            api={api}
            production={production}
          >
            <NotificationContentText>
              <label>
                <label style={{ textTransform: 'capitalize' }}>{notification.sender.name}</label> enviou um feedback para você.
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.REQUEST_FEEDBACK:
        return (
          <NotificationContainer
            url={`${links.web.social}feedback`}
            notification={notificationItem}
            api={api}
            production={production}
          >
            <NotificationContentText>
              <label>
                <label style={{ textTransform: 'capitalize' }}>{notification.sender.name}</label> pediu um feedback de você.
              </label>
            </NotificationContentText>
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

export default FeedbackNotificationFactory;
