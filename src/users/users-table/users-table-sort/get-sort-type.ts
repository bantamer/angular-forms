export const enum SortType {
  Date = 'date',
  Default = 'default',
}

export const getSortType = <
  T extends string,
  K extends Array<Record<T, unknown>>
>(
  data: K,
  key: T
): SortType => {
  const fieldValue = data[0][key];

  if (fieldValue instanceof Date) {
    return SortType.Date;
  }

  return SortType.Default;
};
