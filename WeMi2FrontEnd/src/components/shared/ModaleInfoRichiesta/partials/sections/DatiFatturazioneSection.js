/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid'
import Text from 'components/ui/Text';
import Hr from 'components/ui/Hr';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import RowSection from './RowSection';
import { colors } from 'theme';

const DatiFatturazioneSection = ({ richiestaEnte }) => {
  
  const ragioneSociale = getObjectValue(richiestaEnte, 'datiPagamento.js_dati_fatturazione.txRagSoc', null);
  const nomeIntestatario = getObjectValue(richiestaEnte, 'datiPagamento.js_dati_fatturazione.txNome', null);
  const cognomeIntestatario = getObjectValue(richiestaEnte, 'datiPagamento.js_dati_fatturazione.txCognome', null);
  const indirizzoIntestatario = getObjectValue(richiestaEnte, 'datiPagamento.js_dati_fatturazione.txIndirizzo', null);
  const comuneIntestatario = getObjectValue(richiestaEnte, 'datiPagamento.js_dati_fatturazione.txComune', null);
  const provinciaIntestatario = getObjectValue(richiestaEnte, 'datiPagamento.js_dati_fatturazione.txProvincia', null);
  const capIntestatario = getObjectValue(richiestaEnte, 'datiPagamento.js_dati_fatturazione.txCAP', '');
  const cfIntestatario = getObjectValue(richiestaEnte, 'datiPagamento.js_dati_fatturazione.txCF', null);
  const pIvaIntestatario = getObjectValue(richiestaEnte, 'datiPagamento.js_dati_fatturazione.txPiva', null);
  const telIntestatario = getObjectValue(richiestaEnte, 'datiPagamento.js_dati_fatturazione.txTel', null);
  const notaFatturazione = getObjectValue(richiestaEnte, 'datiPagamento.js_dati_fatturazione.txNote', null);

  return (
    <Row fluid margin="0 0 3em 0">
      <Text
        transform="uppercase"
        letterSpacing="0.05em"
        value="Dati fatturazione"
        size="f6"
        color="primary"
        tag="h3"
        weight="bold"
      />
      <Hr height="1.5px" width="100%" color="primary" top="0" bottom="2em" />
      {
        ragioneSociale ?
          <>
            <RowSection
              label="Intestato a"
              value={ragioneSociale || null}
            />
            <RowSection
              value={`${nomeIntestatario || ''} ${cognomeIntestatario || ''}`}
            />
          </>
          :
          <RowSection
            label="Intestato a"
            value={
              nomeIntestatario && cognomeIntestatario ?
                `${nomeIntestatario} ${cognomeIntestatario}` :
                null
            }
          />
      }
      <RowSection
        label="Residente in"
        value={
          indirizzoIntestatario && comuneIntestatario && provinciaIntestatario && capIntestatario ?
          `${indirizzoIntestatario} - ${comuneIntestatario} (${provinciaIntestatario}) - ${capIntestatario}` :
          null
        }
      />
      <RowSection
        label="Codice fiscale / Partita iva"
        value={cfIntestatario || pIvaIntestatario}
      />
      <RowSection
        label="Telefono"
        value={telIntestatario}
      />
      <RowSection
        label="Nota aggiuntiva alla fatturazione"
        value={notaFatturazione}
        newLine
      />
    </Row>
  );
};

DatiFatturazioneSection.displayName = 'DatiFatturazioneSection';
export default DatiFatturazioneSection;
