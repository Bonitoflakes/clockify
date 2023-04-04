import "./styles/index.css";
import "./styles/nav.css";
import "./styles/sidebar.css";

// import { sidebarLinkData } from "./utils/fakeSidebar";


// const generateSidebarLinks = (linkData: ISidebarLinks[]) => {
//   return linkData.map((link) => {
//     if (link.name === "dashboard" || link.name === "projects") {
//       return `
//       <div class='sidebar__link-title'>${link.title}</div>
//       <a href="#" class="sidebar__link">
//       <img src='${link.img}' alt='${link.name}' class="sidebar__link-img" />
//       <span class="sidebar__link-text">${link.name}</span>
//     </a>`;
//     }

//     if (link.name === "reports") {
//       return `
//       <a href="#" class="sidebar__link" id="reports">
//       <img src="${link.img}" alt="reports" class="sidebar__link-img" />

//       <div class="sidebar__link-additional">
//         <span class="sidebar__link-text open">reports</span>
//         <img
//           src="/assets/chevron-down.svg"
//           class="sidebar__link-additional-chevron"
//         />
//       </div>

//       <div class="sidebar__link-additional-options">
//         <div class="additional-options__chevron">
//           <h1 class="dropdown-title">TIME</h1>
//           <p class="dropdown-link">Summary</p>
//           <p class="dropdown-link">Detailed</p>
//           <p class="dropdown-link">Weekly</p>
//           <p class="dropdown-link">Shared</p>
//           <h1 class="dropdown-title">TEAM</h1>
//           <p class="dropdown-link">Assignments</p>
//           <h1 class="dropdown-title">EXPENSE</h1>
//           <p class="dropdown-link">Detailed</p>
//         </div>
//       </div>
//     </a>
//     `;
//     }

//     return `<a href="#" class="sidebar__link">
//   <img src='${link.img}' alt='${link.name}' class="sidebar__link-img" />
//   <span class="sidebar__link-text">${link.name}</span>
// </a>`;
//   });
// };

const hamburgerMenu = document.querySelector(".nav__hamburger-link")!;
const sidebarContainer = document.querySelector(".sidebar")!;

// generateSidebarLinks(sidebarLinkData).map((element) => {
//   sidebarContainer.innerHTML += element;
// });

const sidebarLinksText = document.querySelectorAll(".sidebar__link-text");
const sidebarLinksTitle = document.querySelectorAll(".sidebar__link-title");
// const sidebarLinks = document.querySelectorAll(".sidebar__link");
const reportChevron = document.querySelector(".sidebar__link-additional-chevron");
const reportsLink = document.querySelector("#reports")!;
const additionalOptions = reportsLink.querySelector(".sidebar__link-additional-options") as HTMLElement;

let isOpen = true;

const toggleSidebar = () => {
  isOpen = !isOpen;
  sidebarContainer.classList.toggle("open");
  sidebarLinksText.forEach((element) => element.classList.toggle("open"));
  sidebarLinksTitle.forEach((element) => element.classList.toggle("open"));
  reportChevron?.classList.toggle("open");
};


hamburgerMenu.addEventListener("click", () => toggleSidebar());

reportsLink.addEventListener("mouseover", () => {
  additionalOptions.style.width = isOpen ? "80%" : "250%";
});

reportsLink.addEventListener("mouseout", () => {
  additionalOptions.style.width = "0";
});
