import plusBlueReq from "@assets/plus-blue-req.svg";
import tagGray from "@assets/tag-gray.svg";

import { createElement } from "@utils";

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

export const createTagIcon = () => {
  return createElement("img", {
    src: tagGray,
    alt: "plus-img",
    class: ["newproject-button__img--plus"],
  });
};
