import { createProxy, subscribe, subscribePrimitive } from "../R&D/proxy2";

const Store = createProxy({
  isSidebarOpen: true,
  timer: [0, 0, 0],
  isTimerStarted: false,
  allProjects: [],
  activeProject: "",
  filter: "",
  meow: [],
});

export { Store, createProxy, subscribe, subscribePrimitive };
