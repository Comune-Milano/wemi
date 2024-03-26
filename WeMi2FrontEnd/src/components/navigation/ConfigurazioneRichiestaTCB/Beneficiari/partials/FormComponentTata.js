/** @format */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Select from 'components/ui2/Select';
import FaIcon from 'components/ui2/FaIcon';
import { colors } from 'theme';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import TextArea from 'components/ui2/TextArea';
import media from 'utils/media-queries';
import RadioGroup from 'components/ui2/RadioGroup';
import InputNumber from 'components/ui2/InputNumber';
import Button from 'components/ui2/Button';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { isNullOrUndefined } from 'util';
import { cdAttributo } from 'components/navigation/ConfigurazioneRichiestaTCB/CodiciAttributi';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { calcolaFasciaEta } from '../../CuraDellePersone/partials/utils';
import { estraiFasciaEta as estraiFasciaEtaQ } from '../../CuraDellePersone/estraiMansioniTcbGraphQL';
import { createRadioArray, createSelectArray } from '../../utils';
import {
  eliminaBeneficiarioTCB as eliminaBeneficiarioTCBM,
  inserisciModificaAttributoBeneficiarioTCB as inserisciModificaAttributoBeneficiarioTCBM,
  modificaFasciaEtaBeneficiarioTCB as modificaFasciaEtaBeneficiarioTCBM,
} from './graphQLTCBIRI002';
import FieldTitle from '../../partials/FieldTitle';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const Wrapper = styled(Row)`
    padding: 1.5em;
    background-color: ${colors.greyInput};
`;

const RightColumn = styled(Column)`
    ${media.md`
        border-left: 2px solid ${colors.darkGrey};
    `} 
`;

