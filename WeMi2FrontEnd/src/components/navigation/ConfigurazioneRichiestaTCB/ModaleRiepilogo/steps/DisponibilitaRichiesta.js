import React from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { convertBinToObject } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import { functionSort } from 'utils/functions/functionSort';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { TIPOLOGIA_ORARIO } from 'components/pages/MatchingDomandaLavoratore/constants/tipologiaorario';
import { capitalizeString } from 'utils/extensions/stringExtensions';
import Wrapper from '../partials/Wrapper';
import SectionTitle from '../partials/SectionTitle';
import FieldText from '../partials/FieldText';
import FieldList from '../partials/FieldList';
import { getTCBServiceName } from '../../utils';
import { formattedDate } from '../utils';
import { cdAttributo } from '../../CodiciAttributi';
import { getCheckboxOptionsEtaBambini, radioItemsPersoneAutoSufficienti } from 'components/shared/domanda-tcb/costants';
import { CD_TIPOLOGICA_BADANTE, CD_TIPOLOGICA_TATA } from 'types/tcbConstants';
import { idLivelloContrattuale } from 'types/idLivelloContrattuale';
import { idLibrettoDiFamiglia } from 'types/idLibrettoDiFamiglia';
import { mergeHoursBetween } from '../../DisponibilitaRichiesta/partials/utils';
import { INTERVALS } from '../../DisponibilitaRichiesta/partials/constants';
import { TIPOLOGIA_CONTRATTO } from 'types/tipologiaContratto';

