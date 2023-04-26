import plusBlueReq from "@assets/plus-blue-req.svg";
import { $, createElement } from "@utils";

export const createCircle = () => {
  return createElement("div", { class: ["circle--red"] });
};

export const createProjectPlusIcon = () => {
  return createElement("img", {
    src: plusBlueReq,
    alt: "plus-img",
    class: ["newproject-button__img--plus"],
  });
};

export const closePicker = (e: any) => {
  const picker = $("project-picker");
  const projectButton = $("timetracker-recorder__newproject-button");

  if (!projectButton.contains(e.target)) {
    picker.remove();
    document.removeEventListener("click", closePicker);
  }
};
