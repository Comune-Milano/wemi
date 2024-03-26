
export const parseInformationSection = (response) => {
  if (!response) {
    return {};
  }

  return {
    ...response,
    weMiSpaces: response.weMiSpaces?.map(el => el.description).join(', '),
    accreditationCategories: response.accreditationCategories?.map(el => el.description).join(', '),
  };
};
