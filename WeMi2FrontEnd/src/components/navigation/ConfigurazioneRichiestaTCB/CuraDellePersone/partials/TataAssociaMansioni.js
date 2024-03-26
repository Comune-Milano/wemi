/** @format */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { colors } from 'theme';
import { Row } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import TextArea from 'components/ui2/TextArea';
import { cdAttributo } from 'components/navigation/ConfigurazioneRichiestaTCB/CodiciAttributi';
import BottoniNavigazione from 'components/navigation/ConfigurazioneRichiestaTCB/partials/BottoniNavigazione';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { useDepChange } from 'hooks/useDepChange';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import {
  inserisciModificaDatiRichiesta003 as inserisciModificaDatiRichiesta003M,
  inserisciModificaAttributoBeneficiarioTCB as inserisciModificaAttributoBeneficiarioTCBM,
} from '../InserisciDatiRichiesta003';
import { calcolaFasciaEta } from './utils';
import { getTCBServiceName } from '../../utils';
import FieldTitle from '../../partials/FieldTitle';

const CheckWrapper = styled(Row)`
  border-bottom: 2px solid ${colors.grey};
`;


const AssociaMansioni = ({
  beneficiari,
  idRichiestaTcb,
  locale,
  servizioTCB,
  moveNext,
  moveBack,
  changeStep,
  mansioni,
  fasceEta,
  stepDomanda,
  stepCheckValidity,
  sendRequestTCB,
}) => {
  const { dataset, touched, errors, setFormField, validateForm, handleFieldBlur, isFormDirty } = useFormContext();

  const addBen = (selectedMans, idMans, value) => {
    const newMansArray = selectedMans.slice(0);
    let newBenArray = [];
    for (let i = 0; i <= newMansArray.length; i += 1) {
      if (newMansArray[i].id === idMans) {
        if (newMansArray[i].beneficiariSelezionati.includes(value)) {
          newBenArray = newMansArray[i].beneficiariSelezionati.filter(el => el !== value);
          if (!newBenArray.length) {
            return newMansArray.filter(el => {
              if (el.id !== idMans) {
                return el;
              }
            });
          }
        } else {
          newBenArray = newMansArray[i].beneficiariSelezionati.concat(value);
        }
        return newMansArray.filter(el => {
          if (el.id !== idMans) {
            return el;
          }
        }).concat({
          id: idMans,
          beneficiariSelezionati: newBenArray,
        });
      }
    }
  };

  const addMans = (selectedMans, value) => selectedMans.concat(value);

  const setAssistenzaDisabilita = (json, value, pgBen) => {
    json[pgBen] = value;
    return json;
  };

  const inserisciTxPatologieBeneficiarioMutation = useStatelessGraphQLRequest(
    inserisciModificaAttributoBeneficiarioTCBM,
  );

  const inserisciDatiRichiesta003 = useStatelessGraphQLRequest(
    inserisciModificaDatiRichiesta003M,
  );

  const checkMansioniVacanze = (values) => {
    const array = [];
    if (values.disponibilitaVacanzeFamiglia) {
      array.push({ cd_attributo: cdAttributo.LS_MANSIONI_RICHIESTE_TATA, cd_val_attributo: 12 });
    }
    if (values.disponibilitaVacanzeBambini) {
      array.push({ cd_attributo: cdAttributo.LS_MANSIONI_RICHIESTE_TATA, cd_val_attributo: 13 });
    }
    return array;
  };

  const createArrayConfig = (values) => {
    let arrConf = [];
    const lengthMansioniAssociate = getObjectValue(values, 'mansioniAssociate', []).length;
    if (lengthMansioniAssociate > 0) {
      arrConf = [
        ...values.mansioniAssociate.map(el => (
          {
            cd_attributo: cdAttributo.LS_MANSIONI_RICHIESTE_TATA,
            cd_val_attributo: el.id,
            arrayBen: el.beneficiariSelezionati.map(ben => {
              if (ben) {
                const beneficiario = beneficiari.find(ben2 => ben2.pgBen === ben);
                const eta = getObjectValue(beneficiario, 'eta.nrVal', 0);
                const fasciaEta = calcolaFasciaEta(eta, fasceEta);
                return ({
                  pgBen: ben,
                  attributo_2: (fasciaEta),
                });
              }
            }),
            tx_nota: el.id === 0 ? values.altraMansione : undefined,
          }
        )),
        ...checkMansioniVacanze(values),
      ];
      return arrConf;
    }
    arrConf = [{
      cd_attributo: cdAttributo.LS_MANSIONI_RICHIESTE_TATA,
      cd_val_attributo: -1,
      arrayBen: beneficiari.map(ben2 => ben2.pgBen),
    }, ...checkMansioniVacanze(values)];

    return arrConf;
  };

  const inserisciAttributiRichiesta003 = (selectedValues) => {
    inserisciDatiRichiesta003({
      input: {
        idRichiestaTcb,
        arrayConfig: createArrayConfig(selectedValues),
      },
    });
  };

  const createInputTxPatologieArrayConfig = (values) => {
    const arr = [];
    for (const key in values) {
      arr.push({
        pgBen: parseInt(key, 10),
        arrayConfig: [{
          cd_attributo: cdAttributo.TX_PATOLOGIE_BENEFICIARIO,
          cd_val_attributo: values[key] ? 1 : -1,
          tx_val: values[key],
        }],
      });
    }
    return { arrayBen: arr };
  };

  const inserisciTxPatologieBeneficiario = (selectedValues) => {
    inserisciTxPatologieBeneficiarioMutation({
      input: {
        idRichiestaTcb,
        ...createInputTxPatologieArrayConfig(selectedValues),
      },
    });
  };

  /**
   * Gets the callback trigger the saving of step-related data.
   */
  const getSaveDataCallback = () => {
    if (!isFormDirty) {
      return () => Promise.resolve();
    }

    return async () => {
      await inserisciAttributiRichiesta003(dataset);
      if (dataset.assistenzaDisabilita) {
        await inserisciTxPatologieBeneficiario(dataset.assistenzaDisabilita);
      }
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
    <>
      {!mansioni.isLoading &&
        !mansioni.pristine ?
        // *
        //  * Questo primo map esclude le mansioni che fanno riferimento alle disponibilità per le vacanze e
        //  * alla mansione "altro" con dominio 0, che vengono gestite più in basso nella pagina.
        (
          <>
            {mansioni.data.filter(el => el.cdDominioTcb !== 0 && el.cdDominioTcb !== 12 && el.cdDominioTcb !== 13 && el.cdDominioTcb !== 14)
              .map((mans) => (
                <CheckWrapper fluid margin="0 0 1em 0" padding="0 0 .5em 0" key={mans.cdDominioTcb.toString()}>
                  <FieldTitle
                    label={mans.txTitoloMansione[locale]}
                  />
                  <Row margin="0" fluid>
                    {beneficiari.map(ben => (
                      <span key={ben.pgBen} style={{ width: 'auto', padding: '0.3em 1.5em 0 0' }}>
                        <Checkbox
                          value={dataset.mansioniAssociate.find(el => el.id === mans.cdDominioTcb &&
                            el.beneficiariSelezionati.find(selectedBen => selectedBen === ben.pgBen))
                          }
                          width="auto"
                          checkcolor="primary"
                          label={ben.nomeBen.txVal}
                          fontSize="f7"
                          // onBlur={() => handleFieldBlur('mansioniAssociate')}
                          // error={touched.mansioniAssociate && errors.mansioniAssociate}
                          onChange={() => {
                            if (dataset.mansioniAssociate.find(el => el.id === mans.cdDominioTcb)) {
                              setFormField('mansioniAssociate',
                                addBen(
                                  dataset.mansioniAssociate,
                                  mans.cdDominioTcb,
                                  ben.pgBen
                                ));
                            } else {
                              setFormField('mansioniAssociate',
                                addMans(dataset.mansioniAssociate,
                                  {
                                    id: mans.cdDominioTcb,
                                    beneficiariSelezionati: [ben.pgBen],
                                  }));
                            }
                          }}
                        />
                      </span>
                    ))}
                  </Row>
                </CheckWrapper>
              ))
            }
            {
              /**
               * Di seguito la gestione della
               * somministrazione terapie
               */
            }
            {mansioni.data.filter(el => el.cdDominioTcb === 14)
              .map((mans) => (
                <CheckWrapper fluid margin="0 0 1em 0" padding="0 0 .5em 0" key={mans.cdDominioTcb.toString()}>
                  <FieldTitle
                    label={mans.txTitoloMansione[locale]}
                  />
                  <Row margin="0" fluid>
                    {beneficiari.map(ben => (
                      <span key={ben.pgBen} style={{ width: 'auto', padding: '0.3em 1.5em 0 0' }}>
                        <Checkbox
                          value={dataset.mansioniAssociate.find(el => el.id === mans.cdDominioTcb &&
                            el.beneficiariSelezionati.find(selectedBen => selectedBen === ben.pgBen))
                          }
                          width="auto"
                          checkcolor="primary"
                          label={ben.nomeBen.txVal}
                          fontSize="f7"
                          // onBlur={() => handleFieldBlur('mansioniAssociate')}
                          // error={touched.mansioniAssociate && errors.mansioniAssociate}
                          onChange={() => {
                            if (dataset.mansioniAssociate.find(el => el.id === mans.cdDominioTcb)) {
                              setFormField('mansioniAssociate',
                                addBen(
                                  dataset.mansioniAssociate,
                                  mans.cdDominioTcb,
                                  ben.pgBen
                                ));
                            } else {
                              setFormField('mansioniAssociate',
                                addMans(dataset.mansioniAssociate,
                                  {
                                    id: mans.cdDominioTcb,
                                    beneficiariSelezionati: [ben.pgBen],
                                  }));
                            }
                          }}
                        />
                      </span>
                    ))}
                  </Row>
                </CheckWrapper>
              ))
            }
            {
              /**
               * Di seguito la gestione della disponibilità per le vacanze.
               * o se vada gestito come attributo della richiesta
               */
            }
            <CheckWrapper fluid margin="0 0 1em 0" padding="0 0 .5em 0">
              <FieldTitle
                label="Disponibilità a prendere parte alle vacanze"
              />
              <Row margin="0" fluid>
                {
                  mansioni.data.filter(el => el.cdDominioTcb === 12 || el.cdDominioTcb === 13)
                    .map(mans => (
                      <span key={mans.cdDominioTcb} style={{ width: 'auto', padding: '0.3em 1.5em 0 0' }}>
                        <Checkbox
                          value={mans.cdDominioTcb === 12 ? dataset.disponibilitaVacanzeFamiglia : dataset.disponibilitaVacanzeBambini}
                          checkcolor="primary"
                          label={mans.cdDominioTcb === 12 ? 'Con la famiglia' : 'Con i bambini'}
                          fontSize="f7"
                          width="auto"
                          onChange={(value) => setFormField(mans.cdDominioTcb === 12 ?
                            'disponibilitaVacanzeFamiglia' :
                            'disponibilitaVacanzeBambini', value)}
                        />
                      </span>
                    ))
                }
              </Row>
            </CheckWrapper>
            {/**
                   * Di seguito la gestione delle mansioni richieste rispetto alle disabilità,
                   * da inserire come attributo della richiesta su val_attributo_domanda
                   */}
            {beneficiari.find(el => el.patologieBambino && el.patologieBambino.length) ? (
              <CheckWrapper fluid margin="0 0 1em 0" padding="0 0 1em 0">
                <FieldTitle
                  label="Assistenza di bambino/a con disabilità o bisogni educativi speciali"
                  marginBottom="0"
                />
                {
                  beneficiari.filter(el => el.patologieBambino && el.patologieBambino.length).map(ben => (
                    <TextArea
                      key={ben.pgBen}
                      onChange={(value) => setFormField('assistenzaDisabilita',
                        setAssistenzaDisabilita(dataset.assistenzaDisabilita, value, ben.pgBen))}
                      onBlur={() => handleFieldBlur(`assistenzaDisabilita.${ben.pgBen}`)}
                      maxLength={STRING_MAX_VALIDATION.value}
                      placeholder={`Specifica il tipo di assistenza richiesta per ${ben.nomeBen.txVal}`}
                      inputValue={dataset.assistenzaDisabilita[ben.pgBen]}
                      name={`Specificare il tipo di assistenza richiesta per ${ben.nomeBen.txVal}`}
                      rows={3}
                      error={touched[`assistenzaDisabilita.${ben.pgBen}`] && errors[`assistenzaDisabilita.${ben.pgBen}`]}
                    />
                  ))
                }
              </CheckWrapper>
            )
              : null}
            {mansioni.data.filter(el => el.cdDominioTcb === 0)
              .map((mans) => (
                <CheckWrapper fluid margin="0 0 1em 0" padding="0 0 .5em 0" key={mans.cdDominioTcb.toString()}>
                  <FieldTitle
                    label={mans.txTitoloMansione[locale]}
                  />
                  <Row margin="0" fluid>
                    {beneficiari.map(ben => (
                      <span key={ben.pgBen} style={{ width: 'auto', padding: '0.3em 1.5em 0 0' }}>
                        <Checkbox
                          value={dataset.mansioniAssociate.find(el => el.id === mans.cdDominioTcb &&
                            el.beneficiariSelezionati.find(selectedBen => selectedBen === ben.pgBen))
                          }
                          width="auto"
                          checkcolor="primary"
                          label={ben.nomeBen.txVal}
                          fontSize="f7"
                          onChange={() => {
                            if (dataset.mansioniAssociate.find(el => el.id === mans.cdDominioTcb)) {
                              setFormField('mansioniAssociate',
                                addBen(
                                  dataset.mansioniAssociate,
                                  mans.cdDominioTcb,
                                  ben.pgBen
                                ));
                            } else {
                              setFormField('mansioniAssociate',
                                addMans(dataset.mansioniAssociate,
                                  {
                                    id: mans.cdDominioTcb,
                                    beneficiariSelezionati: [ben.pgBen],
                                  }));
                            }
                          }}
                        />
                      </span>
                    ))}
                  </Row>
                  {dataset.mansioniAssociate.find(el => el.id === 0) ? (
                    <Row margin="0 0 .5em 0" fluid>
                      <TextArea
                        onChange={(value) => setFormField('altraMansione', value)}
                        onBlur={() => handleFieldBlur('altraMansione')}
                        error={touched.altraMansione && errors.altraMansione}
                        placeholder={`Scrivi qui le altre mansioni che vuoi che il/la ${getTCBServiceName(servizioTCB, locale)} svolga`}
                        inputValue={dataset.altraMansione}
                        name="Specificare altre mansioni"
                        maxLength={STRING_MAX_VALIDATION.value}
                        rows={3}
                      />
                    </Row>
                  )
                    : null}
                </CheckWrapper>
              ))
            }
          </>
        )
        : null}
      <BottoniNavigazione
        isFormDirty={isFormDirty}
        moveNextValid
        moveBack={() => moveBack(validateForm, getSaveDataCallback())}
        moveNext={() => {
          moveNext(validateForm, getSaveDataCallback());
        }}
        changeStep={changeStep}
      />
    </>
  );
};

AssociaMansioni.displayName = 'AssociaMansioni';


const mapStoreToProps = store => ({
  locale: store.locale,
});
export default connect(mapStoreToProps)(AssociaMansioni);
