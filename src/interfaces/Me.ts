import {
  ProjectViewType,
  RequestsSolicitation,
  ViewListFriends,
  ShowCalendar,
  ShowFriends,
  ShowLocation,
  ShowProjects,
} from "../utils/config";

export interface MeCompany {
  id: string;
  name: string;
  avatar: string;
  user_id: string;
  company_user: {
    id: string;
    username: string;
  };
  my_collaborator_id: {
    id: string;
  };
}

export interface ProfileConfig {
  created_at: string;
  default_timezone: string;
  id: string;
  people_share_my_publications: boolean;
  person_id: string;
  project_view: ProjectViewType;
  requests_solicitation: RequestsSolicitation;
  seo: boolean;
  show_calendar: ShowCalendar;
  show_friends: ShowFriends;
  show_location: ShowLocation;
  show_projects: ShowProjects;
  updated_at: string;
  view_list_friends: ViewListFriends;
}

export interface UserConfig {
  auth2f: boolean;
  default_interface: "LIGHT" | "DARK";
  default_language: string;
  id: string;
  user_id: string;
}

export interface MeProps {
  user_id: string;
  username: string;
  name: string;
  type: "COMPANY" | "PERSON";
  profile_id: string;
  avatar: string;
  companies: MeCompany[];
  profile_config: ProfileConfig;
  user_config: UserConfig;
}
