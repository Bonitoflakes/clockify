import dashboard from "../../assets/dashboard.svg";
import timesheet from "../../assets/timesheet.svg";
import timetracker from "../../assets/time-tracker.svg";
import projects from "../../assets/projects.svg";
import reports from "../../assets/reports.svg";
import calendar from "../../assets/calendar.svg";
import teams from "../../assets/teams.svg";
import clients from "../../assets/clients.svg";
import tags from "../../assets/tags.svg";
import settings from "../../assets/settings.svg";

export const sidebarLinkData: ISidebarLinks[] = [
  {
    name: "timesheet",
    img: timesheet,
  },
  {
    name: "time tracker",
    img: timetracker,
  },
  {
    name: "calendar",
    img: calendar,
  },
  {
    name: "dashboard",
    img: dashboard,
    title: "analyze",
  },
  {
    name: "reports",
    img: reports,
  },
  {
    name: "projects",
    img: projects,
    title: "manage",
  },
  {
    name: "team",
    img: teams,
  },
  {
    name: "clients",
    img: clients,
  },
  {
    name: "calendar",
    img: calendar,
  },
  {
    name: "tags",
    img: tags,
  },
  {
    name: "settings",
    img: settings,
  },
];
