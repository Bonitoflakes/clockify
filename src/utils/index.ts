import { createElement } from "./create";
import { $$, $, findEntry } from "./query";
import { stopPropagation, stopSpacePropagation } from "./bubbles";
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage";
import { groupByDate, groupByWeek } from "./groupBy";
import { findMonday, findSunday } from "./getDates";

import { sidebarLinkData } from "./fakeSidebar";
import { createCircle, createProjectPlusIcon, createTagIcon, generateLine } from "./red-circle";
import { customLog } from "./proxyLogger";

export {
  sidebarLinkData,
  createElement,
  stopSpacePropagation,
  stopPropagation,
  customLog,
  $,
  $$,
  createCircle,
  createProjectPlusIcon,
  createTagIcon,
  generateLine,
  findEntry,
  groupByDate,
  groupByWeek,
  findMonday,
  findSunday,
  saveToLocalStorage,
  loadFromLocalStorage,
};
