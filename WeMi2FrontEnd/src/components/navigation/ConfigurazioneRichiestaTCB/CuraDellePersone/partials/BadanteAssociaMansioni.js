/** @format */

import React from 'react';
import { connect } from 'react-redux';
import { TCBConfig002 } from 'redux-modules/actions/authActions';
import { Row } from 'components/ui/Grid';
import Checkbox from 'components/ui2/Checkbox';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import TextArea from 'components/ui2/TextArea';
import { cdAttributo } from 'components/navigation/ConfigurazioneRichiestaTCB/CodiciAttributi';
import BottoniNavigazione from 'components/navigation/ConfigurazioneRichiestaTCB/partials/BottoniNavigazione';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { useDepChange } from 'hooks/useDepChange';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import {
  inserisciModificaDatiRichiesta003 as inserisciModificaDatiRichiesta003M,
  inserisciModificaAttributoBeneficiarioTCB as inserisciModificaAttributoBeneficiarioTCBM,
} from '../InserisciDatiRichiesta003';

import FieldTitle from '../../partials/FieldTitle';

const cdDominioTcbTerapie = 3;

const MansioniCategoryWrapper = ({
  title,
  array,
  dataset,
  locale,
  setFormField,
  addMans,
  noMargin,
  touched,
  errors,
}) => {
  if (array.length > 0) {
    return (
      <>
        <FieldTitle
          label={title}
          marginTop={noMargin ? null : '2em'}
          uppercase
        />
        {
          array.map((mans) => (
            <React.Fragment key={`Mansioni_${mans.cdDominioTcb}`}>
              <Row fluid>
                <Checkbox
                  key={mans.cdDominioTcb.toString()}
                  value={dataset.mansioniSelezionate.includes(mans.cdDominioTcb)}
                  // onBlur={handleFieldBlur('mansioniSelezionate')}
                  // error={touched.mansioniSelezionate && errors.mansioniSelezionate }
                  checkcolor="primary"
                  label={mans.txTitoloMansione[locale]}
                  fontSize="f7"
                  width="auto"
                  onChange={() => { setFormField('mansioniSelezionate', addMans(dataset.mansioniSelezionate, mans.cdDominioTcb)); }}
                />
              </Row>
              {
                (dataset.mansioniSelezionate.includes(cdDominioTcbTerapie) && mans.cdDominioTcb === cdDominioTcbTerapie) ? (
                  <Row margin="1em 0 0 0" fluid>
                    <TextArea
                      onChange={(value) => { setFormField('TextAreaTerapie', value); }}
                      maxLength={STRING_MAX_VALIDATION.value}
                      placeholder="Specificare somministrazione di terapie"
                      inputValue={dataset.TextAreaTerapie}
                      error={touched.TextAreaTerapie && errors.TextAreaTerapie}
                      name="Specificare somministrazione di terapie"
                      rows={3}
                    />
                  </Row>
                )
                  :
                  null
              }
            </React.Fragment>
          ))
        }
      </>
    );
  }

  return null;
};

MansioniCategoryWrapper.displayName = 'Mansioni categorie Wrapper';


