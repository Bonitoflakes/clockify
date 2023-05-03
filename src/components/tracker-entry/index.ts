import { Store, subscribe } from "@store";
import { generateTrackerEntry } from "./trackerEntry";

subscribe(Store.entries, () => {
  const compareDate = (a: IEntry, b: IEntry) => {
    const aa = Date.parse(a.date);
    const bb = Date.parse(b.date);

    return bb - aa;
  };

  Store.entries.sort(compareDate);

  generateTrackerEntry();
});

export { generateTrackerEntry };
