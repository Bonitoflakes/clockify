import { createElement, $, createCircle, createProjectPlusIcon } from "@utils";
import { Store, subscribePrimitive } from "@store";

export const generateProjectPicker = () => {
  const picker = createElement("div", { class: ["project-picker"] });
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
  // FIX:
  $("timetracker-recorder__newproject-button")!.appendChild(picker);
  return Promise.resolve();
};

export const initializeProjectPicker = async () => {
  const newProjectButton = $("project-picker__btn--new") as HTMLButtonElement;
  const projectPickerInput = $("project-picker__input") as HTMLInputElement;

  newProjectButton.addEventListener("click", () => {
    updateProjectStatus();
  });

  // Show filtered projects based on user query.
  projectPickerInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      updateProjectStatus();
    }
  });

  // Update filter value on every input keystroke.
  projectPickerInput.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    Store.projectFilter = target.value;
  });
};

export const renderProjectList = () => {
  const projectList = $("project-picker__list") as HTMLUListElement;
  // Empty all children.
  projectList.replaceChildren();

  if (Store.allProjects.length === 0 && !Store.projectFilter) {
    projectList.append(createElement("li", { class: ["project-picker__link--default"] }, "No projects yet"));
  } else {
    // To prevent showing project link which is in active state.
    const filteredProjects = Store.allProjects.filter((el: string) =>
      el === Store.activeProject ? false : el.includes(Store.projectFilter)
    );

    // No matching projects Message
    if (filteredProjects.length === 0 && Store.projectFilter) {
      projectList.append(showUnmatchedMessage());
    }
    //
    else {
      filteredProjects.length > 0 &&
        filteredProjects.map((name: string) => {
          projectList.append(createElement("li", { class: ["project-picker__list--link"] }, name));
        });

      // EVENT listener
      projectList.addEventListener("click", (e) => {
        const target = e.target as HTMLLIElement;

        if (target.nodeName === "A") return;

        Store.activeProject = target.textContent ?? "DEV messed up 😬";
        updateProjectStatus(false);
      });
    }
  }
};

// Re-render the project list whenever filter value is changed or the active project is changed.
subscribePrimitive("projectFilter", renderProjectList);
subscribePrimitive("activeProject", renderProjectList);

const updateProjectStatus = (checkInput = true) => {
  const picker = $("project-picker");
  const projectBtn = $("timetracker-recorder__newproject-button");
  const projectText = $("newproject-button-text");
  const projectImg = $("newproject-button__span");

  if (checkInput) {
    Store.activeProject = Store.projectFilter;
    Store.allProjects.push(Store.projectFilter);

    const pickerInput = $("project-picker__input") as HTMLInputElement;
    pickerInput.value = "";
  }

  projectBtn.style.color = "var(--red-color)";
  projectText.textContent = Store.activeProject;

  let x = createCircle();
  projectImg.replaceChildren(x);

  projectImg.style.width = "auto";
  projectImg.style.height = "auto";

  Store.projectFilter = "";

  picker.classList.remove("active");
};

const showUnmatchedMessage = () => {
  const defaultList = createElement("li", { class: ["project-picker__link--default"] });
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
  defaultLink.addEventListener("click", () => {
    Store.activeProject = Store.projectFilter;
    updateProjectStatus();
  });

  return defaultList;
};
