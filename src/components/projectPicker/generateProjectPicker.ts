import { createElement, createProjectPlusIcon } from "@utils";

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
