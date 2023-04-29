import { Store } from "@store";
import { stopPropagation, stopSpacePropagation, $, createProjectPlusIcon } from "@utils";

import { generateProjectPicker, initializeProjectPicker, renderProjectList } from "@components";

export const removeProjectPicker = (): void => {
  const picker = $("project-picker");
  Store.projectFilter = "";

  if (picker) picker.remove();
  document.removeEventListener("click", removeProjectPicker);
};

export const handlePPClick = (e: MouseEvent, text: HTMLElement, id?: number) => {
  const ex = $("project-picker");

  // if (ex) document.body.style.background = "pink";

  const target = e.target as HTMLElement;

  if (target.offsetParent?.contains(ex)) return ex.remove();

  if (ex) {
    Store.projectFilter = "";
    ex.remove();
  }

  // create a new project picker.
  const picker = generateProjectPicker();

  (e.currentTarget as HTMLElement).appendChild(picker);

  Store.activeProject = text.textContent ?? "DEV messed up";
  initializeProjectPicker(text, id);
  renderProjectList();

  picker.addEventListener("click", stopPropagation);
  picker.addEventListener("keyup", stopSpacePropagation);

  // FIX:
  e.stopPropagation();
  document.addEventListener("click", removeProjectPicker);
};

export const handlePPBlur = (e: FocusEvent) => {
  const isChild = (e.currentTarget as HTMLButtonElement).contains(e.relatedTarget as Node);

  const picker = $("project-picker");

  if (isChild) return;

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
    projectName.textContent = "Projects";
    projectBtn.style.color = "var(--primary-color)";
  }

  Store.activeProject = "";
};
