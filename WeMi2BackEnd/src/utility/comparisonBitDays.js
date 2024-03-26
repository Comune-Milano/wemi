import { ApolloError } from "apollo-server";
import { logger } from "utility/logger/getInstance";
import { defaultValueCalendar } from "constants/db/attributo";

export const comparisonBitDays = (inputDay, workerDay) => {
  
  const { hoursBin: hoursBinInputDay, dayId: inputDayId } = inputDay;

  const { hoursBin: hoursBinWorkerDay, dayId: workerDayId } = workerDay;

  let stringInputDay = hoursBinInputDay;
  let stringWorkerDay = hoursBinWorkerDay;

  if(!hoursBinWorkerDay){

    stringWorkerDay = defaultValueCalendar;
  
  }

  if(!hoursBinInputDay){

    stringInputDay = defaultValueCalendar;

  }

/**
* Se i due id non corrispondo ordine sbagliato nell'array
*/
  if(inputDayId !== workerDayId){
    throw new ApolloError('Mismatching order array input', 1221);
  }
/**
* Se le lunghezze non corrispondono errore su lunghezza 
*/

  if(stringInputDay.length !== stringWorkerDay.length){
    throw new ApolloError('Mismatching length array input', 1222);
  }

  let equalBitCounter = 0;

  /**
   * Scorro carattere per carattere per vedere se sono giorno del calendario <= giorno del lavoratore 
   */
  for(let indexBitDayString = 0; indexBitDayString < stringInputDay.length; indexBitDayString+=1){

    const bitInputDay = stringInputDay[indexBitDayString];

    const bitWorkerDay = stringWorkerDay[indexBitDayString];

    if(bitInputDay <= bitWorkerDay){
      equalBitCounter+=1;
    }

  }
  logger.info(equalBitCounter, 'comparison', workerDayId, inputDayId);
  
  /**
   * Se tutti i bit sono <= allora il giorno corrisponde
   */

  if(equalBitCounter === stringInputDay.length){
    return true;
  }

  return false;
}