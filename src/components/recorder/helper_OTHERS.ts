import { $ } from "@utils";
import { Store } from "@store";

import { generateToggleMode } from "./generateRecorder";

import { findTimeElapsed } from "./helper_STOPWATCH";
import { resetProjectButton } from "./helper_PROJECT";
import { resetTagButton } from "./helper_TAG";

export const resetToggleButton = () => {
  const X = $("timetracker-recorder__togglemode");
  X.replaceChildren(generateToggleMode());
};

export const resetStartButton = (text: string, color: string) => {
  const startButton = $("timetracker-recorder__start-button");
  startButton.textContent = text.toUpperCase();
  startButton.style.background = color;
};

export const resetRecorder = () => {
  const workData = $("timetracker-recorder__input") as HTMLInputElement; //Desc
  const billable = $("timetracker-recorder__price-button") as HTMLInputElement; // bill

  workData.value = ""; //desc
  billable.checked = false; //bill

  // stopwatch
  for (const key of Store.timer.keys()) {
    Store.timer[key] = 0;
  }

  resetProjectButton();
  resetTagButton();
  resetToggleButton();
  resetStartButton("start", "var(--primary)");
};

export const saveEntry = () => {
  const workData = $("timetracker-recorder__input") as HTMLInputElement; //Desc
  const billable = $("timetracker-recorder__price-button") as HTMLInputElement; // bill
  const now = Date.now(); //date

  console.log(now);
  console.log(findTimeElapsed());
  console.log(now - findTimeElapsed());

  const startTime = new Date(now - findTimeElapsed()).toTimeString().slice(0, 5);
  const endTime = new Date(now).toTimeString().slice(0, 5);

  console.log(startTime);
  console.log(endTime);

  // If all looks good, save the entry.
  Store.entries.push({
    id: 80,
    description: workData.value,
    actualEffort: Array.from(Store.timer),
    billable: billable.checked,
    projectName: Store.activeProject,
    tags: [...Store.activeTags],
    startTime: startTime,
    endTime: endTime,
    date: new Date().toLocaleDateString(),
  });

  resetRecorder();
  console.log(Store.entries);
};

export const discardEntry = (timerID: NodeJS.Timeout) => {
  resetRecorder();
  resetStartButton("start", "var(--primary)");
  resetToggleButton();

  // Store.isTimerStarted = true; //Stupid hack
  console.log("This should match After:", Store.isTimerStarted);
  Store.isTimerStarted = !Store.isTimerStarted;
  console.log("NEW After:", Store.isTimerStarted);

  clearTimeout(timerID);
};