const AssociaMansioni = ({
  idRichiestaTcb,
  locale,
  moveNext,
  moveBack,
  changeStep,
  stepDomanda,
  mansioni,
  stepCheckValidity,
  sendRequestTCB,
}) => {
  const { dataset, validateForm, isFormDirty, setFormField, touched, errors, handleFieldBlur } = useFormContext();
  const assistenza = [];
  const curaIgene = [];
  const alimentazione = [];
  const cureMediche = [];
  const disabilita = [];
  const accompagnamentoVacanza = [];
  const altreMansioni = [];

  if (mansioni.data) {
    mansioni.data.forEach((element) => {
      switch (element.pgVisualizzazione) {
        case 1:
          assistenza.push(element);
          break;
        case 2:
          curaIgene.push(element);
          break;
        case 3:
          alimentazione.push(element);
          break;
        case 4:
          cureMediche.push(element);
          break;
        case 5:
          disabilita.push(element);
          break;
        case 6:
          accompagnamentoVacanza.push(element);
          break;
        default:
          if (element.cdDominioTcb !== 0) {
            altreMansioni.push(element);
          }
      }
    });
  }

  const addMans = (selectedMans, value) => {
    if (selectedMans.includes(value)) {
      const arr = selectedMans.slice().filter(el => el !== value);
      return arr;
    }
    return selectedMans.concat(value);
  };

  const inserisciTxPatologieBeneficiarioMutation = useStatelessGraphQLRequest(
    inserisciModificaAttributoBeneficiarioTCBM,
  );

  const inserisciDatiRichiesta003 = useStatelessGraphQLRequest(
    inserisciModificaDatiRichiesta003M,
  );

  const createArrayConfig = (values) => {
    values.mansioniSelezionate = values.mansioniSelezionate.filter((el) => el !== 0);
    const arrConf = [
      ...values.mansioniSelezionate.map(el => (
        {
          cd_attributo: cdAttributo.LS_MANSIONI_RICHIESTE_BADANTE,
          cd_val_attributo: el,
          tx_nota: el === cdDominioTcbTerapie ? values.TextAreaTerapie : el === 0 ? values.altraMansioneTextArea : undefined,
        }
      )),
    ];
    if (values.altraMansioneCheckbox) {
      arrConf.push({
        cd_attributo: cdAttributo.LS_MANSIONI_RICHIESTE_BADANTE,
        cd_val_attributo: 0,
        tx_nota: values.altraMansioneTextArea || null,
      });
    } else {
      arrConf.push({
        cd_attributo: cdAttributo.LS_MANSIONI_RICHIESTE_BADANTE,
        cd_val_attributo: -1,
        tx_nota: undefined,
      });
    }

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
          cd_val_attributo: 1,
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

  const onChangeAltroCheckbox = (value, setFormField) => {
    if (!value) {
      setFormField('altraMansioneTextArea', undefined);
    }
    setFormField('altraMansioneCheckbox', !!value);
  };

  /**
  * Gets the callback trigger the saving of step-related data.
  */
  const getSaveDataCallback = () => {
    if (!isFormDirty) {
      return () => Promise.resolve();
    }
    return async () => {
      inserisciAttributiRichiesta003(dataset);
      if (dataset.assistenzaDisabilita) {
        inserisciTxPatologieBeneficiario(dataset.assistenzaDisabilita);
      }
    };
  };

  /**
   * A callback to run when a step candidate request is detected.
   * @param {*} step
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
        !mansioni.pristine ? (
          <>
            <MansioniCategoryWrapper
              noMargin
              title="Assistenza"
              array={assistenza}
              dataset={dataset}
              setFormField={setFormField}
              addMans={addMans}
              locale={locale}
              touched={touched}
              errors={errors}
            />
            <MansioniCategoryWrapper
              title="Cura e igiene"
              array={curaIgene}
              dataset={dataset}
              setFormField={setFormField}
              addMans={addMans}
              locale={locale}
              touched={touched}
              errors={errors}
            />
            <MansioniCategoryWrapper
              title="Alimentazione"
              array={alimentazione}
              dataset={dataset}
              setFormField={setFormField}
              addMans={addMans}
              locale={locale}
              touched={touched}
              errors={errors}
            />
            <MansioniCategoryWrapper
              title="Cure mediche"
              array={cureMediche}
              dataset={dataset}
              setFormField={setFormField}
              addMans={addMans}
              locale={locale}
              touched={touched}
              errors={errors}
            />
            <MansioniCategoryWrapper
              title="Disabilità"
              array={disabilita}
              dataset={dataset}
              setFormField={setFormField}
              addMans={addMans}
              locale={locale}
              touched={touched}
              errors={errors}
            />
            <MansioniCategoryWrapper
              title="Accompagnamento in vacanza"
              array={accompagnamentoVacanza}
              dataset={dataset}
              setFormField={setFormField}
              addMans={addMans}
              locale={locale}
              touched={touched}
              errors={errors}
            />
            <MansioniCategoryWrapper
              title="Altre Mansioni"
              array={altreMansioni}
              dataset={dataset}
              setFormField={setFormField}
              addMans={addMans}
              locale={locale}
              touched={touched}
              errors={errors}
            />
            <Row fluid margin="2em 0 0 0">
              <Checkbox
                value={dataset.altraMansioneCheckbox}
                checkcolor="primary"
                label="Altro (specificare)"
                fontSize="f7"
                width="auto"
                onChange={(value) => { onChangeAltroCheckbox(value, setFormField); }}
              />
            </Row>
            {dataset.altraMansioneCheckbox ? (
              <Row margin="1em 0 0 0" fluid>
                <TextArea
                  onChange={(value) => { setFormField('altraMansioneTextArea', value); }}
                  onBlur={() => { handleFieldBlur('altraMansioneTextArea'); }}
                  maxLength={STRING_MAX_VALIDATION.value}
                  error={touched.altraMansioneTextArea && errors.altraMansioneTextArea}
                  placeholder="Scrivi qui eventuali altre mansioni"
                  inputValue={dataset.altraMansioneTextArea}
                  name="Specificare altre mansioni"
                  rows={3}
                />
              </Row>
          )
            :
            null
          }
          </>
      )
        : null}

      <BottoniNavigazione
        isFormDirty={isFormDirty}
        moveNextValid
        moveBack={() => moveBack(validateForm, getSaveDataCallback())}
        moveNext={() => moveNext(validateForm, getSaveDataCallback())}
      />
    </>
  );
};

AssociaMansioni.displayName = 'AssociaMansioni';

const mapDispatchToProps = ({
  TCBConfig002,
});

const mapStoreToProps = store => ({
  config002: store.requestTCB.config002,
  EstraiDati: store.graphql.EstraiDatiConfigurazioneRichiesta002,
  locale: store.locale,
});
export default connect(mapStoreToProps, mapDispatchToProps)(AssociaMansioni);
