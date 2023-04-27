import "./styles/index.css";
import "./styles/nav.css";
import "./styles/sidebar.css";
import "./styles/timetracker-recorder.css";
import "./styles/projectPicker.css";
import "./styles/tagPicker.css";
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
  renderProjectList,
  generateTagPicker,
  renderTagList,
  initTagFilter,
} from "@components";

import { createElement, sidebarLinkData } from "@utils";

import LogRocket from "logrocket";
import { Store, subscribePrimitive } from "@store";
LogRocket.init("kaaavr/clockify");

generateNavbar();

generateSidebar(sidebarLinkData).then(() => initializeSidebar());

generateTimeTrackerRecorder().then(() => initializeTimeTrackerRecorder());

// generateProjectPicker()
//   .then(() => initializeProjectPicker())
//   .then(() => renderProjectList());

generateTagPicker();
initTagFilter();
renderTagList();

document.getElementById("app")!.append(createElement("main", { class: ["main"] }));

generateTrackerEntry();

const root = document.querySelector(":root") as HTMLElement;

subscribePrimitive("isSidebarOpen", () => {
  root.style.setProperty("--tracker-margin-left", Store.isSidebarOpen ? "22rem" : "9rem");
  root.style.setProperty("--input-width", Store.isSidebarOpen ? "35rem" : "45rem");
});
