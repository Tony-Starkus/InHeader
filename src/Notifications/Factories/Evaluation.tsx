import React, { useEffect, useState } from "react";
import moment from "moment";
import { defineLinks } from "../../utils/functions";
import { NotificationContainer, NotificationContentText, NotificationHighlight } from "./NotificationAbstract";
import { useHeaderProvider } from "../../hooks/useHeaderProvider";
import { NotificationProps } from "../../interfaces/Notification";

interface IProps {
  notificationItem: NotificationProps;
}

const notificationType = {
  LINK_TO_RESEARCH: "LINK_TO_RESEARCH",
  LINK_TO_OWN_RESEARCH: "LINK_TO_OWN_RESEARCH",
  SEARCH_EXPIRATION_OWN_EVALUATION: "SEARCH_EXPIRATION_OWN_EVALUATION",
  SEARCH_EXPIRATION_OTHER_EVALUATION: "SEARCH_EXPIRATION_OTHER_EVALUATION",
  PENDING_RESEARCH: "PENDING_RESEARCH",
  USER_PENDING_RESEARCH: "USER_PENDING_RESEARCH",
  USER_PDI: "USER_PDI",
  EVALUATOR_OF_ONE_PARTICIPANT: "EVALUATOR_OF_ONE_PARTICIPANT",
  EVALUATOR_OF_SURVEY_BY_COMPANY: "EVALUATOR_OF_SURVEY_BY_COMPANY",
  EVALUATOR_OF_SURVEY_BY_PERSON: "EVALUATOR_OF_SURVEY_BY_PERSON",
  END_RESEARCH: "END_RESEARCH",
  RESEARCH_WITHOUT_MIN: "RESEARCH_WITHOUT_MIN",
  PARTICIPANT_SELF_ANSWER_PENDING: "PARTICIPANT_SELF_ANSWER_PENDING",
};

// @ts-ignore
const EvaluationFactory: React.FC<IProps> = ({ notificationItem }) => {
  const { production } = useHeaderProvider();
  const links = defineLinks(production);
  // @ts-ignore
  const [notification, setNotification] = useState(notificationItem);

  useEffect(() => {
    renderActions();
  }, [notification]);

  function formatDateNotification(date: string) {
    const data = date?.split("/");

    return `${data[2]}-${data[1]}-${data[0]}`;
  }

  const renderActions = () => {
    switch (notificationItem.type) {
      case notificationType.LINK_TO_RESEARCH:
        return (
          <NotificationContainer url={links.web.evaluation} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              Você foi convidado para a pesquisa{" "}
              <NotificationHighlight>{notification.common.name_research}</NotificationHighlight>, responda sua auto
              avaliação e gerencie seus avaliadores até{" "}
              <NotificationHighlight>{notification.common.max_date}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.LINK_TO_OWN_RESEARCH:
        return (
          <NotificationContainer
            url={`${links.web.evaluation}questionary360/${notification.common.research_id}/${notification.common.company_id}/auto`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              Você foi convidado para a pesquisa{" "}
              <NotificationHighlight>{notification.common.name_research}</NotificationHighlight>, responda sua auto
              avaliação até <NotificationHighlight>{notification.common.max_date}</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.SEARCH_EXPIRATION_OWN_EVALUATION:
        const dateNotificationMaxDate =
          moment(formatDateNotification(notification?.common?.max_date)).diff(moment(), "day") + 1;
        return (
          <NotificationContainer
            url={`${links.web.evaluation}questionary360/${notification.common.research_id}/${notification.common.company_id}/auto`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              A empresa <NotificationHighlight>"{notification.sender.name}"</NotificationHighlight> aguarda sua
              auto-avaliação da pesquisa{" "}
              <NotificationHighlight>"{notification.common.name_research}"</NotificationHighlight> que vencerá em{" "}
              {dateNotificationMaxDate > 1 ? `${dateNotificationMaxDate} dias` : `${dateNotificationMaxDate} dia`}
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.SEARCH_EXPIRATION_OTHER_EVALUATION:
        return (
          <NotificationContainer url={`${links.web.evaluation}`} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              Você ainda não respondeu a pesquisa{" "}
              <NotificationHighlight>"{notification.common.name_research}"</NotificationHighlight> sobre{" "}
              <NotificationHighlight>"{notification.common.name_evaluated}"</NotificationHighlight> que vence amanhã.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PENDING_RESEARCH:
        return (
          <NotificationContainer url={`${links.web.evaluation}`} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name.split(" ")[0]}: </NotificationHighlight>"
              {notification.common.content}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.USER_PENDING_RESEARCH:
        return (
          <NotificationContainer url={`${links.web.evaluation}`} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name.split(" ")[0]}: </NotificationHighlight>"
              {notification.common.content}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.USER_PDI:
        return (
          <NotificationContainer
            url={
              notification.common.project_id
                ? `${links.web.project}kanban/${notification.common.project_id}`
                : `${links.web.evaluation}`
            }
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name.split(" ")[0]}: </NotificationHighlight>"
              {notification.common.content}"
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVALUATOR_OF_ONE_PARTICIPANT:
        return (
          <NotificationContainer
            url={`${links.web.evaluation}questionary360/${notification.common.research_id}/${notification.common.company_id}/${notification.common.evaluated_id}`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              Você foi adicionado como avaliador de{" "}
              <NotificationHighlight>"{notification.common.name_evaluated}"</NotificationHighlight> na pesquisa{" "}
              <NotificationHighlight>"{notification.common.name_research}"</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVALUATOR_OF_SURVEY_BY_COMPANY:
        return (
          <NotificationContainer url={`${links.web.evaluation}`} notification={notification}>
            <NotificationContentText notification={notification}>
              Você foi adicionado como avaliador na pesquisa{" "}
              <NotificationHighlight>"{notification.common.name_research}"</NotificationHighlight>. Clique para
              responder
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.EVALUATOR_OF_SURVEY_BY_PERSON:
        return (
          <NotificationContainer
            url={`${links.web.evaluation}/questionary360/${notification.common.research_id}/${notification.common.company_id}/${notification.common.evaluated_id}`}
            notification={notification}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name}</NotificationHighlight> adicionou você como avaliador na
              pesquisa <NotificationHighlight>"{notification.common.name_research}"</NotificationHighlight>.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.END_RESEARCH:
        return (
          <NotificationContainer url={links.web.evaluation} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              Pesquisa <NotificationHighlight>"{notification.common.name_research}"</NotificationHighlight> concluída,
              entre e verifique seu resultado.
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.RESEARCH_WITHOUT_MIN:
        return (
          <NotificationContainer url={links.web.evaluation} notification={notificationItem}>
            <NotificationContentText notification={notification}>
              Você ainda não alcançou o mínimo de avaliações na pesquisa{" "}
              <NotificationHighlight>"{notification.common.name_research}"</NotificationHighlight>
            </NotificationContentText>
          </NotificationContainer>
        );

      case notificationType.PARTICIPANT_SELF_ANSWER_PENDING:
        return (
          <NotificationContainer
            url={`${links.web.evaluation}questionary360/${notification.common.research_id}/${notification.common.company_id}/auto`}
            notification={notificationItem}
          >
            <NotificationContentText notification={notification}>
              <NotificationHighlight>{notification.sender.name.split(" ")[0]}: </NotificationHighlight>"Responda sua
              autoavaliação. Esse exercício é essencial para seu crescimento."
            </NotificationContentText>
          </NotificationContainer>
        );

      default:
        return <></>;
    }
  };

  return <React.Fragment>{renderActions()}</React.Fragment>;
};

export default EvaluationFactory;
