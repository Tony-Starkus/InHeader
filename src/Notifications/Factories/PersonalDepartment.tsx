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
  HIRING_PENDING: "HIRING_PENDING",
  HIRING_UPDATED: "HIRING_UPDATED",
  HIRING_APPROVED: "HIRING_APPROVED",
  HIRING_CANCELED: "HIRING_CANCELED",
  HIRING_CANCELED_BY_CANDIDATE: "HIRING_CANCELED_BY_CANDIDATE",
  HIRING_PEDING_DEADLINE: "HIRING_PEDING_DEADLINE",
  NEW_HIRING: "NEW_HIRING",
  DOCUMENT_REJECTED: "DOCUMENT_REJECTED",
  FREE_NOTIFICATION: "FREE_NOTIFICATION",
};

const PersonalDepartment: React.FC<IProps> = ({ notificationItem }) => {
  const { production } = useHeaderProvider();
  const links = defineLinks(production);
  // @ts-ignore
  const [notification, setNotification] = useState(notificationItem);

  useEffect(() => {
    renderActions();
  }, [notification]);

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.HIRING_PENDING:
        return (
          <NotificationContainer
            url={`${links.web.personalDepartment}hire/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight>:{" "}
              {reduceString(notification.common.content, 100)}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_UPDATED:
        return (
          <NotificationContainer
            url={`${links.web.personalDepartment}hire/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> modificou os dados de sua
              contratação. <NotificationHighlight>Clique para visualizar</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_APPROVED:
        return (
          <NotificationContainer
            url={`${links.web.personalDepartment}hire/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> concluiu seu processo de
              contratação.{" "}
              <NotificationHighlight>"{reduceString(notification.common.content, 60)}"</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_CANCELED:
        return (
          <NotificationContainer
            url={`${links.web.personalDepartment}hire/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}: </NotificationHighlight> "
              {reduceString(notification.common.content, 80)}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_CANCELED_BY_CANDIDATE:
        return (
          <NotificationContainer
            url={`${links.web.personalDepartment}hire/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}: </NotificationHighlight> "
              {reduceString(notification.common.content, 80)}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.HIRING_PEDING_DEADLINE:
        return (
          <NotificationContainer
            url={`${links.web.personalDepartment}hire/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              O prazo limite para o cadsatro de s uas informrraçaões sse encerra amanhã
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_HIRING:
        return (
          <NotificationContainer
            url={`${links.web.personalDepartment}hire/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> deseja te contratar como
              colaborador. <NotificationHighlight>Clique aqui e verifique</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.DOCUMENT_REJECTED:
        return (
          <NotificationContainer
            url={`${links.web.personalDepartment}hire/${notificationItem.common.hiring_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> rejeito o documento "
              <NotificationHighlight>{notification.common.document}</NotificationHighlight>".{" "}
              <NotificationHighlight>Entre e cadastre novamente</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.FREE_NOTIFICATION:
        return (
          <NotificationContainer url={links.web.personalDepartment} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}: </NotificationHighlight> "
              {reduceString(notification.common.content, 120)}"
            </NotificationContentText>
          </NotificationContainer>
        );

      default:
        return <></>;
    }
  };

  return <React.Fragment>{renderActions()}</React.Fragment>;
};

export default PersonalDepartment;
