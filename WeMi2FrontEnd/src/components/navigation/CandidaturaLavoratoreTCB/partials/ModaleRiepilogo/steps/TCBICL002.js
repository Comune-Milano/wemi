/** @format */

import React from 'react';
import moment from 'moment';
import Title from '../partials/Title';
import FieldText from '../partials/FieldText';
import { codiciAttributo } from '../../../constants/CodiciAttributo';

const TCBICL002 = ({
  Dati,
  locale,
  onPatchStep,
  statoOccupazionale,
}) => {

  const idOccupato= 3;

  let stato={};
  let data;

  if (statoOccupazionale) {
    Dati.forEach((ele) => {
      switch (ele.cd_attributo) {
        case codiciAttributo.CD_STATO_OCCUPAZIONALE:
          statoOccupazionale.forEach(element => {
            if ( parseInt(element.cdDominioTcb) === ele.cd_val_attributo) {
              stato ={tlValoreTestuale : element.tlValoreTestuale[locale], cdDominioTcb: Number.parseInt(element.cdDominioTcb)};
            }
          });

          break;
        case null:
        case undefined:
          if(!ele.oj_allegato_off){
            data= ele.dt_val ? moment(ele.dt_val).format('DD/MM/YYYY') : null;
            }
          break;
        default:
          // code block
      }
    });
  }

  return (
    <>
      <Title
        title="Stato occupazionale"
       onPatchStep={onPatchStep}
       index={1}
      />
      <FieldText
        title="Il tuo stato occupazionale"
        value={stato.tlValoreTestuale}
        required
      />
      <FieldText
        title="Data disponibilità"
        value={data}
        required={!(stato.cdDominioTcb === idOccupato)}
      />
    </>
  );
};

TCBICL002.displayName = 'TCBICL002';

export default TCBICL002;
