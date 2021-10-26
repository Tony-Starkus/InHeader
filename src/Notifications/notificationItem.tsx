import React from "react";
import notificationFactory from "./Factories/notificationFactory";

interface props {
  item: any;
  api: any;
  profile: any;
  production: boolean;
}

const NotificationItem: React.FC<props> = ({ item, api, profile, production }) => {

  return notificationFactory(item, api, profile, production);

};

export default NotificationItem;
