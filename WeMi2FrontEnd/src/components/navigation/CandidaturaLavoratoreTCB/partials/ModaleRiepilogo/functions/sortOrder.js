export const sortOrder = (arr, objKey) => {
  const arrOrdinato = arr.sort((a, b) => {
    if (a[objKey] === 0) {
      return 1
    }
    if (b[objKey] === 0) {
      return -1
    }
    return a[objKey] - b[objKey];
  });

  return arrOrdinato;
};