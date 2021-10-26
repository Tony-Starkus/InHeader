import React from 'react';
import SocialNetworkNotificationFactory from "./SocialNetwork";
import { incicleModules } from "../../utils/types";

function createNotificationFactory(item: any, api: any, profile: any, production: boolean) {
  switch (item.module) {
    case incicleModules.social_network:
      return <SocialNetworkNotificationFactory api={api} profile={profile} production={production} notificationItem={item} />;

    default:
      break;
  }

  return <></>;
}

export default createNotificationFactory;
