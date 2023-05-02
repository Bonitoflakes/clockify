import tagGray from "@assets/tag-gray.svg";
import { Store } from "@store";
import { stopPropagation, stopSpacePropagation, $, createElement, $$, createTagIcon } from "@utils";

import { generateTagPicker, initializeTagFilter, renderTag_BLUE, renderTagList } from "@components";

export const handleTPClick = (e: MouseEvent, id?: number) => {
  const ex = $("tag__picker");

  const target = e.target as HTMLElement;
  const firstChild = (e.currentTarget as Node).firstChild;

  const entryTags = firstChild?.nodeName === "IMG" ? [] : firstChild?.textContent?.split(", ");
  Store.activeTags = entryTags ?? [];
  // console.log(Store.activeTags);

  if (target.offsetParent?.contains(ex)) return ex.remove();

  if (ex) {
    Store.tagFilter = "";
    ex.remove();
    renderTag_BLUE();
  }

  const picker = generateTagPicker();
  (e.currentTarget as HTMLElement).append(picker);
  initializeTagFilter(e.currentTarget as HTMLElement, id);
  renderTagList();
  const tagInput = $("tag__picker__input") as HTMLInputElement;
  // FIX:
  // tagInput.focus();

  picker.addEventListener("click", stopPropagation);
  picker.addEventListener("keyup", stopSpacePropagation);
  e.stopPropagation();
  document.addEventListener("click", removeTagPicker);
};

export const handleTPBlur = (e: FocusEvent) => {
  const isChild = (e.currentTarget as HTMLButtonElement).contains(e.relatedTarget as Node);
  if (isChild) return;

  console.log("TP BLURRRR");

  removeTagPicker();
};

export const removeTagPicker = () => {

  renderTag_BLUE();

  const picker = $("tag__picker");
  Store.tagFilter = "";
  // Store.activeTags = [];

  if (picker) picker.remove();
  document.removeEventListener("click", removeTagPicker);
};

export const resetTagButton = () => {
  const tagButton = $("timetracker-recorder__tags-button");
  const firstChild = tagButton.children[0];
  const tagImg = createTagIcon();

  ($$("c_box") as NodeListOf<HTMLInputElement>).forEach((item) => (item.checked = false));

  Store.allTags.map((tag) => (tag.isChecked = false));

  Store.activeTags = [];

  tagButton.replaceChild(tagImg, firstChild);
};
