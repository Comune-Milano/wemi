
export const parseOthersInfoSection = (response) => {
  if (!response) {
    return {};
  }

  return {
    ...response,
  };
};
