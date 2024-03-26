import { useUserProfile } from 'hooks/useUserProfile';
import React from 'react';
import { checkAuthorization } from './utils/checkAuthorization';
/**
 * The hook to check the authorizations
 * @param {number[]} list the list of authorizations
 * @returns {boolean} the visibility
 */
export const useAuthorization = (list = []) => {
  const [userProfile] = useUserProfile();
  const { datiLogin = {} } = userProfile;
  const isAuthorized = React.useMemo(
    () => checkAuthorization(datiLogin, list),
    [userProfile, list]
  );
  return isAuthorized;
};