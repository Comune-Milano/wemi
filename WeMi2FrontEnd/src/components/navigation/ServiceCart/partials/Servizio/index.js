/** @format */

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { AddPurchase } from 'redux-modules/actions/purchaseActions';
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme';
import { rimuoviElemento as rimuoviElementoQ } from './CartGraphQL';
import Text from 'components/ui/Text';
import RatingStatico from 'components/ui/Rating/RatingStatico';
import Button from 'components/ui/Button';
import NavLink from 'components/router/NavLink';
import { moneyFormat } from 'utils/formatters/moneyFormat';

const AcquistaServizioRow = styled(Row)`
  border: 1px solid ${colors.primary};
  padding: 10px
  margin-top: 20px;
  &:first-child {
      margin-top: 0;
  }
`;

const LabelCostColumn = styled(Column)`
  display: flex;
  background-color: ${colors.grey};
  justify-content: center;
  align-items: center;
`;

const Servizio = ({ serviziSelezionati,setServiziSelezionati, props,graphqlRequest,locale,AddPurchase,RichiestaEnteUtile}) => {
  const { nm_ente } = props.servizioEnte.ente;
  const { ts_variazione_stato } = props.storiaStati[0];
  const {im_prezzo_minimo_offerta_calc,media_recensioni,numeroRecensioni} = props.servizioEnte;

  const tempoRimanente = (time) => {
    const ora = new Date();
    const scadenza = new Date(time)
    const difference = (scadenza.getTime() - ora.getTime()) / (1000 * 60 * 60);
    return (parseInt(difference));
  };

 

  return (
    <AcquistaServizioRow fluid justifycontent="space-between">
      
      <Column
        xs="12"
        md="6"
        padding="0"
        margin="5px"
        flex
        direction="column"
        justifycontent="space-between"
        alignitems="center"
      >
        <Row fluid>
          <Text value="Servizio: " padding="0 1em 0 0" color="darkGrey" size="f7" weight="bold" tag="p" />
          <Text
            value={props.servizioEnte.service.txDescrizioneServizio[locale]}
            color="darkGrey"
            size="f7"
            tag="p"
          />
        </Row>
        <Row fluid>
          <Column xs="9" padding="0">
            <Row fluid flex alignitems="center">
              <Text value="Rilasciato da: " color="darkGrey" size="f8" weight="bold" padding="0 0.2rem 0 0" />

              <Text value={nm_ente} color="blue" size="f7" />
            </Row>

            <Row fluid flex alignitems="center">
              <Text value="Scadenza offerta:" color="darkGrey" size="f8" weight="bold" padding="0 0.2rem 0 0" />
            {RichiestaEnteUtile &&  <><Text value={tempoRimanente(RichiestaEnteUtile.EstraiRichiestaEnte.ts_scadenza_acquisto)} color="red" size="f7" />
                                    <Text value="H" color="red" size="f7" /> </>}
            </Row>
          </Column>
          <Column xs="3" padding="0" flex justifycontent="flex-end" alignitems="flex-end">
            <RatingStatico fontSize="f8" stars={5} rate={media_recensioni ? media_recensioni : 0} spacingRight="p0" />
            <Text value={`(${numeroRecensioni})`} color="darkGrey" size="f8" />
          </Column>
        </Row>
      </Column>
      <LabelCostColumn xs="12" md="2" padding="0" margin="5px">
        <Text value="€" color="primary" size="f7" padding="0 0.2rem 0 0" />
        {/* <Text value={im_prezzo_minimo_offerta_calc.toFixed(2).replace('.',',')} color="primary" size="f5" /> */}
      { RichiestaEnteUtile && <Text value={moneyFormat(RichiestaEnteUtile.EstraiRichiestaEnte.im_costo_totale_ente)} color="primary" size="f5" />
}
      </LabelCostColumn>
      <Column
        xs="12"
        md="3"
        padding="0"
        margin="5px"
        flex
        alignitems="center"
        direction="column"
        justifycontent="space-between"
      >
        <Row fluid padding="2.5px 0">
          <NavLink to={`${window.location.pathname.split('/it')[1]}/${RichiestaEnteUtile && RichiestaEnteUtile.EstraiRichiestaEnte.im_costo_totale_ente}/Order`} props={RichiestaEnteUtile} width="100%">
         { RichiestaEnteUtile &&   <Button fontSize="f8" type="primary" value= {"Acquista entro "+tempoRimanente(RichiestaEnteUtile.EstraiRichiestaEnte.ts_scadenza_acquisto)+"h"}  onClick={() => AddPurchase(props) }/>}
          </NavLink>
        </Row>
        <Row fluid padding="2.5px 0">
        <NavLink to={`/r/idRequestsIndex`} width="100%">
          <Button fontSize="f8" value="Rimuovi"  onClick={() => {
              const arrayNuovo = serviziSelezionati.filter(
                servizio => servizio.id_richiesta_servizio_ente !== props.id_richiesta_servizio_ente,
              );
              setServiziSelezionati.bind(this);
              setServiziSelezionati(arrayNuovo);
              graphqlRequest(rimuoviElementoQ(props.datiPagamento.id_interno_transazione))
          }}/>
          </NavLink>
          {/* <Button fontSize="f8" value="Rimuovi" onClick={() => {
              const arrayNuovo = serviziSelezionati.filter(
                servizio => servizio.id_richiesta_servizio_ente !== props.id_richiesta_servizio_ente,
              );
              setServiziSelezionati.bind(this);
              setServiziSelezionati(arrayNuovo);
              graphqlRequest(rimuoviElementoQ(props.datiPagamento.id_interno_transazione))
          }}/> */}
        </Row>
        <Row fluid padding="2.5px 0">
            <NavLink to={`/r/idRequestsIndex`} width="100%">
          <Button fontSize="f8" value="Torna all'ordine" />
          </NavLink>
        </Row>
      </Column>
    </AcquistaServizioRow>
  );
};

Servizio.displayName = 'Servizio';
const mapStoreToProps = store => ({
  locale: store.locale
})
const mapDispatchToProps = ({
  graphqlRequest,
  AddPurchase
});
export default connect( mapStoreToProps,mapDispatchToProps)(Servizio);
