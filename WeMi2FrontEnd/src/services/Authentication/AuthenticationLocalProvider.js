
import React from "react";
import { useLogger } from "services/Logger";
import useSessionStorage from 'hooks/useSessionStorage';
import context from "./AuthenticationContext";
/**
 * @deprecated
 */
const defaultUserState = { datiLogin: null, hasError: false, error: null };

const AuthenticationLocalProvider = ({ children }) => {
  const logger = useLogger();

  const [sessionLoginData, setSessionLoginData] = useSessionStorage('datiLogin', defaultUserState);

  /**
   * Sets the user profile in the session storage.
   * @param {*} userData
   */
  const setUserProfile = userData => {
    try {
      setSessionLoginData({
        ...sessionLoginData,
        ...userData,
      });
    } catch (error) {
      logger.error('Errore di autenticazione locale.', error);

      setSessionLoginData({
        ...sessionLoginData,
        error,
        hasError: true,
      });
    }
  };

  return (
    <context.Provider value={{ userProfile: sessionLoginData, setUserProfile }}>
      {children}
    </context.Provider>
  );
};



export default AuthenticationLocalProvider;