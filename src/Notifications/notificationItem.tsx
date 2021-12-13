import React from "react";
import notificationFactory from "./Factories/notificationFactory";

interface props {
  item: any;
  api: any;
  profile: any;
  production: boolean;
  getS3Object: (path: string) => Promise<string>
}

const NotificationItem: React.FC<props> = ({ item, api, profile, production, getS3Object }) => {

  return notificationFactory(item, api, profile, production, getS3Object);

};

export default NotificationItem;
