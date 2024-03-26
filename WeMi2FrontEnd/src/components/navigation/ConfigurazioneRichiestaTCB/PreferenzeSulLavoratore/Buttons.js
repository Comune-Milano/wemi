/** @format */

import React from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import BottoniNavigazione from 'components/navigation/ConfigurazioneRichiestaTCB/partials/BottoniNavigazione';
import { useDepChange } from 'hooks/useDepChange';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { inserisciModificaDatiRichiesta007 as inserisciModificaDatiRichiesta007Q } from './InserisciDatiRichiesta007';

const Buttons = ({
    dataset,
    idRichiestaTcb,
    moveNext,
    moveBack,
    isFormDirty,
    stepDomanda,
    changeStep,
    stepCheckValidity,
    sendRequestTCB,
}) => {
  const { validateForm } = useFormContext();
  const [, inserisciDati] = useGraphQLRequest(
        undefined,
        inserisciModificaDatiRichiesta007Q,
    );

  const Salva = () => {
    const chiavi = Object.keys(dataset);
    const arrayConfig = [];
    chiavi.forEach(element => {
      const elemento = element.split('_')[0];
      const dominio = parseInt(element.split('_')[1], 10);
      if (elemento === 'anni') {
        arrayConfig.push(
          {
            cd_attributo: 70,
            cd_val_attributo: 1,
            nr_val: parseInt(dataset[element], 10),
          }
                );
      } else if (elemento === 'sesso') {
        arrayConfig.push(
          {
            cd_attributo: 17,
            cd_val_attributo: dataset[element] ? dominio : -1,
          }
                    );
      } else if (elemento === 'eta') {
        if (dataset[element]) {
          arrayConfig.push(
            {
              cd_attributo: 16,
              cd_val_attributo: dominio,
            }
                            );
        } else {
          arrayConfig.push(
            {
              cd_attributo: 16,
              cd_val_attributo: -1,
            }
                            );
        }
      } else if (elemento === 'carattere') {
        if (dataset[element]) {
          if (dominio === 0) {
            arrayConfig.push(
              {
                cd_attributo: 68,
                cd_val_attributo: dominio,
                tx_nota: dataset.TextAreaAltroCarattere,
              }
                                    );
          } else {
            arrayConfig.push(
              {
                cd_attributo: 68,
                cd_val_attributo: dominio,
              }
                                    );
          }
        } else {
          arrayConfig.push(
            {
              cd_attributo: 68,
              cd_val_attributo: -1,
            }
                                );
        }
      } else if (elemento === 'esperienza') {
        if (dataset[element]) {
          if (dominio === 0) {
            arrayConfig.push(
              {
                cd_attributo: 18,
                cd_val_attributo: dominio,
                tx_nota: dataset.TextAreaAltroEsperienza,
              }
                                        );
          } else {
            arrayConfig.push(
              {
                cd_attributo: 18,
                cd_val_attributo: dominio,
                tx_nota: '',
              }
                                        );
          }
        } else {
          arrayConfig.push(
            {
              cd_attributo: 18,
              cd_val_attributo: -1,
              tx_nota: '',

            }
                                    );
        }
      } else if (elemento === 'patente') {
        if (dataset[element]) {
          arrayConfig.push(
            {
              cd_attributo: 43,
              cd_val_attributo: 1,
              fg_val: '1',

            }
                                        );
        } else {
          arrayConfig.push(
            {
              cd_attributo: 43,
              cd_val_attributo: -1,
            }
                                        );
        }
      } else if (elemento === 'auto') {
        if (dataset[element]) {
          arrayConfig.push(
            {
              cd_attributo: 42,
              cd_val_attributo: 1,
              fg_val: '1',

            }
                                            );
        } else {
          arrayConfig.push(
            {
              cd_attributo: 42,
              cd_val_attributo: -1,
            }
);
        }
      } else if (elemento === 'lingueParlate') {
        if (dataset[element].length > 0) {
          dataset[element].forEach((ele) => {
            if (ele.id !== 0) {
              arrayConfig.push(
                {
                  cd_attributo: 67,
                  cd_val_attributo: parseInt(ele.id, 10),
                }
              );
            } else {
              arrayConfig.push(
                {
                  cd_attributo: 67,
                  cd_val_attributo: parseInt(ele.id, 10),
                  tx_nota: dataset.altreLingue,
                }
              );
            }
          });
        } else {
          arrayConfig.push({
            cd_attributo: 67,
            cd_val_attributo: -1,
          });
        }
      } else if (elemento === 'TextAreaAltro') {
        arrayConfig.push(
          {
            cd_attributo: 93,
            cd_val_attributo: 1,
            tx_val: dataset[element],

          }
                                                );
      } else if (elemento === 'altreEsperienzeFg') {
        if (dataset[element]) {
          arrayConfig.push(
            {
              cd_attributo: 33,
              cd_val_attributo: 1,
              fg_val: '1',

            }
                                                        );
        } else {
          arrayConfig.push(
            {
              cd_attributo: 33,
              cd_val_attributo: -1,

            }
                                                        );
        }
      } else if (elemento === 'checkTextArea') {
        if (dataset.altreEsperienzeFg) {
          arrayConfig.push(
            {
              cd_attributo: 76,
              cd_val_attributo: 1,
              tx_val: dataset[element],

            }
                                                            );
        } else {
          arrayConfig.push(
            {
              cd_attributo: 76,
              tx_val: '',
              cd_val_attributo: -1,

            }
                                                            );
        }
      }
    });
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
   * @param {*} step
   */
  const onStepRequestChange = step => {
    changeStep(step, validateForm, getSaveDataCallback());
  };

  // React to any change to the step of the request.
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
      moveNext={() => {
        moveNext(validateForm, getSaveDataCallback());
      }}
    />
  );
};

Buttons.displayName = 'Buttons';


export default (Buttons);
