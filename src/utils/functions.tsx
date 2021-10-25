
export const defineLinks = (production: boolean) => {
  if(production) {
    
    return {
      web: {
        social: "https://social-network-frontend.incicle.com/",
        schedule: "https://schedule.incicle.com/",
        project: "https://projects.incicle.com/",
      }
    }

  } else {

    return {
      web: {
        social: "https://social-network-frontend-stage.incicle.com/",
        schedule: "https://schedule-stage.incicle.com/",
        project: "https://projects-stage.incicle.com/",
      }
    }

  }
}
