import { Store, subscribe } from "@store";
import { generateTrackerEntry } from "./trackerEntry";
import { renderEntries } from "./generateCard";

subscribe(Store.entries, () => {
  renderEntries();
});

export { generateTrackerEntry, renderEntries };
