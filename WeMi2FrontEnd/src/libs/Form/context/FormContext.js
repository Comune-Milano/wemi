
// import { createContext } from 'react';
import { createContext } from 'use-context-selector';

/**
 * The form context.
 */
export const FormContext = createContext(null);

/**
 * The provider of form context.
 */
export const FormContextProvider = FormContext.Provider;

/**
 * The consumer of form context.
 */
export const FormContextConsumer = FormContext.Consumer;
