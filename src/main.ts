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
    if (link.name === "dashboard" || link.name === "projects") {
      return `
      <div class='sidebar__link-title'>${link.title}</div>
      <a href="#" class="sidebar__link">
      <img src='${link.img}' alt='${link.name}' class="sidebar__link-img" />
      <span class="sidebar__link-text">${link.name}</span>
    </a>`;
    }

    // if (link.name === "reports") {
    //   return `<a href="#" class="sidebar__link" id="${link.name}">
    //   <img src="${link.img}" alt="${link.name}" class="sidebar__link-img" />
    
    //   <div class="sidebar__link-additional">
    //     <span class="sidebar__link-text open">${link.name}</span>
    //     <img src="/assets/chevron-down.svg" class="sidebar__link-additional-chevron" />
    //   </div>
    

    // </a>
    
    // `;
    // }

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
const sidebarLinksTitle = document.querySelectorAll<HTMLDivElement>(".sidebar__link-title");
const sidebarLinks = document.querySelectorAll<HTMLAnchorElement>(".sidebar__link");

let isOpen = true;

const toggleSidebar = () => {
  sidebarContainer.classList.toggle("open");
  sidebarLinksText.forEach((element) => element.classList.toggle("open"));
  sidebarLinksTitle.forEach((element) => element.classList.toggle("open"));
};

isOpen ? toggleSidebar() : null;

hamburgerMenu.addEventListener("click", () => toggleSidebar());

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
