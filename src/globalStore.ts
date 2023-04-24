import { createProxy, subscribe, subscribePrimitive } from "../R&D/proxy";

const Store: IStore = createProxy({
  isSidebarOpen: true,
  timer: [0, 0, 0],
  isTimerStarted: false,
  // allProjects: [],
  allProjects: ["apple", "banana"],
  // allTags: [],
  allTags: [
    { tag: "asdf", isChecked: false },
    { tag: "monkey", isChecked: false },
    { tag: "donkey", isChecked: false },
    { tag: "kong", isChecked: false },
    { tag: "mario", isChecked: false },
  ],
  activeProject: "",
  activeTags: [],
  tagFilter: "",
  projectFilter: "",
  entries: [
    {
      id: 1,
      description: "string",
      actualEffort: [1, 5, 58],
      billable: true,
      projectName:
        "testProjecttestProjecttestProjecttestProjecttestProjecttestProjecttestProjecttestProjecttestProjecttestProjecttestProject",
      tags: ["tag1", "tag2", "tag1", "tag2", "tag1", "tag2", "tag1", "tag2", "tag1", "tag2", "tag1", "tag2"],
      startTime: "10:10",
      endTime: "11:28",
      date: "2023-02-18",
    },
    {
      id: 2,
      description: "string",
      actualEffort: [108, 55, 58],
      billable: true,
      projectName: "ertyukl; uyiguhkjlkm",
      tags: ["tag1", "tag2", "3", "4"],
      startTime: "20:45",
      endTime: "11:28",
      date: "1979-02-18",
    },
  ],
  // entries: [],
});

export { Store, createProxy, subscribe, subscribePrimitive };
