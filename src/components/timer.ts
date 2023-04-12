import plusBlueReq from "../../assets/plus-blue-req.svg";
import clockIcon from "../../assets/clock-blue.svg";
import listIcon from "../../assets/list-blue.svg";
import tagGray from "../../assets/tag-gray.svg";

import { createElement } from "../utils/create";
import { $, $$ } from "../utils/query";
import { subscribePrimitive } from "../../R&D/proxy2";

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

export const initializeTimer = () => {
  const timeTracker = $("timetracker-recorder");
  const startButton = $("timetracker-recorder__start-button");
  const priceButton = $("timetracker-recorder__price-button");
  const timerUI = $("timetracker-recorder__timer");

  const toggleTimeTracker = () => {
    timeTracker?.classList.toggle("open");
  };
  subscribePrimitive("isSidebarOpen", toggleTimeTracker);

  const timer = [0, 0, 0];
  let hrs;
  let mins;
  let secs;
  let isStarted = false;
  let timerID: any;

  const incrementTimer = () => {
    timer[2]++;
    if (timer[2] > 60) {
      timer[1]++;
      timer[2] = 0;
    }
    if (timer[1] > 60) {
      timer[0]++;
      timer[1] = 0;
    }

    timer[0].toString().length === 1 ? (hrs = `0${timer[0]}`) : (hrs = timer[0]);
    timer[1].toString().length === 1 ? (mins = `0${timer[1]}`) : (mins = timer[1]);
    timer[2].toString().length === 1 ? (secs = `0${timer[2]}`) : (secs = timer[2]);

    timerUI.innerText = `${hrs}:${mins}:${secs}`;

    return incrementTimer;
  };

  startButton.addEventListener("click", () => {
    isStarted ? clearInterval(timerID) : (timerID = setInterval(incrementTimer(), 1000));
    isStarted = !isStarted;
    isStarted ? (startButton.innerText = "STOP") : (startButton.innerText = "START");
    isStarted
      ? (startButton.style.background = "red")
      : (startButton.style.background = "var(--primary-color)");
  });

  priceButton.addEventListener("click", () => priceButton.classList.toggle("active"));
};