const DisponibilitaRichiesta = ({
  title,
  moveTo,
  servizioTCB,
  locale = "it",
  loading,
  errored,
  data,
  benficiariData,
  tipologiaAssunzione
}) => {

  const isLibrettoDiFamiglia = tipologiaAssunzione?.id === idLibrettoDiFamiglia;
  let orario;
  let oreSettimanali;
  const spaziRiservati = [];
  let paga;
  const tipologiaContratto = {};
  const listaDisponibilita = [];
  let dataDal;
  let dataAl;
  const mezzeGiornate = [];
  const arrayCalendario = [];
  let altroSuContratto;
  let personeAutoSufficienti;
  let livelloContrattuale;

  if (!loading && data.disponibilita) {
    data.disponibilita.forEach(element => {
      switch (element.cd_attributo) {
        case cdAttributo.CD_ORARIO_LAVORO:
          orario = getObjectValue(element, 'cd_val_attributo', null);
          break;
        case cdAttributo.CD_LIVELLO_CONTRATTUALE:
          livelloContrattuale = getObjectValue(element, 'cd_val_attributo', null);
          break;
        case cdAttributo.LS_SPAZI_CONVIVENTE:
          if (element.cd_val_attributo === 0) {
            spaziRiservati.push({ other: true, value: getObjectValue(element, 'tx_nota', ''), error: !getObjectValue(element, 'tx_nota', false), label: 'Altro', cdDominioTcb: element.cd_val_attributo });
          } else {
            spaziRiservati.push({ value: getObjectValue(element, `tl_valore_testuale.${locale}`, '') });
          }
          break;
        case cdAttributo.IM_STIPENDIO_A_CONVIVENZA_RIDOTTA:
          paga = getObjectValue(element, 'dc_val', 0);
          break;
        case cdAttributo.IM_STIPENDIO_ASSISTENZA_NOTTURNA:
          paga = getObjectValue(element, 'dc_val', 0);
          break;
        case cdAttributo.IM_STIPENDIO_CONVIVENTE:
          paga = getObjectValue(element, 'dc_val', 0);
          break;
        case cdAttributo.IM_STIPENDIO_NON_CONVIVENTE:
          paga = getObjectValue(element, 'dc_val', 0);
          break;
        case cdAttributo.IM_STIPENDIO_PRESENZA_NOTTURNA:
          paga = getObjectValue(element, 'dc_val', 0);
          break;
        case cdAttributo.IM_STIPENDIO_WEEKEND:
          paga = getObjectValue(element, 'dc_val', 0);
          break;
        case cdAttributo.CD_TIPOLOGIA_CONTRATTO:
          tipologiaContratto.id = getObjectValue(element, 'cd_val_attributo', null);
          tipologiaContratto.label = getObjectValue(element, `tl_valore_testuale.${locale}`, null);
          break;
        case cdAttributo.FG_DISP_TRASFERTE_BREVI:
          if (element.fg_val === '1') listaDisponibilita.push({ other: true, value: getObjectValue(element, 'tx_nota', ''), label: 'Trasferte brevi', cdDominioTcb: 0 });
          break;
        case cdAttributo.FG_DISPONIBILITA_STRAORDINARI:
          if (element.fg_val === '1') listaDisponibilita.push({ other: true, value: getObjectValue(element, 'tx_nota', ''), label: 'Straordinari', cdDominioTcb: 0 });
          break;
        case cdAttributo.DT_DATA_CONTRATTO_DA:
          dataDal = formattedDate(getObjectValue(element, 'dt_val', null));
          break;
        case cdAttributo.DT_DATA_CONTRATTO_A:
          dataAl = formattedDate(getObjectValue(element, 'dt_val', null));
          break;
        case cdAttributo.LS_MEZZA_GIORNATA_CONVIVENTE:
          mezzeGiornate.push({ value: getObjectValue(element, `tl_valore_testuale.${locale}`, '') });
          break;
        case cdAttributo.TX_NOTE_SU_CONTRATTO:
          altroSuContratto = element.tx_val;
          break;
        case cdAttributo.TX_NOTE_SU_CONTRATTO:
          altroSuContratto = element.tx_val;
          break;
        case cdAttributo.FL_PIU_PERSONE_NON_AUTOSUFFICIENTI:
          personeAutoSufficienti = radioItemsPersoneAutoSufficienti[element.fg_val]?.label;
          break;
        default:
          break;
      }
    });
  }

  if (!loading && data.calendarioTCB) {
    const oreTotaliElement = data.calendarioTCB.find(day => day.nr_ore_totali);
    if (oreTotaliElement) {
      oreSettimanali = oreTotaliElement.nr_ore_totali;
      if (Number.parseInt(oreSettimanali, 10) <= 0) {
        oreSettimanali = null;
      }
    }
    let hours = convertBinToObject(data.calendarioTCB.filter(element => !(element.nr_ore_totali)));
    if (orario === TIPOLOGIA_ORARIO.ASSISTENZA_NOTTURNA) {
      const interval = INTERVALS.ASSISTENZA_NOTTURNA;
      hours = mergeHoursBetween(hours, interval);
    }
    if (orario === TIPOLOGIA_ORARIO.PRESENZA_NOTTURNA) {
      const interval = INTERVALS.PRESENZA_NOTTURNA;
      hours = mergeHoursBetween(hours, interval);
    }

    Object.keys(hours).forEach((keyInterval) => {
      const intervals = hours[keyInterval];
      const giornoSettimana = keyInterval;
      if (intervals.length > 0) {
        let transformedInterval = '';
        intervals.forEach((interval, index) => {
          if (index === 0) {
            transformedInterval = `dalle ${interval.start.format('HH:mm')} alle ${interval.end.format('HH:mm')}`;
          } else {
            transformedInterval += ` - dalle ${interval.start.format('HH:mm')} alle ${interval.end.format('HH:mm')}`;
          }
          if (intervals) {
            if (transformedInterval.includes('00:00')) {
              transformedInterval = transformedInterval.replace(/00:00/g, '24:00');
            }
          }
        });
        arrayCalendario.push({ other: true, label: capitalizeString(giornoSettimana), value: transformedInterval });
      }
    });
  }

  const getEtaBambini = () => {
    const arr = getCheckboxOptionsEtaBambini(benficiariData?.beneficiari.map(el => el.eta));
    const ris = arr?.filter(el => el.checked);

    return ris?.map(el => el.label);
  };

  const etaBambini = getEtaBambini();

  const isBadante = CD_TIPOLOGICA_BADANTE === servizioTCB.cd_dominio_tcb;
  const isTata = CD_TIPOLOGICA_TATA === servizioTCB.cd_dominio_tcb;

  const isLivelloDs = livelloContrattuale === idLivelloContrattuale.livelloDs;
  const isLivelloCs = livelloContrattuale === idLivelloContrattuale.livelloCs;
  const isLivelloUnico = livelloContrattuale === idLivelloContrattuale.livelloUnico;

  const tipologiaContrattoData = React.useMemo(() => {
    const res = { value: '', error: undefined };
    if (!tipologiaContratto.id) {
      return res;
    }
    if (!dataDal) { // errore comune sia tempo determinato che indeterminato
      res.error = '* Data dal non ancora compilata';
      return res;
    }
    if (tipologiaContratto.id === TIPOLOGIA_CONTRATTO.DETERMINATO) { // tempo determinato
      if (!dataAl) {
        res.error = '* Data al non ancora compilata';
        return res;
      }
      res.value = `${tipologiaContratto.label} (dal ${dataDal} al ${dataAl})`;
      return res
    }

    res.value = `${tipologiaContratto.label} (dal ${dataDal})`; // tempo indeterminato
    return res
  }, [dataDal, dataAl, tipologiaContratto]);

  return (
    <>
      <SectionTitle
        title={title}
        moveTo={moveTo}
      />
      <Wrapper
        loading={loading}
        errored={errored}
      >
        <FieldText
          title="Ore settimanali"
          value={oreSettimanali ? Number.parseInt(oreSettimanali, 10) : null}
          required
        />

        {orario === TIPOLOGIA_ORARIO.CONVIVENZA && (
          <FieldText
            title="Mezza giornata di riposo"
            array={mezzeGiornate}
            required
          />
        )}
        {(orario === TIPOLOGIA_ORARIO.CONVIVENZA || orario === TIPOLOGIA_ORARIO.CONVIVENZA_RIDOTTA) && (
          <FieldList
            title={`Spazi per il/la ${getTCBServiceName(servizioTCB, locale)}`}
            array={functionSort(spaziRiservati, 'cdDominioTcb')}
            required
          />
        )}
        {
          isBadante && (isLivelloCs || isLivelloDs) && !isLibrettoDiFamiglia ?
            <FieldText
              title="Persone non autosufficienti da assistere"
              value={personeAutoSufficienti}
            />
            : null
        }
        {
          isTata && !isLivelloUnico && !isLibrettoDiFamiglia ?
            <FieldText
              title="Età dei bambini da accudire"
              value={etaBambini.join(", ")}
            />
            : null
        }

        <FieldText
          title="Paga proposta"
          value={paga ? `${moneyFormat(paga, true)} ${(orario === TIPOLOGIA_ORARIO.NON_CONVIVENTE || orario === TIPOLOGIA_ORARIO.WEEKEND ? '/ora' : '/mese')}` : null}
          required
        />

        {(orario !== TIPOLOGIA_ORARIO.CONVIVENZA && orario !== TIPOLOGIA_ORARIO.WEEKEND) && (
          <FieldList
            title="Disponibilità settimanale"
            array={arrayCalendario}
            calendarioEliminaParentesi
          />
        )
          // calendarioEliminaParentesi perchè vogliono italic in dalle ed alle
        }

        <FieldText
          title="Tipologia di contratto"
          value={tipologiaContrattoData.value}
          requiredAfterValueText={tipologiaContrattoData.error}
          requiredAfterValue={tipologiaContrattoData.error}
        />
        <FieldText
          title="Altro su contratto e su orario di lavoro"
          value={altroSuContratto}
          textarea
        />
        <FieldList
          title="Altre disponibilità"
          array={listaDisponibilita}
        />
      </Wrapper>
    </>
  );
};
DisponibilitaRichiesta.displayName = 'DisponibilitaRichiesta';

export default DisponibilitaRichiesta;