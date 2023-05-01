import "./styles/index.css";
import "./styles/nav.css";
import "./styles/sidebar.css";
import "./styles/timetracker-recorder.css";
import "./styles/projectPicker.css";
import "./styles/tagPicker.css";
import "./styles/trackerEntry.css";
import "./styles/toast.css";
import "./styles/animation.css";

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

const app = document.getElementById("app")!;
const main = createElement("main", { class: ["main"] });
const toastContainer = createElement("div", { class: ["toast-container"] });

generateNavbar();
generateSidebar(sidebarLinkData).then(() => initializeSidebar());
generateTimeTrackerRecorder().then(() => initializeTimeTrackerRecorder());

app.append(main, toastContainer);

generateTrackerEntry();

const root = document.querySelector(":root") as HTMLElement;

subscribePrimitive("isSidebarOpen", () => {
  root.style.setProperty("--tracker-margin-left", Store.isSidebarOpen ? "22rem" : "9rem");
  root.style.setProperty("--input-width", Store.isSidebarOpen ? "35rem" : "45rem");
});
