export const incicleModules = {
  social_network: "social_network",
  schedule: "schedule",
  feedback: "feedback",
};

export interface SearchPersons {
  profile_id: string;
  name: string;
  avatar: string;
  type: "PERSON" | "COMPANY";
  username: string;
}
