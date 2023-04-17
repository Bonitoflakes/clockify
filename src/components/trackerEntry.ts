import tagGray from "@assets/tag-gray.svg";
import calendarGray from "@assets/calendar-gray.svg";
import playButton from "@assets/play.svg";
import menuDots from "@assets/menu-dots-vertical.svg";

import { Store, subscribePrimitive } from "@store";
import { $, createElement } from "@utils";

const generateInput = (description: string) => {
  const div = createElement("div", { class: ["input-wrapper"] });
  const input = createElement("input", {
    type: "text",
    class: ["tracker-entry__input"],
    placeholder: "Add Description",
  }) as HTMLInputElement;

  input.value = description;
  // input.style.width = input.value.length - 5 + "ch";

  // input.addEventListener("input", () => {
  //   input.style.width = input.value.length + "ch";
  // });

  div.appendChild(input);
  return div;
};

const generateProjectPicker = (projectName: string) => {
  const redCircle = createElement("div", { class: ["circle--red"] });

  const projectBtn = createElement("button", { class: ["tracker-entry__project-button"] });

  const projectBtnText = createElement(
    "span",
    { class: ["tracker-entry__project-button--text"] },
    `${projectName}`
  );

  projectBtn.append(redCircle, projectBtnText);
  return projectBtn;
};

const generateTags = (tags: string[]) => {
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

const generateBill = (id: number, billable: boolean) => {
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

const generateDate = () => {
  const div = createElement("div", { class: ["date-time-wrapper"] });

  const startTime = createElement("input", {
    class: ["start-time", "date-time-picker"],
  });

  const endTime = createElement("input", { class: ["end-time", "date-time-picker"] });

  const hyphen = createElement("span", { class: ["time-divider"] }, "-");

  (startTime as HTMLInputElement).value = "01:20";
  (endTime as HTMLInputElement).value = "10:40";

  const tagImg = createElement("img", { src: calendarGray, alt: "" });
  const tagBtn = createElement("button", { class: ["timetracker-recorder__date-button"] });
  tagBtn.appendChild(tagImg);

  div.append(startTime, hyphen, endTime, tagBtn);
  return div;
};

const generatePlayButton = () => {
  const tagImg = createElement("img", { src: playButton, alt: "" });
  const tagBtn = createElement("button", { class: ["timetracker-recorder__tags-button"] });
  tagBtn.appendChild(tagImg);
  return tagBtn;
};

const generateMenuDots = () => {
  const tagImg = createElement("img", { src: menuDots, alt: "" });
  const tagBtn = createElement("button", { class: ["timetracker-recorder__tags-button"] });
  tagBtn.appendChild(tagImg);
  return tagBtn;
};

const generateStopwatch = (time: number[]) => {
  const hrs = time[0].toString().padStart(2, "0");
  const mins = time[1].toString().padStart(2, "0");
  const secs = time[2].toString().padStart(2, "0");
  const stopwatch = createElement("div", { class: ["tracker-entry__stopwatch"] }, `${hrs}:${mins}:${secs}`);
  return stopwatch;
};

export const generateTrackerEntry = () => {
  Store.entries.map(({ id, description, actualEffort, billable, projectName, tags }) => {
    const projectEntry = createElement("div", { class: ["tracker-entry", "open"] });

    const line1 = createElement("div", { class: ["line"] });
    const line2 = createElement("div", { class: ["line"] });
    const line3 = createElement("div", { class: ["line"] });
    const line4 = createElement("div", { class: ["line"] });
    const line5 = createElement("div", { class: ["line"] });

    console.log(projectName);

    const _input = generateInput(description);
    const _projects = generateProjectPicker(projectName);
    const _tags = generateTags(tags);
    const _bill = generateBill(id, billable);
    const _stopwatch = generateStopwatch(actualEffort);
    const _date = generateDate();
    const _play = generatePlayButton();
    const _menu = generateMenuDots();

    const div1 = createElement("div", { class: ["div1"] });
    const div2 = createElement("div", { class: ["div2"] });
    div1.append(_input, _projects);
    div2.append(_tags, line1, _bill, line2, _date, line3, _stopwatch, line4, _play, line5, _menu);

    projectEntry.append(div1, div2);
    document.getElementById("app")!.append(projectEntry);

    const startTime = $("start-time") as HTMLInputElement;
    const endTime = $("end-time") as HTMLInputElement;

    startTime.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        let hrs = Number(startTime.value.split(":").join("").slice(0, 2));
        let mins = Number(startTime.value.split(":").join("").slice(-2));

        mins++;

        if (mins >= 60) {
          hrs++;
          mins = 0;
        }

        if (hrs >= 24) {
          hrs = 0;
        }

        const hrs_string = hrs.toString().padStart(2, "0");
        const mins_string = mins.toString().padStart(2, "0");

        startTime.value = `${hrs_string}:${mins_string}`;
      }

      if (e.key === "ArrowDown") {
        let hrs = Number(startTime.value.split(":").join("").slice(0, 2));
        let mins = Number(startTime.value.split(":").join("").slice(-2));

        mins--;

        if (mins <= 0) {
          hrs--;
          mins = 59;
        }

        if (hrs <= 0) {
          hrs = 23;
        }

        const hrs_string = hrs.toString().padStart(2, "0");
        const mins_string = mins.toString().padStart(2, "0");

        startTime.value = `${hrs_string}:${mins_string}`;
      }
    });

    endTime.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        let hrs = Number(endTime.value.split(":").join("").slice(0, 2));
        let mins = Number(endTime.value.split(":").join("").slice(-2));

        mins++;

        if (mins >= 60) {
          hrs++;
          mins = 0;
        }

        if (hrs >= 24) {
          hrs = 0;
        }

        const hrs_string = hrs.toString().padStart(2, "0");
        const mins_string = mins.toString().padStart(2, "0");

        endTime.value = `${hrs_string}:${mins_string}`;
      }

      if (e.key === "ArrowDown") {
        let hrs = Number(endTime.value.split(":").join("").slice(0, 2));
        let mins = Number(endTime.value.split(":").join("").slice(-2));

        mins--;

        if (mins <= 0) {
          hrs--;
          mins = 59;
        }

        if (hrs <= 0) {
          hrs = 23;
        }

        const hrs_string = hrs.toString().padStart(2, "0");
        const mins_string = mins.toString().padStart(2, "0");

        endTime.value = `${hrs_string}:${mins_string}`;
      }
    });
  });
};

const root = document.querySelector(":root") as HTMLElement;

subscribePrimitive("isSidebarOpen", () => {
  root.style.setProperty("--tracker-margin-left", Store.isSidebarOpen ? "9rem" : "22rem");
});
