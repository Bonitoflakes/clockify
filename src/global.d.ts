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

interface Window {
  store: IStore;
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
  entries: IEntry[];
}

interface IEntry {
  id: number;
  description: string;
  actualEffort: number[];
  billable: boolean;
  projectName: string;
  tags: string[];
  startTime: number;
  endTime: number;
  date: string;
}
