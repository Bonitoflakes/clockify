import { Store, subscribe, subscribePrimitive } from "@store";

import { generateTimeTrackerRecorder } from "./generateRecorder";
import { initializeTimeTrackerRecorder } from "./initRecorder";

import { removeProjectPicker } from "./helper_PROJECT";
import { removeTagPicker } from "./helper_TAG";
import { updateStopwatchUI } from "./helper_STOPWATCH";

export { generateTimeTrackerRecorder, initializeTimeTrackerRecorder, removeTagPicker, removeProjectPicker };

// SUBSCRIPTIONS
subscribe(Store.timer, updateStopwatchUI); // update every second.
subscribePrimitive("timer", updateStopwatchUI); // update when timer is reset.
