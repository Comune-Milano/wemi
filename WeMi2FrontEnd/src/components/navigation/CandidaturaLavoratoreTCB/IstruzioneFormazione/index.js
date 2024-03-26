
import React, { useEffect, useState } from 'react';
import { Row } from 'components/ui/Grid';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Form } from 'libs/Form/components/Form';
import yup from 'libs/Form/validation/yup';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { StepTitle, GroupFieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import { CD_DOMINIO_TCB_ALTRO, CD_DOMINIO_TCB_LAUREA } from 'types/tcbConstants';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import TitoliStudio from './partials/TitoliStudio';
import CorsiFormazione from './partials/CorsiFormazione';
import Italiano from './partials/Italiano';
import AltreLingue from './partials/AltreLingue';
import Buttons from './partials/Buttons';
import { EstraiCorsi as EstraiCorsiQ, estraiDatiIstruzioneFormazione as estraiDatiIstruzioneFormazioneQ } from './IstruzioneFormazioneGraphQL';
import { codiciAttributo } from '../constants/CodiciAttributo';


const IstruzioneFormazione = ({
  locale,
  idOperatore,
  idLavoratore,
  changeStep,
  moveToNextStep,
  moveToPrevStep,
  stepCandidate,
}) => {
  const [initialDataset, setInitialDataset] = useState();
  const [Corsi] = useGraphQLRequest(
    undefined,
    EstraiCorsiQ,
    undefined,
    true
  );
  const [DatiIniziali] = useGraphQLRequest(
    undefined,
    estraiDatiIstruzioneFormazioneQ,
    {
      input: {
        idUtente: idLavoratore,
        cdAttributoTata: codiciAttributo.LS_CORSI_TATA,
        cdAttributoBadante: codiciAttributo.LS_CORSI_BADANTE,
        cdAttributoConoscenzaItaliano: codiciAttributo.LIV_CONOSCENZA_ITALIANO,
        cdAttributoLingueEstere: codiciAttributo.LIV_LINGUE_CONOSCIUTE,
        cdAttributoBadanteInteresse: codiciAttributo.FG_INTERESSE_A_FREQUENTARE_CORSI_SA,
        cdAttributoCorsiItaliano: codiciAttributo.FG_INTERESSE_A_FREQUENTARE_CORSI_DI_ITALIANO,
      },
    },
    true
  );

  useEffect(() => {
    if (!DatiIniziali.data || !Corsi.data || initialDataset) {
      return;
    }

    const tata = [];
    const badante = [];
    const arrayLingue = [];

    let altroTata;
    let altroBadante;
    let nomeLaurea;
    let madrelingua;
    let livelloConoscenzaItaliano;
    let interesseAfrequentareCorsi;
    let nomeCorsoDaFrequentare;
    let corsiItaliano;

    DatiIniziali.data.estraiDati003.forEach(element => {
      switch (element.cd_attributo) {
        case codiciAttributo.LS_CORSI_TATA:
          tata.push(element.cd_val_attributo);

          if (element.cd_val_attributo === CD_DOMINIO_TCB_ALTRO) {
            altroTata = element.tx_val;
          }
          if (element.cd_val_attributo === CD_DOMINIO_TCB_LAUREA) {
            nomeLaurea = element.tx_val;
          }
          break;
        case codiciAttributo.LS_CORSI_BADANTE:
          badante.push(element.cd_val_attributo);

          if (element.cd_val_attributo === CD_DOMINIO_TCB_ALTRO) {
            altroBadante = element.tx_val;
          }
          break;
        case codiciAttributo.LIV_CONOSCENZA_ITALIANO:
          if (element.nr_val === 6) {
            madrelingua = true;
          }
          livelloConoscenzaItaliano = element.nr_val;
          break;
        case codiciAttributo.LIV_LINGUE_CONOSCIUTE:
          Corsi.data.EstraiLingueParlate.forEach((ele) => {
            if (element.cd_val_attributo === ele.cdDominioTcb) {
              arrayLingue.push({ cdDominio: ele.cdDominioTcb, nome: element.tx_nota || ele.tlValoreTestuale[locale], inizializzazione: element.nr_val });
            }
          });
          break;
        case codiciAttributo.FG_INTERESSE_A_FREQUENTARE_CORSI_SA:
          interesseAfrequentareCorsi = element.fg_val === 'S';
          nomeCorsoDaFrequentare = element.tx_val ? element.tx_val : undefined;
          break;
        case codiciAttributo.FG_INTERESSE_A_FREQUENTARE_CORSI_DI_ITALIANO:
          corsiItaliano = element.fg_val === 'S';
          break;
        default:
          break;
      }
    });
    setInitialDataset({
      tata,
      altroTata,
      nomeCorsoDaFrequentare,
      nomeLaurea,
      altroBadante,
      badante,
      madrelingua,
      livelloConoscenzaItaliano,
      interesseAfrequentareCorsi,
      arrayLingue,
      corsiItaliano,
      checkItaliano: false,
    });
  }, [DatiIniziali.data, Corsi.data, initialDataset]);

  // Form validation schema.

  const formvalidationSchema = yup.object().shape({
    altroTata: yup
      .string()
      .typeError('Inserire un testo valido')
      .when(
        'tata',
        (items) => {
          if (items.includes(0)) {
            return yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message).required();
          }
          return yup.string();
        }
      ),
    altroBadante: yup
      .string()
      .typeError('Inserire un testo valido')
      .when(
        'badante',
        (items) => {
          if (items.includes(CD_DOMINIO_TCB_ALTRO)) {
            return yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message).required();
          }
          return yup.string();
        }
      ),
    arrayLingue: yup
      .array()
      .when('checkItaliano', {
        is: true,
        then: yup.array(),
        otherwise: yup.array().min(1, 'inserire una lingua').required(),
      }),
    badante: yup.array(),
    checkItaliano: yup.boolean(),
    interesseAfrequentareCorsi: yup.boolean(),
    nomeCorsoDaFrequentare: yup
      .string()
      .typeError('Inserire un testo valido')
      .when(
        'interesseAfrequentareCorsi', {
          is: true,
          then: yup.string().typeError('Inserire un testo valido').max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message).required(),
          otherwise: yup.string(),
        }
      ),
    nomeLaurea: yup
      .string()
      .typeError('Inserire un testo valido')
      .when(
        'tata',
        (items) => {
          if (items.includes(CD_DOMINIO_TCB_LAUREA)) {
            return yup.string().max(STRING_MAX_VALIDATION.value, STRING_MAX_VALIDATION.message).required();
          }
          return yup.string();
        }
      ),
    tata: yup.array(),
  });

  return (
    !isNullOrUndefined(initialDataset) && (
      <>
        <Row fluid>
          <StepTitle title="Istruzione e formazione" />
        </Row>
        <Form
          validateOnChange
          initialDataset={initialDataset}
          validationSchema={formvalidationSchema}
        >
          {({ dataset, touched, setFormField, setFormFields, validateForm, errors, handleFieldBlur, isFormDirty }) => (
            !isNullOrUndefined(Corsi.data) && (
              <>
                <TitoliStudio
                  dataset={dataset}
                  setFormField={setFormField}
                  locale={locale}
                  corsi={Corsi.data.EstraiCorsiTata}
                  handleFieldBlur={handleFieldBlur}
                  errors={errors}
                  touched={touched}
                />
                <CorsiFormazione
                  dataset={dataset}
                  setFormField={setFormField}
                  locale={locale}
                  corsiTata={Corsi.data.EstraiCorsiTata}
                  corsiBadante={Corsi.data.EstraiCorsiBadante}
                  handleFieldBlur={handleFieldBlur}
                  errors={errors}
                  touched={touched}
                />
                <Row fluid>
                  <GroupFieldTitle
                    title="Quali lingue parli?"
                    required
                  />
                </Row>
                <Italiano
                  dataset={dataset}
                  setFormField={setFormField}
                  idLavoratore={idLavoratore}
                />
                <AltreLingue
                  dataset={dataset}
                  setFormFields={setFormFields}
                  setFormField={setFormField}
                  lingue={Corsi.data.EstraiLingueParlate}
                  locale={locale}
                  idLavoratore={idLavoratore}
                />
                <Buttons
                  dataset={dataset}
                  isFormDirty={isFormDirty}
                  validateForm={validateForm}
                  changeStep={changeStep}
                  moveToNextStep={moveToNextStep}
                  moveToPrevStep={moveToPrevStep}
                  idLavoratore={idLavoratore}
                  idOperatore={idOperatore}
                  stepCandidate={stepCandidate}
                />
              </>
            )
          )}
        </Form>
      </>
    )
  );
};

IstruzioneFormazione.displayName = 'IstruzioneFormazione';

export default (IstruzioneFormazione);
