export const sortDefault = (a: string, b: string, isAsc: boolean) => {
  return a.localeCompare(b) * (isAsc ? 1 : -1);
};
