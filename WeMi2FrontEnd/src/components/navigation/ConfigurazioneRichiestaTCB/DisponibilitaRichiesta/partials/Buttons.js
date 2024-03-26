/** @format */

import React from 'react';
import BottoniNavigazione from 'components/navigation/ConfigurazioneRichiestaTCB/partials/BottoniNavigazione';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import moment from 'moment';
import { convertObjectToBin } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import { useDepChange } from 'hooks/useDepChange';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { TIPOLOGIA_ORARIO } from 'components/pages/MatchingDomandaLavoratore/constants/tipologiaorario';
import { idLivelloContrattuale } from 'types/idLivelloContrattuale';
import { isNumber } from 'utils/functions/typeCheckers';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { InserisciDatiDisponibilita as InserisciDatiDisponibilitaM } from '../EstraiDomini';
import { cdAttributo } from '../../CodiciAttributi';
import { splitHoursBetween } from './utils';
import { INTERVALS } from './constants';

const Buttons = ({
  tipologiaAssunzione,
  dataset,
  idRichiestaTcb,
  moveNext,
  moveBack,
  updateAttributiDomanda,
  isFormDirty,
  errors,
  stepDomanda,
  changeStep,
  stepCheckValidity,
  sendRequestTCB,
  isBadante,
}) => {
  const { validateForm } = useFormContext();

  const inserisciDatiRichiesta006 = useStatelessGraphQLRequest(
    InserisciDatiDisponibilitaM,
  );

  const eliminaAltreRetribuzioniEInserisciRetribuzione = (id, arrConf) => {
    const arr = [1, 2, 3, 4, 5, 6];

    arr.forEach(ele => {
      if (ele !== id) {
        arrConf.push({
          cd_attributo: attributoStipendio(ele),
          cd_val_attributo: -1,
          dc_val: null,
        });
      }
    });
    if (tipologiaAssunzione && parseInt(tipologiaAssunzione.id, 10) === 3) {
      // questo controllo perchè in caso di libretto di famiglia è fisso a 10
      arrConf.push({
        cd_attributo: attributoStipendio(tipologiaAssunzione.id),
        cd_val_attributo: 1,
        dc_val: 10.00,
      });
    } else {
      arrConf.push({
        cd_attributo: attributoStipendio(id),
        cd_val_attributo: errors.retribuzione ? -1 : 1,
        dc_val: errors.retribuzione ? null : parseFloat(dataset.retribuzione),
      });
    }

    return arrConf;
  };
  const attributoStipendio = (id) => {
    switch (id) {
      case 1:
        return cdAttributo.IM_STIPENDIO_CONVIVENTE;
      case 2:
        return cdAttributo.IM_STIPENDIO_A_CONVIVENZA_RIDOTTA;
      case 3:
        return cdAttributo.IM_STIPENDIO_NON_CONVIVENTE;
      case 4:
        return cdAttributo.IM_STIPENDIO_PRESENZA_NOTTURNA;
      case 5:
        return cdAttributo.IM_STIPENDIO_WEEKEND;
      case 6:
        return cdAttributo.IM_STIPENDIO_ASSISTENZA_NOTTURNA;
      default:
        return undefined;
    }
  };

  const createJsonDisponibilita = () => {
    const weekDays = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
    let json;
    if (dataset.orario.id !== 1 && dataset.orario.id !== 5) {
      let hoursToSave = dataset.disponibilitaSettimanale;
      if (dataset.orario.id === TIPOLOGIA_ORARIO.ASSISTENZA_NOTTURNA) {
        const interval = INTERVALS.ASSISTENZA_NOTTURNA;
        hoursToSave = splitHoursBetween(hoursToSave, interval);
      }
      if (dataset.orario.id === TIPOLOGIA_ORARIO.PRESENZA_NOTTURNA) {
        const interval = INTERVALS.PRESENZA_NOTTURNA;
        hoursToSave = splitHoursBetween(hoursToSave, interval);
      }

      json = convertObjectToBin(hoursToSave).reduce((acc, el) => (
        {
          ...acc,
          [weekDays[el.dayId - 1]]: el.hoursBin,
        }
      ), {});
    } else {
      json = {};
      weekDays.forEach(ele => {
        json[ele] = '000000000000000000000000000000000000000000000000';
      });
    }
    json.nr_ore_totali = parseFloat(String(dataset.oreSettimanali ? dataset.oreSettimanali : 0).replace(',', '.'));
    return json;
  };
  const createArrayConfig = () => {
    const arrConf = [
      { cd_attributo: cdAttributo.CD_ORARIO_LAVORO, cd_val_attributo: dataset.orario.id },
      {
        cd_attributo: cdAttributo.CD_LIVELLO_CONTRATTUALE,
        cd_val_attributo: dataset.livelloContrattuale ? dataset.livelloContrattuale.id : undefined,
      },

      ...dataset.mezzaGiornataRiposo.map(el => {
        if (dataset.orario.id === 1) {
          return {
            cd_attributo: cdAttributo.LS_MEZZA_GIORNATA_CONVIVENTE,
            cd_val_attributo: el.id,
          };
        } return {
          cd_attributo: cdAttributo.LS_MEZZA_GIORNATA_CONVIVENTE,
          cd_val_attributo: -1,
        };
      }),

      ...dataset.sistemazione.map(el => (
        {
          cd_attributo: cdAttributo.LS_SPAZI_CONVIVENTE,
          cd_val_attributo: (dataset.orario.id === TIPOLOGIA_ORARIO.CONVIVENZA || dataset.orario.id === TIPOLOGIA_ORARIO.CONVIVENZA_RIDOTTA) ? el : -1,
          tx_nota: el === 0 ? dataset.altroSistemazione : undefined,
        }
      )),
      {
        cd_attributo: cdAttributo.CD_TIPOLOGIA_CONTRATTO,
        cd_val_attributo: dataset.tipologiaContratto ? dataset.tipologiaContratto.id : undefined,
      },
      {
        cd_attributo: cdAttributo.TX_NOTE_SU_CONTRATTO,
        cd_val_attributo: 1,
        tx_val: dataset.noteContratto,
      },
      {
        cd_attributo: cdAttributo.FG_DISPONIBILITA_STRAORDINARI,
        cd_val_attributo: 1,
        fg_val: dataset.disponibilitaStraordinariCheck ? '1' : '0',
        tx_nota: dataset.notaDisponibilitaStraordinari || '',
      },
      {
        cd_attributo: cdAttributo.FG_DISP_TRASFERTE_BREVI,
        cd_val_attributo: 1,
        fg_val: dataset.disponibilitaTrasferteCheck ? '1' : '0',
        tx_nota: dataset.disponibilitaTrasferte,
      },
      ...[
        isBadante &&
          (
            dataset.livelloContrattuale?.id === idLivelloContrattuale.livelloDs ||
            dataset.livelloContrattuale?.id === idLivelloContrattuale.livelloCs
          ) ?
        {
          cd_attributo: cdAttributo.FL_PIU_PERSONE_NON_AUTOSUFFICIENTI,
          cd_val_attributo: 1,
          fg_val: String(isNumber(dataset.personeAutoSufficienti?.id) ? dataset.personeAutoSufficienti?.id : ''),
        }
          :
        {
          cd_attributo: cdAttributo.FL_PIU_PERSONE_NON_AUTOSUFFICIENTI,
          cd_val_attributo: -1,
        },
      ],

    ];

    if (dataset.contrattoDa && !errors.contrattoDa) {
      arrConf.push(
        {
          cd_attributo: cdAttributo.DT_DATA_CONTRATTO_DA,
          cd_val_attributo: 1,
          dt_val: moment(dataset.contrattoDa, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        },
      );
    } else {
      arrConf.push(
        {
          cd_attributo: cdAttributo.DT_DATA_CONTRATTO_DA,
          cd_val_attributo: -1,
        },
      );
    }

    if (dataset.tipologiaContratto.id === 2 && dataset.contrattoAl && !errors.contrattoAl) {
      arrConf.push(
        {
          cd_attributo: cdAttributo.DT_DATA_CONTRATTO_A,
          cd_val_attributo: 1,
          dt_val: moment(dataset.contrattoAl, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        },
      );
    } else {
      arrConf.push(
        {
          cd_attributo: cdAttributo.DT_DATA_CONTRATTO_A,
          cd_val_attributo: -1,
        },
      );
    }

    return eliminaAltreRetribuzioniEInserisciRetribuzione(dataset.orario.id, arrConf);
  };

  const Salva = () => {
    inserisciDatiRichiesta006({
      input: {
        idRichiestaTcb,
        arrayConfig: createArrayConfig(),
        disponibilitaJson: createJsonDisponibilita(),
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
      Salva();
      updateAttributiDomanda();
    };
  };

  /**
   * A callback to run when a step request mutation is detected.
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
export default Buttons;
