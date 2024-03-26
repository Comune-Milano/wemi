
import { createContext, useContext } from 'react';

/**
 * The logger context.
 */
export const LoggerContext = createContext();

/**
 * An hook to use the logger.
 */
export const useLogger = () => useContext(LoggerContext);
