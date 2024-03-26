
export function bytesToMb(bytes) {
  const mbValue = `${(bytes / 1048576).toFixed(2)} MB`;
  return mbValue;
}
