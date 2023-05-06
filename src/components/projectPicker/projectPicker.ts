import { createElement, $, createCircle } from "@utils";
import { Store } from "@store";

import { generateToast, removeProjectPicker } from "@components";
import { __zeroMatch } from ".";

let textToBeModified: HTMLElement;
let entryToBeModifiedID: number | undefined;

export const initializeProjectPicker = (textElement: HTMLElement, ID?: number) => {
  const newProjectButton = $("project-picker__btn--new") as HTMLButtonElement;
  const projectPickerInput = $("project-picker__input") as HTMLInputElement;
  textToBeModified = textElement;
  entryToBeModifiedID = ID;

  newProjectButton.addEventListener("click", () => {
    __updateProjectStatus(textToBeModified);
    generateToast(`Project ${Store.activeProject} was created successfully.`, true);
  });

  projectPickerInput.addEventListener("keyup", (e) => {
    // Update filter value on keystroke.
    const target = e.target as HTMLInputElement;
    Store.projectFilter = target.value.trim();

    // Create project on Ctrl + Enter.
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      __updateProjectStatus(textToBeModified);
      generateToast(`Project ${Store.activeProject} was created successfully.`, true);
    }

    if (e.key === "Escape") {
      removeProjectPicker();
    }
  });
};

export const renderProjectList = () => {
  const projectList = $("project-picker__list") as HTMLUListElement;

  if (!projectList) return;
  projectList.replaceChildren(); // Empty all children.

  if (Store.allProjects.length === 0 && !Store.projectFilter) {
    projectList.append(createElement("li", { class: ["project-picker__link--default"] }, "No projects yet"));
    return;
  }

  // To prevent showing project link which is in active state.
  const filteredProjects = Store.allProjects.filter(
    (el: string) => el !== Store.activeProject && el.includes(Store.projectFilter)
  );

  // No matching projects Message
  if (filteredProjects.length === 0 && Store.projectFilter) {
    projectList.append(__zeroMatch(textToBeModified));
    return;
  }

  // Loop through all the projects and attach them to the list.
  if (filteredProjects.length > 0) {
    filteredProjects.map((name: string) => {
      projectList.append(createElement("li", { class: ["project-picker__list--link"] }, name));
    });
  }

  // EVENT listener
  projectList.addEventListener("click", (e) => {
    // e.stopPropagation();
    const target = e.target as HTMLLIElement;
    if (target.nodeName !== "LI") return;

    Store.activeProject = target.textContent ?? "DEV messed up 😬";
    Store.projectFilter = "";
    __updateProjectStatus(textToBeModified, false);
    generateToast(`Project ${Store.activeProject} is selected.`, true);
  });
};

export const __updateProjectStatus = (textToBeModified: HTMLElement, checkInput = true) => {
  const picker = $("project-picker");

  if (checkInput) {
    Store.activeProject = Store.projectFilter;
    Store.allProjects.push(Store.projectFilter);

    const pickerInput = $("project-picker__input") as HTMLInputElement;
    pickerInput.value = "";
  }

  if (entryToBeModifiedID) {
    const entry = Store.entries.find(({ id }) => entryToBeModifiedID === id);
    entry!.projectName = Store.activeProject;
    // console.table(entry);
  }

  textToBeModified.textContent = Store.activeProject;

  Store.projectFilter = "";

  if (picker) {
    // console.log("Removing picker from innerFunction");

    picker.remove();

    // FIX:
    document.removeEventListener("click", removeProjectPicker);
  }

  if (textToBeModified.classList.contains("newproject-button-text")) {
    const projectBtn = $("timetracker-recorder__newproject-button");
    const projectImg = $("newproject-button__span");

    projectImg.replaceChildren(createCircle());
    projectBtn.style.color = "var(--red)";
    projectImg.style.width = "auto";
    projectImg.style.height = "auto";
  }

  // FIX:
  Store.allProjects = Array.from(new Set(Store.allProjects));
};
