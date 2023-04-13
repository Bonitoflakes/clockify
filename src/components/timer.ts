import plusBlueReq from "../../assets/plus-blue-req.svg";
import clockIcon from "../../assets/clock-blue.svg";
import listIcon from "../../assets/list-blue.svg";
import tagGray from "../../assets/tag-gray.svg";

import { createElement } from "../utils/create";
import { $ } from "../utils/query";

import { Store, subscribe } from "../globalStore";

export const generateTimer = () => {
  const timerTracker = createElement("div", { class: ["timetracker-recorder", "open"] });

  const input = createElement("input", {
    type: "text",
    class: ["timetracker-recorder__input"],
    placeholder: "What are you working on?",
  });
  //
  //
  //
  const plusImg = createElement("img", { src: plusBlueReq, alt: "" });
  const plusSpan = createElement("span", { class: ["newproject-button__img"] });
  plusSpan.appendChild(plusImg);
  //
  //
  //
  const projectBtn = createElement(
    "button",
    { class: ["timetracker-recorder__newproject-button"] },
    "Project"
  );
  projectBtn.insertBefore(plusSpan, projectBtn.firstChild);
  //
  //
  //
  const line1 = createElement("div", { class: ["line"] });
  const line2 = createElement("div", { class: ["line"] });
  //
  //
  //

  const tagImg = createElement("img", { src: tagGray, alt: "" });
  const tagBtn = createElement("button", { class: ["timetracker-recorder__tags-button"] });
  tagBtn.appendChild(tagImg);
  //
  //
  //
  const billableSpan = createElement("span", {}, " $ ");
  const billableBtn = createElement("button", { class: ["timetracker-recorder__price-button"] });
  billableBtn.appendChild(billableSpan);

  //
  //
  //

  const stopwatch = createElement("div", { class: ["timetracker-recorder__timer"] }, "00:00:00");

  const startBtn = createElement("button", { class: ["timetracker-recorder__start-button"] }, "start");

  //
  //
  //
  const clockImg = createElement("img", { src: clockIcon, alt: "" });
  const clockLink = createElement("a", { href: "" });

  const listImg = createElement("img", { src: listIcon, alt: "", class: ["active-mode"] });
  const listLink = createElement("a", { href: "", class: ["active-mode"] });

  const toggleMode = createElement("div", { class: ["timetracker-recorder__togglemode"] });

  clockLink.appendChild(clockImg);
  listLink.appendChild(listImg);
  toggleMode.append(clockLink, listLink);

  timerTracker.append(
    input,
    projectBtn,
    line1,
    tagBtn,
    line1,
    billableBtn,
    line1,
    stopwatch,
    startBtn,
    toggleMode
  );

  document.getElementById("app")!.append(timerTracker);
};

let timerID: NodeJS.Timeout;

export const initializeTimer = () => {
  const startButton = $("timetracker-recorder__start-button");
  const priceButton = $("timetracker-recorder__price-button");

  // SUBSCRIPTIONS
  subscribe(Store.timer, updateTimerUI);

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
      startButton.textContent = "START";
      startButton.style.background = "var(--primary-color)";
    }
  });

  priceButton.addEventListener("click", () => priceButton.classList.toggle("active"));
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

const updateTimerUI = () => {
  const timerUI = $("timetracker-recorder__timer");

  const hrs = Store.timer[0].toString().padStart(2, "0");
  const mins = Store.timer[1].toString().padStart(2, "0");
  const secs = Store.timer[2].toString().padStart(2, "0");

  timerUI.textContent = `${hrs}:${mins}:${secs}`;
  document.title = `${hrs}:${mins}:${secs} - Clockify`;
};
