import React from "react";
import { useHeaderProvider } from "../../hooks/useHeaderProvider";
import { defineLinks } from "../../utils/functions";
import { NotificationProps } from "../interfaces";
import { NotificationContainer, NotificationContentText } from "./NotificationAbstract";

interface Props {
  notificationItem: NotificationProps;
}

const notificaitonType = {
  ADDED_IN_ACTIVITY: "ADDED_IN_ACTIVITY",
  ADDED_IN_PROJECT: "ADDED_IN_PROJECT",
  REMOVED_FROM_PROJECT: "REMOVED_FROM_PROJECT",
  ACTIVITY_EXPIRATION: "ACTIVITY_EXPIRATION",
};

export const ProjectsFactory: React.FC<Props> = ({ notificationItem }) => {
  const { production } = useHeaderProvider();
  const links = defineLinks(production);

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificaitonType.ADDED_IN_ACTIVITY:
        return (
          <NotificationContainer url={`${links.web.project}`} notification={notificationItem}>
            <NotificationContentText>
              <label>
                {notificationItem.sender.name} incluiu você na atividade "{notificationItem.common.title_activity}".
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificaitonType.ADDED_IN_PROJECT:
        return (
          <NotificationContainer
            url={`${links.web.project}kanban/${notificationItem.common.project_id}`}
            notification={notificationItem}
          >
            <NotificationContentText>
              <label>
                {notificationItem.sender.name} adicionou você como membro do projeto "
                {notificationItem.common.title_project}".
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificaitonType.ACTIVITY_EXPIRATION:
        return (
          <NotificationContainer url={`#`} notification={notificationItem}>
            <NotificationContentText>
              <label>O praso da atividade {notificationItem.common.title_activity} expirou.</label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificaitonType.REMOVED_FROM_PROJECT:
        return (
          <NotificationContainer url={`#`} notification={notificationItem}>
            <NotificationContentText>
              <label>Você foi removido do projeto {notificationItem.common.title_project}</label>
            </NotificationContentText>
          </NotificationContainer>
        );
      default:
        return <></>;
    }
  };

  return <React.Fragment>{renderActions()}</React.Fragment>;
};
