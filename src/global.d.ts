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
