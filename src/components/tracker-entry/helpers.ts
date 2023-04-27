import tagGray from "@assets/tag-gray.svg";
import calendarGray from "@assets/calendar-gray.svg";
import playButton from "@assets/play.svg";
import menuDots from "@assets/menu-dots-vertical.svg";

import { createElement } from "@utils";

export const generateInput = (description: string) => {
  const div = createElement("div", { class: ["input-wrapper"] });

  const input = createElement("span", {
    // type: "text",
    class: ["tracker-entry__input"],
    contenteditable: true,
    placeholder: "Add Description",
  }) as HTMLInputElement;

  input.textContent = description;

  input.addEventListener("blur", () => {
    input.scrollLeft = 0;
  });

  div.appendChild(input);
  return input;
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
  } else {
    let tagText = tags.reduce((acc, curr) => {
      return acc + ", " + curr;
    });

    const tagBtn = createElement("button", { class: ["tracker-entry__tag-button--blue"] });
    tagBtn.textContent = tagText;
    return tagBtn;
  }
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
  return div;
};

export const generateDate = (startDate: string, endDate: string, date: string) => {
  const div = createElement("div", { class: ["date-time-wrapper"] });

  const startTime = createElement("input", {
    class: ["start-time", "date-time-picker"],
  });

  const endTime = createElement("input", { class: ["end-time", "date-time-picker"] });

  const hyphen = createElement("span", { class: ["time-divider"] }, "-");

  (startTime as HTMLInputElement).value = startDate ?? "01:20";
  (endTime as HTMLInputElement).value = endDate ?? "10:40";

  const tagImg = createElement("img", { src: calendarGray, alt: "" });
  const dateInput = createElement("input", {
    type: "date",
    class: ["native-date-picker"],
  }) as HTMLInputElement;
  dateInput.value = date;
  const tagBtn = createElement("button", { class: ["timetracker-recorder__date-button"] });
  tagBtn.append(tagImg, dateInput);

  div.append(startTime, hyphen, endTime, tagBtn);
  return div;
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
  const stopwatch = createElement("div", { class: ["tracker-entry__stopwatch"] }, `${hrs}:${mins}:${secs}`);
  return stopwatch;
};
