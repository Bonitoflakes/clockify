import { Store, subscribe } from "@store";
import { generateTrackerEntry } from "./trackerEntry";

subscribe(Store.entries, generateTrackerEntry);

export { generateTrackerEntry };
