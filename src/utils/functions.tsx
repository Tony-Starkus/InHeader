export const defineLinks = (production: boolean) => {
  if (production) {
    return {
      web: {
        social: "https://social.incicle.com/",
        schedule: "https://schedule.incicle.com/",
        project: "https://projects.incicle.com/",
        competency: "https://evaluation-frontend.incicle.com",
        evaluation: "https://evaluation-frontend.incicle.com/",
        core: "https://core-front.incicle.com/",
        personalDepartment: "https://dp.incicle.com/",
      },
      api: {
        social: "https://socialnetwork-adonis.incicle.com/api/v1/",
        notifications: "https://notifications.incicle.com/api/v1/notifications/",
      },
    };
  } else {
    return {
      web: {
        social: "https://social-network-frontend-stage.incicle.com/",
        schedule: "https://schedule-stage.incicle.com/",
        project: "https://projects-stage.incicle.com/",
        competency: "https://evaluation-frontend-stage.incicle.com",
        evaluation: "https://evaluation-frontend-stage.incicle.com/",
        core: "https://core-front-stage.incicle.com/",
        personalDepartment: "https://dp-stage.incicle.com/",
      },
      api: {
        social: "https://socialnetwork-adonis-stage.incicle.com/api/v1/",
        notifications: "https://notifications-stage.incicle.com/api/v1/notifications/",
      },
    };
  }
};
