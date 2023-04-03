import "./styles/index.css";
import "./styles/nav.css";
import "./styles/sidebar.css";

import { sidebarLinkData } from "./utils/fakeSidebar";

/**
createElement(
  "div",
  {
    id: "divone",
    click: function () {
      alert("hello");
    },
  },
  "Hello World!!",
  document.querySelector<HTMLDivElement>("#app")!
);
createElement(
  "img",
  { class: "logo vanilla", src: `${typescriptLogo}` },
  null,
  document.querySelector<HTMLDivElement>("#app")!
);
createElement(
  "div",
  {
    id: "divone",
    click: function () {
      alert("hello");
    },
  },
  null,
  document.querySelector<HTMLDivElement>("#app")!
);
 */

const generateSidebarLinks = (linkData: ISidebarLinks[]) => {
  return linkData.map((link) => {
    return `<a href="#" class="sidebar__link">
  <img src='${link.img}' alt='${link.name}' class="sidebar__link-img" />
  <span class="sidebar__link-text">${link.name}</span>
</a>`;
  });
};

const hamburgerMenu = document.querySelector<HTMLButtonElement>(".nav__hamburger-link")!;
const sidebarContainer = document.querySelector(".sidebar")!;

generateSidebarLinks(sidebarLinkData).map((element) => {
  sidebarContainer.innerHTML += element;
});

const sidebarLinksText = document.querySelectorAll<HTMLSpanElement>(".sidebar__link-text");
const sidebarLinks = document.querySelectorAll<HTMLSpanElement>(".sidebar__link");

hamburgerMenu.addEventListener("click", () => {
  sidebarContainer.classList.toggle("closed");
  sidebarLinksText.forEach((element) => element.classList.toggle("closed"));
});

// TODO: 
sidebarLinks.forEach((element) =>
  element.addEventListener("click", (e) => {
    RemoveOldActiveState();
    const target = e.target as Element;
    console.log(target);
    target.classList.add("active");
  })
);

function RemoveOldActiveState() {
  sidebarLinks.forEach((element) => element.classList.remove("active"));
}
