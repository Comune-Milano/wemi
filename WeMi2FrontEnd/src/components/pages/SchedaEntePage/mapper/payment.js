
export const parsePaymentInfoSection = (response) => {
  if (!response) {
    return {};
  }

  return {
    ...response,
  };
};
