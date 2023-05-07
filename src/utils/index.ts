import { createElement } from "./create";
import { stopPropagation, stopSpacePropagation } from "./closeElement";
import { sidebarLinkData } from "./fakeSidebar";
import { customLog } from "./proxyLogger";
import { $$, $, findEntry } from "./query";
import { createCircle, createProjectPlusIcon, createTagIcon } from "./red-circle";
import { groupByDate, groupByWeek } from "./groupBy";
import { findFirstDayOfWeek, findLastDayOfWeek } from "./getDates";
import { saveToLocalStorage } from './localStorage';

export {
  createElement,
  stopSpacePropagation,
  stopPropagation,
  sidebarLinkData,
  customLog,
  $,
  $$,
  createCircle,
  createProjectPlusIcon,
  createTagIcon,
  findEntry,
  groupByDate,
  groupByWeek,
  findFirstDayOfWeek,
  findLastDayOfWeek,
  saveToLocalStorage
};
