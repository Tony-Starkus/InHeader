export enum moduleTypes {
  all = "",
  evaluation360 = "360",
  personal_department = "personal_department",
  project = "project",
  schedule = "schedule",
  social_network = "social_network",
  feedback = "feedback",
  endomarketing = "endomarketing",
  organizational_engineering = "organizational_engineering",
  climate_research = "climate_research",
  ombudsman = "ombudsman",
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
  read: boolean;
  recipient_email?: string;
  recipient_id: string;
  saw: boolean;
  sender: NotificationSender;
  type: string;
  createdAt: string;
  updatedAt: string;
}
