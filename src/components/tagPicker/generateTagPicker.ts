import { createElement } from "@utils";

export const generateTagPicker = () => {
  const picker = createElement("div", { class: ["tag__picker"] });
  const wrapper = createElement("div", { class: ["tag__picker__wrapper"] });
  //
  //
  const inputWrapper = createElement("div", { class: ["tag__inputWrapper"] });
  const input = createElement("input", {
    class: ["tag__picker__input"],
    placeholder: "Add/Find tags...",
  });
  inputWrapper.appendChild(input);
  //
  //
  const clientSection = createElement("section", { class: ["tag__picker__list"] });
  const projectList = createElement("ul", { class: ["tag__projects_link-container"] });
  clientSection.appendChild(projectList);
  //
  //
  wrapper.append(inputWrapper, clientSection);
  picker.appendChild(wrapper);

  return picker;
};
