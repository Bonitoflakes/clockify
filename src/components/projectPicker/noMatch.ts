import { Store } from "@store";
import { createElement } from "@utils";
import { __updateProjectStatus } from ".";

export const __zeroMatch = (textToBeModified: HTMLElement) => {
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
    __updateProjectStatus(textToBeModified);
  });

  return defaultList;
};
