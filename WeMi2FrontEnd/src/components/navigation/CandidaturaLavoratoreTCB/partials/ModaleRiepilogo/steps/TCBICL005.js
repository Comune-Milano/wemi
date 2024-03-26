/** @format */

import React from 'react';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import Title from '../partials/Title';
import FieldText from '../partials/FieldText';
import FieldCheck from '../partials/FieldCheck';
import { codiciAttributo } from '../../../constants/CodiciAttributo';
import { sortOrder } from '../functions/sortOrder';

const TCBICL005 = ({
  Dati,
  locale,
  onPatchStep,
  estraiInteressi,
  estraiCarattereLavoratore,
  estraiAltezza,
  estraiCorporatura,
}) => {


  let patenteGuida;
  let automunito;
  let disponibilitaAguidare;
  let fumatore;
  let gatti;
  let cani;
  let alimentari;
  let altro;
  const altezza = [];
  const corporatura = [];
  const interessi = [];
  const carattere = [];
  let comunicative;
  let adattamento;
  let tempo;
  let altreAllergieAnimaliFlag;
  let altreAllergieAnimaliText;

  if (estraiInteressi && estraiCarattereLavoratore && estraiAltezza && corporatura) {
    Dati.forEach((ele) => {
      switch (ele.cd_attributo) {
        case codiciAttributo.FG_PATENTE_DI_GUIDA_AUTO:
          patenteGuida = ele.fg_val === 'S';
          break;
        case codiciAttributo.FG_AUTOMUNITO:
          automunito = ele.fg_val === 'S';
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
          altreAllergieAnimaliFlag = ele.fg_val === 'S';
          altreAllergieAnimaliText = ele.tx_val;
          break;
        case codiciAttributo.FG_INTOLLERANZA_ALLERGIA__CIBO:
          alimentari = { boolean: ele.fg_val === 'S', nota: ele.tx_val };
          break;
        case codiciAttributo.TX_ALLERGIA_ALTRO:
          altro = { boolean: ele.fg_val === 'S', nota: ele.tx_val };
          break;
        case codiciAttributo.CD_ALTEZZA:
          estraiAltezza.forEach(element => {
            if (parseInt(element.cdDominioTcb) === ele.cd_val_attributo) {
              altezza.push({ label: element.tlValoreTestuale[locale] });
            }
          });
          break;
        case codiciAttributo.CD_CORPORATURA:
          estraiCorporatura.forEach(element => {
            if (parseInt(element.cdDominioTcb) === ele.cd_val_attributo) {
              corporatura.push({ label: element.tlValoreTestuale[locale] });
            }
          });
          break;
        case codiciAttributo.LS_INTERESSI:
          if (ele.cd_val_attributo === 0) {
            interessi.push({ label: 'Altri interessi e hobby', nota: ele.tx_val, error: !ele.tx_val,  pgVisualizzazione: 0 });
          } else {
            estraiInteressi.forEach(element => {
              if (parseInt(element.cdDominioTcb) === ele.cd_val_attributo && ele !== 0) {
                interessi.push({ label: element.tlValoreTestuale[locale], pgVisualizzazione: element.pgVisualizzazione });
              }
            });
          }
          break;
        case codiciAttributo.LS_CARATTERE:
          if (ele.cd_val_attributo === 0) {
            carattere.push({ label: 'Altro', error: !ele.tx_val, nota: ele.tx_val, pgVisualizzazione: 0 });
          } else {
            estraiCarattereLavoratore.forEach(element => {
              if (parseInt(element.cdDominioTcb) === ele.cd_val_attributo && ele !== 0) {
                carattere.push({ label: element.tlValoreTestuale[locale], pgVisualizzazione: element.pgVisualizzazione });
              }
            });
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
        default:
      }
    });
  }

  return (
    <>
      <Title
        title="Dati personali"
        onPatchStep={onPatchStep}
        index={4}
      />
      <FieldCheck
        title="Patente di guida"
        checked={patenteGuida}
      />
      {
        patenteGuida ?
          <>
           <FieldCheck
              title="Disponibilità a guidare per il lavoro"
              checked={disponibilitaAguidare}
            />
            <FieldCheck
              title="Disponibilità ad usare la propria auto"
              checked={automunito}
            />
          </>
          :
          null
      }
      
      <FieldCheck
        title="Allergie ai cani"
        checked={cani}
      />
      <FieldCheck
        title="Allergie ai gatti"
        checked={gatti}
      />
      <FieldCheck
        title="Allergie ad altri animali"
        checked={altreAllergieAnimaliFlag}
        note={altreAllergieAnimaliText}
        requiredNote
      />
      <FieldCheck
        title="Intolleranze alimentari"
        checked={alimentari && alimentari.boolean}
        note={alimentari && alimentari.nota}
        requiredNote
      />
      <FieldCheck
        title="Altre allergie/intolleranze"
        checked={altro && altro.boolean}
        note={altro && altro.nota}
        requiredNote
      />
      <FieldText
        title="Altezza"
        array={altezza}
      />
      <FieldText
        title="Corporatura"
        array={corporatura}
      />
      <FieldText
        title="Hobby e interessi"
        array={sortOrder(interessi, "pgVisualizzazione")}
      />
      <FieldText
        title="Carattere"
        array={sortOrder(carattere, "pgVisualizzazione")}
      />
      <FieldText
        title="Capacità comunicative"
        value={comunicative}
      />
      <FieldText
        title="Capacità d'adattamento"
        value={adattamento}
      />
      <FieldText
        title="Capacità di gestire il tempo"
        value={tempo}
      />
      <FieldCheck
        title="Fumatore"
        checked={fumatore}
      />
    </>
  );
};

TCBICL005.displayName = 'TCBICL005';

export default TCBICL005;
