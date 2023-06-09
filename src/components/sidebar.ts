import { subscribePrimitive, Store } from "@store";
import { createElement, $, $$ } from "@utils";

// Helper functions
const generateLink = (id?: string) => {
  if (id) {
    return createElement("a", { href: "#", class: ["sidebar__link"], id });
  }
  return createElement("a", { href: "#", class: ["sidebar__link"] });
};
const generateTitle = (title: string) =>
  createElement("div", { class: ["sidebar__link-title", "open"] }, title);

const generateImg = (src: string, alt: string) =>
  createElement("img", {
    src,
    alt,
    class: ["sidebar__link-img"],
  });
const generateText = (text: string) => createElement("span", { class: ["sidebar__link-text", "open"] }, text);

// Generate a new sideBar.
export const generateSidebar = (data: ISidebarLinks[]) => {
  const sidebar = createElement("div", { class: ["sidebar", "open"] });

  data.forEach(({ title, name, img, subLinks }) => {
    if (title) {
      const sidebarlinkTitle = generateTitle(title);
      sidebar.appendChild(sidebarlinkTitle);
    }

    if (subLinks) {
      const sidebarLink = generateLink("reports");
      const sidebarImg = generateImg(img, name);
      const sidebarLinkText = generateText(name);

      const sidebarLinkAdditonal = createElement("div", { class: ["sidebar__link-additional"] });

      const sidebarLinkAdditonalChevron = createElement("img", {
        src: subLinks.img,
        class: ["sidebar__link-additional-chevron"],
      });

      const sidebarLinkAdditionalOptions = createElement("div", {
        class: ["sidebar__link-additional-options"],
      });

      const sidebarLinkAdditionalOptionsChevron = createElement("div", {
        class: ["additional-options__chevron"],
      });

      for (const category of subLinks.categories) {
        const categoryTitle = createElement("h1", { class: ["dropdown-title"] }, category.title);
        sidebarLinkAdditionalOptionsChevron.appendChild(categoryTitle);

        for (const name of category.links) {
          const categoryText = createElement("p", { class: ["dropdown-link"] }, name);
          sidebarLinkAdditionalOptionsChevron.appendChild(categoryText);
        }
      }

      sidebarLinkAdditionalOptions.appendChild(sidebarLinkAdditionalOptionsChevron);
      sidebarLinkAdditonal.append(sidebarLinkText, sidebarLinkAdditonalChevron);
      sidebarLink.append(sidebarImg, sidebarLinkAdditonal, sidebarLinkAdditionalOptions);
      sidebar.appendChild(sidebarLink);
      return;
    }

    const sidebarLink = generateLink();
    const sidebarImg = generateImg(img, name);
    const sidebarLinkText = generateText(name);

    sidebarLink.append(sidebarImg, sidebarLinkText);
    sidebar.appendChild(sidebarLink);
    document.querySelector("#app")?.appendChild(sidebar);
  });
  return Promise.resolve();
};

export const initializeSidebar = () => {
  const hamburgerMenu = $("nav__hamburger-link")!;
  const sidebarContainer = $("sidebar")!;
  const sidebarLinksText = $$("sidebar__link-text");
  const sidebarLinksTitle = $$("sidebar__link-title");
  const reportChevron = $("sidebar__link-additional-chevron")!;
  const reportsLink = document.querySelector("#reports")!;
  const additionalOptions = $("sidebar__link-additional-options");

  const toggleSidebar = () => {
    sidebarContainer.classList.toggle("open");
    sidebarLinksText.forEach((element) => element.classList.toggle("open"));
    sidebarLinksTitle.forEach((element) => element.classList.toggle("open"));
    reportChevron.classList.toggle("open");
  };

  // SUBSCRIPTIONS
  subscribePrimitive("isSidebarOpen", toggleSidebar);

  // EVENTS

  hamburgerMenu.addEventListener("click", () => (Store.isSidebarOpen = !Store.isSidebarOpen));

  // FIX: CSS z-index
  reportsLink.addEventListener("mouseover", () => {
    additionalOptions.style.width = Store.isSidebarOpen ? "80%" : "250%";
  });

  reportsLink.addEventListener("mouseout", () => {
    additionalOptions.style.width = "0";
  });
};
