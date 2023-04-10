import plusBlueReq from "../../assets/plus-blue-req.svg";
import clockIcon from "../../assets/clock-blue.svg";
import listIcon from "../../assets/list-blue.svg";
import tagGray from "../../assets/tag-gray.svg";

import { createElement } from "../utils/create";
import { $ } from "../utils/query";
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

  const toggleTimeTracker = () => {
    timeTracker?.classList.toggle("open");
  };

  subscribePrimitive("isSidebarOpen", toggleTimeTracker);
};
