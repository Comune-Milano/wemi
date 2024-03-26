/** @format */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Tooltip from 'components/ui/Tooltip';
import Badge from 'components/ui/Badge';
import FaIcon from 'components/ui/FaIcon';
import {HandleScrollDown} from 'components/ui/HandleScroll';
import styled from 'styled-components';
import { colors } from 'theme';
import { graphqlRequest, currentRequest } from 'redux-modules/actions/authActions';
import DrawerVisualizza from './DrawerVisualizza';
import { CalcolaNotifiche } from '../CalcolaNotifiche/CalcolaNotifiche';
import { CalcolaStatoRichiestaBase } from '../CalcolaRichiestaBase/CalcolaRichiestaBase';
import {FormatDate} from 'components/ui/FormatDate';
import { moneyFormat } from 'utils/formatters/moneyFormat';

const RichiestaRow = styled(Row)`
  &:last-child {
    border-bottom: 0.5px solid ${colors.primary};
  }
  border-top: 0.5px solid ${colors.primary};
  min-width: 850px;
  width: 100%;
`;

const BorderLeftColumn = styled(Column)`
  border-left: 1px solid ${colors.grey};
`;

const Textwords = styled(Text)`
  &:nth-last-child(2) {
    color: yellow;
  }
`;

const RiepilogoRichiesta = ({ richiestaEnte, richiestaBase, locale, admin}) => {
  const [open, setOpen] = useState(false);
  const [azzeraNotifiche] = useState(0);

  const scrollDown = HandleScrollDown();
 const notifiche= richiestaBase && CalcolaNotifiche(richiestaBase);
const richiesta =  richiestaBase &&  
CalcolaStatoRichiestaBase(richiestaBase);


  return (
    <RichiestaRow justifycontent="space-between" flex alignitems="center" padding="5px 0">
    <Column xs="11" padding="0">
      <Row fluid justifycontent="flex-start" flex alignitems="flex-start">
        <Column xs="2" padding="5px" margin="0 0.5em 0 0">
          <Text size="f8" tag="p" value="Richiesta del:" color="blue" />
          {richiestaBase && <Text
            size="f7"
            tag="p"
            value={richiestaBase !== null ? FormatDate(richiestaBase.ts_creazione, 'it'):  'non definito'}
            color="darkGrey"
          />}
        </Column>
        <BorderLeftColumn xs="3" padding="5px" margin="0 0.5em 0 0">
          <Text size="f8" tag="p" value="Nome del servizio:" color="blue" />
          {richiestaBase && 
          <Textwords size={richiestaBase && richiestaBase.serviceName && richiestaBase.serviceName[locale].length > 20 ? 'f8' : 'f7'} tag="p" value={richiestaBase && richiestaBase.serviceName && richiestaBase.serviceName[locale]} color="darkGrey" />
          }
          </BorderLeftColumn>
        <BorderLeftColumn xs="3" padding="5px" margin="0 0.5em 0 0">
          <Text size="f8" tag="p" value="Identificativo richiesta:" color="blue" />
          {richiestaBase && 
          <Textwords size="f7" tag="p" value={richiestaBase && richiestaBase.idRichiestaBase && richiestaBase.idRichiestaBase} color="darkGrey" />
          }
          </BorderLeftColumn>
        <BorderLeftColumn xs="2" padding="5px" margin="0 0.5em 0 0">
          <Text size="f8" tag="p" value="Stato richiesta:" color="blue" />
          
          <Text
            size="f7"
            tag="p"
            value={
              richiesta === 1 ? 'Aperta' : 
              richiesta === 2 ? 'Pagata' : 
              richiesta === 3 ? 'Rifiutata' : 
              richiesta === 4 ? 'Scaduta' : 
              ''
            }
            color={
              richiesta === 2
                ? 'green'
                : 'red'
            }
          />
        </BorderLeftColumn> 
        {azzeraNotifiche != 0 && notifiche > 0 && richiesta !== 2 &&
          <Column xs="1" padding="5px" margin="1em 0.5em 0 0">
            <Tooltip
              bottom
              fontSize="f8"
              textTT={`Hai ${notifiche} notifiche.`}
              color="white"
              bgcolor="primary">
              <Badge
                wrapperMargin="0"
                verticalPosition="center"
                bgcolor="yellow"
                color="black"
                value={notifiche}
                width="1em"
                height="1em"
                padding="0.8em"
                radius="25px"
                fontsize="f5">
              </Badge>
            </Tooltip>
          </Column>}

      </Row>
      <Row fluid flex justifycontent="flex-start" alignitems="flex-start" >
        <Column xs="2" padding="5px" margin="0 0.5em 0 0">
          <Text size="f8" tag="p" value="Municipio:" color="blue" />
          {richiestaBase && 
          <Text
            size="f7"
            tag="p"
            value={richiestaBase.js_dati_richiesta.filtri ? richiestaBase.js_dati_richiesta.filtri.municipio ? richiestaBase.js_dati_richiesta.filtri.municipio.id !== 0 ? `${richiestaBase.js_dati_richiesta.filtri.municipio}` : 'N/D' : 'N/D' : 'N/D'}
            color="darkGrey"
          />}
        </Column>
        <BorderLeftColumn xs="3" padding="5px" margin="0 0.5em 0 0">
          <Text size="f8" tag="p" value="Richiedente:" color="blue" />
          {richiestaBase && 
          <Text size="f7" tag="p" value={richiestaBase && richiestaBase.user.ptx_username} color="darkGrey" />
          }
        </BorderLeftColumn>
        <BorderLeftColumn xs="1" padding="5px" >
          <Text size="f8" tag="p" value="Orario:" color="blue" />
          {richiestaBase && 
          <Text
            transform="capitalize"
            size="f9" tag="p" value={richiestaBase && richiestaBase.js_dati_richiesta.filtri && richiestaBase.js_dati_richiesta.filtri.orario 
              ? richiestaBase.js_dati_richiesta.filtri.orario.length > 0 && richiestaBase.js_dati_richiesta.filtri.orario[0].id !== 0 ?
              richiestaBase.js_dati_richiesta.filtri.orario.map(elemento =>
                elemento.value && elemento.value.toLowerCase()).join(', ')
              : 'N/D' : 'N/D'} color="darkGrey" />
          }
        </BorderLeftColumn>
        <BorderLeftColumn xs="1" padding="5px">
          <Text size="f8" tag="p" value="Quantità:" color="blue" />
          {richiestaBase && 
          <Text size="f7" align="right" tag="p" value={richiestaBase && richiestaBase.js_dati_richiesta ? richiestaBase.js_dati_richiesta.qtPersone : 'N/D'} color="darkGrey" />
          }
          </BorderLeftColumn>
        <BorderLeftColumn xs="1" padding="5px" margin="0 0.5em 0 0">
          <Text size="f8" tag="p" value="Costo:" color="blue" />
          {richiestaBase && 
          <Text size="f7" align="right" tag="p" value={richiestaBase && richiestaBase.costo ? `€ ${moneyFormat(richiestaBase.costo)}` : 'N/D'} color="darkGrey" />
          }
          </BorderLeftColumn>
        <BorderLeftColumn xs="3" padding="5px">
          <Text size="f8" tag="p" value="Tipologia:" color="blue" />
          {richiestaBase && 
          <Textwords size="f7" tag="p" value={richiestaBase && richiestaBase.js_dati_richiesta.filtri && richiestaBase.js_dati_richiesta.filtri.tipologia && richiestaBase.js_dati_richiesta.filtri.tipologia.value
            ? richiestaBase.js_dati_richiesta.filtri.tipologia.id !== 0 ? richiestaBase.js_dati_richiesta.filtri.tipologia.value : 'N/D' : 'N/D'} color="darkGrey" />
          }
            </BorderLeftColumn>
      </Row>
    </Column>
    <Column xs="1" padding="0">
      <Row justifycontent="center">
          <Column xs="3" flex direction="column" alignitems="center" padding="5px">
            <Text size="f7" tag="p" value="Visualizza" color="primary" />
            <FaIcon
              noShadow
              icon="\f105"
              size="2x"
              weight="bold"
              fontSize="f4"
              color="primary"
              onClick={async () => {
                setOpen(!open);
              }
              }
            />
          </Column>
      </Row>
    </Column>
    <DrawerVisualizza
      open={open}
      scrollDown={window.scrollY > 0 && scrollDown === 0 ? 2 : scrollDown}
      setOpen={setOpen}
      bodyValue={richiestaBase && richiestaBase}
      statoRichiestaBase={
        richiesta
      }
    />

    </RichiestaRow>
  );
};

RiepilogoRichiesta.displayName = 'RiepilogoRichiesta';
const mapStoreToProps = store => ({
  serviziByUtente: store.graphql.serviziByUtenterichiestaServizioBaseIndex,
  richiestaEnte: store.graphql.richiestaEnte,
  locale: store.locale
});

const mapDispatchToProps = {
  graphqlRequest,
  currentRequest,
};
export default connect(mapStoreToProps, mapDispatchToProps)(RiepilogoRichiesta);
