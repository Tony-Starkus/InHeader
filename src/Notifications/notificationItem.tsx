import React from "react";
import notificationFactory from "./Factories/notificationFactory";
import { NotificationProps } from "../interfaces/Notification";

interface props {
  item: NotificationProps;
}

const NotificationItem: React.FC<props> = ({ item }) => {
  return notificationFactory(item);
};

export default NotificationItem;
