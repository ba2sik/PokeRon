export const isEmptyArray = (array: unknown[] | null | undefined) => {
  return !array?.length;
};

export const isNotEmptyArray = (array: unknown[] | null | undefined) => {
  return !isEmptyArray(array);
};
