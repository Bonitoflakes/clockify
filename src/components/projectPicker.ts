import { createElement, $, $$ } from "@utils";
import plusBlueReq from "@assets/plus-blue-req.svg";
import { Store, subscribePrimitive } from "@store";

export const generateProjectPicker = () => {
  const picker = createElement("div", { class: ["picker"] });
  const wrapper = createElement("div", { class: ["picker__wrapper"] });

  const inputWrapper = createElement("div", { class: ["inputWrapper"] });
  const input = createElement("input", {
    class: ["picker__input"],
    placeholder: "Find project or client...",
  });
  inputWrapper.appendChild(input);

  const clientSection = createElement("section", { class: ["picker__list"] });
  const projectList = createElement("ul", { class: ["projects_link-container"] });
  clientSection.appendChild(projectList);
  //
  //
  const plusIcon = createElement("img", { src: plusBlueReq });
  const plusIconSpan = createElement("span", { class: ["plusIconSpan"] });
  const createBtn = createElement("button", { class: ["picker__newproject-btn"] }, "Create new project");

  plusIconSpan.append(plusIcon);
  createBtn.insertBefore(plusIconSpan, createBtn.firstChild);

  wrapper.append(inputWrapper, clientSection, createBtn);
  picker.appendChild(wrapper);
  $("timetracker-recorder__newproject-button")!.appendChild(picker);
  return Promise.resolve();
};

export const initializeProjectPicker = () => {
  const picker = $("picker");
  const createNewProjectBtn = $("picker__newproject-btn");

  createNewProjectBtn.addEventListener("click", () => {
    const projectInput = $("picker__input") as HTMLInputElement;
    const projectBtn = $("timetracker-recorder__newproject-button");
    const projectText = $("newproject-button-text");
    const projectImg = $("newproject-button__img");

    projectBtn.style.color = "var(--project-color)";
    Store.activeProject = projectInput.value;
    projectText.textContent = Store.activeProject;
    projectImg.innerHTML = `<div class='circle--red'></div>`;
    projectImg.style.width = "auto";
    projectImg.style.height = "auto";

    Store.allProjects.push(projectInput.value);
    Store.filter = "";
    projectInput.value = "";
    picker.classList.remove("active");
  });
  return Promise.resolve();
};

export const initializeProjectFilter = () => {
  const picker = $("picker");
  const pickerInput = $("picker__input") as HTMLInputElement;

  // Show filtered projects based on user query.
  pickerInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      console.log("Ctrl + Enter");
      Store.activeProject = pickerInput.value;

      const projectBtn = $("timetracker-recorder__newproject-button");
      const projectText = $("newproject-button-text");
      const projectImg = $("newproject-button__img");

      projectBtn.style.color = "var(--project-color)";
      projectText.textContent = Store.activeProject;

      projectImg.innerHTML = `<div class='circle--red'></div>`;
      projectImg.style.width = "auto";
      projectImg.style.height = "auto";

      Store.allProjects.push(pickerInput.value);
      Store.filter = "";
      pickerInput.value = "";
      picker.classList.remove("active");
    }
  });

  // Update filter value on every input keystroke.
  pickerInput.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    Store.filter = target.value;
  });
  return Promise.resolve();
};

export const renderProjectList = () => {
  const picker = $("picker");
  const projectList = $("projects_link-container");
  const currentProjectText = $("newproject-button-text");
  const projectBtn = $("timetracker-recorder__newproject-button");
  const projectImg = $("newproject-button__img");

  projectList.innerHTML = "";

  if (Store.allProjects.length === 0 && !Store.filter) {
    projectList.append(createElement("li", { class: ["projects_link_default"] }, "No projects yet..."));
  }

  const filteredProjects = Store.allProjects.filter((el: string) =>
    el === Store.activeProject ? false : el.includes(Store.filter)
  );

  if (filteredProjects.length === 0 && Store.filter) {
    const defaultList = createElement("li", { class: ["projects_link_default"] });
    const defaultMsg = createElement("p", { class: ["projects_link_default-msg"] }, "No matching projects");
    const defaultSpan = createElement(
      "span",
      { class: ["projects_link_default-span"] },
      `Press Ctrl+Enter to quickly `
    );
    const defaultLink = createElement(
      "a",
      { class: ["projects_link_default-span-link"] },
      `create '${Store.filter}' project.`
    );
    defaultSpan.append(defaultLink);
    defaultList.append(defaultMsg, defaultSpan);
    projectList.append(defaultList);
  } else {
    filteredProjects.length > 0 &&
      filteredProjects.map((el: string) => {
        projectList.append(createElement("li", { class: ["projects_link"] }, el));
      });

    const allLinks = $$("projects_link");

    allLinks.forEach((link) => {
      link.addEventListener("click", () => {
        Store.activeProject = link.textContent ?? "";
        currentProjectText.textContent = Store.activeProject;

        currentProjectText.style.color = "var(--project-color)";
        projectBtn.style.color = "var(--project-color)";

        projectImg.innerHTML = `<div class='circle--red'></div>`;
        projectImg.style.width = "auto";
        projectImg.style.height = "auto";
        picker.classList.remove("active");
      });
    });
  }
};

// Re-render the project list whenever filter value is changed or the active project is changed.
subscribePrimitive("filter", renderProjectList);
subscribePrimitive("activeProject", renderProjectList);
