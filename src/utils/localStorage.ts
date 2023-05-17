import { Store } from "@store";

export function saveToLocalStorage() {
  localStorage.setItem("entries", JSON.stringify(Store.entries));
  localStorage.setItem("tags", JSON.stringify(Store.allTags));
  localStorage.setItem("projects", JSON.stringify(Store.allProjects));
  localStorage.setItem("Store", JSON.stringify(Store));
}

export const loadFromLocalStorage = () => {
  const allEntries = JSON.parse(localStorage.getItem("entries") ?? "[]");
  const allTags = JSON.parse(localStorage.getItem("tags") ?? "[]");
  const allProjects = JSON.parse(localStorage.getItem("projects") ?? "[]");

  Store.entries = allEntries;
  Store.allTags = allTags;
  Store.allProjects = allProjects;
};
