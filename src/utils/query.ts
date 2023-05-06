import { Store } from "@store";

export const $ = (className: string): HTMLElement => document.querySelector(`.${className}`)!;

export const $$ = (className: string): NodeListOf<Element> => document.querySelectorAll(`.${className}`)!;

export const findEntry = (id: number) => {
  const entry = Store.entries.find(({ id: e_id }) => id === e_id);
  if (!entry) throw new Error("Entry not found!!, please check the ID");

  return entry;
};
