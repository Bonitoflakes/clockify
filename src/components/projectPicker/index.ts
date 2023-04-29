import { subscribePrimitive } from "@store";

import { initializeProjectPicker, renderProjectList, __updateProjectStatus } from "./projectPicker";
import { __zeroMatch } from "./noMatch";
import { generateProjectPicker } from "./generateProjectPicker";

// Re-render the project list whenever filter value is changed or the active project is changed.
subscribePrimitive("projectFilter", renderProjectList);

export {
  __zeroMatch,
  generateProjectPicker,
  __updateProjectStatus,
  initializeProjectPicker,
  renderProjectList,
};
