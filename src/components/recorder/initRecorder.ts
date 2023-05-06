import { $ } from "@utils";

import { handlePPBlur, handlePPClick } from "./helper_PROJECT";
import { handleTPBlur, handleTPClick } from "./helper_TAG";
import { handleStopwatch } from "./helper_STOPWATCH";

export const initializeTimeTrackerRecorder = () => {
  const startButton = $("timetracker-recorder__start-button");
  const projectButton = $("timetracker-recorder__newproject-button");
  const tagButton = $("timetracker-recorder__tags-button");

  // EVENT LISTENERS
  startButton.addEventListener("click", () => handleStopwatch());

  projectButton.addEventListener("click", (e) => handlePPClick(e, $("newproject-button-text")));
  projectButton.addEventListener("blur", handlePPBlur);

  tagButton.addEventListener("click", (e) => handleTPClick(e));
  tagButton.addEventListener("blur", handleTPBlur); // just for one edge case🥲
};
