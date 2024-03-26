/** @format */

import React from 'react';
import Title from '../partials/Title';
import FieldList from '../partials/FieldList';
import { codiciAttributo } from '../../../constants/CodiciAttributo';
import { ID_SERVIZIO_COLF } from 'types/tcbConstants';
import { sortOrder } from '../functions/sortOrder';

const TCBICL009 = ({
  Dati,
  locale,
  onPatchStep,
  Mansioni
}) => {

  const mansioniColf = [];
  if (Mansioni) {
    Dati.forEach((ele) => {
      switch (ele.cd_attributo) {
        case codiciAttributo.LS_MANSIONI_COLF:
          if (ele.id_servizio_riferimento === ID_SERVIZIO_COLF) {
            Mansioni.forEach(element => {
              if (parseInt(element.cdDominioTcb) === ele.cd_val_attributo) {
                if (parseInt(element.cdDominioTcb) === 0) {
                  mansioniColf.push({ label: "Altro", error: !ele.tx_val, nota: ele.tx_val, idMans: element.cdDominioTcb, pgVisualizzazione: element.pgVisualizzazzione })
                } else {
                  mansioniColf.push({ label: element.txTitoloMansione[locale], pgVisualizzazione: element.pgVisualizzazzione })
                }
              }
            });
          }
          break;
        default:
        // code block
      }
    });
  };

  return (
    <>
      <Title
        title="Competenze Colf"
        onPatchStep={onPatchStep}
        index={7}
      />
      <FieldList
        title="Le mansioni di cura della casa per cui ti sei proposta"
        array={sortOrder(mansioniColf, "pgVisualizzazione")}
      />
    </>
  );
};

TCBICL009.displayName = 'TCBICL009';

export default TCBICL009;
