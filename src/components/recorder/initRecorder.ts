import { Store, subscribe, subscribePrimitive } from "@store";
import { $ } from "@utils";

import { handlePPBlur, handlePPClick } from "./helper_PROJECT";
import { handleTPClick } from "./helper_TAG";
import { handleStopwatch, updateStopwatchUI } from "./helper_STOPWATCH";

export const initializeTimeTrackerRecorder = () => {
  const startButton = $("timetracker-recorder__start-button");
  const projectButton = $("timetracker-recorder__newproject-button");
  const tagButton = $("timetracker-recorder__tags-button");

  // SUBSCRIPTIONS
  subscribe(Store.timer, updateStopwatchUI); // update every second.
  subscribePrimitive("timer", updateStopwatchUI); // update when timer is reset.

  // EVENT LISTENERS
  startButton.addEventListener("click", () => handleStopwatch());

  projectButton.addEventListener("click", (e) => handlePPClick(e, $("newproject-button-text")));
  projectButton.addEventListener("blur", handlePPBlur);

  tagButton.addEventListener("click", (e) => handleTPClick(e));
};
