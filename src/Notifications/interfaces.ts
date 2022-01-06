export enum moduleTypes {
  "projects",
  "schedule",
  "social_network",
  "feedback",
}

export interface NotificationCommon {
  title_activity: string;
}

export interface NotificationSender {
  avatar_url: string;
  id: string;
  name: string;
  username: string;
  type: "person" | "company";
}

export interface NotificationProps {
  _id: string;
  common: any;
  module: moduleTypes;
  type: string;
  read: boolean;
  recipient_id: string;
  sender: NotificationSender;
  createdAt: string;
  updatedAt: string;
}
