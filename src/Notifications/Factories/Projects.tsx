import React from "react";
import { useHeaderProvider } from "../../hooks/useHeaderProvider";
import { defineLinks } from "../../utils/functions";
import { NotificationProps } from "../../interfaces/Notification";
import { NotificationContainer, NotificationContentText, NotificationHighlight } from "./NotificationAbstract";

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
          <NotificationContainer
            url={`${links.web.project}kanban/${notificationItem.common.project_id}/task/${notificationItem.common.activity_id}`}
            notification={notificationItem}
          >
            <NotificationContentText>
              <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> adicionou você na atividade{" "}
              <NotificationHighlight>"{notificationItem.common.title_activity}"</NotificationHighlight> no projeto{" "}
              <NotificationHighlight>"{notificationItem.common.title_project}"</NotificationHighlight>
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
                <NotificationHighlight>{notificationItem.sender.name}</NotificationHighlight> te adicionou no projeto{" "}
                <NotificationHighlight>"{notificationItem.common.title_project}"</NotificationHighlight>.
              </label>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificaitonType.ACTIVITY_EXPIRATION:
        return (
          <NotificationContainer
            url={`${links.web.project}kanban/${notificationItem.common.project_id}/task/${notificationItem.common.activity_id}`}
            notification={notificationItem}
          >
            <NotificationContentText>
              Sua atividade <NotificationHighlight>"{notificationItem.common.title_activity}"</NotificationHighlight> no
              projeto <NotificationHighlight>"{notificationItem.common.title_project}"</NotificationHighlight> vencerá
              amanhã.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificaitonType.REMOVED_FROM_PROJECT:
        return (
          <NotificationContainer url={`#`} notification={notificationItem}>
            <NotificationContentText>
              <label>
                Você foi removido do projeto{" "}
                <NotificationHighlight>{notificationItem.common.title_project}</NotificationHighlight>.
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
