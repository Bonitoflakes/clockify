import { generateToast } from "@components";
import { Store } from "@store";
import { $, createElement } from "@utils";

export const __zeroMatch = () => {
  const defaultList = createElement("ol", { class: ["project-picker__link--default"] });
  const defaultMsg = createElement("p", { class: ["project-picker__link--default-msg"] }, "No matching tags");
  const defaultSpan = createElement(
    "span",
    { class: ["project-picker__link--default-span"] },
    `Press Ctrl+Enter to quickly `
  );
  const defaultLink = createElement(
    "a",
    { class: ["project-picker__link--default-link"] },
    `create '${Store.tagFilter}' tag.`
  );
  defaultSpan.append(defaultLink);
  defaultList.append(defaultMsg, defaultSpan);

  // EVENT Listeners
  defaultLink.addEventListener("mousedown", () => {
    const tagInput = $("tag__picker__input") as HTMLInputElement;
    Store.activeTags.push(Store.tagFilter);
    Store.allTags.push({ tag: tagInput.value, isChecked: true });

    generateToast(`Tag ${tagInput.value} has been created.`, true);

    tagInput.value = "";
    Store.tagFilter = "";
  });

  return defaultList;
};
