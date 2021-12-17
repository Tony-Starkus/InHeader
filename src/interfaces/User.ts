export interface Config {
  auth2f: boolean;
  created_at: string;
  default_interface: string;
  default_language: string;
  default_profile_id: string;
  default_profile_type: string;
  id: string;
  layout_name?: string;
  people_share_my_stories: boolean;
  phone: string;
  requests_solicitation: string;
  seo: boolean;
  timezone?: string;
  updated_at: string;
  user_id: string;
  view_list_friends: string;
}

export interface Companies {
  id: string;
  name: string;
  nickname: string;
  user_company_id: string;
  user_of_company_id: string;
}

export interface User {
  config: {
    auth2f: boolean;
    default_interface: "LIGHT" | "DARK";
    default_language: string;
    layout_name: string;
  };
  profile_id: string;
  email: string;
  id: string;
  type: "COMPANY" | "PERSON";
  username: string;
}
