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
  generateTimeTrackerRecorder,
  generateTrackerEntry,
  initializeSidebar,
  initializeTimeTrackerRecorder,
} from "@components";

import { createElement, sidebarLinkData } from "@utils";

import { Store, subscribePrimitive } from "@store";

generateNavbar();
generateSidebar(sidebarLinkData).then(() => initializeSidebar());
generateTimeTrackerRecorder().then(() => initializeTimeTrackerRecorder());

document.getElementById("app")!.append(createElement("main", { class: ["main"] }));

generateTrackerEntry();

const root = document.querySelector(":root") as HTMLElement;

subscribePrimitive("isSidebarOpen", () => {
  root.style.setProperty("--tracker-margin-left", Store.isSidebarOpen ? "22rem" : "9rem");
  root.style.setProperty("--input-width", Store.isSidebarOpen ? "35rem" : "45rem");
});
