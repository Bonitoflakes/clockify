import { Store, subscribe } from "@store";
import { $, createElement } from "@utils";
import closeWhite from "@assets/close-white.svg";

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
import { generateToast } from "../toast";

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

      _play.addEventListener("click", () => {});

      _menu.addEventListener("click", (e) => {
        console.clear();
        const dropdown = createElement("div", { class: ["menu-dropdown"] });
        const duplicateOption = createElement(
          "button",
          { class: ["option", "option--duplicate"] },
          "Duplicate"
        );
        const deleteOption = createElement("button", { class: ["option", "option--delete"] }, "Delete");

        dropdown.append(duplicateOption, deleteOption);
        _menu.append(dropdown);

        // const a = (e.target as HTMLElement).isEqualNode(dropdown);
        // console.log(a);

        // if (a) {
        //   console.log("early exit");
        //   return dropdown.remove();
        // }

        // dropdown.addEventListener("click", (e) => e.stopPropagation());

        duplicateOption.addEventListener("click", (e) => {
          e.stopPropagation();
          console.log("duplicate");
          dropdown.remove();
        });

        deleteOption.addEventListener("click", (e) => {
          e.stopPropagation();
          console.log("delete");

          const modal = createDeleteModal(() => dropdown.remove());
          document.body.append(modal);

          const focusableElements =
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

          const focusableContent = modal.querySelectorAll(focusableElements);

          const firstFocusableElement = focusableContent[0] as HTMLElement; // get first element to be focused inside modal

          const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement; // get last element to be focused inside modal

          document.addEventListener("keydown", function (e) {
            let isTabPressed = e.key === "Tab";

            if (!isTabPressed) {
              return;
            }

            if (e.shiftKey) {
              // if shift key pressed for shift + tab combination
              if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // add focus for the last focusable element
                e.preventDefault();
              }
            } else {
              // if tab key is pressed
              if (document.activeElement === lastFocusableElement) {
                // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus(); // add focus for the first focusable element
                e.preventDefault();
              }
            }
          });

          lastFocusableElement.focus();
        });
      });

      _menu.addEventListener("blur", (e) => {
        const dropdown = $("menu-dropdown");
        const duplicateOption = $("option--duplicate");
        const deleteOption = $("option--delete");
        const relatedTarget = e.relatedTarget as HTMLElement;

        if (relatedTarget?.isEqualNode(duplicateOption)) return;
        if (relatedTarget?.isEqualNode(deleteOption)) return;

        dropdown.remove();
      });
    }
  );
};

const handleTimeArrowKeys = (e: KeyboardEvent) => {
  const input = e.currentTarget as HTMLInputElement;
  if (e.key === "ArrowUp") {
    let [hrs, mins] = getHoursAndMins(input.value);
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
    input.value = `${hrs_string}:${mins_string}`;
  }
  if (e.key === "ArrowDown") {
    let [hrs, mins] = getHoursAndMins(input.value);

    mins--;

    if (mins < 0) {
      hrs--;
      mins = 59;
    }

    if (hrs < 0) {
      hrs = 23;
    }

    const hrs_string = hrs.toString().padStart(2, "0");
    const mins_string = mins.toString().padStart(2, "0");
    input.value = `${hrs_string}:${mins_string}`;
  }
};

// Function to get hours and minutes from the time input value
const getHoursAndMins = (value: string) => {
  // TODO: Add validation for numbers only, length <=5 && >3
  const hrs = Number(value.split(":").join("").slice(0, 2));
  const mins = Number(value.split(":").join("").slice(-2));
  return [hrs, mins];
};

const findEntry = (id: number) => {
  const entry = Store.entries.find(({ id: e_id }) => id === e_id);
  if (!entry) throw new Error("Entry not found!!, please check the ID");

  return entry;
};

const createDeleteModal = (sideEffect: () => void) => {
  const modal = createElement("div", { class: ["modal"] });
  const modalContent = createElement("div", { class: ["modal-content"] });
  const modalHeader = createElement("div", { class: ["modal-header"] });
  const modalTitle = createElement("h1", { class: ["modal-title"] }, "Delete");
  const closeButton = createElement("button", { class: ["modal-button--close"] });
  const closeIconImg = createElement("img", { src: closeWhite, class: ["modal-close__img"] });
  const modalBody = createElement("div", { class: ["modal-body"] });
  const modalBodyText = createElement(
    "p",
    { class: ["modal-body__text"] },
    "Are you sure you want to delete this entry?"
  );
  const modalFooter = createElement("div", { class: ["modal-footer"] });
  const cancelButton = createElement("a", { class: ["modal-button--cancel"], href: "#" }, "Cancel");
  const deleteButton = createElement("button", { class: ["modal-button--delete"] }, "Delete");

  closeButton.appendChild(closeIconImg);
  modalHeader.append(modalTitle, closeButton);

  modalBody.appendChild(modalBodyText);

  modalFooter.appendChild(cancelButton);
  modalFooter.appendChild(deleteButton);

  modalContent.append(modalHeader, modalBody, modalFooter);
  modal.append(modalContent);

  cancelButton.addEventListener("click", removeModal);
  closeButton.addEventListener("click", removeModal);
  deleteButton.addEventListener("click", () => {
    removeModal();
    generateToast("Entry deleted successfully", true);
  });

  function removeModal() {
    modalContent.classList.add("fadeOutUpBig");
    Promise.all(modalContent.getAnimations().map((animation) => animation.finished)).then(() =>
      modal.remove()
    );
    sideEffect();
  }

  return modal;
};

const trapFocus = () => {};

subscribe(Store.entries, generateTrackerEntry);
