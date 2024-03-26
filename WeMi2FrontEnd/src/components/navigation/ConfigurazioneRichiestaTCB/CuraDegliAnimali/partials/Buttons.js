/** @format */

import React from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import BottoniNavigazione from 'components/navigation/ConfigurazioneRichiestaTCB/partials/BottoniNavigazione';
import { useDepChange } from 'hooks/useDepChange';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { inserisciModificaDatiRichiesta005 as inserisciModificaDatiRichiesta005Q } from '../InserisciDatiRichiesta005';

const Buttons = ({
  dataset,
  idRichiestaTcb,
  moveNext,
  moveBack,
  isFormDirty,
  changeStep,
  stepDomanda,
  stepCheckValidity,
  sendRequestTCB,
}) => {
  const { validateForm } = useFormContext();

  const [, inserisciDati] = useGraphQLRequest(
    undefined,
    inserisciModificaDatiRichiesta005Q,
  );

  const Salva = () => {
    const chiavi = Object.keys(dataset);
    const arrayConfig = [];
    let checkVediAnimali = false;
    chiavi.forEach(element => {
      if (element === 'vediAnimali') {
        checkVediAnimali = dataset[element].id === 1;
      }
    });
    if (checkVediAnimali) {
      chiavi.forEach(element => {
        if (element === 'vediAnimali') {
          if (dataset[element].id) {
            arrayConfig.push(
              {
                cd_attributo: 48,
                cd_val_attributo: 1,
                fg_val: dataset[element].id === 1 ? '1' : '0',
              }
            );
          } else {
            arrayConfig.push(
              {
                cd_attributo: 48,
                cd_val_attributo: -1,
                fg_val: dataset[element] ? '1' : '0',
              }
            );
          }
        } else if (element === 'nCani') {
          arrayConfig.push(
            {
              cd_attributo: 74,
              cd_val_attributo: 1,
              nr_val: parseInt(dataset[element], 10),
            }
          );
        } else if (element === 'nGatti') {
          arrayConfig.push(
            {
              cd_attributo: 75,
              cd_val_attributo: 1,
              nr_val: parseInt(dataset[element], 10),
            }
          );
        } else if (element === 'altriAnimali') {
          if (dataset[element]) {
            arrayConfig.push(
              {
                cd_attributo: 45,
                cd_val_attributo: 1,
                fg_val: dataset[element] ? '1' : '0',
                tx_nota: dataset[element] ? dataset.TextAreaAltriAnimali : undefined,

              }
            );
          } else {
            arrayConfig.push(
              {
                cd_attributo: 45,
                cd_val_attributo: 1,
                fg_val: '0',
                tx_nota: undefined,

              }
            );
          }
        } else if (element === 'mansioni') {
          if (dataset[element].length > 0) {
            dataset[element].forEach((ele) => {
              if (parseInt(ele, 10) === 0) {
                arrayConfig.push(
                  {
                    cd_attributo: 59,
                    cd_val_attributo: parseInt(ele, 10),
                    fg_val: '1',
                    tx_nota: dataset.TextAreaAltreMansioni,
                  }
                );
              } else {
                arrayConfig.push(
                  {
                    cd_attributo: 59,
                    cd_val_attributo: parseInt(ele, 10),
                  }
                );
              }
            });
          } else {
            arrayConfig.push(
              {
                cd_attributo: 59,
                cd_val_attributo: -1,
              }
            );
          }
        }
      });
    } else {
      chiavi.forEach(element => {
        if (element === 'vediAnimali') {
          arrayConfig.push(
            {
              cd_attributo: 48,
              cd_val_attributo: 1,
              fg_val: '0',
            }
          );
        } else if (element === 'nCani') {
          arrayConfig.push(
            {
              cd_attributo: 74,
              cd_val_attributo: -1,
              nr_val: 0,
            }
          );
        } else if (element === 'nGatti') {
          arrayConfig.push(
            {
              cd_attributo: 75,
              cd_val_attributo: -1,
              nr_val: 0,
            }
          );
        } else if (element === 'altriAnimali') {
          arrayConfig.push(
            {
              cd_attributo: 45,
              cd_val_attributo: -1,
              fg_val: '0',
              tx_nota: undefined,

            }
          );
        } else if (element === 'mansioni') {
          arrayConfig.push(
            {
              cd_attributo: 59,
              cd_val_attributo: -1,
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
   * A callback to run when a step candidate mutation is detected.
   * @param {number} step
   */
  const onStepRequestChange = step => {
    changeStep(step, validateForm, getSaveDataCallback());
  };

  // React to any change to the step candidate.
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
      moveBack={() => moveBack(validateForm, getSaveDataCallback())}
      moveNext={() => moveNext(validateForm, getSaveDataCallback())}
    />

  );
};

Buttons.displayName = 'Buttons';

export default (Buttons);
