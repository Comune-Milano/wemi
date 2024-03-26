/** @format */

import React from 'react';
import Title from '../partials/Title';
import FieldList from '../partials/FieldList';
import FieldCheck from '../partials/FieldCheck';
import { codiciAttributo } from '../../../constants/CodiciAttributo';
import { ID_SERVIZIO_BADANTE } from 'types/tcbConstants';
import { functionSort } from "utils/functions/functionSort";
import { sortOrder } from '../functions/sortOrder';
import { disponibileColfSelezione } from '../constants/disponibileColfSelezione';

const TCBICL0012 = ({
  Dati,
  locale,
  onPatchStep,
  estraiMansioniBadanti,
  estraiMansioniColf,
  estraiPatologieGeneriche,
  estraiPatologie
}) => {

  const assistenza = [];
  const curaIgene = [];
  const alimentazione = [];
  const cureMediche = [];
  const disabilita = [];
  const vacanza = [];
  const altre = [];
  const mansioniColf = [];
  const patologieGeneriche = [];
  const patologieAnziani = [];
  let disponibileColf = null;

  if (estraiMansioniColf && estraiMansioniBadanti && estraiPatologieGeneriche && estraiPatologie) {
    Dati.forEach((ele) => {
      let isAltro = false;
      switch (ele.cd_attributo) {
        case codiciAttributo.LS_MANSIONI_BADANTE:
          if (ele.id_servizio_riferimento === ID_SERVIZIO_BADANTE) {
            estraiMansioniBadanti.forEach(element => {
              switch (element.pgVisualizzazione) {
                case 1:
                  if (ele.cd_val_attributo === parseInt(element.cdDominioTcb)) {
                    assistenza.push({ label: element.txTitoloMansione[locale], nota: ele.tx_val, cdDominioTcb: Number.parseInt(element.cdDominioTcb) })
                  }
                  break;
                case 2:
                  if (ele.cd_val_attributo === parseInt(element.cdDominioTcb)) {
                    curaIgene.push({ label: element.txTitoloMansione[locale], nota: ele.tx_val, cdDominioTcb: Number.parseInt(element.cdDominioTcb) })
                  }
                  break;
                case 3:
                  if (ele.cd_val_attributo === parseInt(element.cdDominioTcb)) {
                    alimentazione.push({ label: element.txTitoloMansione[locale], nota: ele.tx_val, cdDominioTcb: Number.parseInt(element.cdDominioTcb) })
                  }
                  break;
                case 4:
                  if (ele.cd_val_attributo === parseInt(element.cdDominioTcb)) {
                    cureMediche.push({ label: element.txTitoloMansione[locale], nota: ele.tx_val, cdDominioTcb: Number.parseInt(element.cdDominioTcb) })
                  }
                  break;
                case 5:
                  if (ele.cd_val_attributo === parseInt(element.cdDominioTcb)) {
                    disabilita.push({ label: element.txTitoloMansione[locale], nota: ele.tx_val, cdDominioTcb: Number.parseInt(element.cdDominioTcb) })
                  }
                  break;
                case 6:
                  if (ele.cd_val_attributo === parseInt(element.cdDominioTcb)) {
                    vacanza.push({ label: element.txTitoloMansione[locale], nota: ele.tx_val, cdDominioTcb: Number.parseInt(element.cdDominioTcb) })
                  }
                  break;
                case 7:
                  if (ele.cd_val_attributo === parseInt(element.cdDominioTcb)) {
                    altre.push({ label: element.txTitoloMansione[locale], nota: ele.tx_val, idMans: ele.cd_val_attributo, cdDominioTcb: Number.parseInt(element.cdDominioTcb) })
                  }
                  break;
                case 10:
                  if (ele.cd_val_attributo === parseInt(element.cdDominioTcb)) {
                    altre.push({ label: "Altro", error: !ele.tx_val, nota: ele.tx_val, idMans: ele.cd_val_attributo, cdDominioTcb: Number.parseInt(element.cdDominioTcb) })
                  }
                  break;
                default:
                // code block
              }
            });
            break;
          }
        case codiciAttributo.FG_DISP_MANSIONI_COLF:
          if (ele.id_servizio_riferimento === ID_SERVIZIO_BADANTE) {
            disponibileColf = ele.fg_val;
          }
          break;
        case codiciAttributo.LS_MANSIONI_COLF:
          if (ele.id_servizio_riferimento === ID_SERVIZIO_BADANTE) {
            estraiMansioniColf.forEach(element => {
              if (parseInt(element.cdDominioTcb) === ele.cd_val_attributo) {
                isAltro = parseInt(element.cdDominioTcb) === 0;
                if (isAltro) {
                  mansioniColf.push({ label: "Altro", nota: ele.tx_val, error: !ele.tx_val, idMans: element.cdDominioTcb, pgVisualizzazione: element.pgVisualizzazzione });
                } else {
                  mansioniColf.push({ label: element.txTitoloMansione[locale], idMans: element.cdDominioTcb, pgVisualizzazione: element.pgVisualizzazzione });
                }
              }
            });
          }
          break;
        case codiciAttributo.LS_ESPERIENZE_PREGRESSE_PATOLOGIE_GENERICHE:
          estraiPatologieGeneriche.forEach(element => {
            if (parseInt(element.cdDominioTcb) === ele.cd_val_attributo) {
              patologieGeneriche.push({ label: element.tlValoreTestuale[locale], pgVisualizzazione: element.pgVisualizzazione })
            }
          });
          break;
        case codiciAttributo.LS_ESPERIENZE_PREGRESSE_PATOLOGIE_ANZIANI:
          estraiPatologie.forEach(element => {
            if (parseInt(element.cdDominioTcb) === ele.cd_val_attributo) {
              isAltro = parseInt(element.cdDominioTcb) === 0;
              if (isAltro) {
                patologieAnziani.push({ label: "Altro", nota: ele.tx_val, error: !ele.tx_val, pgVisualizzazione: element.pgVisualizzazione });
              } else {
                patologieAnziani.push({ label: element.tlValoreTestuale[locale], pgVisualizzazione: element.pgVisualizzazione });
              }
            }
          });
          break;
        default:
        // code block
      }
    });
  }

  return (
    <>
      <Title
        title="Competenze badante"
        onPatchStep={onPatchStep}
        index={9}
      />
      <FieldList
        title='Assistenza'
        array={sortOrder(assistenza, "cdDominioTcb")}
      />
      <FieldList
        title='Cura e igiene'
        array={sortOrder(curaIgene, "cdDominioTcb")}
      />
      <FieldList
        title='Alimentazione'
        array={sortOrder(alimentazione, "cdDominioTcb")}
      />
      <FieldList
        title='Cure mediche'
        array={sortOrder(cureMediche, "cdDominioTcb")}
      />
      <FieldList
        title='Disabilità'
        array={sortOrder(disabilita, "cdDominioTcb")}
      />
      <FieldList
        title='Accompagnamento in vacanza'
        array={sortOrder(vacanza, "cdDominioTcb")}
      />
      <FieldList
        title='Altre competenze'
        array={functionSort(altre, 'idMans')}
      />
      <FieldList
        title='Le disabilità che presentavano le persone che hai assistito'
        array={sortOrder(patologieGeneriche, "pgVisualizzazione")}
      />
      <FieldList
        title='Patologie con le quali si è avuta esperienza'
        array={sortOrder(patologieAnziani, 'pgVisualizzazione')}
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

TCBICL0012.displayName = 'TCBICL0012';

export default TCBICL0012;