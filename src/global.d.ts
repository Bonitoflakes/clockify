interface ISidebarLinks {
  name: string;
  img: string;
  title?: string;
  subLinks?: {
    img: string;
    categories: {
      title: string;
      links: string[];
    }[];
  };
}

interface IStore {
  isSidebarOpen: boolean;
  timer: number[];
  isTimerStarted: boolean;
  allTags: {
    tag: string;
    isChecked: boolean;
  }[];
  allProjects: string[];
  activeProject: string;
  activeTags: string[];
  tagFilter: string;
  projectFilter: string;
  entries: {
    id: number;
    description: string;
    actualEffort: number[];
    billable: boolean;
    projectName: string;
    // tags: string[];
    tags: {
      tag: string;
      isChecked: boolean;
    }[];
    startTime: string;
    endTime: string;
    date: string;
  }[];
}
