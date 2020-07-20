export const move = (arr: any[] = [], oldIndex: number, newIndex: number): any[] => {
  if (oldIndex === newIndex) {
    return arr;
  }
  const temp = arr.filter((_: any, index: number) => index !== oldIndex);
  temp.splice(newIndex, 0, arr[oldIndex]);
  return temp;
};
