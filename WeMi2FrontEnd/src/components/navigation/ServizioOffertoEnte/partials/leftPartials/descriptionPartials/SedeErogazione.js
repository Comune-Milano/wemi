/** @format */

import React from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import Text from 'components/ui/Text';
import { DashedUnorderedList } from '../../DashedUnorderedList';

const accompagnamentoSedeText = `
  con servizio di accompagnamento da casa del 
  beneficiario alla sede incluso nel prezzo
`;

const SedeErogazione = ({
  servizioErogato,
}) => {
  const modalitaErogazione = getObjectValue(
    servizioErogato,
    'EstraiDettaglioAmministrativoServizioEnte.cd_modalita_erogazione',
    null
  );
  const domicilio = modalitaErogazione === 1;
  const sediErogatrici = getObjectValue(
    servizioErogato,
    'EstraiDettaglioAmministrativoServizioEnte.sediErogatrici',
    []
  );

  const altreSedi = getObjectValue(
    servizioErogato,
    'EstraiDettaglioAmministrativoServizioEnte.tx_altra_sede',
  );

  const altreSediCheckAccompagnamento = getObjectValue(
    servizioErogato,
    'EstraiDettaglioAmministrativoServizioEnte.fg_accompagnamento_altra_sede',
  ) === '1';

  const sediText = sediErogatrici.map(sede => {
    const checkAccompagnamento = sede.fg_accompagnamento_sede === '1';
    const indirizzo = sede.js_sede.indirizzo || {};

    const txIndirizzo = indirizzo.indirizzo || indirizzo.txIndirizzo || '';
    const txCitta = indirizzo.citta || indirizzo.txCitta || '';

    return (
      <li>
        <span className="list-item-text-wrapper">
          <Text
            value={txIndirizzo}
            color="black"
            size="f7"
          />
          &nbsp;-&nbsp;
          <Text
            value={txCitta}
            color="black"
            size="f7"
          />
          {
            checkAccompagnamento ? (
              <Text
                value={accompagnamentoSedeText}
                color="black"
                size="f7"
                fontStyle="italic"
              />
            ) : null
          }
        </span>
      </li>
    );
  });

  return (
    <div style={{ width: '100%', margin: '0.5em 0' }}>
      <Text
        tag="h4"
        weight="bold"
        value="Dove"
        color="black"
        size="f7"
      />
      <DashedUnorderedList>
        {
          domicilio ?
            (
              <li>
                <Text
                  tag="span"
                  value="A domicilio"
                  color="black"
                  size="f7" 
                />
              </li>
            )
            : null
        }
        {sediText}
        {
          altreSedi ?
            (
              <li>
                <span className="list-item-text-wrapper">
                  <Text
                    value={altreSedi}
                    color="black"
                    size="f7"
                  />
                  <Text
                    value={
                      altreSediCheckAccompagnamento ?
                        accompagnamentoSedeText : ''
                    }
                    color="black"
                    size="f7"
                    fontStyle="italic"
                  />
                </span>
              </li>
            )
            : null
        }
      </DashedUnorderedList>
    </div>
  );

}

SedeErogazione.displayName = 'SedeErogazione';

export default SedeErogazione;
