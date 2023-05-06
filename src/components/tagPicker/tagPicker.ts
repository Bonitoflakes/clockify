import tagGray from "@assets/tag-gray.svg";

import { Store } from "@store";
import { createElement, $, $$ } from "@utils";
import { generateToast, removeTagPicker } from "@components";

import { __zeroMatch } from ".";

let textToBeModified: HTMLElement;
let entryToBeModifiedID: number | undefined;

export const initializeTagFilter = (textElement: HTMLElement, ID?: number) => {
  const tagInput = $("tag__picker__input") as HTMLInputElement;
  textToBeModified = textElement;
  entryToBeModifiedID = ID;

  tagInput.addEventListener("keyup", (e) => {
    const target = e.target as HTMLInputElement;
    Store.tagFilter = target.value;

    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      Store.activeTags.push(tagInput.value);
      Store.allTags.push({ tag: tagInput.value, isChecked: true });

      generateToast(`Tag ${tagInput.value} has been created.`, true);

      Store.tagFilter = "";
      tagInput.value = "";
    }

    if (e.key === "Escape") {
      removeTagPicker();
    }
  });
};

export const renderTag_BLUE = () => {
  const tagButton = textToBeModified;
  const firstChild = tagButton.children[0];

  if (firstChild.nodeName === "IMG" && Store.activeTags.length === 0) return;

  if (Store.activeTags.length === 0) {
    const tagImg = createElement("img", { src: tagGray });
    tagButton.replaceChild(tagImg, firstChild);
    return;
  }

  const buttonText: string = Store.activeTags.reduce((acc, curr) => `${acc}, ${curr}`);

  const text = createElement("p", { class: ["tracker-entry__tag-p--blue"] }, buttonText);

  tagButton.replaceChild(text, firstChild);
  // console.log("Active tags", Store.activeTags);
};

export const renderTagList = () => {
  const tagList = $("tag__projects_link-container");
  tagList?.replaceChildren();

  if (Store.allTags.length === 0 && !Store.tagFilter) {
    tagList.append(createElement("li", { class: ["tag__projects_link_default"] }, "No tags yet..."));
    return tagList.append(
      createElement("li", { class: ["tag__projects_link_default-child"] }, "Start typing to create one")
    );
  }

  // Filter iterates over every tag and checks if it's an active tag filter.
  const filteredTags = Store.allTags.filter(({ tag }) => tag.includes(Store.tagFilter));

  if (filteredTags.length === 0 && Store.tagFilter) {
    tagList.append(__zeroMatch());
    return;
  }

  /**
   * This is run only for the time-tracker-recorder.
   */
  if (!entryToBeModifiedID) {
    __generateCheckBox(filteredTags);
    return;
  }

  /**
   * This is run only for individual entries
   */
  __generateCheckBox(filteredTags, true);
};

const __generateCheckBox = (filteredTags: typeof Store.allTags, entryCheck = false) => {
  const tagList = $("tag__projects_link-container");

  const entry = Store.entries.find(({ id }) => entryToBeModifiedID === id);

  if (entryCheck && !entry) return;

  // renders the tags and updates the checkbox state.
  filteredTags.map(({ tag, isChecked }) => {
    const checkbox = createElement("input", {
      class: ["c_box"],
      type: "checkbox",
      id: tag,
    }) as HTMLInputElement;
    const label = createElement("label", { class: ["c_label"], for: tag }, tag);
    const c_wrap = createElement("div", { class: ["c_wrap"] });

    const isTagPresent = entry?.tags.includes(tag);

    if (entryCheck) {
      checkbox.checked = !!isTagPresent;
    } else {
      checkbox.checked = isChecked;
    }

    c_wrap.append(checkbox, label);
    tagList.append(c_wrap);
  });

  const allHTMLCheckBox = $$("c_box") as NodeListOf<HTMLInputElement>;

  // EVENT Listener.
  allHTMLCheckBox.forEach((tag) => {
    tag.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      if (!target.labels) return;

      let value: string;
      value = target.labels[0].outerText;

      const toUpdate = Store.allTags.find((tag) => tag.tag === value);

      if (target.checked) {
        Store.activeTags.push(value);
        !entryCheck ? (toUpdate!.isChecked = true) : (entry!.tags = Store.activeTags);
      }

      // checkbox unchecked and existing in activeTags, if so remove it from the activeTags
      if (!target.checked && Store.activeTags.includes(value)) {
        const updatedTags = Store.activeTags.filter((tag) => tag !== value);
        Store.activeTags = updatedTags;
        !entryCheck ? (toUpdate!.isChecked = false) : (entry!.tags = Store.activeTags);
      }
    });
  });
};
