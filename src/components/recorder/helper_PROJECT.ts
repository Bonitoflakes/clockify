import { Store } from "@store";
import { stopPropagation, stopSpacePropagation, $, createProjectPlusIcon } from "@utils";

import { generateProjectPicker, initializeProjectPicker, renderProjectList } from "@components";

export const removeProjectPicker = (): void => {
  const picker = $("project-picker");
  Store.projectFilter = "";
  // console.log("Removing project picker via Doc Listener");

  if (picker) picker.remove();
  document.removeEventListener("click", removeProjectPicker);
};

export const handlePPClick = (e: MouseEvent, text: HTMLElement, id?: number) => {
  const ex = $("project-picker");
  const target = e.target as HTMLElement;

  if (target.offsetParent?.contains(ex)) return ex.remove();

  if (ex) {
    Store.projectFilter = "";
    ex.remove();
  }

  // create a new project picker.
  const picker = generateProjectPicker();

  (e.currentTarget as HTMLElement).appendChild(picker);

  // BUG(EmptyProject):
  if (text.textContent === "Project") {
    Store.activeProject = "";
  } else {
    Store.activeProject = text.textContent ?? "DEV messed up";
  }

  initializeProjectPicker(text, id);
  renderProjectList();
  const projectInput = $("project-picker__input") as HTMLInputElement;
  // FIX:
  // projectInput.focus();

  picker.addEventListener("click", stopPropagation);
  picker.addEventListener("keyup", stopSpacePropagation);

  // FIX:
  e.stopPropagation();
  document.addEventListener("click", removeProjectPicker);
};

export const handlePPBlur = (e: FocusEvent) => {
  const isChild = (e.currentTarget as HTMLButtonElement).contains(e.relatedTarget as Node);
  if (isChild) return;

  const picker = $("project-picker");

  if (picker) {
    // FIX:
    document.removeEventListener("click", removeProjectPicker);
    picker.remove();
  }
};

export const resetProjectButton = () => {
  const redDot = $("circle--red");
  const projectName = $("newproject-button-text") as HTMLElement;
  const projectBtn = $("timetracker-recorder__newproject-button");

  const plusImg = createProjectPlusIcon();

  if (Store.activeProject !== "") {
    redDot.replaceWith(plusImg);
    projectName.textContent = "Project";
    projectBtn.style.color = "var(--primary)";
  }

  Store.activeProject = "";
};
