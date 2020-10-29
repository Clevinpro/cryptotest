export const lsGetItem = (item: string) => {
  const result = localStorage.getItem(item);
  return result ? JSON.parse(result) : null;
};
