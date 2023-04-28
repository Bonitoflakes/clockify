import { Store, subscribe } from "@store";
import { $, createElement } from "@utils";

import {
  generateBill,
  generateDate,
  generateInput,
  generateMenuDots,
  generatePlayButton,
  generateProjectPicker,
  generateStopwatch,
  generateTags,
} from "./helpers";

import { handlePPBlur, handlePPClick, handleTPClick } from "../timeTracker";

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

      const _input = generateInput(description);

      const [_projects, _projectText] = generateProjectPicker(projectName, id);
      _projects.dataset.id = `project-picker-button-${id}`;

      const _tags = generateTags(tags);
      const _bill = generateBill(id, billable);
      const _stopwatch = generateStopwatch(actualEffort);
      const _date = generateDate(st, et, date);
      const _play = generatePlayButton();
      const _menu = generateMenuDots();

      const div1 = createElement("div", { class: ["div1"] });
      const div2 = createElement("div", { class: ["div2"] });
      div1.append(_input, _projects);
      div2.append(_tags, line1, _bill, line2, _date, line3, _stopwatch, line4, _play, line5, _menu);

      projectEntry.append(div1, div2);
      $("main")!.append(projectEntry);

      _projects.addEventListener("click", (e) => handlePPClick(e, _projectText, id));

      _projects.addEventListener("blur", handlePPBlur);

      _tags.addEventListener("click", (e) => handleTPClick(e, id));

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

subscribe(Store.entries, generateTrackerEntry);
