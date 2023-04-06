import "./styles/index.css";
import "./styles/nav.css";
import "./styles/sidebar.css";

import { generateSidebar, initializeSidebar } from "./components/sidebar";
import { sidebarLinkData } from "./utils/fakeSidebar";
import { generateNavbar } from "./components/navbar";

generateNavbar();
generateSidebar(sidebarLinkData).then(() => initializeSidebar());
