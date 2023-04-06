export const $ = (className: string): HTMLElement => document.querySelector(`.${className}`)!;

export const $$ = (className: string): NodeListOf<Element> => document.querySelectorAll(`.${className}`)!;
