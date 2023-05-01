import { Store } from "@store";
import { $, createElement } from "@utils";

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

export const generateTrackerEntry = () => {
  $("main").replaceChildren();

  Store.entries.map(
    ({ id, description, actualEffort, billable, projectName, tags, startTime: st, endTime: et, date }) => {
      const projectEntry = createElement("div", { class: ["tracker-entry", "open"] });

      const line1 = generateLine();
      const line2 = generateLine();
      const line3 = generateLine();
      const line4 = generateLine();
      const line5 = generateLine();

      const _input = generateInput(description);

      const [_projects, _projectText] = generateProjectPicker(projectName, id);
      // For making sure, each projectPicker has a unique parent.
      _projects.dataset.id = `project-picker-button-${id}`;

      const _tags = generateTags(tags);
      const _bill = generateBill(id, billable);
      const _stopwatch = generateStopwatch(actualEffort);
      const [_date, startTime, endTime, dateButton, dateInput] = generateDate(date, st, et);
      const _play = generatePlayButton();
      const _menu = generateMenuDots();

      const div1 = createElement("div", { class: ["div1"] });
      const div2 = createElement("div", { class: ["div2"] });

      div1.append(_input, _projects);
      div2.append(_tags, line1, _bill, line2, _date, line3, _stopwatch, line4, _play, line5, _menu);

      projectEntry.append(div1, div2);
      $("main")!.append(projectEntry);

      // Event Listeners
      _projects.addEventListener("click", (e) => handlePPClick(e, _projectText, id));
      _projects.addEventListener("blur", handlePPBlur);

      _tags.addEventListener("click", (e) => handleTPClick(e, id));

      startTime.addEventListener("keydown", handleTimeArrowKeys);
      endTime.addEventListener("keydown", handleTimeArrowKeys);

      dateButton.addEventListener("click", () => (dateInput as HTMLInputElement).showPicker());

      dateInput.addEventListener("change", (e) => {
        const entry = findEntry(id);
        entry.date = (e.currentTarget as HTMLInputElement).value;
      });

      _play.addEventListener("click", handlePlayClick);

      _menu.addEventListener("click", (e) => handleMenuClick(e, id));

      _menu.addEventListener("blur", handleMenuBlur);
    }
  );
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

const handlePlayClick = () => {
  console.log("play button clicked!!");
};
