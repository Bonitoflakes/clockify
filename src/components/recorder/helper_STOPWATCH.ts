import { Store } from "@store";
import { $, createElement } from "@utils";
import { discardEntry, resetStartButton, resetToggleButton, saveEntry } from "./helper_OTHERS";

let timerID: NodeJS.Timeout;

export const incrementTimer = () => {
  Store.timer[2]++;

  if (Store.timer[2] >= 60) {
    Store.timer[1]++;
    Store.timer[2] = 0;
  }

  if (Store.timer[1] >= 60) {
    Store.timer[0]++;
    Store.timer[1] = 0;
  }
};

export const updateStopwatchUI = () => {
  const timerUI = $("timetracker-recorder__timer");

  const hrs = Store.timer[0].toString().padStart(2, "0");
  const mins = Store.timer[1].toString().padStart(2, "0");
  const secs = Store.timer[2].toString().padStart(2, "0");

  timerUI.textContent = `${hrs}:${mins}:${secs}`;
  document.title = `${hrs}:${mins}:${secs} - Clockify`;
};

export const findTimeElapsed = () => {
  const hrs2secs = Store.timer[0] * 60 * 60;
  const mins2secs = Store.timer[1] * 60;
  const secs = Store.timer[2];
  return (hrs2secs + mins2secs + secs) * 1000;
};

const startStopwatch = (start: number) => {
  const BASE_INTERVAL = 1000;

  const current = performance.now();
  const elapsed = current - start;
  const drift = elapsed % BASE_INTERVAL;
  const nextTick = BASE_INTERVAL - drift;

  // console.log("drift", drift);
  // console.log("nextTick", nextTick);

  incrementTimer();

  timerID = setTimeout(() => startStopwatch(start), nextTick);
};

function wrapper(e: MouseEvent) {
  discardEntry(timerID);
  (e.currentTarget as HTMLElement).removeEventListener("click", wrapper);
}

export const handleStopwatch = () => {
  const start = performance.now();
  const X = $("timetracker-recorder__togglemode");

  Store.isTimerStarted = !Store.isTimerStarted;

  // If timer is started and running...
  if (Store.isTimerStarted) {
    startStopwatch(start);
    resetStartButton("stop", "var(--red-color)");

    X.replaceChildren(createElement("button", { class: ["discard-btn"] }, "X"));

    X.addEventListener("click", wrapper);
  }

  // If timer is stopped...
  if (!Store.isTimerStarted) {
    X.removeEventListener("click", wrapper);

    clearTimeout(timerID);
    saveEntry();

    resetToggleButton();
    resetStartButton("start", "var(--primary-color)");
  }
};
