import React, { useState } from 'react';
import { Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import moment from 'moment';
import AnchorLink from 'components/ui/AnchorLink';
import ModaleRiepilogoRichiesta from 'components/shared/ModaleRiepilogoRichiesta/ModaleRiepilogoRichiesta';
import { connect } from 'react-redux';
import connectContext from 'hoc/connectContext';
import { MatchingLavoratoreContext } from '../../utils/MatchingLavoratoreContext';
import {
  InformazioniDomandaRow,
} from './style';

const DettaglioDomanda = ({ locale, dataReadyDomandaTCB, dataDomandaTCB }) => {
  const [riepilogoDomanda, setOpenRiepilogoDomanda] = useState(false);

  return (
    <>
      {dataReadyDomandaTCB ? (
        <InformazioniDomandaRow justifycontent="space-between" margin="20px 0">
          {riepilogoDomanda ? (
            <ModaleRiepilogoRichiesta
              openModal={riepilogoDomanda}
              setOpenModal={setOpenRiepilogoDomanda}
              idRichiestaTcb={dataDomandaTCB.idRichiesta}
              idServizio={dataDomandaTCB.idServizio + 999996}
              locale={locale}
            />
          )
            : null}
          <Column xs="3" md="2" padding="5px">
            <Text
              tag="strong"
              value="Numero richiesta: "
              color="darkGrey"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f8"
            />
            <br />
            <AnchorLink
              tag="span"
              value={dataDomandaTCB.idRichiestaBase}
              color="black"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f6"
              onClick={() => { setOpenRiepilogoDomanda(true); }}
            />
          </Column>
          <Column xs="3" md="2" padding="5px">
            <Text
              tag="strong"
              value="Richiesta del"
              color="darkGrey"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f8"
            />
            <br />
            <Text
              tag="span"
              value={moment(dataDomandaTCB.dataCreazione).format('L')}
              color="black"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f6"
            />
          </Column>
          <Column xs="3" md="2" padding="5px">
            <Text
              tag="strong"
              value="Tipologia del servizio"
              color="darkGrey"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f8"
            />
            <br />
            <Text
              tag="span"
              value={dataDomandaTCB.tipoRichiesta}
              color="black"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f6"
            />
          </Column>
          <Column xs="3" md="2" padding="5px">
            <Text
              tag="strong"
              value="Stato richiesta"
              color="darkGrey"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f8"
            />
            <br />
            <Text
              tag="span"
              value={dataDomandaTCB.statoRichiesta || 'Non definita'}
              color="black"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f6"
            />
          </Column>
          <Column xs="3" md="2" padding="5px">
            <Text
              tag="strong"
              value="richiedente"
              color="darkGrey"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f8"
            />
            <br />
            <Text
              tag="span"
              value={`${dataDomandaTCB.nomeUtente} ${dataDomandaTCB.cognomeUtente}`}
              color="black"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f6"
            />
          </Column>
          <Column xs="3" md="2" padding="5px">
            <Text
              tag="strong"
              value="data richiesta"
              color="darkGrey"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f8"
            />
            <br />
            <Text
              tag="span"
              value={dataDomandaTCB.dataRichiesta ?
                 moment(dataDomandaTCB.dataRichiesta).format('L')
                : 'Non specificata'}
              color="black"
              weight="bold"
              transform="uppercase"
              letterSpacing="0.05em"
              marging="0 0 0.5em 0"
              size="f6"
            />
          </Column>
        </InformazioniDomandaRow>
      )
        : null}
    </>
  );
};

DettaglioDomanda.displayName = 'Dettaglio domanda TCB';

const mapStoreToProps = store => ({
  locale: store.locale,
});

const mapContextToProps = (context) => ({
  dataDomandaTCB: context.contextState.dataDomandaTCB,
  dataReadyDomandaTCB: context.contextState.dataReadyDomandaTCB,
});

export default connect(mapStoreToProps)(
  connectContext(MatchingLavoratoreContext, mapContextToProps)(
    DettaglioDomanda
  )
);
