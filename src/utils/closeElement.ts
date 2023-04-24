/**
 *
 * @param e Event params
 * @param element  Element to remove the active class
 * @param parent Parent element to check e.target
 * @param cb callback function to be removed.
 */
export const clickOutsideToDeleteElement = (
  e: any,
  element: HTMLElement,
  parent: HTMLElement,
  cb: (e: any) => void
) => {
  if (!parent.contains(e.target)) {
    element.remove();
    document.removeEventListener("click", cb);
    element.removeEventListener("click", stopPropagation);
    return true;
  }
  return false;
};

export const stopPropagation = (e: { stopImmediatePropagation: () => void }) => {
  e.stopImmediatePropagation();
};

export const stopSpacePropagation = (e: { code: string; preventDefault: () => any }) =>
  e.code === "Space" ? e.preventDefault() : null;
