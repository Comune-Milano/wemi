/**
 * The function to check authorization
 * @param {*} user the user
 * @param {*} authorizations the authorizations
 */
export const checkAuthorization = (user = {}, authorizations = []) => {
  if (!authorizations?.length) {
    //if there aren't authorizations
    return true;
  }
  const userAuthorizations = user.Authorizations || [];
  let visibility = false;
  authorizations.forEach(authorization => {
    const foundAuthorization = userAuthorizations.find(userAuthorization => userAuthorization.code === authorization);
    if (foundAuthorization) {
      visibility = true;
    }
  });
  return visibility;
};