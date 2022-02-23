import React, { useEffect, useState } from "react";
import { defineLinks } from "../../utils/functions";
import { NotificationContainer, NotificationContentText, NotificationHighlight } from "./NotificationAbstract";
import { useHeaderProvider } from "../../hooks/useHeaderProvider";
import { NotificationProps } from "../../interfaces/Notification";

interface IProps {
  notificationItem: NotificationProps;
}

const notificationType = {
  EMPLOYEE_LINK_REQUEST: "EMPLOYEE_LINK_REQUEST",
  EMPLOYEE_LINK_ANSWER: "EMPLOYEE_LINK_ANSWER",
  EMPLOYEE_UNLINK: "EMPLOYEE_UNLINK",
};

const OrganizationalEngineeringFactory: React.FC<IProps> = ({ notificationItem }) => {
  const { production } = useHeaderProvider();
  const links = defineLinks(production);
  // @ts-ignore
  const [notification, setNotification] = useState(notificationItem);

  useEffect(() => {
    renderActions();
  }, [notification]);

  function invitationStatus(slug: "accepted" | "refused" | "pending") {
    if (slug === "accepted") {
      return <small style={{ marginTop: 0, display: "block" }}>Você aceitou a vinculação</small>;
    } else if (slug === "refused") {
      return <small style={{ marginTop: 0, display: "block" }}>Você recusou a vinculação</small>;
    } else if (slug === "pending") {
      return <NotificationHighlight sx={{ display: "block" }}>Clique para aceitar</NotificationHighlight>;
    } else {
      return <></>;
    }
  }

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.EMPLOYEE_LINK_REQUEST:
        return (
          <NotificationContainer
            url={`${links.web.core}accept-vinculation/${notification.common.linking_code}?email=${notification.recipient_email}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> convidou você para vincular-se
              como colaborador.
              {invitationStatus(notification.common.status)}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EMPLOYEE_LINK_ANSWER:
        return (
          <NotificationContainer url={`${links.web.social}employees`} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight>{" "}
              {notification.common.accepted ? "aceitou" : "recusou"} o convite de vinculação
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EMPLOYEE_UNLINK:
        return (
          <NotificationContainer url="#" notification={notificationItem}>
            <NotificationContentText notification={notification}>
              Você foi desvinculado da empresa <NotificationHighlight>{notification.sender.name}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      default:
        return <></>;
    }
  };

  return <React.Fragment>{renderActions()}</React.Fragment>;
};

export default OrganizationalEngineeringFactory;
