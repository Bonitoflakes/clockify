import plusBlueReq from "@assets/plus-blue-req.svg";
import clockIcon from "@assets/clock-blue.svg";
import listIcon from "@assets/list-blue.svg";
import tagGray from "@assets/tag-gray.svg";

import { Store, subscribe, subscribePrimitive } from "@store";
import { createElement, $, clickOutsideToCloseElement, stopPropagation, stopSpacePropagation } from "@utils";

export const generateTimeTrackerRecorder = () => {
  const timerTracker = createElement("div", { class: ["timetracker-recorder", "open"] });

  const input = createElement("input", {
    type: "text",
    class: ["timetracker-recorder__input"],
    placeholder: "What are you working on?",
  });
  //
  //
  const plusImg = createElement("img", { src: plusBlueReq, alt: "" });
  const plusSpan = createElement("span", { class: ["newproject-button__img"] });
  plusSpan.appendChild(plusImg);
  //
  //
  const projectBtn = createElement("button", { class: ["timetracker-recorder__newproject-button"] });

  const projectBtnText = createElement("span", { class: ["newproject-button-text"] }, "Projects");
  projectBtn.insertBefore(plusSpan, projectBtn.firstChild);
  projectBtn.insertBefore(projectBtnText, projectBtn.nextSibling);
  //
  //
  const line1 = createElement("div", { class: ["line"] });
  const line2 = createElement("div", { class: ["line"] });
  const line3 = createElement("div", { class: ["line"] });
  //
  //
  const tagImg = createElement("img", { src: tagGray, alt: "" });
  const tagBtn = createElement("button", { class: ["timetracker-recorder__tags-button"] });
  tagBtn.appendChild(tagImg);
  //
  //
  const billableLabel = createElement(
    "label",
    { for: "billable", class: ["timetracker-recorder__price-label"] },
    "$"
  );
  const billableBtn = createElement("input", {
    class: ["timetracker-recorder__price-button"],
    id: "billable",
    type: "checkbox",
  });
  // billableBtn.appendChild(billableSpan);
  //
  //
  const stopwatch = createElement("div", { class: ["timetracker-recorder__timer"] }, "00:00:00");

  const startBtn = createElement("button", { class: ["timetracker-recorder__start-button"] }, "start");
  //
  //
  const clockImg = createElement("img", { src: clockIcon, alt: "" });
  const clockLink = createElement("a", { href: "" });
  //
  //
  const listImg = createElement("img", { src: listIcon, alt: "", class: ["active-mode"] });
  const listLink = createElement("a", { href: "", class: ["active-mode"] });
  //
  //
  const toggleMode = createElement("div", { class: ["timetracker-recorder__togglemode"] });

  clockLink.appendChild(clockImg);
  listLink.appendChild(listImg);
  toggleMode.append(clockLink, listLink);

  timerTracker.append(
    input,
    projectBtn,
    line1,
    tagBtn,
    line2,
    billableBtn,
    billableLabel,
    line3,
    stopwatch,
    startBtn,
    toggleMode
  );

  document.getElementById("app")!.append(timerTracker);
  return Promise.resolve();
};

let timerID: NodeJS.Timeout;

export const initializeTimeTrackerRecorder = () => {
  const startButton = $("timetracker-recorder__start-button");
  const projectButton = $("timetracker-recorder__newproject-button");
  const timeTracker = $("timetracker-recorder");

  const toggleTimeTracker = () => {
    timeTracker?.classList.toggle("open");
  };

  const closePicker = (e: MouseEvent) => {
    const picker = $("picker");
    clickOutsideToCloseElement(e, picker, projectButton, closePicker);
  };

  // SUBSCRIPTIONS
  subscribe(Store.timer, updateStopwatchUI);
  subscribePrimitive("timer", updateStopwatchUI);
  subscribePrimitive("isSidebarOpen", toggleTimeTracker);

  // EVENT LISTENERS
  startButton.addEventListener("click", () => {
    const start = performance.now();
    Store.isTimerStarted = !Store.isTimerStarted;

    if (Store.isTimerStarted) {
      calculateTime(start);
      startButton.textContent = "STOP";
      startButton.style.background = "red";
    } else {
      clearTimeout(timerID);
      save();
      startButton.textContent = "START";
      startButton.style.background = "var(--primary-color)";
    }
  });

  projectButton.addEventListener("click", () => {
    const picker = $("picker");

    picker.addEventListener("click", stopPropagation);
    picker.addEventListener("keyup", stopSpacePropagation);

    picker.classList.toggle("active");
    picker.style.height = "auto";

    // close on click outside the picker
    document.addEventListener("click", closePicker);
  });
};

const save = () => {
  const workData = $("timetracker-recorder__input") as HTMLInputElement;
  const billable = $("timetracker-recorder__price-button") as HTMLInputElement;
  const projectName = $("newproject-button-text") as HTMLElement;

  // if (Store.activeProject === "") return "project name is empty";

  Store.entries.push({
    description: workData.value,
    actualEffort: Array.from(Store.timer),
    billable: billable.checked,
    projectName: Store.activeProject,
    tags: ["1", "2"],
  });

  workData.value = "";
  billable.checked = false;
  for (const key of Store.timer.keys()) {
    Store.timer[key] = 0;
  }
  projectName.textContent = "Projects";

  console.log(Store);
};

const incrementTimer = () => {
  Store.timer[2]++;

  if (Store.timer[2] >= 60) {
    Store.timer[1]++;
    Store.timer[2] = 0;
  }

  if (Store.timer[1] >= 60) {
    Store.timer[0]++;
    Store.timer[1] = 0;
  }
};

const calculateTime = (start: number) => {
  const BASE_INTERVAL = 1000;

  const current = performance.now();
  const elapsed = current - start;
  const drift = elapsed % BASE_INTERVAL;
  const nextTick = BASE_INTERVAL - drift;

  // console.log("drift", drift);
  // console.log("nextTick", nextTick);

  incrementTimer();

  timerID = setTimeout(() => calculateTime(start), nextTick);
};

const updateStopwatchUI = () => {
  const timerUI = $("timetracker-recorder__timer");

  const hrs = Store.timer[0].toString().padStart(2, "0");
  const mins = Store.timer[1].toString().padStart(2, "0");
  const secs = Store.timer[2].toString().padStart(2, "0");

  timerUI.textContent = `${hrs}:${mins}:${secs}`;
  document.title = `${hrs}:${mins}:${secs} - Clockify`;
};
