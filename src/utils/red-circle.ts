import { createElement } from "./create";
import plusBlueReq from "@assets/plus-blue-req.svg";

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

