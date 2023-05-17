import clockIcon from "@assets/clock-blue.svg";
import listIcon from "@assets/list-blue.svg";
import tagGray from "@assets/tag-gray.svg";

import { createElement, createProjectPlusIcon, generateLine } from "@utils";

export const generateTimeTrackerRecorder = () => {
  const timerTracker = createElement("div", {
    class: ["timetracker-recorder", "timetracker-recorder--open"],
  });
  //
  //
  const input = createElement("input", {
    type: "text",
    class: ["timetracker-recorder__input"],
    placeholder: "What are you working on?",
  });
  //
  //
  const plusImg = createProjectPlusIcon();

  const plusSpan = createElement("span", { class: ["newproject-button__span"] });
  plusSpan.appendChild(plusImg);
  //
  //
  const projectBtn = createElement("button", { class: ["timetracker-recorder__newproject-button"] });

  const projectBtnText = createElement("span", { class: ["newproject-button-text"] }, "Project");
  projectBtn.insertBefore(plusSpan, projectBtn.firstChild);
  projectBtn.insertBefore(projectBtnText, projectBtn.nextSibling);
  //
  //
  const line1 = generateLine();
  const line2 = generateLine();
  const line3 = generateLine();
  //
  //
  const tagImg = createElement("img", { src: tagGray, alt: "Tag Button" });
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
  //
  const toggleMode = createElement("div", { class: ["timetracker-recorder__togglemode"] });
  toggleMode.append(generateToggleMode());

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

export const generateToggleMode = () => {
  const clockImg = createElement("img", { src: clockIcon, alt: "" });
  const clockLink = createElement("a", { href: "" });
  //
  //
  const listImg = createElement("img", { src: listIcon, alt: "", class: ["active-mode"] });
  const listLink = createElement("a", { href: "", class: ["active-mode"] });
  //
  //

  clockLink.appendChild(clockImg);
  listLink.appendChild(listImg);
  const div = createElement("div", {});
  div.append(clockLink, listLink);
  div.style.display = "flex";
  div.style.flexDirection = "column";
  div.style.gap = "1rem";

  return div;
};
