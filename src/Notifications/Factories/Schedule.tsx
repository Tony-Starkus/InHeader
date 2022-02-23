import React, { useEffect, useState } from "react";
import { defineLinks } from "../../utils/functions";
import { NotificationContainer, NotificationContentText, NotificationHighlight } from "./NotificationAbstract";
import { useHeaderProvider } from "../../hooks/useHeaderProvider";
import { NotificationProps } from "../../interfaces/Notification";
import moment from "moment";

interface IProps {
  notificationItem: NotificationProps;
}

const notificationType = {
  NEW_EVENT_SCHEDULE_INVITATION: "NEW_EVENT_SCHEDULE_INVITATION",
  NEW_TASK_INVITATION: "NEW_TASK_INVITATION",
  EVENT_INVITATION_ANSWER: "EVENT_INVITATION_ANSWER",
  EVENT_QUIT: "EVENT_QUIT",
  EVENT_CANCELLED: "EVENT_CANCELLED",
  EVENT_UPDATE: "EVENT_UPDATE",
  TASK_STATUS_UPDATE: "TASK_STATUS_UPDATE",
  UPCOMING_EVENT: "UPCOMING_EVENT",
  ADDED_SCHEDULE: "ADDED_SCHEDULE",
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
    // Used on type: EVENT_UPDATE
    function returnEventUpdate(type: "date" | "local" | "hour" | "other") {
      if (type === "date") {
        return (
          <>
            a data do evento <NotificationHighlight>"{notification.common.event_name}"</NotificationHighlight> de{" "}
            <NotificationHighlight>{moment(notification.common.from).format("DD/MM/YYYY")}</NotificationHighlight> para{" "}
            <NotificationHighlight>{moment(notification.common.to).format("DD/MM/YYYY")}</NotificationHighlight>.
          </>
        );
      } else if (type === "local") {
        return (
          <>
            o local do evento <NotificationHighlight>"{notification.common.event_name}"</NotificationHighlight> de{" "}
            <NotificationHighlight>{notification.common.from}</NotificationHighlight> para{" "}
            <NotificationHighlight>{notification.common.to}</NotificationHighlight>.
          </>
        );
      } else if (type === "hour") {
        return (
          <>
            o horário do evento <NotificationHighlight>"{notification.common.event_name}"</NotificationHighlight> de{" "}
            <NotificationHighlight>{moment(notification.common.from).format("DD/MM/YYYY")}</NotificationHighlight> às{" "}
            <NotificationHighlight>{moment(notification.common.from).format("HH:mm")}</NotificationHighlight> para as{" "}
            <NotificationHighlight>{moment(notification.common.to).format("HH:mm")}</NotificationHighlight>.
          </>
        );
      } else if (type === "other") {
        return (
          <>
            o evento <NotificationHighlight>"{notification.common.event_name}"</NotificationHighlight>
          </>
        );
      } else {
        return <></>;
      }
    }

    function returnTaskUpdate(status: string) {
      // Used on type: TASK_STATUS_UPDATE
      if (status === "em andamento") {
        return (
          <>
            <NotificationHighlight sx={{ color: "#00A424" }}>{status}</NotificationHighlight>
          </>
        );
      } else if (status === "feito") {
        return (
          <>
            <NotificationHighlight sx={{ color: "#F3B516" }}>{status}</NotificationHighlight>
          </>
        );
      } else {
        return <></>;
      }
    }

    switch (notificationItem.type) {
      case notificationType.NEW_EVENT_SCHEDULE_INVITATION:
        return (
          <NotificationContainer
            url={`${links.web.schedule}event/${notificationItem.common.event_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> convidou você para{" "}
              <NotificationHighlight>{notification.common.event_name}</NotificationHighlight> que acontecerá no dia{" "}
              <NotificationHighlight>{moment(notification.common.date).format("DD/MM/YYYY")}</NotificationHighlight>
              {!notification.common.whole_day && (
                <>
                  , às <NotificationHighlight>{moment(notification.common.date).format("HH:mm")}</NotificationHighlight>
                </>
              )}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.NEW_TASK_INVITATION:
        return (
          <NotificationContainer
            url={`${links.web.schedule}task/${notificationItem.common.task_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight sx={{ textTransform: "capitalize" }}>
                {notification.sender.name}
              </NotificationHighlight>{" "}
              delegou a task <NotificationHighlight>"{notification.common.task_title}"</NotificationHighlight> para
              você.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVENT_INVITATION_ANSWER:
        return (
          <NotificationContainer
            url={`${links.web.schedule}event/${notification.common.event_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight>{" "}
              <NotificationHighlight sx={{ color: notification.common.accepted === true ? "#00A424" : "#F61313" }}>
                {notification.common.accepted === true ? "aceitou" : "recusou"}
              </NotificationHighlight>{" "}
              seu convite para o evento <NotificationHighlight>{notification.common.event_name}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVENT_QUIT:
        return (
          <NotificationContainer
            url={`${links.web.schedule}event/${notification.common.event_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> saiu do evento{" "}
              <NotificationHighlight>{notification.common.event_name}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVENT_CANCELLED:
        return (
          <NotificationContainer url={`${links.web.schedule}`} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> cancelou o evento{" "}
              <NotificationHighlight>{notification.common.event_name}</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVENT_UPDATE:
        return (
          <NotificationContainer
            url={`${links.web.schedule}event/${notification.common.event_id}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> alterou{" "}
              {returnEventUpdate(notification.common.data_updated)}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.UPCOMING_EVENT:
        return (
          <NotificationContainer
            url={`${links.web.schedule}event/${notification.common.event_id}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              O evento <NotificationHighlight>"{notification.common.event_name}"</NotificationHighlight> está próximo de
              acontecer, fique atento a data{" "}
              <NotificationHighlight>{moment(notification.common.date).format("DD/MM/YYYY")}</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.TASK_STATUS_UPDATE:
        return (
          <NotificationContainer
            url={`${links.web.schedule}task/${notification.common.task_id}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> alterou o status da Task para{" "}
              <NotificationHighlight>{returnTaskUpdate(notification.common.task_status)}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.ADDED_SCHEDULE:
        return (
          <NotificationContainer
            url={`${links.web.schedule}task/${notification.common.task_id}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> te adicionou na agenda{" "}
              <NotificationHighlight>"{notification.common.schedule_name}"</NotificationHighlight>
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
