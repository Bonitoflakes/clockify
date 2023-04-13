import "./styles/index.css";
import "./styles/nav.css";
import "./styles/sidebar.css";
import "./styles/timetracker-recorder.css";

import {
  generateNavbar,
  generateSidebar,
  generateTimer,
  initializeSidebar,
  initializeTimer,
} from "./components";

import { sidebarLinkData } from "./utils/fakeSidebar";

import LogRocket from "logrocket";

 LogRocket.init("kaaavr/clockify");

generateNavbar();
generateSidebar(sidebarLinkData).then(() => initializeSidebar());
generateTimer();
initializeTimer();
