import "./styles/index.css";
import "./styles/nav.css";
import "./styles/sidebar.css";

import { useState } from "../R&D/index";
import { $ } from "./utils/query";

const hamburgerMenu = $("nav__hamburger-link")!;
const sidebarContainer = $("sidebar")!;
const sidebarLinksText = document.querySelectorAll("sidebar__link-text");
const sidebarLinksTitle = document.querySelectorAll("sidebar__link-title");
const reportChevron = $("sidebar__link-additional-chevron")!;
const reportsLink = document.querySelector("#reports")!;
const additionalOptions = $("sidebar__link-additional-options");


const [isOpenState, setIsOpenState, subscribe] = useState<ISidebar>({ value: true });

const toggleSidebar = () => {
  sidebarContainer.classList.toggle("open");
  sidebarLinksText.forEach((element) => element.classList.toggle("open"));
  sidebarLinksTitle.forEach((element) => element.classList.toggle("open"));
  reportChevron.classList.toggle("open");
};

// @ts-ignore
subscribe(toggleSidebar);

// @ts-ignore
hamburgerMenu.addEventListener("click", () => setIsOpenState({ value: !isOpenState.value }));

reportsLink.addEventListener("mouseover", () => {
  additionalOptions.style.width = isOpenState ? "80%" : "250%";
});

reportsLink.addEventListener("mouseout", () => {
  additionalOptions.style.width = "0";
});
