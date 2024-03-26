import React, { createContext, useContext } from "react";
import { extRedirectManager } from "services/ExternalRedirectManager/ExternalRedirectManager";

export const ExternalRedirectManagerContext = createContext();

export const ExternalRedirectManagerContextProvider = ({ children }) => {
  return (
    <ExternalRedirectManagerContext.Provider value={extRedirectManager}>
      {children}
    </ExternalRedirectManagerContext.Provider>
  );
};

ExternalRedirectManagerContextProvider.displayName = 'ExternalRedirectManagerContextProvider';

export const useExternalRedirectManager = () => {
  const manager = useContext(ExternalRedirectManagerContext);
  return manager;
};
