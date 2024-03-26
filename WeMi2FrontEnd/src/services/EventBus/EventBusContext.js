
import React, { createContext } from 'react';
import { EventBusSingleton } from './EventBusSingleton';

/**
 * The EventBus context.
 */
export const EventBusContext = createContext();

/**
 * The event bus provider.
 */
export const EventBusProvider = ({ children }) => (
  <EventBusContext.Provider value={EventBusSingleton.getInstance()}>
    {children}
  </EventBusContext.Provider>
);

EventBusProvider.displayName = 'EventBusProvider';
