
export const parsePrimaryOfficeSection = (response) => {
  if (!response) {
    return {};
  }

  return {
    ...response,
    address: response.principalLocation?.address,
    name: response.principalLocation.name,
  };
};
