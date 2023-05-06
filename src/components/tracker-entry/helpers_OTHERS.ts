import { generateToast } from "@components";
import { Store } from "@store";
import { $, createElement } from "@utils";
import closeWhite from "@assets/close-white.svg";
import { renderEntries } from "@components";

export const handleTimeArrowKeys = (e: KeyboardEvent) => {
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
export const getHoursAndMins = (value: string) => {
  // TODO: Add validation for numbers only, length <=5 && >3
  const hrs = Number(value.split(":").join("").slice(0, 2));
  const mins = Number(value.split(":").join("").slice(-2));
  return [hrs, mins];
};

export const createDropdown = () => {
  const dropdown = createElement("div", { class: ["menu-dropdown"] });
  const duplicateOption = createElement("button", { class: ["option", "option--duplicate"] }, "Duplicate");
  const deleteOption = createElement("button", { class: ["option", "option--delete"] }, "Delete");

  dropdown.append(duplicateOption, deleteOption);
  return [dropdown, duplicateOption, deleteOption];
};

export const createDeleteModal = (id: number) => {
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
  document.body.append(modal);

  //   EventListeners
  cancelButton.addEventListener("click", removeModal);
  closeButton.addEventListener("click", removeModal);
  deleteButton.addEventListener("click", () => deleteEntry(id));

  return modal;
};

export const focusModal = (e: KeyboardEvent) => {
  const modal = $("modal");
  const focusableElements = 'button, a, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const focusableContent = modal.querySelectorAll(focusableElements);
  const firstFocusableElement = focusableContent[0] as HTMLElement;
  const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

  if (e.key === "Escape") {
    removeModal();
    document.removeEventListener("keydown", focusModal);
  }

  const isTabPressed = e.key === "Tab";

  if (!isTabPressed) return;

  if (e.shiftKey) {
    // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      e.preventDefault();
    }
    return;
  }

  // if tab key is pressed
  if (document.activeElement === lastFocusableElement) {
    // if focused has reached to last focusable element then focus first focusable element after pressing tab
    firstFocusableElement.focus(); // add focus for the first focusable element
    e.preventDefault();
  }
};

export function removeModal() {
  const modal = $("modal");
  const dropdown = $("menu-dropdown");
  const modalContent = $("modal-content");

  modalContent.classList.add("fadeOutUpBig");
  Promise.all(modalContent.getAnimations().map((animation) => animation.finished)).then(() => modal.remove());
  dropdown.remove();
  document.removeEventListener("keydown", focusModal);
}

// TODO: Add more logic... Actual deletion requires ID to be passed along.
const deleteEntry = (id: number) => {
  removeModal();

  // delete entry from Store;
  Store.entries.splice(
    Store.entries.findIndex((entry) => entry.id === id),
    1
  );
  renderEntries();

  generateToast("Entry deleted successfully.", true);
};
