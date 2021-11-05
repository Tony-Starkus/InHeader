
export const defineLinks = (production: boolean) => {
  if (production) {

    return {
      web: {
        social: "https://social.incicle.com/",
        schedule: "https://schedule.incicle.com/",
        project: "https://projects.incicle.com/",
      },
      api: {
        social: "https://socialnetwork-adonis.incicle.com/api/v1/",
        notifications: "https://notifications.incicle.com/api/v1/notifications/"
      }
    }

  } else {

    return {
      web: {
        social: "https://social-network-frontend-stage.incicle.com/",
        schedule: "https://schedule-stage.incicle.com/",
        project: "https://projects-stage.incicle.com/",
      },
      api: {
        social: "https://socialnetwork-adonis-stage.incicle.com/api/v1/",
        notifications: "https://notifications-stage.incicle.com/api/v1/notifications/"
      }
    }

  }
}
