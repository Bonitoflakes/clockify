/**
 *
 * @param e Event params
 * @param element  Element to be be deleted.
 * @param parent Parent element to check e.target to prevent early deletion.
 * @param cb callback function to be removed.
 */
export const clickOutsideToDeleteElement = (
  e: any,
  elementToBeRemoved: HTMLElement,
  parent: HTMLElement,
  cb: (e: any) => void
) => {
  if (!parent.contains(e.target)) {
    elementToBeRemoved.remove();
    document.removeEventListener("click", cb);
    return true;
  }
  return false;
};

export const stopPropagation = (e: any) => {
  e.stopPropagation();
};

export const stopSpacePropagation = (e: any) => (e.code === "Space" ? e.preventDefault() : null);
