import React, { useEffect, useState } from "react";
import { defineLinks } from "../../utils/functions";
import {
  NotificationContainer,
  NotificationContentText,
  NotificationHighlight,
  reduceString,
} from "./NotificationAbstract";
import { useHeaderProvider } from "../../hooks/useHeaderProvider";
import { NotificationProps } from "../../interfaces/Notification";

interface IProps {
  notificationItem: NotificationProps;
}

const notificationType = {
  ENDOMARKETING_COMMUNICATION: "ENDOMARKETING_COMMUNICATION",
};

// @ts-ignore
const SocialNetworkNotificationFactory: React.FC<IProps> = ({ notificationItem }) => {
  const { production } = useHeaderProvider();
  const links = defineLinks(production);
  // @ts-ignore
  const [notification, setNotification] = useState(notificationItem);

  useEffect(() => {
    renderActions();
  }, [notification]);

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.ENDOMARKETING_COMMUNICATION:
        return (
          <NotificationContainer
            url={`${links.web.social}publication/${notification.common.publication_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              Comunicado:{" "}
              <NotificationHighlight>"{reduceString(notification.common.content, 100)}"</NotificationHighlight>
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