const FormComponentTata = ({
  idRichiestaTcb,
  infoBen,
  setValidBeneficiario,
  formFieldValues002,
  getDatiRichiesta002,
  locale,
  onRemoveAccordion,
  onSaveAccordion,
}) => {
  const { dataset, isFormValid, touched, setFormField, handleFieldBlur, errors, resetFormFields } = useFormContext();
  const [savedBenData, setSavedBenData] = useState(false);

  const { sessoFieldValues, relazioneFieldValuesTata, patologieFieldValues, lingueParlateFieldValues } = formFieldValues002.data;

  const checkIfNewBen = (ben) => {
    if (isNullOrUndefined(ben[
      'eta',
      'sesso',
      'relazione'])
    ) {
      return true;
    }
    return false;
  };

  const gradoRelazioneSelect = createSelectArray(relazioneFieldValuesTata, locale);
  const patologieSelect = createSelectArray(patologieFieldValues, locale);
  const lingueSelect = createSelectArray(lingueParlateFieldValues, locale);
  const sessoRadio = createRadioArray(sessoFieldValues, locale).sort((a, b) => a.id < b.id ? 1 : -1);
  const nome = infoBen.nomeBen.txVal || '';

  const gradoRelazione = infoBen.relazione && {
    id: infoBen.relazione.cdValAttributo,
    value: infoBen.relazione.tlValoreTestuale[locale],
  } || undefined;
  const sesso = infoBen.sesso && {
    id: infoBen.sesso.cdValAttributo,
    label: infoBen.sesso.tlValoreTestuale[locale],
  } || {};
  const altraRelazione = infoBen.altroRelazione || '';
  const anni = infoBen.eta && parseInt(infoBen.eta.nrVal, 10) || 0;
  const patologie = (infoBen.patologieBambino &&
    infoBen.patologieBambino.map(el => (
      {
        id: el.cdValAttributo,
        value: el.tlValoreTestuale[locale],
      }
    ))
  ) || [];
  const altrePatologie = (infoBen.patologieBambino &&
    infoBen.patologieBambino.find(el => el.cdValAttributo === 0) &&
    infoBen.patologieBambino.find(el => el.cdValAttributo === 0).txNota)
    || '';
  const lingueParlate = checkIfNewBen(infoBen) ? lingueSelect.filter(el => el.value.toLowerCase() === 'italiano') :
    infoBen.lingue.map(el => (
      {
        id: el.cdValAttributo,
        value: el.tlValoreTestuale[locale],
      }
    ));
  const altreInfo = infoBen.altreInfo && infoBen.altreInfo.txVal || '';
  const altreLingue = (
    infoBen.lingue && infoBen.lingue.find(el => el.cdValAttributo === 0) &&
    infoBen.lingue.find(el => el.cdValAttributo === 0).txNota) || '';

  const initialFormDataset = {
    gradoRelazione,
    altraRelazione,
    sesso,
    anni,
    patologie,
    altrePatologie,
    lingueParlate,
    altreInfo,
    altreLingue,
  };

  const [benValidity, setBenValidity] = useState(false);
  if (!checkIfNewBen(infoBen) && !benValidity) {
    setBenValidity(true);
  }
  useEffect(() => {
    setValidBeneficiario(benValidity);
  }, [benValidity]);

  const [statoInserimentoAttributoBeneficiario, inserisciAttributoBeneficiario] = useGraphQLRequest(
    undefined,
    inserisciModificaAttributoBeneficiarioTCBM,
  );

  useEffect(() => {
    if (!statoInserimentoAttributoBeneficiario.isLoading && !statoInserimentoAttributoBeneficiario.pristine) {
      setSavedBenData(true);
      setBenValidity(true);
      setTimeout(() => setSavedBenData(false), 2000);
    }
  }, [statoInserimentoAttributoBeneficiario]);

  const eliminaBeneficiario = useStatelessGraphQLRequest(
    eliminaBeneficiarioTCBM,
  );

  const eliminaBeneficiarioMutation = async (pgBen) => {
    await eliminaBeneficiario({
      idRichiestaTcb,
      pgBen,
    });
    await getDatiRichiesta002();
    onRemoveAccordion(pgBen - 1);
  };

  const setMultiSelectValue = (selectedValues, value) => selectedValues.concat(value);

  const unsetMultiSelectValue = (selectedValues, value) => selectedValues.filter((el) => el.id !== value.id);

  const createArrayConfig = (values) => {
    const arrConf = [
      {
        cd_attributo: cdAttributo.CD_REL_RICH_BENEFICIARIO_TATA,
        cd_val_attributo: values.gradoRelazione && values.gradoRelazione.id,
        tx_nota: values.gradoRelazione && values.gradoRelazione.id === 0 ? values.altraRelazione : undefined,
      },
      { cd_attributo: cdAttributo.CD_SESSO_BENEFICIARIO, cd_val_attributo: values.sesso.id },
      { cd_attributo: cdAttributo.NR_ETA_BENEFICIARIO, cd_val_attributo: 1, nr_val: parseInt(values.anni, 10) },
      ...values.lingueParlate.map(el => (
        {
          cd_attributo: cdAttributo.LS_LINGUE_PARLATE_BAMBINO,
          cd_val_attributo: el.id,
          tx_nota: parseInt(el.id, 10) === 0 ? values.altreLingue : undefined,
        }
      )),
      { cd_attributo: cdAttributo.TX_ALTRE_INFO_BENEFICIARIO, cd_val_attributo: 1, tx_val: values.altreInfo },
    ];
    return inserisciPatologie(arrConf, values);
  };
  const inserisciPatologie = (arr, values) => {
    if (!values.patologie.length) {
      arr.push({
        cd_attributo: cdAttributo.LS_PATOLOGIE_BENEF_TATA,
        cd_val_attributo: -1,
        tx_nota: undefined,
      });

      return arr;
    }

    values.patologie.map(el => arr.push(
      {
        cd_attributo: cdAttributo.LS_PATOLOGIE_BENEF_TATA,
        cd_val_attributo: el.id,
        tx_nota: parseInt(el.id, 10) === 0 ? values.altrePatologie : undefined,
      }
      ));

    return arr;
  };
  const inserisciAttributiBeneficiarioMutation = async (selectedValues, pgBen) => {
    const arrConf = createArrayConfig(selectedValues);
    arrConf.push(calcolaFasciaEta(selectedValues.anni, fasceEta));
    await inserisciAttributoBeneficiario({
      input: {
        idRichiestaTcb,
        arrayBen: [{
          pgBen,
          arrayConfig: arrConf,
        }],
      },
    });
    onSaveAccordion(pgBen - 1);
    await getDatiRichiesta002();
  };

  const controllaModificaFascaEta = useStatelessGraphQLRequest(
    modificaFasciaEtaBeneficiarioTCBM,
  );

  const [fasceEta] = useGraphQLRequest(
    undefined,
    estraiFasciaEtaQ,
    null,
    true
  );

  const checkAgeRange = (eta) => {
    if (infoBen.eta.nrVal !== eta) {
      const vecchiaFascia = calcolaFasciaEta(infoBen.eta.nrVal, fasceEta);
      const nuovaFascia = calcolaFasciaEta(eta, fasceEta);
      if (JSON.stringify(vecchiaFascia) !== JSON.stringify(nuovaFascia)) {
        controllaModificaFascaEta({
          idRichiestaTcb,
          pgBen: infoBen.pgBen,
          fasciaEta: {
            cd_attributo: nuovaFascia.cd_attributo,
            cd_val_attributo: nuovaFascia.cd_val_attributo,
          },
        });
      }
    }
  };

  useEffect(() => {
    resetFormFields(initialFormDataset);
  }, [infoBen]);

  return (
    <Wrapper justifycontent="space-between">
      <Column xs="12" md="4" padding="0" sizepadding={{ md: '0 2em 0 0' }}>
        <Row fluid margin="0 0 2em" direction="column">
          <FieldTitle
            label={`${nome} è...`}
            required
          />
          <RadioGroup
            radioItems={sessoRadio}
            disabled={statoInserimentoAttributoBeneficiario.isLoading}
            selectedItem={dataset.sesso}
            onChange={(value) => setFormField('sesso', value)}
            onBlur={() => handleFieldBlur('sesso')}
            error={touched.sesso && errors.sesso}
            fontSize="f7"
            checkcolor="primary"
          />
        </Row>
        <Row fluid margin="0 0 2em" direction="column">
          <FieldTitle
            label="Quanti anni ha?"
            required
          />
          <div>
            <InputNumber
              disabled={statoInserimentoAttributoBeneficiario.isLoading}
              value={Number.parseInt(dataset.anni, 10) || 0}
              onBlur={() => handleFieldBlur('anni')}
              error={touched.anni && errors.anni}
              onInputChange={(value) => { setFormField('anni', value); handleFieldBlur('anni'); }}
              onChange={(value) => { setFormField('anni', value); handleFieldBlur('anni'); }}
              minValue={0}
              maxValue={99}
              size="f7"
              iconColor="primary"
              textColor="black"
              ariaLabel="anni"
            />
          </div>
        </Row>
      </Column>
      <RightColumn xs="12" md="8" padding="2rem 0 0 0" sizepadding={{ md: '0 0 0 2rem' }}>
        <Row fluid margin="0 0 2em" direction="column">
          <FieldTitle
            label={`Qual è il tuo grado di parentela con ${nome}?`}
            required
          />
          <Select
            name="Grado relazione"
            error={touched.gradoRelazione && errors.gradoRelazione}
            disabled={statoInserimentoAttributoBeneficiario.isLoading}
            onBlur={() => handleFieldBlur('gradoRelazione')}
            items={gradoRelazioneSelect}
            selectedValue={dataset.gradoRelazione}
            clickedSelectedItem={() => setFormField('gradoRelazione', undefined)}
            clickedItem={(value) => setFormField('gradoRelazione', value)}
            placeholder="Seleziona il grado di parentela"
            bgColor="white"
            labelSelected="grado relazionale"
          />
        </Row>
        {dataset.gradoRelazione && dataset.gradoRelazione.id === 0 ? (
          <Row fluid margin="0 0 2em" direction="column">
            <FieldTitle
              label={`Specifica il grado di parentela/rapporto che hai con ${nome}`}
              marginBottom="0"
              required
            />
            <TextArea
              onChange={(value) => setFormField('altraRelazione', value)}
              error={touched.altraRelazione && errors.altraRelazione}
              disabled={statoInserimentoAttributoBeneficiario.isLoading}
              onBlur={() => handleFieldBlur('altraRelazione')}
              placeholder="Scrivi qui..."
              inputValue={dataset.altraRelazione}
              name="altraRelazione"
              rows={2}
              maxLength={STRING_MAX_VALIDATION.value}
              ariaLabel={dataset.altrePatologie ? `il grado di parentela/rapporto che hai con ${nome} è:` : `Scrivi qui il grado di parentela/rapporto che hai con ${nome}`}
            />
          </Row>
        )
          : null}
        <Row fluid margin="0 0 2em" direction="column">
          <FieldTitle
            label={`${nome} ha patologie o disabilità?`}
          />
          <Select
            multi
            disabled={statoInserimentoAttributoBeneficiario.isLoading}
            name="Patologie"
            items={patologieSelect}
            placeholder="Seleziona eventuali patologie o disabilità"
            selectedValue={dataset.patologie}
            clickedSelectedItem={(value) => {
              setFormField('patologie', unsetMultiSelectValue(dataset.patologie, value));
            }}
            clickedItem={(value) => {
              setFormField('patologie',
                setMultiSelectValue(dataset.patologie, value));
            }}
            bgColor="white"
            labelSelected={`patologie o disabilità di ${nome}`}
          />
        </Row>
        {dataset.patologie && dataset.patologie.find(el => el.id === 0) ? (
          <Row fluid margin="0 0 2em" direction="column">
            <FieldTitle
              label={`Specifica le altre patologie o disabilità di ${nome}`}
              marginBottom="0"
            />
            <TextArea
              onChange={(value) => setFormField('altrePatologie', value)}
              disabled={statoInserimentoAttributoBeneficiario.isLoading}
              onBlur={() => handleFieldBlur('altrePatologie')}
              placeholder="Scrivi qui..."
              inputValue={dataset.altrePatologie}
              name="altrePatologie"
              error={touched.altrePatologie && errors.altrePatologie}
              rows={2}
              maxLength={STRING_MAX_VALIDATION.value}
              ariaLabel={dataset.altrePatologie ? `le altre patologie o disabilità di ${nome} sono:` : `Scrivi qui le altre patologie o disabilità di ${nome}`}
            />
          </Row>
        )
          : null}
        <Row fluid margin="0" direction="column">
          <FieldTitle
            label={`Quali lingue parla ${nome}?`}
          />
          <Select
            multi
            enableSearch
            disabled={statoInserimentoAttributoBeneficiario.isLoading}
            name="Ligue parlate"
            items={lingueSelect}
            onBlur={() => handleFieldBlur('lingueParlate')}
            error={touched.lingueParlate && errors.lingueParlate}
            selectedValue={dataset.lingueParlate}
            clickedSelectedItem={(value) => {
              setFormField('lingueParlate',
                unsetMultiSelectValue(dataset.lingueParlate, value));
            }}
            clickedItem={(value) => {
              setFormField('lingueParlate',
                setMultiSelectValue(dataset.lingueParlate, value));
            }}
            placeholder="Seleziona le lingue parlate"
            bgColor="white"
            labelSelected={`le lingue parlate da ${nome} sono`}
          />
        </Row>
        {dataset.lingueParlate && dataset.lingueParlate.find(el => el.id === 0) ? (
          <Row fluid margin="2em 0 0 0" direction="column">
            <FieldTitle
              label={`Specifica le altri lingue parlate da ${nome}`}
              marginBottom="0"
            />
            <TextArea
              onChange={(value) => setFormField('altreLingue', value)}
              disabled={statoInserimentoAttributoBeneficiario.isLoading}
              onBlur={() => handleFieldBlur('altreLingue')}
              placeholder="Scrivi qui..."
              inputValue={dataset.altreLingue}
              name="altreLingue"
              rows={2}
              error={touched.altreLingue && errors.altreLingue}
              maxLength={STRING_MAX_VALIDATION.value}
              ariaLabel={dataset.altrePatologie ? `le altre patologie o disabilità di ${nome} sono:` : `Scrivi qui le altre patologie o disabilità di ${nome}`}
            />
          </Row>
        )
          : null}
      </RightColumn>
      <Column xs="12" padding="0">
        <Row fluid margin="2em 0 0 0">
          <FieldTitle
            label={`Raccontaci le abitudini e le caratteristiche di ${nome}`}
            marginBottom="0"
          />
          <TextArea
            onChange={(value) => setFormField('altreInfo', value)}
            disabled={statoInserimentoAttributoBeneficiario.isLoading}
            onBlur={() => handleFieldBlur('altreInfo')}
            placeholder="Scrivi qui..."
            inputValue={dataset.altreInfo}
            name="altreInfo"
            rows={2}
            error={touched.altreInfo && errors.altreInfo}
            maxLength={STRING_MAX_VALIDATION.value}
            ariaLabel={dataset.altreInfoPatologie ? `le abitudini e le caratteristiche di ${nome} sono:` : `Scrivi qui le abitudini e le caratteristiche di ${nome}`}
          />
        </Row>
        <Row fluid justifycontent="flex-end" alignitems="center" margin="2em 0 0 0">
          {savedBenData ? (
            <div style={{ padding: '0 1em 0 0' }}>
              <FaIcon
                icon="check"
                color="primary"
                fontSize="f5"
              />
            </div>
          )
            : null}

          <Button
            type="submit"
            disabled={statoInserimentoAttributoBeneficiario.isLoading || !isFormValid}
            autowidth
            label="Salva modifiche"
            color="primary"
            size="f7"
            weight="bold"
            margin="0 1em 0 0"
            onClick={() => {
              inserisciAttributiBeneficiarioMutation(dataset, infoBen.pgBen);
              if (!checkIfNewBen(infoBen)) {
                if (touched.anni) {
                  checkAgeRange(dataset.anni);
                }
              }
            }}
          />
          <Button
            autowidth
            disabled={statoInserimentoAttributoBeneficiario.isLoading}
            label="Rimuovi"
            color="red"
            weight="bold"
            size="f7"
            onClick={() => {
              eliminaBeneficiarioMutation(infoBen.pgBen);
            }}
          />
        </Row>
      </Column>
    </Wrapper>
  );
};

FormComponentTata.displayName = 'Form component Tata';

export default FormComponentTata;
