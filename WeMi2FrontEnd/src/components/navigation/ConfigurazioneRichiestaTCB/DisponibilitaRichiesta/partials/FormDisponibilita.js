/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import GroupFieldTitle from '../../partials/GroupFieldTitle';
import { LevelsCarousel, Orario } from 'components/navigation/RichiestaServizioTCB/partials/RequestFormPartial';
import { convertBinToObject } from "components/ui2/WeekCalendarTimePicker/utils/converter";
import { ID_SERVIZIO_COLF, ID_SERVIZIO_BADANTE, ID_SERVIZIO_TATA } from 'types/tcbConstants';
import { idLibrettoDiFamiglia } from 'types/idLibrettoDiFamiglia';
import { TIPOLOGIA_ORARIO } from 'components/pages/MatchingDomandaLavoratore/constants/tipologiaorario';
import { idLivelloContrattuale } from 'types/idLivelloContrattuale';

const FormDisponibilita = ({
  livelliContrattuali,
  orariTCB,
  orario,
  livelloContrattuale,
  tipologiaAssunzione,
  setFormField,
  locale,
  idServizioTCB,
  setFormFields,
  maxOre
}) => {

  const isColf = Number.parseInt(idServizioTCB, 10) === ID_SERVIZIO_COLF;
  const isBadante = Number.parseInt(idServizioTCB, 10) === ID_SERVIZIO_BADANTE;
  const isTata = Number.parseInt(idServizioTCB, 10) === ID_SERVIZIO_TATA;

  const filteredCardByOrario = livelliContrattuali && livelliContrattuali.filter(liv => {
    if (liv.cd_tipo_orario_lavoro === orario.id || orario.id === -1)
      return liv
  });

  const getOrarioValue = value => {
    if (value.id) {
      let id;
      if (value.id !== orario.id) {
        switch (value.id) {
          case TIPOLOGIA_ORARIO.CONVIVENZA:
            //Convivenza 

            if (isTata) {
              id = idLivelloContrattuale.livelloBs;
            }
            if (isColf) {
              id = idLivelloContrattuale.livelloA;
            }
            if (isBadante) {
              id = idLivelloContrattuale.livelloAs;
            }

            break;
          case TIPOLOGIA_ORARIO.CONVIVENZA_RIDOTTA:
            //Convivenza ridotta

            if (isBadante || isTata) {
              id = idLivelloContrattuale.livelloBs;
            }
            if (isColf) {
              id = idLivelloContrattuale.livelloB;
            }

            break;
          case TIPOLOGIA_ORARIO.NON_CONVIVENTE:
            // Full time

            if (isTata) {
              id = idLivelloContrattuale.livelloBs;
            }
            if (isColf) {
              id = idLivelloContrattuale.livelloA;
            }
            if (isBadante) {
              id = idLivelloContrattuale.livelloAs;
            }

            break;
          case TIPOLOGIA_ORARIO.PRESENZA_NOTTURNA:
            //Presenza notturna

            id = idLivelloContrattuale.livelloUnico;
            break;
          case TIPOLOGIA_ORARIO.WEEKEND:
            //Weekend

            id = idLivelloContrattuale.livelloCs;
            break;
          case TIPOLOGIA_ORARIO.ASSISTENZA_NOTTURNA:
            //Assistenza notturna 

            id = idLivelloContrattuale.livelloBs;
            break;
          default:
            id= undefined;
        }
        // si resettano retribuzione, oreSettimanali, disponibilitaSettimanale(calendario) e personeAutoSufficienti
        setFormFields({
          'orario': value,
          'livelloContrattuale': { id },
          'retribuzione': undefined,
          'oreSettimanali': 0,
          'disponibilitaSettimanale': convertBinToObject(),
          'personeAutoSufficienti': {}
        })
      };
    }
  };

  const getSelectedCard = value => {
    const id = value?.id;
    const title = value?.title?.split(' ')[1];
    let livello = { id, title };
    setFormField('livelloContrattuale', livello);

    if (isBadante && id !== idLivelloContrattuale.livelloCs && id !== idLivelloContrattuale.livelloDs) {
      // si resetta le persone non autosufficienti
      setFormField('personeAutoSufficienti', {});
    }
  };

  return (
    <>
      {tipologiaAssunzione.id === idLibrettoDiFamiglia ?
        <>
          <GroupFieldTitle
            title='Verifica la tipologia di orario adatta alle tue esigenze'
            required
          />
          <Text
            value={orariTCB.find(el => el.cd_dominio_tcb === orario.id).tl_valore_testuale[locale] + ' (assunzione tramite "Libretto famiglia")'}
            size="f7"
            weight="bold"
          />
        </>
        :
        <Orario
          disp
          setFormField={setFormField}
          orarioValue={orario}
          getOrarioValue={getOrarioValue}
          orariTCB={orariTCB}
          locale={locale}
          maxOre={maxOre}
        />
      }
      {filteredCardByOrario.length > 0 ?
        <LevelsCarousel
          disp
          selectedCard={livelloContrattuale}
          getSelectedCard={getSelectedCard}
          orarioValue={orario}
          isColf={isColf}
          filteredCardByOrario={filteredCardByOrario}
          locale={locale}
        />
        : null}
    </>
  )
};

FormDisponibilita.displayName = 'FormDisponibilita';

export default React.memo(FormDisponibilita);