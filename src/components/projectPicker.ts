import { createElement, $, createCircle, createProjectPlusIcon } from "@utils";
import { Store, subscribePrimitive } from "@store";
import { removeProjectPicker } from "./timeTracker";

export const generateProjectPicker = () => {
  const picker = createElement("div", { class: ["project-picker"] });
  picker.tabIndex = 0;
  const pickerWrapper = createElement("div", { class: ["project-picker__wrapper"] });
  //
  //
  const inputWrapper = createElement("div", { class: ["project-picker__input-wrapper"] });
  const projectInput = createElement("input", {
    class: ["project-picker__input"],
    placeholder: "Find project or client...",
  });
  inputWrapper.appendChild(projectInput);
  //
  //
  const projectListWrapper = createElement("section", { class: ["project-picker__list-wrapper"] });
  const projectList = createElement("ul", { class: ["project-picker__list"] });
  projectListWrapper.appendChild(projectList);
  //
  //
  const newProjectButtonSpan = createElement("span", { class: ["plusIconSpan"] });
  const newProjectButton = createElement(
    "button",
    { class: ["project-picker__btn--new"] },
    "Create new project"
  );
  //
  newProjectButtonSpan.append(createProjectPlusIcon());
  newProjectButton.insertBefore(newProjectButtonSpan, newProjectButton.firstChild);
  //
  //
  pickerWrapper.append(inputWrapper, projectListWrapper, newProjectButton);
  picker.appendChild(pickerWrapper);
  return picker;
};

let textToBeModified: HTMLElement;
let entryToBeModifiedID: number | undefined;

export const initializeProjectPicker = (textElement: HTMLElement, ID?: number) => {
  const newProjectButton = $("project-picker__btn--new") as HTMLButtonElement;
  const projectPickerInput = $("project-picker__input") as HTMLInputElement;
  textToBeModified = textElement;
  entryToBeModifiedID = ID;

  newProjectButton.addEventListener("click", () => {
    updateProjectStatus(textToBeModified);
  });

  projectPickerInput.addEventListener("keyup", (e) => {
    // Update filter value on keystroke.
    const target = e.target as HTMLInputElement;
    Store.projectFilter = target.value;

    // Create project on Ctrl + Enter.
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      updateProjectStatus(textToBeModified);
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
    projectList.append(showUnmatchedMessage(textToBeModified));
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
    updateProjectStatus(textToBeModified, false);
  });
};

const updateProjectStatus = (textToBeModified: HTMLElement, checkInput = true) => {
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
    console.log("Removing picker from innerFunction");

    picker.remove();

    // FIX:
    document.removeEventListener("click", removeProjectPicker);
  }

  if (textToBeModified.classList.contains("newproject-button-text")) {
    const projectBtn = $("timetracker-recorder__newproject-button");
    const projectImg = $("newproject-button__span");

    projectImg.replaceChildren(createCircle());
    projectBtn.style.color = "var(--red-color)";
    projectImg.style.width = "auto";
    projectImg.style.height = "auto";
  }

  // FIX:
  Store.allProjects = Array.from(new Set(Store.allProjects));
};

const showUnmatchedMessage = (textToBeModified: HTMLElement) => {
  const defaultList = createElement("ol", { class: ["project-picker__link--default"] });
  const defaultMsg = createElement(
    "p",
    { class: ["project-picker__link--default-msg"] },
    "No matching projects"
  );
  const defaultSpan = createElement(
    "span",
    { class: ["project-picker__link--default-span"] },
    `Press Ctrl+Enter to quickly `
  );
  const defaultLink = createElement(
    "a",
    { class: ["project-picker__link--default-link"] },
    `create '${Store.projectFilter}' project.`
  );

  defaultSpan.append(defaultLink);
  defaultList.append(defaultMsg, defaultSpan);

  // EVENT Listeners
  defaultLink.addEventListener("mousedown", () => {
    Store.activeProject = Store.projectFilter;
    updateProjectStatus(textToBeModified);
  });

  return defaultList;
};

// Re-render the project list whenever filter value is changed or the active project is changed.
subscribePrimitive("projectFilter", renderProjectList);
