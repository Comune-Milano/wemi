/** @format */

import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import { GroupFieldTitle, FieldTitle } from 'components/navigation/ConfigurazioneRichiestaTCB/partials';
import Checkbox from 'components/ui2/Checkbox';
import { colors } from 'theme';
import TextArea from 'components/ui2/TextArea';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';
import { DisponibilitaVacanze } from './tataFormPartials';

export const StyledRow = styled(Row)`
  border-bottom: 2px solid ${colors.grey};
`;

const TataForm = ({
  mansioniTata,
  fasceEta,
  locale,
}) => {
  const { dataset, setFormField, errors, touched, handleFieldBlur } = useFormContext();

  const [altroFlag, setAltroFlag] = useState(dataset.altroFlag);
  const [, setTerapieFlag] = useState(dataset.terapieFlag);
  const mansioniVacanze = mansioniTata.slice().filter(el => el.cdDominioTcb === 12 || el.cdDominioTcb === 13);

  const getMansioniTata = (value, idMans) => {
    /**
     * Voglio restituire un array di Json composti da due chiavi:
     * - idMans (corrispondente alla mansione selezionata)
     * - fasceEtaSelezionate (array degli id delle fasce d'eta selezionate per quella mansione)
     */
    let arrayMansioni = dataset.mansioniSelezionateTata.length ? dataset.mansioniSelezionateTata.slice() : [];
    let arrayFasce = [];

    /** Controllo se attualmente nel dataset esiste la mansione selezionata */
    if (arrayMansioni.length && arrayMansioni.find(el => el.idMans === idMans)) {
      /** Se esiste, trovo il suo array di fasce selezionate */
      if (value) {
        /** Dato che esiste, controllo se già esiste il valore selezionato di fascia d'età, e nel caso lo elimino */
        arrayFasce = dataset.mansioniSelezionateTata.find(el => el.idMans === idMans).fasceEtaSelezionate.slice();
        if (arrayFasce.includes(value)) {
          arrayFasce = arrayFasce.filter(el => el !== value);
        } else arrayFasce = arrayFasce.concat(value);
      }

      /** Rimuovo l'id della mansione, e controllo se sono rimaste fasce d'età associate, nel caso lo riaggiungo */
      arrayMansioni = arrayMansioni.filter(el => el.idMans !== idMans);
      if (arrayFasce.length) {
        arrayMansioni = arrayMansioni.concat({ idMans, fasceEtaSelezionate: arrayFasce });
      } else if (idMans === 0) {
        setAltroFlag(false);
      } else if (idMans === 14) {
        setTerapieFlag(false);
      }
    } else {
      if (value) {
        arrayFasce = arrayFasce.concat(value);
      }
      arrayMansioni = arrayMansioni.concat({ idMans, fasceEtaSelezionate: arrayFasce });
      switch (idMans) {
        case 0:
          setAltroFlag(true);
          break;
        case 14:
          setTerapieFlag(true);
          break;
        default:
          break;
      }
    }
    return arrayMansioni;
  };

  const checkFasce = (fasceSel, idMans) => {
    if (fasceSel && fasceSel.length) {
      return fasceEta.filter(filt => {
        if (idMans === 6) {
          return filt.cdDominioTcb !== 1 && filt.cdDominioTcb !== 2;
        } return filt;
      }).every(fas => (
        fasceSel.indexOf(fas.cdDominioTcb) >= 0
      ));
    } return false;
  };

  const setFasceAll = (idMans, fasceAll) => {
    const newArr = dataset.mansioniSelezionateTata.slice().filter(el => el.idMans !== idMans);
    if (!fasceAll) {
      const arrayFasce = fasceEta.map(fasce => fasce.cdDominioTcb);
      newArr.push({
        idMans,
        fasceEtaSelezionate: arrayFasce,
      });
      switch (idMans) {
        case 0:
          setAltroFlag(true);
          break;
        case 14:
          setTerapieFlag(true);
          break;
        default:
          break;
      }
    } else {
      switch (idMans) {
        case 0:
          setAltroFlag(false);
          break;
        case 14:
          setTerapieFlag(false);
          break;
        default:
          break;
      }
    }
    return newArr;
  };

  return (
    <Row fluid>
      <Row fluid justifycontent="space-between">
        <GroupFieldTitle
          title="INDICA LE COMPETENZE ACQUISITE NELLE PRECEDENTI ESPERIENZE LAVORATIVE"
        />
      </Row>
      {mansioniTata.map(el => {
        let arrayFasce = [];
        let fasceAll = false;
        const checked = dataset.mansioniSelezionateTata.find(sel => sel.idMans === el.cdDominioTcb);
        if (checked) {
          arrayFasce = dataset.mansioniSelezionateTata.find(sel => sel.idMans === el.cdDominioTcb).fasceEtaSelezionate;
          fasceAll = checkFasce(arrayFasce, el.cdDominioTcb);
        }

        if (el.cdDominioTcb !== 12 && el.cdDominioTcb !== 13) {
          return (
            <Row fluid margin="0 0 2em" key={el.cdDominioTcb}>
              <Column xs="12" padding="0" justifycontent="space-between">
                <FieldTitle
                  label={el.txTitoloMansione[locale]}
                />
              </Column>
              <Column xs="12" padding="0" justifycontent="space-between">
                <StyledRow fluid justifycontent="flex-start" padding=".5em 0 1em">
                  {fasceEta.filter(fas => {
                    if (el.cdDominioTcb === 6) {
                      return fas.cdDominioTcb !== 1 && fas.cdDominioTcb !== 2;
                    } return fas;
                  }).map(fasce => (
                    <Column key={fasce.cdDominioTcb.toString()} padding="0" lg="3" md="2" sm="3" xs="6">
                      <Checkbox
                        label={fasce.tlValoreTestuale[locale]}
                        value={arrayFasce.includes(fasce.cdDominioTcb)}
                        onChange={() => { setFormField('mansioniSelezionateTata', getMansioniTata(fasce.cdDominioTcb, el.cdDominioTcb)); }}
                        checkcolor="primary"
                      />
                    </Column>
                    ))}
                  <Row fluid margin="1em 0 0 0">
                    <Row fluid>
                      <Checkbox
                        label="Seleziona tutte le fasce d'età"
                        value={fasceAll}
                        onChange={() => { setFormField('mansioniSelezionateTata', setFasceAll(el.cdDominioTcb, fasceAll)); }}
                        checkcolor="primary"
                        width="fit-content"
                      />
                    </Row>
                  </Row>
                  {/* Gestisco la mansione per le terapie da specificare */}
                  {/* Gestisco "altra mansione"  da specificare */}
                  {
                    el.cdDominioTcb === 0 && altroFlag ? (
                      <Row fluid margin="0">
                        <Column xs="12" padding="0">
                          <TextArea
                            onChange={(value) => setFormField('altreMansioniTata', value)}
                            onBlur={() => handleFieldBlur('altreMansioniTata')}
                            placeholder="Scrivi qui..."
                            inputValue={dataset.altreMansioniTata}
                            name="altreMansioniTata"
                            rows="3"
                            width="30%"
                            error={touched.altreMansioniTata && errors.altreMansioniTata}
                            maxLength={STRING_MAX_VALIDATION.value}

                          />
                        </Column>
                      </Row>
                    )
                      : null
                  }
                </StyledRow>
              </Column>
            </Row>
          );
        } if (el.cdDominioTcb === 12) {
          return (
            <DisponibilitaVacanze
              key={el.cdDominioTcb.toString()}
              mansioniVacanze={mansioniVacanze}
              mansioniSelezionate={dataset.mansioniSelezionateTata}
              setFormField={setFormField}
              getMansioniTata={getMansioniTata}
              locale={locale}
            />
          );
        }
      })}
      <Row>
      </Row>
    </Row>
  );
};

TataForm.displayName = 'TataForm';

export default TataForm;
