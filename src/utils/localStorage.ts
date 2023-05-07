import { Store } from "@store";

export function saveToLocalStorage() {
  localStorage.setItem("entries", JSON.stringify(Store.entries));
  localStorage.setItem("tags", JSON.stringify(Store.allTags));
  localStorage.setItem("projects", JSON.stringify(Store.allProjects));
  localStorage.setItem("Store", JSON.stringify(Store));
}
