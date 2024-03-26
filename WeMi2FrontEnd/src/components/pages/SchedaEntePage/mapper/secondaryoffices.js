
export const parseSecondaryOfficesSection = (response) => {
  if (!response) {
    return {};
  }
  return {
    ...response,
  };
};
