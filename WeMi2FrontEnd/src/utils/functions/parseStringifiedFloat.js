export const parseStringifiedFloat = (numberString) => {
  const number = String(numberString).replace(",", ".");
  return parseFloat(number);
};