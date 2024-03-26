
import { useContext } from 'use-context-selector';
import { FormContext } from '../context/FormContext';

/**
 * A hook providing the form context.
 */
export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error(`
      Cannot get the form context.
      You probably forgot to wrap your form within the needed provider.
    `);
  }

  return context;
};
