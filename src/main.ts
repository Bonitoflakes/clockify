import "./styles/index.css";
import "./styles/nav.css";
import "./styles/sidebar.css";
import "./styles/timetracker-recorder.css";
import "./styles/projectPicker.css";
import "./styles/tagPicker.css";
import "./styles/trackerEntry.css";
import "./styles/toast.css";
import "./styles/animation.css";
import bulkEdit from "@assets/bulk-edit.svg";

import {
  generateNavbar,
  generateSidebar,
  generateTimeTrackerRecorder,
  generateTrackerEntry,
  initializeSidebar,
  initializeTimeTrackerRecorder,
} from "@components";

import { createElement, sidebarLinkData } from "@utils";

import { Store, subscribePrimitive } from "@store";
import { groupByDate, groupByWeekR } from "./utils/groupBy";
import { convertDateToString } from "./components/recorder/helper_OTHERS";
import { findFirstDayOfWeek, findLastDayOfWeek } from "./utils/getDates";

const app = document.getElementById("app")!;
const main = createElement("main", { class: ["main"] });
const toastContainer = createElement("div", { class: ["toast-container"] });

generateNavbar();
generateSidebar(sidebarLinkData).then(() => initializeSidebar());
generateTimeTrackerRecorder().then(() => initializeTimeTrackerRecorder());

app.append(main, toastContainer);

const root = document.querySelector(":root") as HTMLElement;

subscribePrimitive("isSidebarOpen", () => {
  root.style.setProperty("--tracker-margin-left", Store.isSidebarOpen ? "22rem" : "9rem");
  root.style.setProperty("--input-width", Store.isSidebarOpen ? "35rem" : "45rem");
});

const compareDate = (a: IEntry, b: IEntry) => {
  const aa = Date.parse(a.date);
  const bb = Date.parse(b.date);

  return bb - aa;
};

export const renderEntries = () => {
  main.replaceChildren();

  Store.entries.sort(compareDate);
  console.table(Store.entries);
  console.log("=============SORTED================");

  const data = groupByDate(Store.entries);
  console.table(data);
  console.log("==============GROUP BY DATE==================");

  const test = groupByWeekR(data);
  console.table(test);
  console.log("===============GROUP BY WEEK=============");

  for (const [weekDate, weekEntry] of Object.entries(test)) {
    const [weekCard] = generateWeekCard(weekDate);

    //  @ts-ignore
    for (const [cardDate, cardEntry] of weekEntry) {
      const [entryCard] = generateCard(cardDate);
      console.log(Array.isArray(cardEntry));
      console.log(cardEntry.length);

      for (const iterator of cardEntry) {
        const asdf = generateTrackerEntry(iterator);
        entryCard.append(asdf)
      }

      weekCard.append(entryCard);
    }

    main.append(weekCard);
  }

  // alert("Done Rendering....");
};

function generateCard(entryDate: string) {
  console.log("Date from generateCard", entryDate);

  const card = createElement("div", { class: ["card"] });
  const header = createElement("div", { class: ["card-header"] });

  const entryDate2String = convertDateToString(new Date(entryDate));
  const currentYear = new Date().getFullYear().toString();

  let entryDate2String_modifer = entryDate2String;

  if (entryDate.slice(0, 4) === currentYear) entryDate2String_modifer = entryDate2String.slice(0, 11);

  const date = createElement("p", { class: ["card-header__date"] }, entryDate2String_modifer);

  const totalWrapper = createElement("div", { class: ["card-header__total"] });

  const totalText = createElement("p", { class: ["card-header__text--total"] }, "total:");
  const totalTime = createElement("div", { class: ["card-header__text--time"] }, "00:00:04");
  const editButton = createElement("button", { class: ["card-header__button--edit"] });
  const editIcon = createElement("img", { class: ["card-header__button-img--edit"], src: bulkEdit });

  editButton.append(editIcon);
  totalWrapper.append(totalText, totalTime, editButton);
  header.append(date, totalWrapper);
  card.append(header);

  return [card, date];
}

function generateWeekCard(date: string) {
  const currentYear = new Date().getFullYear();
  const entryYear = new Date(date).getFullYear();

  const firstDate = findFirstDayOfWeek(date).toDateString().slice(4, 10);
  const lastDate = findLastDayOfWeek(date).toDateString().slice(4, 10);

  let weekString = `${firstDate} - ${lastDate}, ${entryYear}`;

  if (currentYear === entryYear) {
    weekString = `${firstDate} - ${lastDate}`;
  }

  const weekWrapper = createElement("div", { class: ["week"] });
  const weekHeader = createElement("div", { class: ["week-header"] });
  const week = createElement("p", { class: ["week-header__date"] }, weekString);

  const weektotalWrapper = createElement("div", { class: ["card-header__total"] });
  const weektotalText = createElement("p", { class: ["card-header__text--total"] }, "week total:");
  const weektotalTime = createElement("div", { class: ["card-header__text--time"] }, "00:10:04");

  weektotalWrapper.append(weektotalText, weektotalTime);
  weekHeader.append(week, weektotalWrapper);
  weekWrapper.append(weekHeader);

  return [weekWrapper, week];
}

renderEntries();
