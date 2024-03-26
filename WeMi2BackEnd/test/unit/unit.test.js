/**
 * Testing function validateCittadino
 */

import 'dotenv/config';
import { CITTADINO, AMMINISTRATORE } from 'constants/usercode';
import validateCittadino from 'utility/validateCittadino';
import { TY_CITTADINO, TY_OPERATORE_ENTE } from 'constants/userroles';

describe('Unit testing function validateCittadino', () => {
 
  it(`Testing profile !== ${CITTADINO} and role === ${undefined}`, async () => {
    /**
     * Setup for the test
     */
    const profile = AMMINISTRATORE;

    /**
     * Calling the function for the result with that setup
     */
    const result = validateCittadino(profile);

    /**
     * Testing the result of the function
     */
    expect(result).toBeFalsy();
  });

  it(`Testing profile !== ${CITTADINO} and role !== ${undefined}`, async () => {
    /**
     * Setup for the test
     */
    const profile = AMMINISTRATORE;

    const role = Math.random();

    /**
     * Calling the function for the result with that setup
     */
    const result = validateCittadino(profile, role);

    /**
     * Testing the result of the function
     */
    expect(result).toBeFalsy();
  });

  it(`Testing profile === ${CITTADINO} and role === ${undefined}`, () => {
    /**
     * Setup for the test
     */
    const profile = CITTADINO;

    /**
     * Calling the function for the result with that setup
     */
    const result = validateCittadino(profile);

    /**
     * Testing the result of the function
     */
    expect(result).toBeFalsy();
    
  });

  it(`Testing profile === ${CITTADINO} and role !== ${TY_CITTADINO}`, () => {
    /**
     * Setup for the test
     */
    const profile = CITTADINO;

    const role = TY_OPERATORE_ENTE;

    /**
     * Calling the function for the result with that setup
     */
    const result = validateCittadino(profile, role);

    /**
     * Testing the result of the function
     */
    expect(result).toBeFalsy();
    
  });

  it(`Testing profile === ${CITTADINO} and role !== ${undefined}`, async () => {
    /**
     * Setup for the test
     */
    const profile = CITTADINO;

    const role = Math.random();

    /**
     * Calling the function for the result with that setup
     */
    const result = validateCittadino(profile, role);

    /**
     * Testing the result of the function
     */
    expect(result).toBeFalsy();
  });

  it(`Testing profile === ${CITTADINO} and role === ${TY_CITTADINO}`, () => {
    /**
     * Setup for the test
     */
    const profile = CITTADINO;

    const role = TY_CITTADINO;

    /**
     * Calling the function for the result with that setup
     */
    const result = validateCittadino(profile, role);

    /**
     * Testing the result of the function
     */
    expect(result).toBeTruthy();
    
  });
});