import { createElement, findEntry } from "@utils";

import {
  generateBill,
  generateDate,
  generateInput,
  generateLine,
  generateMenuDots,
  generatePlayButton,
  generateProjectPicker,
  generateStopwatch,
  generateTags,
} from "./generators";

import { handlePPClick, handlePPBlur } from "../recorder/helper_PROJECT";
import { handleTPClick } from "../recorder/helper_TAG";
import { handleTimeArrowKeys } from "./helpers_OTHERS";
import {
  handleMenuBlur,
  handleMenuClick,
  handlePlayClick,
  updateEntryTimeStart,
  updateEntryTimeEnd,
  handleDateChange,
} from "./handlers";

export const generateTrackerEntry = ({
  id,
  description,
  actualEffort,
  billable,
  projectName,
  tags,
  startTime: st,
  endTime: et,
  date,
}: IEntry) => {
  const projectEntry = createElement("div", { class: ["tracker-entry"] });

  const line1 = generateLine();
  const line2 = generateLine();
  const line3 = generateLine();
  const line4 = generateLine();
  const line5 = generateLine();

  const _input = generateInput(description);

  const [_projects, _projectText] = generateProjectPicker(projectName, id);

  _projects.dataset.id = `project-picker-button-${id}`; // each projectPicker has a unique parent.

  const _tags = generateTags(tags);
  const [_bill, billableBtn] = generateBill(id, billable);
  // FIX:
  const [_date, startTime, endTime, dateButton, dateInput, sup] = generateDate(date, st, et);
  const _stopwatch = generateStopwatch(actualEffort);
  const _play = generatePlayButton();
  const _menu = generateMenuDots();

  const div1 = createElement("div", { class: ["div1"] });
  const div2 = createElement("div", { class: ["div2"] });

  div1.append(_input, _projects);
  div2.append(_tags, line1, _bill, line2, _date, line3, _stopwatch, line4, _play, line5, _menu);

  projectEntry.append(div1, div2);

  // Event Listeners
  initEntry(
    _projects,
    _projectText,
    id,
    _tags,
    billableBtn,
    startTime,
    endTime,
    sup,
    _stopwatch,
    dateButton,
    dateInput,
    _play,
    description,
    projectName,
    tags,
    billable,
    _menu
  );

  return [projectEntry, _stopwatch];
};

const initEntry = (
  _projects: HTMLElement,
  _projectText: HTMLElement,
  id: number,
  _tags: HTMLElement,
  billableBtn: HTMLElement,
  startTime: HTMLElement,
  endTime: HTMLElement,
  sup: HTMLElement,
  _stopwatch: HTMLElement,
  dateButton: HTMLElement,
  dateInput: HTMLElement,
  _play: HTMLElement,
  description: string,
  projectName: string,
  tags: string[],
  billable: boolean,
  _menu: HTMLElement
) => {
  _projects.addEventListener("click", (e) => handlePPClick(e, _projectText, id));
  _projects.addEventListener("blur", handlePPBlur);

  _tags.addEventListener("click", (e) => handleTPClick(e, id));

  billableBtn.addEventListener("click", () => {
    const entry = findEntry(id);
    entry.billable = !entry.billable;
  });

  // These are responsible for only updating the input DOM.
  startTime.addEventListener("keydown", (e) => handleTimeArrowKeys(e));
  endTime.addEventListener("keydown", (e) => handleTimeArrowKeys(e));

  // These are responsible for updating the Store value.
  startTime.addEventListener("blur", () => updateEntryTimeStart(id, startTime, endTime, sup, _stopwatch));

  endTime.addEventListener("blur", () => updateEntryTimeEnd(id, startTime, endTime, _stopwatch));

  dateButton.addEventListener("click", () => (dateInput as HTMLInputElement).showPicker());

  dateInput.addEventListener("change", (e) => handleDateChange(e, id));

  _play.addEventListener("click", () => handlePlayClick(description, projectName, tags, billable));

  _menu.addEventListener("click", (e) => handleMenuClick(e, id));

  _menu.addEventListener("blur", handleMenuBlur);
};
