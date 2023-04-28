import { Store, subscribePrimitive } from "@store";
import { createElement, $, $$ } from "@utils";
import tagGray from "@assets/tag-gray.svg";

export const generateTagPicker = () => {
  const picker = createElement("div", { class: ["tag__picker"] });
  const wrapper = createElement("div", { class: ["tag__picker__wrapper"] });

  const inputWrapper = createElement("div", { class: ["tag__inputWrapper"] });
  const input = createElement("input", {
    class: ["tag__picker__input"],
    placeholder: "Add/Find tags...",
  });
  inputWrapper.appendChild(input);

  const clientSection = createElement("section", { class: ["tag__picker__list"] });
  const projectList = createElement("ul", { class: ["tag__projects_link-container"] });
  clientSection.appendChild(projectList);
  //
  //

  wrapper.append(inputWrapper, clientSection);
  picker.appendChild(wrapper);

  return picker;
};

let textToBeModified: HTMLElement;
let entryToBeModifiedID: number | undefined;

export const initTagFilter = (textElement: HTMLElement, ID?: number) => {
  const tagInput = $("tag__picker__input") as HTMLInputElement;
  textToBeModified = textElement;
  entryToBeModifiedID = ID;

  tagInput.addEventListener("keyup", (e) => {
    const target = e.target as HTMLInputElement;
    Store.tagFilter = target.value;

    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      console.log("Ctrl + Enter");
      Store.activeTags.push(tagInput.value);

      Store.allTags.push({ tag: tagInput.value, isChecked: true });
      Store.tagFilter = "";
      tagInput.value = "";
    }
  });
};

export const renderTagList = () => {
  const tagList = $("tag__projects_link-container");
  tagList?.replaceChildren();

  // FIX:
  if (Store.allTags.length === 0 && !Store.tagFilter) {
    tagList.append(createElement("li", { class: ["tag__projects_link_default"] }, "No tags yet..."));
    tagList.append(
      createElement("li", { class: ["tag__projects_link_default-child"] }, "Start typing to create one")
    );
    return;
  }

  // Filter iterates over every tag and checks if it's an active tag filter.
  let filteredTags = Store.allTags.filter(({ tag }) => tag.includes(Store.tagFilter));

  if (filteredTags.length === 0 && Store.tagFilter) {
    tagList.append(showUnmatched());
    return;
  }

  if (entryToBeModifiedID) {
    const entry = Store.entries.find(({ id }) => entryToBeModifiedID === id);
    console.table(entry);
    if (entry) {
      filteredTags = entry.tags;
    }
  }

  if (filteredTags.length > 0) {
    filteredTags.map(({ tag, isChecked }) => {
      const checkbox = createElement("input", {
        class: ["c_box"],
        type: "checkbox",
        id: tag,
      }) as HTMLInputElement;
      const label = createElement("label", { class: ["c_label"], for: tag }, tag);
      const c_wrap = createElement("div", { class: ["c_wrap"] });

      checkbox.checked = isChecked;
      c_wrap.append(checkbox, label);
      tagList.append(c_wrap);
    });
  }

  const allHTMLCheckBox = $$("c_box") as NodeListOf<HTMLInputElement>;

  allHTMLCheckBox.forEach((tag) => {
    tag.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      if (!target.labels) return;

      let value: string;
      value = target.labels[0].outerText;

      if (target.checked) {
        Store.activeTags.push(value);
      }

      // checkbox unchecked and existing in activeTags, if so remove it from the activeTags
      if (!target.checked && Store.activeTags.includes(value)) {
        const updatedTags = Store.activeTags.filter((tag) => tag !== value);
        Store.activeTags = updatedTags;
      }

      Store.allTags.map((tag) => {
        if (tag.tag === value) {
          tag.isChecked = !tag.isChecked;
        }
      });
      //
    });
  });
};

export const renderTag = () => {
  // const tagButton = $("timetracker-recorder__tags-button");
  const tagButton = textToBeModified;
  const firstChild = tagButton.children[0];

  if (Store.activeTags.length === 0) {
    const tagImg = createElement("img", { src: tagGray });
    tagButton.replaceChild(tagImg, firstChild);
    return;
  }

  const buttonText: string = Store.allTags.reduce((acc, curr) => {
    if (curr.isChecked) {
      if (acc.length === 0) {
        return curr.tag;
      } else {
        return acc + ", " + curr.tag;
      }
    }
    return acc;
  }, "");

  const text = createElement("p", { class: ["tracker-entry__tag-p--blue"] }, buttonText);

  tagButton.replaceChild(text, firstChild);
  console.log("Active tags", Store.activeTags);
};

const showUnmatched = () => {
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
    //  TODO:
  });

  return defaultList;
};

subscribePrimitive("tagFilter", renderTagList);
