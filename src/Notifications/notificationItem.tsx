import React from "react";
import notificationFactory from "./Factories/notificationFactory";

interface props {
  item: any;
}

const NotificationItem: React.FC<props> = ({ item }) => {
  return notificationFactory(item);
};

export default NotificationItem;
