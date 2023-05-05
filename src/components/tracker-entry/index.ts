import { Store, subscribe } from "@store";
import { generateTrackerEntry } from "./trackerEntry";
import { renderEntries } from "../../main";

// subscribe(Store.entries, () => {
//   renderEntries();
// });

export { generateTrackerEntry };
