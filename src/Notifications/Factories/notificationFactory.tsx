import React from 'react';
import SocialNetworkNotificationFactory from "./SocialNetwork";
import FeedbackNotificationFactory from './Feedback';
import ScheduleNotificationFactory from './Schedule';
import { incicleModules } from "../../utils/types";

function createNotificationFactory(item: any, api: any, profile: any, production: boolean, getS3Object: (path: string) => Promise<string>) {
  switch (item.module) {
    case incicleModules.social_network:
      return <SocialNetworkNotificationFactory api={api} profile={profile} production={production} notificationItem={item} getS3Object={getS3Object} />;

    case incicleModules.feedback:
      return <FeedbackNotificationFactory api={api} production={production} notificationItem={item} getS3Object={getS3Object} />

    case incicleModules.schedule:
      return <ScheduleNotificationFactory api={api} production={production} notificationItem={item} getS3Object={getS3Object} />

    default:
      break;
  }

  return <></>;
}

export default createNotificationFactory;
