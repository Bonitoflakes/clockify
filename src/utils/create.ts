interface HTMLAttributes {
  class?: string[];
  id?: string;
  src?: string;
  click?: () => void;
  href?: string;
  alt?: string;
  type?: "text" | "number" | "checkbox" | "date";
  placeholder?: string;
  for?: string;
  pattern?: string;
  contenteditable?: boolean;
}
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attributes?: HTMLAttributes,
  text?: string
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  if (text) element.textContent = text;

  if (!attributes) return element;

  for (const [key, value] of Object.entries(attributes)) {
    if (key === "class" && Array.isArray(value)) {
      value.forEach((className: string) => element.classList.add(className));
      continue;
    }
    element.setAttribute(key, value);
  }
  return element;
}
