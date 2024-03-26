export const getUserAuthorizations = [
  '',
  `query getUserAuthorizations($userId: Int!) {
    getUserAuthorizations(
      userId: $userId,
    ) {
      code
      description
      }
  }`,
  'getUserAuthorizations',
];

export const getUserDetail = [
  '',
  `query getUserDetail($userId: Int!) {
    getUserDetail(
      userId: $userId,
    ) {
      idUtente
      profile {
        description
        code
      }
      privacy
      username
      codana
      operatoreEnte
      flag
      email
      name
      surname
      personalData
      authorizations {
        code
        description
      }
      startValidDate
      endValidDate
      dateLastModified
      userLastModified {
        username
      }
    }
  }`,
  'getUserDetail',
];

export const saveUserAuthorization = [
  '',
  `mutation saveUserAuthorization($userAuthorizations: UserAuthorizationsInput!)
  {
    saveUserAuthorization(userAuthorizations: $userAuthorizations) {
      idUtente
    }
   }`,
  '',
];