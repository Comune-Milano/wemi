
import React, { useEffect, useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Form } from 'libs/Form/components/Form';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { StepTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import Foto from './partials/Foto';
import Preview from './partials/Preview';
import DatiGenerici from './partials/DatiGenerici';
import Allergie from './partials/Allergie';
import Carattere from './partials/Carattere';
import CaratteristicheFisiche from './partials/CaratteristicheFisiche';
import Interessi from './partials/Interessi';
import Fumatore from './partials/Fumatore';
import Buttons from './partials/Buttons';
import { codiciAttributo } from '../constants/CodiciAttributo';
import { EstraiDatiCheckbox as EstraiDatiCheckboxQ, estraiDatiPersonali as estraiDatiPersonaliQ } from './DatiPersonaliGraphQL';
import schema from './validationschema';

const TCBICL005 = ({
  locale,
  idLavoratore,
  idOperatore,
  changeStep,
  moveToNextStep,
  moveToPrevStep,
  stepCandidate,
}) => {
  const [initialDataset, setInitialDataset] = useState();

  const [datiCheckbox] = useGraphQLRequest(
    undefined,
    EstraiDatiCheckboxQ,
    undefined,
    true
  );
  const [datiPersonali] = useGraphQLRequest(
    undefined,
    estraiDatiPersonaliQ,
    {
      input: {
        idUtente: idLavoratore,
        cdAttributoAuto: codiciAttributo.FG_PATENTE_DI_GUIDA_AUTO,
        cdAttributoAutomunito: codiciAttributo.FG_AUTOMUNITO,
        cdAttributoLavoro: codiciAttributo.FG_DISPONIBILE_A_GUIDARE_PER_LAVORO,
        cdAttributoFumatore: codiciAttributo.FG_FUMATORE,
        cdAttributoGatti: codiciAttributo.FG_ALLERGIA_GATTI,
        cdAttributoCani: codiciAttributo.FG_ALLERGIA_CANI,
        cdAttributoAltriAnimali: codiciAttributo.TX_ALLERGIA_ANIMALI_ALTRO,
        cdAttributoAlimentari: codiciAttributo.FG_INTOLLERANZA_ALLERGIA__CIBO,
        cdAttributoAltro: codiciAttributo.TX_ALLERGIA_ALTRO,
        cdAttributoAltezza: codiciAttributo.CD_ALTEZZA,
        cdAttributoCorporatura: codiciAttributo.CD_CORPORATURA,
        cdAttributoInteressi: codiciAttributo.LS_INTERESSI,
        cdAttributoCarattere: codiciAttributo.LS_CARATTERE,
        cdAttributoComunicative: codiciAttributo.LIV_CAPACITA_COMUNICATIVE,
        cdAttributoAdattamento: codiciAttributo.LIV_CAPACITA_DI_ADATTAMENTO,
        cdAttributoTempo: codiciAttributo.LIV_CAPACITA_DI_GESTIONE_DEL_TEMPO,
        cdAttributoFoto: codiciAttributo.IMG_FOTO,
      },
    },
    true
  );

  useEffect(() => {
    if (!datiPersonali.data || initialDataset || !datiCheckbox.data) {
      return;
    }
    let fotoCropped;
    let idAllegato;
    let patente;
    let disponibilitaAguidare;
    let automunita;
    let fumatore;
    let gatti;
    let cani;
    let altriAnimali;
    let altriAnimaliTextArea;
    let alimentari;
    let altroAlimentari;
    let altro;
    let altroTextArea;
    let altezza;
    let corporatura;
    const interessi = [];
    const carattere = [];
    let altroCarattere = '';
    let altroInteressi = '';
    let comunicative;
    let adattamento;
    let tempo;

    datiPersonali.data.estraiDati005.forEach(ele => {
      switch (ele.cd_attributo) {
        case codiciAttributo.FG_PATENTE_DI_GUIDA_AUTO:
          patente = ele.fg_val === 'S';
          break;
        case codiciAttributo.FG_AUTOMUNITO:
          automunita = ele.fg_val === 'S';
          break;
        case codiciAttributo.FG_DISPONIBILE_A_GUIDARE_PER_LAVORO:
          disponibilitaAguidare = ele.fg_val === 'S';
          break;
        case codiciAttributo.FG_FUMATORE:
          fumatore = ele.fg_val === 'S';
          break;
        case codiciAttributo.FG_ALLERGIA_GATTI:
          gatti = ele.fg_val === 'S';
          break;
        case codiciAttributo.FG_ALLERGIA_CANI:
          cani = ele.fg_val === 'S';
          break;
        case codiciAttributo.TX_ALLERGIA_ANIMALI_ALTRO:
          altriAnimali = ele.fg_val === 'S';
          altriAnimaliTextArea = ele.tx_val || '';
          break;
        case codiciAttributo.FG_INTOLLERANZA_ALLERGIA__CIBO:
          alimentari = ele.fg_val === 'S';
          altroAlimentari = ele.tx_val || '';
          break;
        case codiciAttributo.TX_ALLERGIA_ALTRO:
          altro = ele.fg_val === 'S';
          altroTextArea = ele.tx_val || '';
          break;
        case codiciAttributo.CD_ALTEZZA:
          datiCheckbox.data.EstraiAltezza.forEach((element) => {
            if (element.cdDominioTcb === ele.cd_val_attributo) {
              altezza = { id: ele.cd_val_attributo, value: element.tlValoreTestuale[locale] };
            }
          });
          break;
        case codiciAttributo.CD_CORPORATURA:
          datiCheckbox.data.EstraiCorporatura.forEach((element) => {
            if (element.cdDominioTcb === ele.cd_val_attributo) {
              corporatura = { id: ele.cd_val_attributo, value: element.tlValoreTestuale[locale] };
            }
          });
          break;
        case codiciAttributo.LS_INTERESSI:
          interessi.push(ele.cd_val_attributo);
          if (ele.cd_val_attributo === 0) {
            altroInteressi = ele.tx_val || '';
          }
          break;
        case codiciAttributo.LS_CARATTERE:
          carattere.push(ele.cd_val_attributo);
          if (ele.cd_val_attributo === 0) {
            altroCarattere = ele.tx_val || '';
          }
          break;
        case codiciAttributo.LIV_CAPACITA_COMUNICATIVE:
          comunicative = ele.nr_val;
          break;
        case codiciAttributo.LIV_CAPACITA_DI_ADATTAMENTO:
          adattamento = ele.nr_val;
          break;
        case codiciAttributo.LIV_CAPACITA_DI_GESTIONE_DEL_TEMPO:
          tempo = ele.nr_val;
          break;
        case codiciAttributo.IMG_FOTO:
          fotoCropped = ele.oj_allegato_off;
          idAllegato = ele.id_allegato;
          break;
        default:
          break;
      }
    });

    setInitialDataset({
      foto: null,
      fotoCropped,
      idAllegato,
      patente,
      disponibilitaAguidare,
      automunita,
      fumatore,
      gatti,
      cani,
      altriAnimali,
      altriAnimaliTextArea,
      alimentari,
      altroAlimentari,
      altro,
      altroTextArea,
      altezza,
      corporatura,
      interessi,
      carattere,
      altroCarattere,
      altroInteressi,
      comunicative,
      adattamento,
      tempo,
    });
  }, [datiPersonali.data, datiCheckbox.data, initialDataset]);

  if (!initialDataset) {
    return null;
  }

  return (
    <>
      <Row fluid>
        <StepTitle title="Informazioni personali" />
      </Row>
      {
        datiCheckbox.data ? (
          <Form
            initialDataset={initialDataset}
            validateOnChange
            validationSchema={schema}
          >
            {({ dataset, setFormField, validateForm, isFormDirty, handleFieldBlur, touched, errors }) => (
              <>
                <Row fluid>
                  <Column padding="0" md="7" lg="7" sm="7">
                    <Foto
                      dataset={dataset}
                      setFormField={setFormField}
                    />
                  </Column>
                  <Column padding="0" md="5" lg="5" sm="5">
                    <Preview dataset={dataset} setFormField={setFormField} idLavoratore={idLavoratore} />
                  </Column>
                </Row>
                <DatiGenerici
                  dataset={dataset}
                  setFormField={setFormField}
                  handleFieldBlur={handleFieldBlur}
                />
                <Allergie
                  dataset={dataset}
                  errors={errors}
                  touched={touched}
                  setFormField={setFormField}
                  handleFieldBlur={handleFieldBlur}
                />
                <CaratteristicheFisiche
                  dataset={dataset}
                  setFormField={setFormField}
                  altezza={datiCheckbox.data.EstraiAltezza}
                  corporatura={datiCheckbox.data.EstraiCorporatura}
                  locale={locale}
                />
                <Interessi
                  dataset={dataset}
                  errors={errors}
                  touched={touched}
                  handleFieldBlur={handleFieldBlur}
                  locale={locale}
                  setFormField={setFormField}
                  box={datiCheckbox.data.EstraiInteressi}
                />
                <Carattere
                  dataset={dataset}
                  locale={locale}
                  handleFieldBlur={handleFieldBlur}
                  touched={touched}
                  errors={errors}
                  setFormField={setFormField}
                  box={datiCheckbox.data.EstraiCarattereLavoratore}
                />
                <Fumatore
                  dataset={dataset}
                  setFormField={setFormField}
                  handleFieldBlur={handleFieldBlur}
                />
                <Buttons
                  dataset={dataset}
                  isFormDirty={isFormDirty}
                  validateForm={validateForm}
                  changeStep={changeStep}
                  moveToNextStep={moveToNextStep}
                  moveToPrevStep={moveToPrevStep}
                  idUtente={idLavoratore}
                  skipSubscription={isNullOrUndefined(idOperatore)}
                  stepCandidate={stepCandidate}
                  idOperatore={idOperatore}
                />
              </>
            )}
          </Form>
        ) : null
      }
    </>
  );
};

TCBICL005.displayName = 'TCBICL005';

export default (TCBICL005);
