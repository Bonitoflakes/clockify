import { createProxy, subscribe, subscribePrimitive } from "../R&D/proxy";

const Store: IStore = createProxy({
  isSidebarOpen: false,
  timer: [0, 0, 0],
  isTimerStarted: false,
  allProjects: ["apple", "banana"],
  activeProject: "",
  filter: "",
  entries: [
    {
      id: 1,
      description: "string",
      actualEffort: [1, 5, 58],
      billable: true,
      projectName:
        "testProjecttestProjecttestProjecttestProjecttestProjecttestProjecttestProjecttestProjecttestProjecttestProjecttestProject",
      tags: ["tag1", "tag2", "tag1", "tag2", "tag1", "tag2", "tag1", "tag2", "tag1", "tag2", "tag1", "tag2"],
    },
    {
      id: 2,
      description: "",
      actualEffort: [180, 5, 58],
      billable: false,
      projectName: "rrr",
      tags: ["tag1", "tag2", "tag1", "tag2", "tag1", "tag2", "tag1", "tag2", "tag1", "tag2", "tag1", "tag2"],
    },
    {
      id: 3,
      description: "Mere samne wale kidhi me kabhi pyaaj milta he",
      actualEffort: [180, 5, 58],
      billable: false,
      projectName: "rrr",
      tags: ["tag1", "tag2", "tag1", "tag2", "tag1", "tag2", "tag1", "tag2", "tag1", "tag2", "tag1", "tag2"],
    },
  ],
});

export { Store, createProxy, subscribe, subscribePrimitive };
