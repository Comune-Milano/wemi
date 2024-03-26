
import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { useDepChange } from 'hooks/useDepChange';
import { getCroppedImg } from 'components/ui2/ImageCropper/getCroppedImg';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import ButtonsNavigation from '../../partials/ButtonsNavigation';
import { codiciAttributo } from '../../constants/CodiciAttributo';
import { inserisciDatiPersonali as inserisciDatiPersonaliQ } from '../DatiPersonaliGraphQL';

const Buttons = ({
  dataset,
  changeStep,
  moveToNextStep,
  moveToPrevStep,
  validateForm,
  isFormDirty,
  idUtente,
  stepCandidate,
  skipSubscription,
}) => {
  const inserisciDati = useStatelessGraphQLRequest(inserisciDatiPersonaliQ);

  const getDataSavingCallback = () => {
    if (!isFormDirty) {
      return () => Promise.resolve();
    }

    const { idAllegato } = dataset;
    const file = dataset.fotoCropped;
    const cdAttributoFoto = codiciAttributo.IMG_FOTO;
    const cdAttributoAuto = codiciAttributo.FG_PATENTE_DI_GUIDA_AUTO;
    const auto = dataset.patente;
    const cdAttributoAutomunito = codiciAttributo.FG_AUTOMUNITO;
    const automunito = dataset.automunita;
    const cdAttributoLavoro = codiciAttributo.FG_DISPONIBILE_A_GUIDARE_PER_LAVORO;
    const lavoro = dataset.disponibilitaAguidare;
    const cdAttributoFumatore = codiciAttributo.FG_FUMATORE;
    const { fumatore } = dataset;
    const cdAttributoGatti = codiciAttributo.FG_ALLERGIA_GATTI;
    const { gatti } = dataset;
    const cdAttributoCani = codiciAttributo.FG_ALLERGIA_CANI;
    const { cani } = dataset;
    const cdAttributoAltriAnimali = codiciAttributo.TX_ALLERGIA_ANIMALI_ALTRO;
    const { altriAnimali } = dataset;
    const { altriAnimaliTextArea } = dataset;
    const cdAttributoAlimentari = codiciAttributo.FG_INTOLLERANZA_ALLERGIA__CIBO;
    const { alimentari } = dataset;
    const altroAlimentari = dataset.altroAlimentari ? dataset.altroAlimentari : null;
    const cdAttributoAltro = codiciAttributo.TX_ALLERGIA_ALTRO;
    const { altro } = dataset;
    const altroTextArea = dataset.altroTextArea ? dataset.altroTextArea : null;
    const cdAttributoAltezza = codiciAttributo.CD_ALTEZZA;
    const altezza = dataset.altezza && dataset.altezza.id ? dataset.altezza.id : undefined;
    const cdAttributoCorporatura = codiciAttributo.CD_CORPORATURA;
    const corporatura = dataset.corporatura && dataset.corporatura.id ? dataset.corporatura.id : undefined;
    const cdAttributoInteressi = codiciAttributo.LS_INTERESSI;
    const interessi = dataset.interessi ? dataset.interessi : [];
    const altroInteressi = dataset.altroInteressi ? dataset.altroInteressi : null;
    const cdAttributoCarattere = codiciAttributo.LS_CARATTERE;
    const { carattere } = dataset;
    const altroCarattere = dataset.altroCarattere ? dataset.altroCarattere : null;
    const cdAttributoComunicative = codiciAttributo.LIV_CAPACITA_COMUNICATIVE;
    const { comunicative } = dataset;
    const cdAttributoAdattamento = codiciAttributo.LIV_CAPACITA_DI_ADATTAMENTO;
    const { adattamento } = dataset;
    const cdAttributoTempo = codiciAttributo.LIV_CAPACITA_DI_GESTIONE_DEL_TEMPO;
    const { tempo } = dataset;
    const cdAttributoMedia = codiciAttributo.NR_MEDIA_COMPETENZE_RELAZIONALI;
    const media = ((dataset.comunicative ? dataset.comunicative : 0) + (dataset.adattamento ? dataset.adattamento : 0) + (dataset.tempo ? dataset.tempo : 0)) / 3;
    return () => {
      const data = {
        input: {
          idUtente,
          idAllegato,
          cdAttributoFoto,
          file,
          cdAttributoAuto,
          auto,
          cdAttributoAutomunito,
          automunito,
          cdAttributoLavoro,
          lavoro,
          cdAttributoFumatore,
          fumatore,
          cdAttributoGatti,
          gatti,
          cdAttributoCani,
          cani,
          cdAttributoAltriAnimali,
          altriAnimali,
          altriAnimaliTextArea,
          cdAttributoAlimentari,
          alimentari,
          altroAlimentari,
          cdAttributoAltro,
          altro,
          altroTextArea,
          cdAttributoAltezza,
          altezza,
          cdAttributoCorporatura,
          corporatura,
          cdAttributoInteressi,
          interessi,
          altroInteressi,
          cdAttributoCarattere,
          carattere,
          altroCarattere,
          cdAttributoComunicative,
          comunicative,
          cdAttributoAdattamento,
          adattamento,
          cdAttributoTempo,
          tempo,
          cdAttributoMedia,
          media,
        },
      };

      if (dataset.foto && dataset.croppedAreaPixels) {
        return getCroppedImg(dataset.foto, dataset.croppedAreaPixels).then(file => {
          data.input.file = file;
          inserisciDati(data);
        });
      }

      return inserisciDati(data);
    };
  };

  const onStepCandidateChange = nextStep => {
    changeStep(nextStep, validateForm, getDataSavingCallback());
  };

  useDepChange(onStepCandidateChange, stepCandidate);

  useBusSubscribe(
    'SALVA_ADMIN',
    getDataSavingCallback(),
    skipSubscription
  );


  return (
    <Column xs={12} padding="0">
      <Row fluid justifycontent="center">
        <ButtonsNavigation
          onMoveNext={() => moveToNextStep(validateForm, getDataSavingCallback())}
          onMoveBack={() => moveToPrevStep(validateForm, getDataSavingCallback())}
        />
      </Row>
    </Column>
  );
};

export default Buttons;

Buttons.displayName = 'Buttons';
