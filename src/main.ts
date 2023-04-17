import "./styles/index.css";
import "./styles/nav.css";
import "./styles/sidebar.css";
import "./styles/timetracker-recorder.css";
import "./styles/projectPicker.css";
import "./styles/trackerEntry.css";

import {
  generateNavbar,
  generateSidebar,
  generateProjectPicker,
  generateTimeTrackerRecorder,
  generateTrackerEntry,
  initializeSidebar,
  initializeTimeTrackerRecorder,
  initializeProjectPicker,
  initializeProjectFilter,
  renderProjectList,
} from "@components";

import { sidebarLinkData } from "@utils";

import LogRocket from "logrocket";
LogRocket.init("kaaavr/clockify");

generateNavbar();

generateSidebar(sidebarLinkData).then(() => initializeSidebar());

generateTimeTrackerRecorder().then(() => initializeTimeTrackerRecorder());

generateProjectPicker()
  .then(() => initializeProjectPicker())
  .then(() => initializeProjectFilter())
  .then(() => renderProjectList());

generateTrackerEntry();
