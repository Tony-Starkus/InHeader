import { InHeader } from "./InHeader";
import createNotificationFactory from "./Notifications/Factories/notificationFactory";
import { NotificationProps as NotificationPropsInterface } from "./interfaces/Notification";
import NotificationProvider from "./Context/HeaderContext";
import TimeAgo from "javascript-time-ago";
import ptBR from "./utils/javascript-time-ago/locale/pt-BR.json";

TimeAgo.addDefaultLocale(ptBR);

export type NotificationProps = NotificationPropsInterface;
export { InHeader, NotificationProvider, createNotificationFactory };
