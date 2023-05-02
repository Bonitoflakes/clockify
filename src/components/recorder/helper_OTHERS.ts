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
  const desc = $("timetracker-recorder__input") as HTMLInputElement; //Desc
  const billable = $("timetracker-recorder__price-button") as HTMLInputElement; // bill

  desc.value = ""; //desc
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
  const desc = $("timetracker-recorder__input") as HTMLInputElement; //Desc
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
    id: Math.ceil(Math.random() * 100000000),
    description: desc.value,
    actualEffort: Array.from(Store.timer),
    billable: billable.checked,
    projectName: Store.activeProject,
    tags: [...Store.activeTags],
    startTime: now - findTimeElapsed(),
    endTime: now,
    date: new Date().toLocaleDateString(),
  });

  resetRecorder();
  console.log(Store.entries);
};

export const discardEntry = (timerID: NodeJS.Timeout) => {
  resetRecorder();
  resetStartButton("start", "var(--primary)");
  resetToggleButton();

  // console.log("This should match After:", Store.isTimerStarted);
  Store.isTimerStarted = !Store.isTimerStarted;
  // console.log("NEW After:", Store.isTimerStarted);

  clearTimeout(timerID);
};
