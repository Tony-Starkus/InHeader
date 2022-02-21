import React from "react";
import SocialNetworkNotificationFactory from "./SocialNetwork";
import FeedbackNotificationFactory from "./Feedback";
import ScheduleNotificationFactory from "./Schedule";
import EndomarketingNotificationFactory from "./Endomarketing";
import { ProjectsFactory } from "./Projects";
import { NotificationProps, moduleTypes } from "../../interfaces/Notification";
import EvaluationFactory from "./Evaluation";
import OrganizationalEngineeringFactory from "./OrganizationalEngineering";
import PersonalDepartmentFactory from "./PersonalDepartment";

function createNotificationFactory(item: NotificationProps) {
  switch (item.module) {
    case moduleTypes.social_network:
      return <SocialNetworkNotificationFactory notificationItem={item} />;

    case moduleTypes.feedback:
      return <FeedbackNotificationFactory notificationItem={item} />;

    case moduleTypes.schedule:
      return <ScheduleNotificationFactory notificationItem={item} />;

    case moduleTypes.project:
      return <ProjectsFactory notificationItem={item} />;

    case moduleTypes.endomarketing:
      return <EndomarketingNotificationFactory notificationItem={item} />;

    case moduleTypes.evaluation360:
      return <EvaluationFactory notificationItem={item} />;

    case moduleTypes.organizational_engineering:
      return <OrganizationalEngineeringFactory notificationItem={item} />;

    case moduleTypes.personal_department:
      return <PersonalDepartmentFactory notificationItem={item} />;

    default:
      break;
  }

  return <></>;
}

export default createNotificationFactory;
