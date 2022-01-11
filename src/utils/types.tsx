export const incicleModules = {
  social_network: "social_network",
  schedule: "schedule",
  feedback: "feedback",
  project: "project",
  endomarketing: "endomarketing"
};

export interface SearchPersons {
  profile_id: string;
  name: string;
  avatar: string;
  type: "PERSON" | "COMPANY";
  username: string;
}
