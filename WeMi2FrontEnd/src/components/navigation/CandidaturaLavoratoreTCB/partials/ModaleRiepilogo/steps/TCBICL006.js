/** @format */

import React from 'react';
import Title from '../partials/Title';
import FieldText from '../partials/FieldText';
import FieldCheck from '../partials/FieldCheck';
import FieldList from '../partials/FieldList';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { estraiDatiCompetenzeTata as estraiDatiCompetenzeTataQ } from '../summaryGraphQL';
import { sortOrder } from '../functions/sortOrder';
import { ID_SERVIZIO_TATA } from 'types/tcbConstants';
import { codiciAttributo } from '../../../constants/CodiciAttributo';
import { disponibileColfSelezione } from '../constants/disponibileColfSelezione';

const TCBICL006 = ({
  Dati,
  locale,
  idUtente,
  onPatchStep,
  estraiMansioniTata,
  estraiMansioniColf,
  estraiFasciaEta,
}) => {

  const accompagnamentoVacanzaFamiglia = 13;
  const accompagnamentoVacanzaBambino = 12;

  const [datiCompetenzeTata] = useGraphQLRequest(
    undefined,
    estraiDatiCompetenzeTataQ,
    { idUtenteLav: idUtente },
    true
  );
  const mansioniTata = [];
  let disponibileColf = null;
  const mansioniColf = [];
  let famiglia = false;
  let bambini = false;
  let altroTata = {
    nota: null,
    fascie: []
  };

  disponibileColf = Dati.find(el => (el.cd_attributo == codiciAttributo.FG_DISP_MANSIONI_COLF && el.id_servizio_riferimento == ID_SERVIZIO_TATA))?.fg_val;

  !datiCompetenzeTata.pristine && !datiCompetenzeTata.isLoading && estraiMansioniTata && estraiFasciaEta &&
    datiCompetenzeTata.data.mansioniTata.forEach(eleCompetenza => {
      //qui unisco le mansioni selezionate con il titolo e le fascie di età selezionate
      let elemento = { title: null, fascie: [], nota: null, idMans: eleCompetenza.idMans };
      estraiMansioniTata.forEach(elementTata => {
        if (eleCompetenza.idMans === parseInt(elementTata.cdDominioTcb) && eleCompetenza.idMans !== 0) {
          elemento.title = elementTata.txTitoloMansione[locale];
          elemento.pgVisualizzazione = elementTata.pgVisualizzazzione;
        }
      });
      estraiFasciaEta.forEach(fascia => {
        eleCompetenza.fasceEtaSelezionate.forEach(fasciaSelezionata => {
          if (fasciaSelezionata === parseInt(fascia.cdDominioTcb)) {
            if (eleCompetenza.idMans === 0) {
              altroTata.fascie.push({ label: fascia.tlValoreTestuale[locale] });
            } else {
              elemento.fascie.push({ label: fascia.tlValoreTestuale[locale] });
            };
          }
        })
      })
      switch (parseInt(eleCompetenza.idMans)) {
        case accompagnamentoVacanzaFamiglia:
          famiglia = true;
          break;
        case accompagnamentoVacanzaBambino:
          bambini = true;
          break;
        default:
          if (parseInt(eleCompetenza.idMans) === 0) {
            altroTata.nota = datiCompetenzeTata.data.altreMansioniTata || null;
          }
          if (parseInt(eleCompetenza.idMans) === 14) {
            elemento.nota = datiCompetenzeTata.data.terapieSpecificate;
          }
          if (eleCompetenza.idMans !== 0) {
            mansioniTata.push(elemento)
          };
      }

    });

  if (mansioniTata.length) {
    //qui inserisco le mansioni non selezionate

    estraiMansioniTata.forEach(elementoTata => {
      let controllo = true;
      mansioniTata.forEach(elementoDaMostrare => {
        if (elementoTata.txTitoloMansione[locale] === elementoDaMostrare.title) {
          controllo = false;
        };
      });
      if (controllo && (parseInt(elementoTata.cdDominioTcb) !== accompagnamentoVacanzaFamiglia && parseInt(elementoTata.cdDominioTcb) !== accompagnamentoVacanzaBambino && parseInt(elementoTata.cdDominioTcb) !== 0)) {
        mansioniTata.push({ title: elementoTata.txTitoloMansione[locale], fascie: [], nota: false, idMans: elementoTata.cdDominioTcb, pgVisualizzazione: elementoTata.pgVisualizzazzione });
      }
    });
  }

  !datiCompetenzeTata.pristine && !datiCompetenzeTata.isLoading && estraiMansioniTata && estraiFasciaEta &&
    datiCompetenzeTata.data.mansioniColf.forEach(eleCompetenza => {
      //qui unisco le mansioni selezionate con il titolo e le fascie di età selezionate
      let elemento = { label: null, nota: null, idMans: eleCompetenza, pgVisualizzazione: null };
      estraiMansioniColf.forEach(elementColf => {
        if (eleCompetenza === parseInt(elementColf.cdDominioTcb)) {
          if (eleCompetenza === 0) {
            elemento.nota = datiCompetenzeTata.data.altreMansioniColf;
            elemento.label = "Altro";
            elemento.error = !datiCompetenzeTata.data.altreMansioniColf;
            elemento.pgVisualizzazione = elementColf.pgVisualizzazzione
          } else {
            elemento.label = elementColf.txTitoloMansione[locale];
            elemento.pgVisualizzazione = elementColf.pgVisualizzazzione
          }
        }
      });
      mansioniColf.push(elemento);
    });

  return (
    !datiCompetenzeTata.pristine && !datiCompetenzeTata.isLoading &&
    <>
      <Title
        title="Competenze cura dei bambini"
        onPatchStep={onPatchStep}
        index={5}
      />
      {
        sortOrder(mansioniTata, "pgVisualizzazione").map((element, index) => {
          return (
            <React.Fragment
              key={'idMans_' + element.idMans}
            >
              {
                parseInt(element.idMans) === 14 ?
                  <>
                    <FieldText
                      title={"Somministrazione terapie"}
                      array={element.fascie}
                    />
                    <FieldText
                      title={"Somministrazione di terapie note"}
                      value={element.nota}
                      textarea
                    />
                  </>
                  :
                  <FieldText
                    title={element.title}
                    array={element.fascie}
                  />
              }

            </React.Fragment >
          )
        })
      }

      <FieldCheck
        title="Disponibilità a prendere parte alle vacanze solo con i bambini"
        checked={bambini}
      />
      <FieldCheck
        title="Disponibilità a prendere parte alle vacanze con famiglia"
        checked={famiglia}
      />
      <FieldText
        title="Altro"
        array={altroTata.fascie}
      />
      <FieldText
        title="Altro note"
        value={altroTata.nota}
        textarea
        required={altroTata.fascie.length}
      />

      {
        disponibileColf === disponibileColfSelezione.disponibileColfSelezionata ?
          <>
            <FieldCheck
              title='Disponibile a svolgere faccende domestiche'
              checked={true}
            />
            <FieldList
              title='Faccende domestiche'
              array={sortOrder(mansioniColf, "pgVisualizzazione")}
            />
          </>
          :
          <FieldCheck
            title='Disponibile a svolgere faccende domestiche'
            required={!(disponibileColf === disponibileColfSelezione.disponibileColfNonSelezionata)}
          />
      }
    </>

  );
};

TCBICL006.displayName = 'TCBICL006';

export default TCBICL006;