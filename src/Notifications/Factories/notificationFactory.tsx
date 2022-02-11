import React from "react";
import SocialNetworkNotificationFactory from "./SocialNetwork";
import FeedbackNotificationFactory from "./Feedback";
import ScheduleNotificationFactory from "./Schedule";
import EndomarketingNotificationFactory from "./Endomarketing";
import { ProjectsFactory } from "./Projects";
import { NotificationProps, moduleTypes } from "../../interfaces/Notification";

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

    default:
      break;
  }

  return <></>;
}

export default createNotificationFactory;
