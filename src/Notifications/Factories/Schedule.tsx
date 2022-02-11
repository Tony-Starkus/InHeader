import React, { useEffect, useState } from "react";
import { defineLinks } from "../../utils/functions";
import { NotificationContainer, NotificationContentText } from "./NotificationAbstract";
import { useHeaderProvider } from "../../hooks/useHeaderProvider";
import { NotificationProps } from "../../interfaces/Notification";

interface IProps {
  notificationItem: NotificationProps;
}

const notificationType = {
  NEW_EVENT_SCHEDULE_INVITATION: "NEW_EVENT_SCHEDULE_INVITATION",
  NEW_TASK_INVITATION: "NEW_TASK_INVITATION",
};

// @ts-ignore
const ScheduleNotificationFactory: React.FC<IProps> = ({ notificationItem }) => {
  const { production } = useHeaderProvider();
  const links = defineLinks(production);
  // @ts-ignore
  const [notification, setNotification] = useState(notificationItem);

  useEffect(() => {
    renderActions();
  }, [notification]);

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.NEW_EVENT_SCHEDULE_INVITATION:
        return (
          <NotificationContainer
            url={`${links.web.schedule}event/${notificationItem.common.event_id}`}
            notification={notificationItem}
          >
            <NotificationContentText>
              <label>
                <label style={{ textTransform: "capitalize" }}>{notification.sender.name}</label> te adicionou em um
                evento.
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_TASK_INVITATION:
        return (
          <NotificationContainer
            url={`${links.web.schedule}task/${notificationItem.common.task_id}`}
            notification={notificationItem}
          >
            <NotificationContentText>
              <label>
                <label style={{ textTransform: "capitalize" }}>{notification.sender.name}</label> delegou uma atividade
                para você.
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

export default ScheduleNotificationFactory;
