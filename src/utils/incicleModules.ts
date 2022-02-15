import { moduleTypes } from "../interfaces/Notification";

const incicleModules = [
  {
    title: "Todos",
    slug: moduleTypes.all,
    icon: "https://static-incicle.s3.amazonaws.com/all.svg",
  },
  {
    title: "Agenda",
    slug: moduleTypes.schedule,
    icon: "https://static-incicle.s3.amazonaws.com/agenda.svg",
  },
  {
    title: "Avaliação por competência",
    slug: moduleTypes.evaluation360,
    icon: "https://static-incicle.s3.amazonaws.com/avaliacao-por-competencia.svg",
  },
  {
    title: "Departamento pessoal",
    slug: moduleTypes.personal_department,
    icon: "https://static-incicle.s3.amazonaws.com/departamento-pessoal.svg",
  },
  {
    title: "Endomarketing",
    slug: moduleTypes.endomarketing,
    icon: "https://static-incicle.s3.amazonaws.com/endo-marketing.svg",
  },
  {
    title: "Feedback",
    slug: moduleTypes.feedback,
    icon: "https://static-incicle.s3.amazonaws.com/feedback.svg",
  },
  {
    title: "Projetos",
    slug: moduleTypes.project,
    icon: "https://static-incicle.s3.amazonaws.com/projetos.svg",
  },
  {
    title: "Rede Social",
    slug: moduleTypes.social_network,
    icon: "https://static-incicle.s3.amazonaws.com/rede-social.svg",
  },
  {
    title: "Engenharia Organizacional",
    slug: moduleTypes.organizational_engineering,
    icon: "https://static-incicle.s3.amazonaws.com/engenharia-organizacional.svg",
  },
  // {
  //   title: "Pesquisa de clima",
  //   slug: moduleTypes.climate_research,
  //   icon: "https://static-incicle.s3.amazonaws.com/pesquisa-de-clima.svg",
  // },
  // {
  //   title: "Ouvidoria",
  //   slug: moduleTypes.ombudsman,
  //   icon: "https://static-incicle.s3.amazonaws.com/ouvidoria.svg",
  // },
];

export default incicleModules;
