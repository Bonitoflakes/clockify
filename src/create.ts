interface HTMLAttributes {
  class?: string;
  id?: string;
  src?: string;
  click?: () => void;
}

export function createElement(
  tag: string,
  attributes: HTMLAttributes,
  text: string | null,
  parent?: HTMLElement
) {
  let x = document.createElement(tag);
  if (text) x.innerText = text;
  for (const [key, value] of Object.entries(attributes)) {
    if (key === "click") {
      x.addEventListener("click", value);
      continue;
    }
    x.setAttribute(key, value);
  }
  parent?.append(x);
}
