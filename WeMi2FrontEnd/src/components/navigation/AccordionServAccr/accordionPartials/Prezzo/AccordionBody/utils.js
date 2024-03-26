export const valueBetween = (valueToCheck, start, end) => (
  valueToCheck >= start && valueToCheck <= end
);

export const overlap = (rangeA, rangeB) => (
  rangeA.start <= rangeB.end && rangeB.start <= rangeA.end
);
