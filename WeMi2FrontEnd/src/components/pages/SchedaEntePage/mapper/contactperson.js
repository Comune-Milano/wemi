
export const parseContactPersonSection = (response) => {
  if (!response) {
    return {};
  }

  return {
    ...response,
  };
};
