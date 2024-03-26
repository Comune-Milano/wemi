import React from 'react';
import { mapFilterList } from 'components/pages/MatchingDomandaLavoratore/utils/mapFilterList';
import { attributo } from 'components/pages/MatchingDomandaLavoratore/constants/constants';
import Checkbox from 'components/ui2/Checkbox';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { labelCompetenzeTata, labelAnniEsperienza } from 'components/pages/MatchingDomandaLavoratore/labels';
import { CD_TIPOLOGICA_TATA } from 'types/tcbConstants';
import styled from 'styled-components';
import { colors } from 'theme';
import { FieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';

export const StyledRow = styled(Row)`
  border-bottom: 2px solid ${colors.grey};
`;

const TataList = ({ selectedFilters, setPopupFilters, filterList }) => {

  const keyFasceEtaTata = attributo.LS_FASCIA_ETA_BAMBINI.ty_dominio_tcb;

  const fasceEtaTata = mapFilterList(filterList, keyFasceEtaTata);

  const keyMansioniTata = attributo.FASCE_ETA_MANSIONI_TATA.ty_dominio_tcb1;

  const mansioniTata = mapFilterList(filterList, keyMansioniTata);


  const { [labelAnniEsperienza.workerType]: workerType } = selectedFilters;

  if (workerType.id !== CD_TIPOLOGICA_TATA) {
    return null;
  }

  const getMansioniTata = (value, idMans) => {
    /**
     * Voglio restituire un array di Json composti da due chiavi:
     * - idMans (corrispondente alla mansione selezionata)
     * - fasceEtaSelezionate (array degli id delle fasce d'eta selezionate per quella mansione)
     */
    let arrayMansioni = selectedFilters[labelCompetenzeTata] ? selectedFilters[labelCompetenzeTata].slice() : [];
    let arrayFasce = [];

    /** Controllo se attualmente nel dataset esiste la mansione selezionata */
    if (arrayMansioni.length && arrayMansioni.find(el => el.idMans === idMans)) {
      /** Se esiste, trovo il suo array di fasce selezionate */
      if (value) {
        /** Dato che esiste, controllo se già esiste il valore selezionato di fascia d'età, e nel caso lo elimino */
        arrayFasce = selectedFilters[labelCompetenzeTata].find(el => el.idMans === idMans).fasceEtaSelezionate.slice();
        if (arrayFasce.includes(value)) {
          arrayFasce = arrayFasce.filter(el => el !== value);
        } else arrayFasce = arrayFasce.concat(value);
      }

      /** Rimuovo l'id della mansione, e controllo se sono rimaste fasce d'età associate, nel caso lo riaggiungo */
      arrayMansioni = arrayMansioni.filter(el => el.idMans !== idMans);
      if (arrayFasce.length) {
        arrayMansioni = arrayMansioni.concat({ idMans, fasceEtaSelezionate: arrayFasce });
      }
    } else {
      if (value) {
        arrayFasce = arrayFasce.concat(value);
      }
      arrayMansioni = arrayMansioni.concat({ idMans, fasceEtaSelezionate: arrayFasce });
      switch (idMans) {
        case 0:
          // setAltroFlag(true);
          break;
        case 14:
          // setTerapieFlag(true);
          break;
        default:
          break;
      }
    }
    return arrayMansioni;
  };

  const selezionaTutteLeFasce = (idMans, fasceAll) => {
    const array = selectedFilters[labelCompetenzeTata] || [];
    const newArr = array.slice().filter(el => el.idMans !== idMans);
    if (!fasceAll) {
      const arrayFasce = fasceEtaTata.map(fasce => fasce.id);
      newArr.push({
        idMans,
        fasceEtaSelezionate: arrayFasce,
      });
    }
    return newArr;
  };

  const checkFasce = (fasceSel, idMans) => {
    if (fasceSel && fasceSel.length) {
      return fasceEtaTata.filter(filt => {
        if (idMans === 6) {
          return filt.id !== 1 && filt.cdDominidioTcb !== 2;
        } return filt;
      }).every(fas => (
        fasceSel.indexOf(fas.id) >= 0
      ));
    } return false;
  };

  return (
    <>
      <Row fluid margin="0.5em 0 0 0">
        <Text
          value="Competenze Tata"
          color="primary"
          size="f7"
          weight="bold"
        />
      </Row>
      <Row margin="0.5em 0 0 0">
        {mansioniTata.map(mansione => {
          if (mansione.id !== 0) {
            let arrayFasce = selectedFilters[labelCompetenzeTata] || [];
            let fasceAll = false;
            const checked = arrayFasce.find(sel => sel.idMans === mansione.id);
            if (checked) {
              arrayFasce = arrayFasce.find(sel => sel.idMans === mansione.id).fasceEtaSelezionate;
              fasceAll = checkFasce(arrayFasce, mansione.id);
            }
            return (
              <Row fluid margin="0 0 2em" key={mansione.id}>
                <Column xs="12" padding="0" justifycontent="space-between">
                  <FieldTitle
                    label={mansione.value}
                  />
                </Column>
                <Column xs="12" padding="0" justifycontent="space-between">
                  <StyledRow fluid justifycontent="flex-start" padding=".5em 0 1em">
                    {fasceEtaTata.filter(fas => {
                      if (mansione.id === 6) {
                        return fas.id !== 1 && fas.id !== 2;
                      } return fas;
                    }).map(fasce => (
                      <span key={fasce.id.toString()} style={{ paddingRight: '4em' }}>
                        <Checkbox
                          width="fit-content"
                          label={fasce.value}
                          value={arrayFasce.includes(fasce.id)}
                          onChange={() => {
                            setPopupFilters(labelCompetenzeTata, getMansioniTata(fasce.id, mansione.id));
                          }}
                          checkcolor="primary"
                        />
                      </span>
                    ))}
                    <Row fluid margin="1em 0 0 0">
                      <Checkbox
                        label="Seleziona tutte le fasce d'età"
                        value={fasceAll}
                        onChange={() => { setPopupFilters(labelCompetenzeTata, selezionaTutteLeFasce(mansione.id, fasceAll)); }}
                        checkcolor="primary"
                        width="fit-content"
                      />
                    </Row>
                  </StyledRow>
                </Column>
              </Row>
            );
          }
          return undefined;
        })
        }

      </Row>
    </>
  );
};

TataList.displayName = 'TataList';

export const Tata = TataList;
