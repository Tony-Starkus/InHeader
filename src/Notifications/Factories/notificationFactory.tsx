import React from "react";
import SocialNetworkNotificationFactory from "./SocialNetwork";
import FeedbackNotificationFactory from "./Feedback";
import ScheduleNotificationFactory from "./Schedule";
import { incicleModules } from "../../utils/types";

function createNotificationFactory(item: any) {
  switch (item.module) {
    case incicleModules.social_network:
      return <SocialNetworkNotificationFactory notificationItem={item} />;

    case incicleModules.feedback:
      return <FeedbackNotificationFactory notificationItem={item} />;

    case incicleModules.schedule:
      return <ScheduleNotificationFactory notificationItem={item} />;

    default:
      break;
  }

  return <></>;
}

export default createNotificationFactory;
