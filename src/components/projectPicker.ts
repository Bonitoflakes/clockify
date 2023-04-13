import { createElement, $ } from "@utils";
import plusBlueReq from "@assets/plus-blue-req.svg";

export const generatePicker = () => {
  const picker = createElement("div", { class: ["picker"] });
  const wrapper = createElement("div", { class: ["picker__wrapper"] });

  const inputWrapper = createElement("div", { class: ["inputWrapper"] });
  const input = createElement("input", {
    class: ["picker__input"],
    placeholder: "Find project or client...",
  });

  inputWrapper.appendChild(input);

  const clientSection = createElement("section", { class: ["picker__list"] }, "No projects yet");

  const plusIcon = createElement("img", { src: plusBlueReq });
  const plusIconSpan = createElement("span", { class: ["plusIconSpan"] });
  const createBtn = createElement("button", { class: ["picker__newproject-btn"] }, "Create new project");

  plusIconSpan.append(plusIcon);
  createBtn.insertBefore(plusIconSpan, createBtn.firstChild);

  wrapper.append(inputWrapper, clientSection, createBtn);
  picker.appendChild(wrapper);
  $("timetracker-recorder__newproject-button")!.appendChild(picker);
};
