export const getUserList = [
  '',
  `query getUserList($filters: FiltersUserListInput) {
    getUserList(
      filters: $filters,
    ) {
        totalRows
        data {
          idUtente
          profile {
            code 
            description
          }
          privacy
          fiscalCode
          username
          codana
          operatoreEnte
          flag
          email
          name
          surname
          personalData
          startValidDate
          endValidDate
          dateLastModified
        }
      }
  }`,
  'getUserList',
];

export const getProfiles = [
  '',
  `query getProfiles {
    getProfiles {
      code
      description
    }
  }`,
  'getProfiles',
];