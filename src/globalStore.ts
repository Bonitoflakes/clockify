import { createProxy, subscribe, subscribePrimitive } from "../R&D/proxy";

const Store: IStore = createProxy({
  isSidebarOpen: true,
  timer: [0, 0, 0],
  isTimerStarted: false,
  allProjects: ["apple", "banana"],
  activeProject: "",
  filter: "",
  meow: [],
});

export { Store, createProxy, subscribe, subscribePrimitive };
