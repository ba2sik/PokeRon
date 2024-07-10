export const isEmptyArray = (array: unknown[] | null | undefined) => {
  return !array?.length;
};

export const isNotEmptyArray = (array: unknown[] | null | undefined) => {
  return !isEmptyArray(array);
};

export function isNullOrUndefined<ItemType>(
  obj: ItemType | null | undefined,
): obj is null | undefined {
  return obj === null || obj === undefined;
}

export function isNotNullOrUndefined<ItemType>(obj: ItemType | null | undefined): obj is ItemType {
  return !isNullOrUndefined(obj);
}
