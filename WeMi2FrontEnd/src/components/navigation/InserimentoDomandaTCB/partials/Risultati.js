/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import CardQTC from './CardQTC'
import { connect } from 'react-redux';

import { getObjectValue } from 'utils/extensions/objectExtensions';

const Risultati = ({
  setOpenInfo,
  setOpenSimulatore,
  isCfRicercaValorizzato,
  modalitaAssunzioneTCB,
  livelliContrattuali,
  tcbFilters,
  dataset,
  errori,
  Risultato,
  servizioTCB,
  locale,
  loaded
}) => {

  const getValTestuale = (obj, locale) => {
    return getObjectValue(obj, 'tl_valore_testuale.' + locale, '').toLowerCase();
  }

  const CardQTCArray = [
    {
      domain: 1,
      title: getValTestuale(modalitaAssunzioneTCB.find(el => el.cd_dominio_tcb === 1), locale),
      text: `Diventa il datore di lavoro del/la ${servizioTCB.value}`,
      to: `/configurazionerichiestatcb`
    },
    {
      domain: 2,
      title: getValTestuale(modalitaAssunzioneTCB.find(el => el.cd_dominio_tcb === 2), locale),
      text: `Assumi il/la ${servizioTCB.value} attraverso uno spazio WeMi`,
      to: `/`
    },
    {
      domain: 3,
      title: getValTestuale(modalitaAssunzioneTCB.find(el => el.cd_dominio_tcb === 3), locale),
      text: `Assumi il/la ${servizioTCB.value} utilizzando il libretto famiglia`,
      to: `/configurazionerichiestatcb`
    }
  ];

  return (
    <Row fluid>
      {CardQTCArray.map((card, index) => {
        if (card.domain !== 3 && card.domain!==2
          || (card.domain === 3 && tcbFilters.orario && tcbFilters.orario.id === 3 && card.domain!==2)
          ) {
          return (
            <Column xs="4">
            <CardQTC
              key={card.domain.toString()}
              label={card.title}
              description={card.text}
              dataset={dataset}
              isCfRicercaValorizzato={isCfRicercaValorizzato}
              modalitaAssunzione={card.domain}
              setOpenInfo={setOpenInfo.bind(this)}
              setOpenSimulatore={setOpenSimulatore.bind(this)}
              tcbFilters={tcbFilters}
              livelliContrattuali={livelliContrattuali}
              servizioTCB={servizioTCB}
              errori={errori}
              Risultato={Risultato}
              locale={locale}
              loaded={loaded}
            />
            </Column>
          )
        }
      }
      )}
    </Row>
  );
};

Risultati.displayName = ' Risultati';
const mapStateToProps = (state) => ({
  tcbFilters: state.requestTCB.preventivoLightTCB,
});


export default connect(
  mapStateToProps
)(Risultati);