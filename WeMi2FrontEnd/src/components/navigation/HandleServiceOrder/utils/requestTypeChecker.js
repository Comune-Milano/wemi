import { FREE, PAYMENT } from "types/requestType";

/**
 * 
 * @param {Object} infoRichiestaEnte
 * The information about the request involved
 *  
 */

export const requestTypeChecker = (infoRichiestaEnte) => {
  const { costoTotaleEnte } = infoRichiestaEnte;
  
  if(!costoTotaleEnte || costoTotaleEnte === 0){
    return FREE;
  }
  
  return PAYMENT;

}