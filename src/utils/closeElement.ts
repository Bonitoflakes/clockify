/**
 *
 * @param e Event params
 * @param element  Element to remove the active class
 * @param parent Parent element to check e.target
 * @param cb callback function to be removed.
 */
export const clickOutsideToCloseElement = (
  e: any,
  element: HTMLElement,
  parent: HTMLElement,
  cb: (e: any) => void
): void => {
  if (!parent.contains(e.target)) {
    element.classList.remove("active");
    document.removeEventListener("click", cb);
    element.removeEventListener("click", stopPropagation);
  }
};

export const stopPropagation = (e: { stopImmediatePropagation: () => void }) => {
  e.stopImmediatePropagation();
};

export const stopSpacePropagation = (e: { code: string; preventDefault: () => any }) =>
  e.code === "Space" ? e.preventDefault() : null;
