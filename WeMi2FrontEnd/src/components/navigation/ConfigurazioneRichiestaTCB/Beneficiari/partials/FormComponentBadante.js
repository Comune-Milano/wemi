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
import Input from 'components/ui2/Input';
import {
  eliminaBeneficiarioTCB as eliminaBeneficiarioTCBM,
  inserisciModificaAttributoBeneficiarioTCB as inserisciModificaAttributoBeneficiarioTCBM,
} from './graphQLTCBIRI002';
import { createSelectArray, createRadioArray } from '../../utils';
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

const FormComponentBadante = ({
  idRichiestaTcb,
  infoBen,
  setValidBeneficiario,
  formFieldValues002,
  getDatiRichiesta002,
  locale,
  onSaveAccordion,
  onRemoveAccordion,
}) => {
  const { dataset, isFormValid, touched, setFormField, handleFieldBlur, errors, resetFormFields } = useFormContext();

  useEffect(() => {
    resetFormFields(initialFormDataset);
  }, [infoBen]);

  const [savedBenData, setSavedBenData] = useState(false);

  const { sessoFieldValues,
    relazioneFieldValues,
    patologieFieldValues,
    deambulazioneFieldValues,
    corporaturaFieldValues,
    altezzaFieldValues,
  } = formFieldValues002.data;

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

  const gradoRelazioneSelect = createSelectArray(relazioneFieldValues, locale);
  const deambulazioneSelect = createSelectArray(deambulazioneFieldValues, locale);
  const altezzaSelect = createSelectArray(altezzaFieldValues, locale);
  const corporaturaSelect = createSelectArray(corporaturaFieldValues, locale);
  const patologieSelect = createSelectArray(patologieFieldValues, locale);
  const sessoRadio = createRadioArray(sessoFieldValues, locale).sort((a, b) => a.id < b.id ? 1 : -1);
  const nome = infoBen.nomeBen.txVal || '';
  const cognome = infoBen.cognomeBen && infoBen.cognomeBen.txVal || '';
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
  const patologie = infoBen.patologieAnziano &&
    infoBen.patologieAnziano.map(el => (
      {
        id: el.cdValAttributo,
        value: el.tlValoreTestuale[locale],
      }
    )) || [];
  const altrePatologie = infoBen.patologieAnziano &&
    infoBen.patologieAnziano.find(el => el.cdValAttributo === 0) &&
    infoBen.patologieAnziano.find(el => el.cdValAttributo === 0).txNota || '';
  const altreInfoPatologie = infoBen.altreInfoPatologie && infoBen.altreInfoPatologie.txVal || '';
  const deambulazione = infoBen.deambulazione && {
    id: infoBen.deambulazione.cdValAttributo,
    value: infoBen.deambulazione.tlValoreTestuale[locale],
  } || undefined;
  const altroDeambulazione = infoBen.altroDeambulazione || '';
  const altezza = infoBen.altezza && {
    id: infoBen.altezza.cdValAttributo,
    value: infoBen.altezza.tlValoreTestuale[locale],
  } || undefined;
  const corporatura = infoBen.corporatura && {
    id: infoBen.corporatura.cdValAttributo,
    value: infoBen.corporatura.tlValoreTestuale[locale],
  } || undefined;
  const altreInfo = infoBen.altreInfo && infoBen.altreInfo.txVal || '';

  const initialFormDataset = {
    cognome,
    gradoRelazione,
    altraRelazione,
    sesso,
    anni,
    patologie,
    altrePatologie,
    altreInfoPatologie,
    deambulazione,
    altroDeambulazione,
    altezza,
    corporatura,
    altreInfo,
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
    setValidBeneficiario(false);
  };

  const setMultiSelectValue = (selectedValues, value) => selectedValues.concat(value);

  const unsetMultiSelectValue = (selectedValues, value) => selectedValues.filter((el) => el.id !== value.id);

  const createArrayConfig = (values) => {
    const arrConf = [
      { cd_attributo: cdAttributo.TX_COGNOME_BENEFICIARIO, cd_val_attributo: 1, tx_val: values.cognome },
      {
        cd_attributo: cdAttributo.CD_REL_RICH_BENEFICIARIO,
        cd_val_attributo: values.gradoRelazione && values.gradoRelazione.id,
        tx_nota: values.gradoRelazione && values.gradoRelazione.id === 0 ? values.altraRelazione : undefined,
      },
      { cd_attributo: cdAttributo.CD_SESSO_BENEFICIARIO, cd_val_attributo: values.sesso.id },
      { cd_attributo: cdAttributo.NR_ETA_BENEFICIARIO, cd_val_attributo: 1, nr_val: parseInt(values.anni, 10) },
      { cd_attributo: cdAttributo.TX_ALTRE_INFO_PATOLOGIE, cd_val_attributo: 1, tx_val: values.altreInfoPatologie },
      {
        cd_attributo: cdAttributo.CD_DEAMBULAZIONE_BENEFICIARIO,
        cd_val_attributo: values.deambulazione && values.deambulazione.id,
        tx_nota: values.deambulazione && values.deambulazione.id === 0 ? values.altroDeambulazione : undefined,
      },
      {
        cd_attributo: cdAttributo.CD_ALTEZZA_BENEFICIARIO,
        cd_val_attributo: values.altezza && values.altezza.id,
      },
      {
        cd_attributo: cdAttributo.CD_CORPORATURA_BENEFICIARIO,
        cd_val_attributo: values.corporatura && values.corporatura.id,
      },
      { cd_attributo: cdAttributo.TX_ALTRE_INFO_BENEFICIARIO, cd_val_attributo: 1, tx_val: values.altreInfo },
    ];

    return inserisciPatologie(arrConf, values);
  };

  const inserisciPatologie = (arr, values) => {
    if (!values.patologie.length) {
      arr.push({
        cd_attributo: cdAttributo.LS_PATOLOGIE_BENEF_BADANTE,
        cd_val_attributo: -1,
        tx_nota: undefined,
      });

      return arr;
    }

    values.patologie.forEach(el => {
      arr.push(
        {
          cd_attributo: cdAttributo.LS_PATOLOGIE_BENEF_BADANTE,
          cd_val_attributo: el.id,
          tx_nota: parseInt(el.id, 10) === 0 ? values.altrePatologie : undefined,
        }
      );
    });

    return arr;
  };

  const inserisciAttributiBeneficiarioMutation = async (selectedValues, pgBen) => {
    await inserisciAttributoBeneficiario({
      input: {
        idRichiestaTcb,
        arrayBen: [{
          pgBen,
          arrayConfig: createArrayConfig(selectedValues),
        }],
      },
    });
    onSaveAccordion(pgBen - 1);
    await getDatiRichiesta002();
  };

  return (
    <Wrapper justifycontent="space-between">

      <Column xs="12" md="4" padding="0" sizepadding={{ md: '0 2em 0 0' }}>
        <Row fluid margin="0 0 2em" direction="column">
          <FieldTitle
            label={`Qual è il cognome di ${nome}?`}
            marginBottom="0"
            required
          />
          <Input
            onChange={(value) => setFormField('cognome', value)}
            disabled={statoInserimentoAttributoBeneficiario.isLoading}
            onBlur={() => handleFieldBlur('cognome')}
            placeholder="Scrivi qui il cognome"
            inputValue={dataset.cognome}
            name="cognome"
            error={touched.cognome && errors.cognome}
            aria-label={dataset.cognome ? `il cognome di ${nome} è ${dataset.cognome}` : null}
          />
        </Row>
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
              maxValue={150}
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
            labelSelected={`il grado di relazione con ${nome} è`}
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
              ariaLabel={dataset.altraRelazione ? `Il grado di parentela con ${nome} è` : `Scrivi qui il grado di parentela/rapporto che hai con ${nome}`}
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
            // onBlur={() => handleFieldBlur('patologie')}
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
              error={touched.altrePatologie && errors.altrePatologie}
              placeholder="Scrivi qui..."
              inputValue={dataset.altrePatologie}
              name="altrePatologie"
              maxLength={STRING_MAX_VALIDATION.value}
              rows={2}
              ariaLabel={dataset.altrePatologie ? `le altre patologie o disabilità di ${nome} sono` : `Scrivi qui le altre patologie o disabilità di ${nome}`}
            />
          </Row>
        )
          : null}
        <Row fluid margin="0 0 2em" direction="column">
          <FieldTitle
            label={`Eventuali informazioni aggiuntive sullo stato di salute di ${nome}:`}
            marginBottom="0"
          />
          <TextArea
            onChange={(value) => setFormField('altreInfoPatologie', value)}
            disabled={statoInserimentoAttributoBeneficiario.isLoading}
            onBlur={() => handleFieldBlur('altreInfoPatologie')}
            error={touched.altreInfoPatologie && errors.altreInfoPatologie}
            placeholder="Scrivi qui..."
            inputValue={dataset.altreInfoPatologie}
            maxLength={STRING_MAX_VALIDATION.value}
            name="altreInfoPatologie"
            rows={2}
            ariaLabel={dataset.altreInfoPatologie ? `informazioni aggiuntive sullo stato di salute di ${nome}:` : `Scrivi qui eventuali informazioni aggiuntive sullo stato di salute di ${nome}:`}
          />
        </Row>

        <Row fluid margin="0 0 2em" direction="column">
          <FieldTitle
            label={`Qual è il livello di autonomia di ${nome}?`}
            required
          />
          <Select
            name="Livello autonomia"
            error={touched.deambulazione && errors.deambulazione}
            disabled={statoInserimentoAttributoBeneficiario.isLoading}
            onBlur={() => handleFieldBlur('deambulazione')}
            items={deambulazioneSelect}
            selectedValue={dataset.deambulazione}
            clickedSelectedItem={() => setFormField('deambulazione', undefined)}
            clickedItem={(value) => setFormField('deambulazione', value)}
            placeholder="Seleziona il livello di autonomia"
            bgColor="white"
            labelSelected={`il livello di autonomia di ${nome} è `}
          />
        </Row>

        {dataset.deambulazione && dataset.deambulazione.id === 0 ? (
          <Row fluid margin="0 0 2em" direction="column">
            <FieldTitle
              label={`Specifica il livello di autonomia di ${nome}`}
              marginBottom="0"
              required
            />
            <TextArea
              onChange={(value) => setFormField('altroDeambulazione', value)}
              error={touched.altroDeambulazione && errors.altroDeambulazione}
              disabled={statoInserimentoAttributoBeneficiario.isLoading}
              onBlur={() => handleFieldBlur('altroDeambulazione')}
              placeholder="Scrivi qui..."
              inputValue={dataset.altroDeambulazione}
              maxLength={STRING_MAX_VALIDATION.value}
              name="altroDeambulazione"
              rows={2}
              ariaLabel={dataset.altrePatologie ? `il livello di autonomia di ${nome} è:` : `Scrivi qui il livello di autonomia di ${nome}`}
            />
          </Row>
        )
          : null}

        <Row fluid margin="0 0 2em" direction="column">
          <FieldTitle
            label={`Di che statura è ${nome}?`}
            required
          />
          <Select
            name="Altezza"
            error={touched.altezza && errors.altezza}
            disabled={statoInserimentoAttributoBeneficiario.isLoading}
            onBlur={() => handleFieldBlur('altezza')}
            items={altezzaSelect}
            selectedValue={dataset.altezza}
            clickedSelectedItem={() => setFormField('altezza', undefined)}
            clickedItem={(value) => setFormField('altezza', value)}
            placeholder={"Seleziona l'altezza"}
            bgColor="white"
            labelSelected={`la statura di ${nome} è `}
          />
        </Row>

        <Row fluid direction="column">
          <FieldTitle
            label="Come si può definire la sua corportura?"
            required
          />
          <Select
            name="Corporatura"
            error={touched.corporatura && errors.corporatura}
            disabled={statoInserimentoAttributoBeneficiario.isLoading}
            onBlur={() => handleFieldBlur('corporatura')}
            items={corporaturaSelect}
            selectedValue={dataset.corporatura}
            clickedSelectedItem={() => setFormField('corporatura', undefined)}
            clickedItem={(value) => setFormField('corporatura', value)}
            placeholder="Seleziona la corporatura"
            bgColor="white"
            labelSelected={`la corporatura di ${nome} è `}
          />
        </Row>

      </RightColumn>

      <Column padding="0">
        <Row fluid margin="2em 0 0">
          <FieldTitle
            label={`Raccontaci le abitudini e le caratteristiche di ${nome}`}
            marginBottom="0"
          />
          <TextArea
            onChange={(value) => setFormField('altreInfo', value)}
            disabled={statoInserimentoAttributoBeneficiario.isLoading}
            onBlur={() => handleFieldBlur('altreInfo')}
            error={touched.altreInfo && errors.altreInfo}
            maxLength={STRING_MAX_VALIDATION.value}
            placeholder="Scrivi qui..."
            inputValue={dataset.altreInfo}
            name="altreInfo"
            rows={2}
            ariaLabel={dataset.altreInfoPatologie ? `le abitudini e le caratteristiche di ${nome}:` : `Scrivi qui le abitudini e le caratteristichedi ${nome}`}
          />
        </Row>
        <Row fluid justifycontent="flex-end" alignitems="center" margin="2em 0 0">
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

FormComponentBadante.displayName = 'Form component badante';

export default FormComponentBadante;
