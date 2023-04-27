/**
 *
 * @param e Event params
 * @param element  Element to be be deleted.
 * @param parent Parent element to check e.target to prevent early deletion.
 * @param cb callback function to be removed.
 * @param id A unique identifier for the parent
 */
export const clickOutsideToDeleteElement = (
  e: any,
  elementToBeRemoved: HTMLElement,
  parent: HTMLElement,
  cb: (e: any) => void,
  id: string
) => {
  // console.log("----------------------------");

  // console.log(`parent:${parent}`);
  // console.log(parent);
  // console.log(`elementToBeRemoved:${elementToBeRemoved}`);
  // console.log(elementToBeRemoved);
  // console.log(`cb:${cb}`);
  // console.log(`id:${id}`);
  // console.log(e.target);

  // console.log("----------------------------");

  const isChild = !parent.contains(e.target);
  const isValidParent = parent.dataset.id === id;

  if (isChild && isValidParent) {
    // console.log("removing stuff.....");
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
