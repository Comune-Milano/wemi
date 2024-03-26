/** @format */

import React from 'react';
import Title from '../partials/Title';
import FieldText from '../partials/FieldText';
import FieldCheck from '../partials/FieldCheck';
import { codiciAttributo } from '../../../constants/CodiciAttributo';
import { sortOrder } from '../functions/sortOrder';

const TCBICL003 = ({
  Dati,
  locale,
  onPatchStep,
  corsiTata,
  corsiBadante,
  lingueParlate,
}) => {
  const cdDominioTcbLaurea = 3;

  const lsCorsi = [];
  const titoloStudio = [];
  let fgCorsiBadante;
  let notaCorsiBadante;
  let livelloConoscenzaItaliano;
  let madrelinguaItaliano;
  let corsiItaliano;
  const lingueEstere = [];

  if (corsiTata && corsiBadante && lingueParlate) {
    Dati.forEach((ele) => {
      switch (ele.cd_attributo) {
        case codiciAttributo.LS_CORSI_TATA:
          if (ele.cd_val_attributo === 0) {
            titoloStudio.push({ label: 'Altro', error: !ele.tx_val, nota: ele.tx_val, idMans: ele.cd_val_attributo });
          } else {
            corsiTata.forEach(element => {
              if (parseInt(element.cdDominioTcb) === ele.cd_val_attributo && parseInt(element.cdDominioTcb) !== 0) {
                if (element.pgVisualizzazione < 100) {
                  //perchè i titoli di studio sono divisi graficamente ma sono nello stesso dominio
                  if (Number.parseInt(element.cdDominioTcb) === cdDominioTcbLaurea) {
                    //perchè Laurea ha il box di specifica
                    titoloStudio.push({ label: 'Laurea', nota: ele.tx_val, error: !ele.tx_val, idMans: ele.cd_val_attributo });
                  } else {
                    titoloStudio.push({ label: element.tlValoreTestuale[locale], idMans: ele.cd_val_attributo });
                  }
                } else {
                  lsCorsi.push({ label: element.tlValoreTestuale[locale], idMans: ele.cd_val_attributo });
                }
              }
            });
          }
          break;
        case codiciAttributo.LS_CORSI_BADANTE:
          corsiBadante.forEach(element => {
            if (Number.parseInt(element.cdDominioTcb) === 0 && ele.cd_val_attributo === 0) {
              lsCorsi.push({ label: 'Altro', error: !ele.tx_val, nota: ele.tx_val, idMans: 0 });
            } else {
              if (Number.parseInt(element.cdDominioTcb) === ele.cd_val_attributo) {
                lsCorsi.push({ label: element.tlValoreTestuale[locale] });
              }
            }

          });
          break;
        case codiciAttributo.FG_INTERESSE_A_FREQUENTARE_CORSI_SA:
          fgCorsiBadante = ele.fg_val === 'S';
          notaCorsiBadante = ele.tx_val;
          break;
        case codiciAttributo.LIV_CONOSCENZA_ITALIANO:
          if (ele.nr_val === 6) {
            madrelinguaItaliano = true;
          } else {
            livelloConoscenzaItaliano = ele.nr_val;
          }
          break;
        case codiciAttributo.FG_INTERESSE_A_FREQUENTARE_CORSI_DI_ITALIANO:
          corsiItaliano = ele.fg_val === 'S';
          break;
        case codiciAttributo.LIV_LINGUE_CONOSCIUTE:
          lingueParlate.forEach((element) => {
            if (ele.cd_val_attributo === parseInt(element.cdDominioTcb, 10)) {
              const isOther = !!(ele.tx_nota);
              let label = element.tlValoreTestuale[locale];
              if (isOther) {
                label = `Altro(${ele.tx_nota})`;
              }
              lingueEstere.push({ label, nota: ele.nr_val === 6 ? 'Madrelingua' : ele.nr_val })
            }
          });
          break;
        default:
      }
    });
  }


  return (
    <>
      <Title
        title='Istruzione e formazione'
        onPatchStep={onPatchStep}
        index={2}
      />
      <FieldText
        title='Titoli di studio'
        array={sortOrder(titoloStudio, "idMans")}
      />
      <FieldText
        title='Corsi di formazione'
        array={sortOrder(lsCorsi, "idMans")}
      />
      <FieldCheck
        title='Interesse a frequentare corsi di formazione in ambito socio assistenziale'
        checked={fgCorsiBadante}
        note={notaCorsiBadante}
        requiredNote
      />
      {
        madrelinguaItaliano ?
          (
            <FieldCheck
              title="Madrelingua italiana"
              checked={madrelinguaItaliano}
              required
            />
          )
          :
          (
            <>
              <FieldText
                title="Conoscenza italiano"
                value={livelloConoscenzaItaliano}
                required={!lingueEstere.length}
              />
              <FieldCheck
                title="Interesse a frequentare corsi in italiano"
                checked={corsiItaliano}
              />
            </>
          )
      }

      <FieldText
        title="Lingue estere"
        array={lingueEstere}
      />
    </>
  );
};

TCBICL003.displayName = 'TCBICL003';

export default TCBICL003;
