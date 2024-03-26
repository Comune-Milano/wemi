
export const parseDescriptionSection = (response) => {
  if (!response) {
    return {};
  }

  return {
    ...response,
  };
};
