import tagGray from "@assets/tag-gray.svg";
import calendarGray from "@assets/calendar-gray.svg";
import playButton from "@assets/play.svg";
import menuDots from "@assets/menu-dots-vertical.svg";

import { createElement, generateLine } from "@utils";

export const generateInput = (description: string):[HTMLDivElement, HTMLInputElement] => {
  const div = createElement("div", { class: ["input-wrapper"] });

  const inputLabel = createElement("label", { class: ["tracker-entry__input-sizer"] });
  const input = createElement("input", {
    class: ["tracker-entry__input"],
    contenteditable: true,
    placeholder: "Add Description",
  });

  inputLabel.append(input);

  input.value = description;

  input.addEventListener("blur", () => {
    input.scrollLeft = 0;
  });

  div.appendChild(inputLabel);
  return [div, input];
};

export const generateProjectPicker = (projectName: string, id: number) => {
  const redCircle = createElement("div", { class: ["circle--red"] });

  const projectBtn = createElement("button", {
    class: ["tracker-entry__project-button"],
    id: id.toString(),
  });

  const projectBtnText = createElement(
    "span",
    { class: ["tracker-entry__project-button--text"] },
    `${projectName}`
  );

  projectBtn.append(redCircle, projectBtnText);
  return [projectBtn, projectBtnText];
};

export const generateTags = (tags: string[]) => {
  if (tags.length === 0) {
    const tagImg = createElement("img", { src: tagGray, alt: "" });
    const tagBtn = createElement("button", { class: ["timetracker-recorder__tags-button"] });
    tagBtn.appendChild(tagImg);
    return tagBtn;
  }
  const tagText = tags.reduce((acc, curr) => `${acc}, ${curr}`);

  const tagP = createElement("p", { class: ["tracker-entry__tag-p--blue"] });
  tagP.textContent = tagText;

  // FIX: Class Name
  const tagBtn = createElement("button", { class: ["timetracker-recorder__tags-button"] });
  tagBtn.append(tagP);
  return tagBtn;
};

export const generateBill = (id: number, billable: boolean) => {
  const div = createElement("div", { class: ["tracker-entry__price-wrapper"] });

  const billableLabel = createElement(
    "label",
    { for: `billable-${id}`, class: ["tracker-entry__price-label"] },
    "$"
  );

  const billableBtn = createElement("input", {
    class: ["tracker-entry__price-button"],
    id: `billable-${id}`,
    type: "checkbox",
  });

  if (billable) (billableBtn as HTMLInputElement).checked = true;

  div.append(billableBtn, billableLabel);
  return [div, billableBtn];
};

export const generateDate = (date: string, startDate: number, endDate: number) => {
  const div = createElement("div", { class: ["date-time-wrapper"] });

  const startTime = createElement("input", {
    class: ["start-time", "date-time-picker"],
  });

  const endTime = createElement("input", { class: ["end-time", "date-time-picker"] });

  const hyphen = createElement("span", { class: ["time-divider"] }, "-");

  (startTime as HTMLInputElement).value = new Date(startDate).toTimeString().slice(0, 5) ?? "Dev Messed up";
  (endTime as HTMLInputElement).value = new Date(endDate).toTimeString().slice(0, 5) ?? "Dev Messed up";

  const dateImg = createElement("img", { src: calendarGray, alt: "" });
  const dateInput = createElement("input", {
    type: "date",
    class: ["native-date-picker"],
  }) as HTMLInputElement;

  const formattedDate = new Date(date).toISOString().slice(0, 10); // YYYY-MM-DD

  dateInput.value = formattedDate;

  const dateButton = createElement("button", { class: ["timetracker-recorder__date-button"] });
  dateButton.append(dateImg, dateInput);

  const supWrapper = createElement("div", { class: ["sup-div"] });
  const sup = createElement("sup", { class: ["sup-div"] });
  supWrapper.append(sup);

  div.append(startTime, hyphen, endTime, supWrapper, dateButton);

  return [div, startTime, endTime, dateButton, dateInput, sup];
};

export const generatePlayButton = () => {
  const tagImg = createElement("img", { src: playButton, alt: "" });
  const tagBtn = createElement("button", { class: ["timetracker-recorder__tags-button"] });
  tagBtn.appendChild(tagImg);
  return tagBtn;
};

export const generateMenuDots = () => {
  const tagImg = createElement("img", { src: menuDots, alt: "" });
  const tagBtn = createElement("button", { class: ["timetracker-recorder__tags-button"] });
  tagBtn.appendChild(tagImg);
  return tagBtn;
};

export const generateStopwatch = (time: number[]) => {
  const hrs = time[0].toString().padStart(2, "0");
  const mins = time[1].toString().padStart(2, "0");
  const secs = time[2].toString().padStart(2, "0");
  const stopwatch = createElement("input", { class: ["tracker-entry__stopwatch"] });
  (stopwatch as HTMLInputElement).value = `${hrs}:${mins}:${secs}`;
  stopwatch.title = `${hrs}:${mins}:${secs}`;
  return stopwatch;
};

