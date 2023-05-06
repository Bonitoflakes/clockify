import { $, $$, createCircle, findEntry } from "@utils";
import { createDeleteModal, createDropdown, focusModal } from "./helpers_OTHERS";
import { Store } from "@store";
import { generateToast } from "../toast";
import { renderEntries } from "./generateCard";

export const handleMenuBlur = (e: FocusEvent) => {
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

export const handleMenuClick = (e: MouseEvent, id: number) => {
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

export const trapFocusOnInit = (modal: HTMLElement) => {
  const focusableElements = 'button, a, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusableContent = modal.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

  lastFocusableElement.focus();

  // MAIN!!!!!
  document.addEventListener("keydown", focusModal);
};

export const handlePlayClick = (
  description: string,
  projectName: string,
  tags: string[],
  billable: boolean
) => {
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

export const updateEntryTimeStart = (
  id: number,
  startTime: HTMLElement,
  endTime: HTMLElement,
  sup: HTMLElement,
  _stopwatch: HTMLElement
) => {
  const entry = findEntry(id);

  const startTimeDate = new Date(`${entry.date}T${(startTime as HTMLInputElement).value}`);
  const endTimeDate = new Date(`${entry.date}T${(endTime as HTMLInputElement).value}`);

  const startTimeInMS = Date.parse(startTimeDate.toString());
  entry.startTime = startTimeInMS;

  const timeDiffInMs = endTimeDate.getTime() - startTimeDate.getTime();

  let hours = Math.floor(timeDiffInMs / (1000 * 60 * 60));
  let minutes = Math.floor((timeDiffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiffInMs % (1000 * 60)) / 1000);

  if (Math.sign(hours) < 0) {
    hours += 24;
    sup.textContent = "+1";
  }

  if (Math.sign(minutes) < 0) {
    minutes += 60;
  }

  const totalTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  _stopwatch.textContent = totalTime;
  entry.actualEffort = [hours, minutes, seconds];
  renderEntries();
};

export const updateEntryTimeEnd = (
  id: number,
  startTime: HTMLElement,
  endTime: HTMLElement,
  _stopwatch: HTMLElement
) => {
  const entry = findEntry(id);

  const startTimeDate = new Date(`${entry.date}T${(startTime as HTMLInputElement).value}`);
  const endTimeDate = new Date(`${entry.date}T${(endTime as HTMLInputElement).value}`);

  const endTimeInMS = Date.parse(endTimeDate.toString());
  entry.endTime = endTimeInMS;

  const timeDiffInMs = endTimeDate.getTime() - startTimeDate.getTime();

  let hours = Math.floor(timeDiffInMs / (1000 * 60 * 60));
  let minutes = Math.floor((timeDiffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiffInMs % (1000 * 60)) / 1000);

  if (Math.sign(hours) < 0) {
    hours += 24;
  }

  if (Math.sign(minutes) < 0) {
    minutes += 60;
  }

  const totalTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  _stopwatch.textContent = totalTime;
  entry.actualEffort = [hours, minutes, seconds];
  renderEntries();
};

export const handleDateChange = (e: Event, id: number) => {
  const entry = findEntry(id);
  const value = new Date((e.currentTarget as HTMLInputElement).value).toISOString().slice(0, 10);

  entry.date = value;

  const currentYear = new Date().getFullYear().toString();

  let entryDate2String_modifer = value;
  if (value.slice(12) === currentYear) entryDate2String_modifer = value.slice(0, 12);

  // FIX: Quick hack, ideally you don't want to re-render everything. On a side note, it seems impossible to avoid re-rendering the entire entries. Reason: Need to sort and group entries.s
  renderEntries();
};
