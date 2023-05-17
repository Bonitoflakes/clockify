export const stopPropagation = (e: any) => e.stopPropagation();
export const stopSpacePropagation = (e: any) => (e.code === "Space" ? e.preventDefault() : null);
