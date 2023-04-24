import { Store, subscribe, subscribePrimitive } from "@store";
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

  $("timetracker-recorder__tags-button")!.appendChild(picker);
};

export const initTagFilter = () => {
  const tagInput = $("tag__picker__input") as HTMLInputElement;

  tagInput.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    Store.tagFilter = target.value;
  });

  tagInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      console.log("Ctrl + Enter");
      Store.activeTags.push(tagInput.value);

      console.log(Store.activeTags);

      Store.allTags.push({ tag: tagInput.value, isChecked: true });
      Store.tagFilter = "";
      tagInput.value = "";
    }
  });
};

export const renderTagList = () => {
  const tagList = $("tag__projects_link-container");
  tagList.replaceChildren()

  if (Store.allTags.length === 0 && !Store.tagFilter) {
    tagList.append(createElement("li", { class: ["tag__projects_link_default"] }, "No tags yet..."));
    tagList.append(
      createElement("li", { class: ["tag__projects_link_default-child"] }, "Start typing to create one")
    );
    return "short-circuited";
  }

  const filteredTags = Store.allTags.filter(({ tag }) => tag.includes(Store.tagFilter));

  if (filteredTags.length === 0 && Store.tagFilter) {
    const defaultList = createElement("li", { class: ["projects_link_default"] });
    const defaultMsg = createElement("p", { class: ["projects_link_default-msg"] }, "No matching tags");
    const defaultSpan = createElement(
      "span",
      { class: ["projects_link_default-span"] },
      `Press Ctrl+Enter to quickly `
    );
    const defaultLink = createElement(
      "a",
      { class: ["projects_link_default-span-link"] },
      `create '${Store.tagFilter}' tag.`
    );
    defaultSpan.append(defaultLink);
    defaultList.append(defaultMsg, defaultSpan);
    tagList.append(defaultList);
    return "early-return";
  } else {
    // Filter iterates over every tag and checks if it's an active tag filter.

    filteredTags.length > 0 &&
      filteredTags.map(({ tag, isChecked }) => {
        const checkbox = createElement("input", { class: ["c_box"], type: "checkbox", id: tag });
        (checkbox as HTMLInputElement).checked = isChecked;
        const label = createElement("label", { class: ["c_label"], for: tag }, tag);
        const c_wrap = createElement("div", { class: ["c_wrap"] });
        c_wrap.append(checkbox, label);
        tagList.append(c_wrap);
      });

    const allHTMLCheckBox = $$("c_box") as NodeListOf<HTMLInputElement>;

    allHTMLCheckBox.forEach((tag) => {
      tag.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;

        let value: string;
        if (target.labels) {
          value = target.labels[0].outerText;
          //   console.log(value);
          if (target.checked) {
            Store.activeTags.push(value);
          }
          if (!target.checked && Store.activeTags.includes(value)) {
            const updatedTags = Store.activeTags.filter((tag) => tag !== value);
            console.log(updatedTags);
            Store.activeTags = updatedTags;
          }
        }

        Store.allTags.map((tag) => {
          if (tag.tag === value) {
            console.log(`TAG:`, tag.tag);
            tag.isChecked = !tag.isChecked;
          }
        });
      });
    });

    return "all done";
  }
};

export const renderTag = () => {
  const tagButton = $("timetracker-recorder__tags-button");
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

subscribePrimitive("tagFilter", renderTagList);
