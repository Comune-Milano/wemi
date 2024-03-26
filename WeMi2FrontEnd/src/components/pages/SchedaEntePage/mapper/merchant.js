
export const parseMerchantSection = (response) => {
  if (!response) {
    return {};
  }

  return {
    ...response,
  };
};
