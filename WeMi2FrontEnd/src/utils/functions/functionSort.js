
export function functionSort(arr, objKey) {
  const matchIndex = arr.findIndex(el => ( parseInt(el[objKey] && el[objKey]) === 0));
  if (matchIndex < 0 || matchIndex === arr.length - 1) {
    return arr;
  }
  return [...arr.slice(0, matchIndex), ...arr.slice(matchIndex + 1), arr[matchIndex]];
}