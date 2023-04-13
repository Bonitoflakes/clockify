import "./styles/index.css";
import "./styles/nav.css";
import "./styles/sidebar.css";
import "./styles/timetracker-recorder.css";
import "./styles/projectPicker.css";

import {
  generateNavbar,
  generateSidebar,
  generatePicker,
  generateTimer,
  initializeSidebar,
  initializeTimer,
} from "@components";

import { sidebarLinkData } from "@utils";

import LogRocket from "logrocket";
LogRocket.init("kaaavr/clockify");

generateNavbar();
generateSidebar(sidebarLinkData).then(() => initializeSidebar());
generateTimer().then(() => initializeTimer());
generatePicker();
