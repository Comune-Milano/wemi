
import React, { createContext, useState } from 'react';

export const entityType = Object.freeze({
  CITIZEN: 'CITIZEN',
  COMPANY: 'COMPANY',
});

/**
 * Defines the data context for the form handling a service order.
 */
export const ServiceOrderContext = createContext();

export const ServiceOrderContextProvider = ({ children }) => {
  /**
   * The state of service order ctx.
   */
  const [state, setState] = useState({
    entityType: entityType.CITIZEN,
  });

  /**
   * Sets the type of entity performing the order.
   * @param {*} type
   */
  const setEntityType = type => {
    setState({
      ...state,
      entityType: type,
    });
  };

  return (
    <ServiceOrderContext.Provider
      value={{
        orderState: state,
        setEntityType,
      }}
    >
      {children}
    </ServiceOrderContext.Provider>
  );
};

ServiceOrderContextProvider.displayName = 'ServiceOrderContextProvider';
