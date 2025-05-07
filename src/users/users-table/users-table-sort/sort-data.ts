export const sortDate = (a: Date, b: Date, isAsc: boolean): number => {
  const timeA = a.getTime();
  const timeB = b.getTime();

  return (timeA - timeB) * (isAsc ? 1 : -1);
};
