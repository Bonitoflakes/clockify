import { createProxy, subscribe, subscribePrimitive } from "../R&D/proxy";

const Store: IStore = createProxy({
  isSidebarOpen: true,
  timer: [0, 0, 0],
  isTimerStarted: false,

  activeProject: "",
  activeTags: [],
  tagFilter: "",
  projectFilter: "",
  // allProjects: [],
  // allTags: [],
  // entries: [],
  allProjects: ["Apple", "Banana", "Mapple Syrup", "Meow"],
  allTags: [
    { tag: "asdf", isChecked: false },
    { tag: "monkey", isChecked: false },
    { tag: "donkey", isChecked: false },
    { tag: "kong", isChecked: false },
    { tag: "mario", isChecked: false },
  ],
  entries: [
    {
      id: 1,
      description: "Hey Lord,",
      actualEffort: [1, 5, 58],
      billable: true,
      projectName: "Apple",
      tags: ["asdf", "monkey"],
      startTime: "10:10",
      endTime: "11:28",
      date: "2023-02-18",
    },
    {
      id: 2,
      description: "you know I'm tired",
      actualEffort: [18, 55, 58],
      billable: true,
      projectName: "Mapple Syrup",
      tags: ["asdf", "mario"],
      startTime: "20:45",
      endTime: "11:28",
      date: "1979-02-18",
    },
    {
      id: 3,
      description: "Now the tide is",
      actualEffort: [10, 55, 0],
      billable: true,
      projectName: "Meow",
      tags: [],
      startTime: "20:45",
      endTime: "11:28",
      date: "1979-02-18",
    },
    {
      id: 4,
      description: "rolling",
      actualEffort: [108, 55, 58],
      billable: true,
      projectName: "Meow",
      tags: [],
      startTime: "20:45",
      endTime: "11:28",
      date: "1979-02-18",
    },
  ],
});

// const Store: IStore = createProxy({
//   isSidebarOpen: true,
//   timer: [0, 0, 0],
//   isTimerStarted: false,
//   allProjects: [],
//   allTags: [],
//   activeProject: "",
//   activeTags: [],
//   tagFilter: "",
//   projectFilter: "",
//   entries: [],
// });

export { Store, createProxy, subscribe, subscribePrimitive };
