/** @format */

import { useContext } from 'react';
import { AuthenticationContext } from 'services/Authentication';

/**
 * A hook to interact with the context of the user profile 
 */
export const useUserProfile = () => {
  const { userProfile, setUserProfile } = useContext(AuthenticationContext);

  return [userProfile, setUserProfile];
}
