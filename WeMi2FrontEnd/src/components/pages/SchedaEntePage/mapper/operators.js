
export const parseAuthorizedOperatorsSection = (response) => {
  if (!response) {
    return {};
  }

  return {
    ...response,
  };
};
