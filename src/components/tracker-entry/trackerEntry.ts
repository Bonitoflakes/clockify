import { Store } from "@store";
import { $, $$, createCircle, createElement } from "@utils";

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
} from "./helpers";

import { handlePPClick, handlePPBlur } from "../recorder/helper_PROJECT";
import { handleTPClick } from "../recorder/helper_TAG";
import {
  handleTimeArrowKeys,
  findEntry,
  createDeleteModal,
  createDropdown,
  focusModal,
} from "./helpers_OTHERS";
import { generateToast } from "../toast";
import { convertDateToString } from "../recorder/helper_OTHERS";
import { renderEntries } from "../../main";

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
  const _stopwatch = generateStopwatch(actualEffort);
  // FIX:
  const [_date, startTime, endTime, dateButton, dateInput] = generateDate(date, st, et);
  const _play = generatePlayButton();
  const _menu = generateMenuDots();

  const div1 = createElement("div", { class: ["div1"] });
  const div2 = createElement("div", { class: ["div2"] });

  div1.append(_input, _projects);
  div2.append(_tags, line1, _bill, line2, _date, line3, _stopwatch, line4, _play, line5, _menu);

  projectEntry.append(div1, div2);

  // Event Listeners
  _projects.addEventListener("click", (e) => handlePPClick(e, _projectText, id));
  _projects.addEventListener("blur", handlePPBlur);

  _tags.addEventListener("click", (e) => handleTPClick(e, id));

  billableBtn.addEventListener("click", () => {
    const entry = findEntry(id);
    entry.billable = !entry.billable;
  });

  startTime.addEventListener("keydown", handleTimeArrowKeys);
  endTime.addEventListener("keydown", handleTimeArrowKeys);

  dateButton.addEventListener("click", () => (dateInput as HTMLInputElement).showPicker());

  dateInput.addEventListener("change", (e) => {
    const entry = findEntry(id);
    const value = new Date((e.currentTarget as HTMLInputElement).value).toISOString().slice(0, 10);

    entry.date = value;


    const currentYear = new Date().getFullYear().toString();

    let entryDate2String_modifer = value;
    if (value.slice(12) === currentYear) entryDate2String_modifer = value.slice(0, 12);

    // FIX: Quick hack, ideally you don't want to re-render everything.
    renderEntries();

    // weeklyDateRange.textContent = entryDate2String_modifer;

    // const entry = findEntry(id);
    // const value = convertDateToString(new Date((e.currentTarget as HTMLInputElement).value));
    // entry.date = value;

    // const currentYear = new Date().getFullYear().toString();
    // const entryYear = new Date(date).getFullYear().toString();

    // const firstDate = findFirstDayOfWeek(entry.date).toDateString().slice(4, 10);
    // const lastDate = findLastDayOfWeek(entry.date).toDateString().slice(4, 10);

    // let weekString = `${firstDate} - ${lastDate}, ${entryYear}`;

    // if (currentYear === entryYear) {
    //   weekString = `${firstDate} - ${lastDate}`;
    // }

    // let entryDate2String_modifer = value;
    // if (value.slice(12) === currentYear) entryDate2String_modifer = value.slice(0, 12);

    // weeklyDateRange.textContent = weekString;
  });

  _play.addEventListener("click", () => handlePlayClick(description, projectName, tags, billable));

  _menu.addEventListener("click", (e) => handleMenuClick(e, id));

  _menu.addEventListener("blur", handleMenuBlur);

  return projectEntry;
};

const handleMenuBlur = (e: FocusEvent) => {
  const dropdown = $("menu-dropdown");
  const duplicateOption = $("option--duplicate");
  const deleteOption = $("option--delete");
  const relatedTarget = e.relatedTarget as HTMLElement;

  // Target Phase takes priority over bubble or capture phase.
  // FIX: dropdown menu is currently closing when dropdown area is clicked. Not the case with the original site.

  if (relatedTarget?.isEqualNode(duplicateOption)) return;
  if (relatedTarget?.isEqualNode(deleteOption)) return;

  dropdown.remove();
};

const handleMenuClick = (e: MouseEvent, id: number) => {
  const ex = $("menu-dropdown");
  if (ex) return ex.remove();

  const _menu = e.currentTarget as HTMLElement;

  const [dropdown, duplicateOption, deleteOption] = createDropdown();
  _menu.append(dropdown);

  duplicateOption.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("duplicate");
    dropdown.remove();
  });

  deleteOption.addEventListener("click", (e) => {
    e.stopPropagation();
    const modal = createDeleteModal(id);
    trapFocusOnInit(modal);
  });
};

const trapFocusOnInit = (modal: HTMLElement) => {
  const focusableElements = 'button, a, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusableContent = modal.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

  lastFocusableElement.focus();

  // MAIN!!!!!
  document.addEventListener("keydown", focusModal);
};

const handlePlayClick = (description: string, projectName: string, tags: string[], billable: boolean) => {
  console.clear();
  console.log("play button clicked!!");

  if (Store.isTimerStarted) return generateToast("A Project is already been tracked!", false);

  Store.activeProject = projectName;
  Store.activeTags = tags;

  const recorderInput = $("timetracker-recorder__input") as HTMLInputElement;
  recorderInput.value = description;

  const recorderImgP = $("newproject-button__span");
  recorderImgP.replaceChildren(createCircle());

  const recorderProjectBtn = $("timetracker-recorder__newproject-button");
  recorderProjectBtn.click();
  const allProjects = $$("project-picker__list--link") as NodeListOf<HTMLElement>;
  allProjects.forEach((element) => {
    if (element.textContent === projectName) {
      element.click();
    }
  });

  const tagsBtn = $("timetracker-recorder__tags-button");
  tagsBtn.click();
  const allTags = $$("c_label") as NodeListOf<HTMLElement>; // get all labels
  allTags.forEach((element) => {
    if (!element.textContent) return;

    if (tags.includes(element.textContent)) {
      element.click();
    }
  });

  const billableBtn = $("timetracker-recorder__price-button") as HTMLInputElement;
  billableBtn.checked = billable;

  const startBtn = $("timetracker-recorder__start-button");
  startBtn.click();
};
