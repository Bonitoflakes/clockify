import { createElement } from "../utils/create";
import hamburger from "../../assets/hamburger.svg";
import logo from "../../assets/logo.svg";
import clients from "../../assets/clients.svg";
import help from "../../assets/help.svg";
import notifications from "../../assets/notification.svg";

export const generateNavbar = () => {
  const nav = createElement("nav", { class: ["nav"] });

  const leftDiv = createElement("div", { class: ["nav__left"] });
  const hamburgerBtn = createElement("button", { class: ["nav__hamburger-link"] });
  const hamburgerImg = createElement("img", { src: hamburger, alt: "Toggle Sidebar" });
  const logoLink = createElement("a", { href: "#", class: ["nav__logo"] });
  const logoImg = createElement("img", { src: logo, alt: "Clockify" });

  hamburgerBtn.appendChild(hamburgerImg);
  leftDiv.appendChild(hamburgerBtn);
  leftDiv.appendChild(logoLink);
  logoLink.appendChild(logoImg);

  const rightDiv = createElement("div", { class: ["nav__right"] });

  const workspaceP = createElement("p", { class: ["nav__user-workspace"] }, "19-uca-004's workspace");
  const upgradeLink = createElement("a", { class: ["nav__btn-upgrade"] }, "upgrade");

  rightDiv.appendChild(workspaceP);
  rightDiv.appendChild(upgradeLink);

  const lineDiv1 = createElement("div", { class: ["nav__line"] });
  const lineDiv2 = createElement("div", { class: ["nav__line"] });
  const lineDiv3 = createElement("div", { class: ["nav__line"] });
  const helpDiv = createElement("a", { href: "#", class: ["nav__help"] });
  const helpImg = createElement("img", { src: help, alt: "Clockify" });
  const notificationLink = createElement("a", { href: "#", class: ["nav__notification"] });
  const notificationImg = createElement("img", { src: notifications, alt: "Clockify" });
  const userProfileDiv = createElement("div", { class: ["nav__user-profile"] });
  const userProfileImg = createElement("img", { src: clients, alt: "user-profile" });

  rightDiv.appendChild(lineDiv1);
  rightDiv.appendChild(helpDiv);
  helpDiv.appendChild(helpImg);

  rightDiv.appendChild(lineDiv2);
  rightDiv.appendChild(notificationLink);
  notificationLink.appendChild(notificationImg);

  rightDiv.appendChild(lineDiv3);
  rightDiv.appendChild(userProfileDiv);
  userProfileDiv.appendChild(userProfileImg);

  nav.append(leftDiv, rightDiv);
  document.querySelector("#app")?.append(nav);
};
