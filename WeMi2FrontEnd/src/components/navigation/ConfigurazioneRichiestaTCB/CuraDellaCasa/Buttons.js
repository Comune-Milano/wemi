/** @format */

import React from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import BottoniNavigazione from 'components/navigation/ConfigurazioneRichiestaTCB/partials/BottoniNavigazione';
import { useDepChange } from 'hooks/useDepChange';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { inserisciModificaDatiRichiesta004 as inserisciModificaDatiRichiesta004Q } from './InserisciDatiRichiesta004';


const Buttons = ({
    dataset,
    idRichiestaTcb,
    moveNext,
    moveBack,
    isFormDirty,
    changeStep,
    stepDomanda,
    servizioTCB,
    sendRequestTCB,
    stepCheckValidity,
}) => {
  const { validateForm } = useFormContext();
  const [, inserisciDati] = useGraphQLRequest(
        undefined,
        inserisciModificaDatiRichiesta004Q,
    );

  const creaStanze = (numero) => {
    if (!parseInt(numero, 10) && numero !== 0) {
      return {
        cd_attributo: 13,
        cd_val_attributo: 7,
      };
    }
    return {
      cd_attributo: 13,
      cd_val_attributo: parseInt(numero, 10),
    };
  };
  const creaBagni = (numero) => {
    if (!parseInt(numero, 10) && numero !== 0) {
      return {
        cd_attributo: 12,
        cd_val_attributo: 6,
      };
    }
    return {
      cd_attributo: 12,
      cd_val_attributo: parseInt(numero, 10),
    };
  };

  const Salva = () => {
    const arrayConfig = [];
    const chiavi = Object.keys(dataset);
    let checkVediCasa = false;
    chiavi.forEach((el) => {
      if (el === 'vediCasa') {
        checkVediCasa = dataset[el].id === 1;
      }
    });
    if (checkVediCasa) {
      chiavi.forEach((el) => {
        if (el === 'mansioni') {
          if (dataset[el].length > 0) {
            dataset[el].forEach((element) => {
              if (element === 0) {
                arrayConfig.push(
                  {
                    cd_attributo: 61,
                    cd_val_attributo: parseInt(element, 10),
                    tx_nota: dataset.TextArea,
                  }
                                );
              } else {
                arrayConfig.push(
                  {
                    cd_attributo: 61,
                    cd_val_attributo: parseInt(element, 10),
                  }
                                );
              }
            });
          } else {
            arrayConfig.push(
              {
                cd_attributo: 61,
                cd_val_attributo: -1,
              }
                        );
          }
        } else if (el === 'mqCasa') {
          if (dataset[el] && dataset[el].id) {
            arrayConfig.push(
              {
                cd_attributo: 28,
                cd_val_attributo: dataset[el].id,
              }
                        );
          } else {
            arrayConfig.push(
              {
                cd_attributo: 28,
                cd_val_attributo: -1,
              }
                        );
          }
        } else if (el === 'tipoCasa') {
          if (dataset[el] && dataset[el].id) {
            arrayConfig.push(
              {
                cd_attributo: 10,
                cd_val_attributo: dataset[el].id,
              }
                        );
          } else {
            arrayConfig.push(
              {
                cd_attributo: 10,
                cd_val_attributo: -1,
              }
                        );
          }
        } else if (el === 'stanze') {
          arrayConfig.push(creaStanze(dataset[el]));
        } else if (el === 'bagni') {
          arrayConfig.push(creaBagni(dataset[el]));
        } else if (el === 'piano') {
          arrayConfig.push(
            {
              cd_attributo: 92,
              cd_val_attributo: 1,
              tx_val: String(dataset[el]),
            }
                    );
        } else if (el === 'ascensore') {
          arrayConfig.push(
            {
              cd_attributo: 49,
              cd_val_attributo: 1,
              fg_val: dataset[el] ? '1' : '0',
            }
                    );
        } else if (el === 'fumatori') {
          arrayConfig.push(
            {
              cd_attributo: 44,
              cd_val_attributo: 1,
              fg_val: dataset[el] ? '1' : '0',
            }
                    );
        } else if (el === 'giardino') {
          arrayConfig.push(
            {
              cd_attributo: 50,
              cd_val_attributo: 1,
              fg_val: dataset[el] ? '1' : '0',
            }
                    );
        } else if (el === 'terrazzaBalcone') {
          arrayConfig.push(
            {
              cd_attributo: 52,
              cd_val_attributo: 1,
              fg_val: dataset[el] ? '1' : '0',
            }
                    );
        } else if (el === 'ascensore') {
          arrayConfig.push(
            {
              cd_attributo: 49,
              cd_val_attributo: 1,
              fg_val: dataset[el] ? '1' : '0',
            }
                    );
        } else if (el === 'vediCasa') {
          if (dataset[el].id) {
            arrayConfig.push(
              {
                cd_attributo: 54,
                cd_val_attributo: 1,
                fg_val: dataset[el].id === 1 ? '1' : '0',
              }
                        );
          } else {
            arrayConfig.push(
              {
                cd_attributo: 54,
                cd_val_attributo: -1,
                fg_val: dataset[el] ? '1' : '0',
              }
                        );
          }
        }
      });
    } else {
      chiavi.forEach((el) => {
        if (el === 'mansioni') {
          arrayConfig.push(
            {
              cd_attributo: 61,
              cd_val_attributo: -1,
            }
                    );
        } else if (el === 'mqCasa') {
          arrayConfig.push(
            {
              cd_attributo: 28,
              cd_val_attributo: -1,
            }
                    );
        } else if (el === 'tipoCasa') {
          arrayConfig.push(
            {
              cd_attributo: 10,
              cd_val_attributo: -1,
            }
                    );
        } else if (el === 'stanze') {
          arrayConfig.push({
            cd_attributo: 13,
            cd_val_attributo: -1,
          });
        } else if (el === 'bagni') {
          arrayConfig.push({
            cd_attributo: 12,
            cd_val_attributo: -1,
          });
        } else if (el === 'piano') {
          arrayConfig.push(
            {
              cd_attributo: 92,
              cd_val_attributo: -1,
              tx_val: String(dataset[el]),
            }
                    );
        } else if (el === 'ascensore') {
          arrayConfig.push(
            {
              cd_attributo: 49,
              cd_val_attributo: -1,
              fg_val: '0',
            }
                    );
        } else if (el === 'fumatori') {
          arrayConfig.push(
            {
              cd_attributo: 44,
              cd_val_attributo: -1,
              fg_val: '0',
            }
                    );
        } else if (el === 'giardino') {
          arrayConfig.push(
            {
              cd_attributo: 50,
              cd_val_attributo: -1,
              fg_val: '0',
            }
                    );
        } else if (el === 'terrazzaBalcone') {
          arrayConfig.push(
            {
              cd_attributo: 52,
              cd_val_attributo: -1,
              fg_val: '0',
            }
                    );
        } else if (el === 'ascensore') {
          arrayConfig.push(
            {
              cd_attributo: 49,
              cd_val_attributo: -1,
              fg_val: '0',
            }
                    );
        } else if (el === 'vediCasa') {
          arrayConfig.push(
            {
              cd_attributo: 54,
              cd_val_attributo: 1,
              fg_val: '0',
            }
                    );
        }
      });
    }


    inserisciDati({ input: { idRichiestaTcb, arrayConfig } });
  };

    /**
   * Gets the callback trigger the saving of step-related data.
   */
  const getSaveDataCallback = () => {
    if (!isFormDirty) {
      return () => Promise.resolve();
    }
    return async () => {
      Salva();
    };
  };

    /**
     * A callback to run when a step request mutation is detected.
     * @param {number} step
     */
  const onStepRequestChange = step => {
    changeStep(step, validateForm, getSaveDataCallback());
  };

    // React to any change to the step request.
  useDepChange(onStepRequestChange, stepDomanda);

  const checkStepValidity = (checkingValidation) => {
    if (checkingValidation) {
      sendRequestTCB(validateForm, getSaveDataCallback());
    }
  };

  // React to any change to the step request.
  useDepChange(checkStepValidity, stepCheckValidity);

  useBusSubscribe(
    'SAVE_APPLICATION_ADMIN',
    getSaveDataCallback(),
  );
  return (
    <BottoniNavigazione
      moveNextValid
      isFormDirty={isFormDirty}
      moveBack={
                (servizioTCB.cd_dominio_tcb !== 2) ?
                    () => moveBack(validateForm, getSaveDataCallback())
                    : null
            }
      moveNext={() => {
        moveNext(validateForm, getSaveDataCallback());
      }}
    />
  );
};

Buttons.displayName = 'Buttons';

export default (Buttons);
