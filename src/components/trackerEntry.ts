import tagGray from "@assets/tag-gray.svg";
import calendarGray from "@assets/calendar-gray.svg";
import playButton from "@assets/play.svg";
import menuDots from "@assets/menu-dots-vertical.svg";

import { Store, subscribePrimitive, subscribe } from "@store";
import { $, createElement, createProjectPlusIcon } from "@utils";

const generateInput = (description: string) => {
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

const generateDate = (startDate: string, endDate: string, date: string) => {
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

const picker = () => {
  const picker = createElement("div", { class: ["project-picker"] });
  const pickerWrapper = createElement("div", { class: ["project-picker__wrapper"] });
  //
  //
  const inputWrapper = createElement("div", { class: ["project-picker__input-wrapper"] });
  const projectInput = createElement("input", {
    class: ["project-picker__input"],
    placeholder: "Find project or client...",
  });
  inputWrapper.appendChild(projectInput);
  //
  //
  const projectListWrapper = createElement("section", { class: ["project-picker__list-wrapper"] });
  const projectList = createElement("ul", { class: ["project-picker__list"] });
  projectListWrapper.appendChild(projectList);
  //
  //
  const newProjectButtonSpan = createElement("span", { class: ["plusIconSpan"] });
  const newProjectButton = createElement(
    "button",
    { class: ["project-picker__btn--new"] },
    "Create new project"
  );
  //
  newProjectButtonSpan.append(createProjectPlusIcon());
  newProjectButton.insertBefore(newProjectButtonSpan, newProjectButton.firstChild);
  //
  //
  pickerWrapper.append(inputWrapper, projectListWrapper, newProjectButton);
  picker.appendChild(pickerWrapper);
  return picker;
};

export const generateTrackerEntry = () => {
  $("main").replaceChildren();

  Store.entries.map(
    ({ id, description, actualEffort, billable, projectName, tags, startTime: st, endTime: et, date }) => {
      const projectEntry = createElement("div", { class: ["tracker-entry", "open"] });

      const line1 = createElement("div", { class: ["line"] });
      const line2 = createElement("div", { class: ["line"] });
      const line3 = createElement("div", { class: ["line"] });
      const line4 = createElement("div", { class: ["line"] });
      const line5 = createElement("div", { class: ["line"] });

      // console.log(projectName);

      const _input = generateInput(description);
      const _projects = generateProjectPicker(projectName);
      const _tags = generateTags(tags);
      const _bill = generateBill(id, billable);
      const _stopwatch = generateStopwatch(actualEffort);
      // TODO: add date as params to this func
      const _date = generateDate(st, et, date);
      const _play = generatePlayButton();
      const _menu = generateMenuDots();

      const div1 = createElement("div", { class: ["div1"] });
      const div2 = createElement("div", { class: ["div2"] });
      div1.append(_input, _projects);
      div2.append(_tags, line1, _bill, line2, _date, line3, _stopwatch, line4, _play, line5, _menu);

      projectEntry.append(div1, div2);
      $("main")!.append(projectEntry);

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

      _projects.addEventListener("click", (e) => {
        console.log(e.clientX);
        console.log(e.clientY);

        const a = picker();
        // _projects.append(a);
      });

      $("timetracker-recorder__date-button").addEventListener("click", () => {
        ($("native-date-picker") as HTMLInputElement).showPicker();
        console.log("date button clicked");
      });

      $("native-date-picker").addEventListener("change", (e) => {
        console.log((e.target as HTMLInputElement).value);
        const a = Store.entries.find(({ id: e_id }) => id === e_id);
        console.log(a?.date);
        if (a) a.date = (e.target as HTMLInputElement).value;
      });
    }
  );
};

const root = document.querySelector(":root") as HTMLElement;

subscribePrimitive("isSidebarOpen", () => {
  root.style.setProperty("--tracker-margin-left", Store.isSidebarOpen ? "22rem" : "9rem");
  root.style.setProperty("--input-width", Store.isSidebarOpen ? "35rem" : "45rem");
});

subscribe(Store.entries, generateTrackerEntry);
