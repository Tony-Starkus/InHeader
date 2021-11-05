interface NotificationItem {
  module: string
  type: string
  common: any
}



const modules = {
  project: {
    name: "project",
    types: {
      activity: "activity"
    }
  },
  social_network: {
    name: "social_network",
    types: {
      publication: "publication"
    }
  }
}

const buildNotificationUrl = (notification: NotificationItem, production: boolean) => {

  const links = {
    web: {
      social: production ? "https://social.incicle.com/" : "https://social-network-frontend-stage.incicle.com/",
      schedule: production ? "https://schedule.incicle.com/" : "https://schedule-stage.incicle.com/",
      project: production ? "https://projects.incicle.com/" : "https://projects-stage.incicle.com/",
    }
  };

  if (notification.module === modules.project.name) { // PROJECT

    if (notification.type === modules.project.types.activity) {
      return `${links.web.project}`;
    }

  } else if (notification.module === modules.social_network.name) { // SOCIAL NETWORK

    if (notification.type === modules.social_network.types.publication) {
      return `${links.web.social}publication/${notification.common.publication_id}`;
    }

  }

  return '#';

}

export default buildNotificationUrl;
