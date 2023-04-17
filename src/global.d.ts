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
  allProjects: string[];
  activeProject: string;
  filter: string;
  entries: {
    id: number;
    description: string;
    actualEffort: number[];
    billable: boolean;
    projectName: string;
    tags: string[];
  }[];
}
