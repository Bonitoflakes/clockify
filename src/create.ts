interface HTMLAttributes {
  class?: string;
  id?: string;
  src?: string;
  click?: () => void;
  href?: string;
  alt?: string;
}

export function createElement(tag: string, attributes: HTMLAttributes, text: string | null) {
  let x = document.createElement(tag);
  if (text) x.innerText = text;
  for (const [key, value] of Object.entries(attributes)) {
    if (key === "click") {
      x.addEventListener("click", value);
      continue;
    }
    x.setAttribute(key, value);
  }
  return x;
}

export function appendElement(child: HTMLElement, parent: HTMLElement) {
  parent.append(child);
}
