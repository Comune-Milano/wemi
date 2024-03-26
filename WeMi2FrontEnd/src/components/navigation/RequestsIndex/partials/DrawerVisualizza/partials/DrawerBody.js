/** @format */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import { colors } from 'theme';
import Button from 'components/ui2/Button';
import Link from 'components/router/NavLink';
import Text from 'components/ui/Text';
import media from 'utils/media-queries';
import { withRouter } from 'react-router';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import ModaleInfoRichiesta from 'components/shared/ModaleInfoRichiesta';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import DrawerMessageButton from './DrawerMessageButton';

const EnteRow = styled(Row)`
  border-top: 2px solid ${colors.primary};
  width: 100%;
`;

const StyledBody = styled.div`
  padding: 3em 3em;

  ${media.md`
    padding: 3em 6em;
  `}

`;

const PriceColumn = styled(Column)`
  text-align: right;

  ${media.lg`
    text-align: left;
  `}

`;

const priorita = (richiesta) => {
  const value = richiesta.statoRichiestaEnte;
  const { statoChat } = richiesta;
  switch (value) {
    case 8: return 11;
    case 7: return 10;
    case 2: return 9;
    case 3: return statoChat == 1 ? 8 : 7;
    case 1: return 6;
    case 6: return 5;
    case 5: return 4;
    case 4: return 3;
    default: return 1;
  }
};

const DrawerBody = ({ Data, history }) => {
  const [openModalInfoRichiesta, setOpenModalInfoRichiesta] = useState(false);
  const [idRichiestaServizioEnte, setIdRichiestaServizioEnte] = useState(null);
  let servizioAcquistato = null;

  const transformData = (data) => {
    const momentDate = moment(data);
    const orario = `${momentDate.format('HH:mm')}`;
    if (momentDate.isSame(moment(), 'days')) {
      return `${orario} di oggi`;
    }
    if (moment().startOf('day').diff(momentDate.startOf('day'), 'days') === -1) {
      return `${orario} di domani`;
    }
    if (moment().startOf('day').diff(momentDate.startOf('day'), 'days') <= -7) {
      return `${orario} di ${momentDate.format('dddd')} ${momentDate.format('DD/MM')}`;
    }
    return `${orario} di ${momentDate.format('dddd')}`;
  };

  for (const servizio of Data) {
    if (servizio.statoRichiestaEnte === 8) {
      servizioAcquistato = servizio;
      break;
    }
  }
  return (
    <StyledBody>
      {
        servizioAcquistato ? (
          <EnteRow fluid justifycontent="flex-end" padding="1em 0 4em 0">
            <Column xs="12" md="4" padding="0" alignself="center">
              <Text
                tag="h4"
                value={servizioAcquistato.nomeEnte}
                color="primary"
                weight="bold"
                transform="uppercase"
                letterSpacing="0.05em"
                marging="0 0 0.5em 0"
                size="f6"
              />
              <Text
                tag="span"
                value={servizioAcquistato.statoRichiestaTestuale}
                color="darkGrey"
                weight="bold"
                size="f7"
              />
            </Column>
            <PriceColumn xs="4" md="3" padding="0" alignself="center">
              {
                // se richiesta pagata mettere il prezzo deciso dall'ente
                servizioAcquistato.prezzoFinale ? (
                  <>
                    <Text tag="small" value="prezzo" size="f7" color="darkGrey" weight="semiBold" />
                    {' '}
                    <br />
                    <Text
                      tag="strong"
                      value={
                      `€ ${moneyFormat(servizioAcquistato.prezzoFinale)}`}
                      size="f5"
                      weight="bold"
                      color="green"
                    />
                  </>
                )
                  : null
              }
            </PriceColumn>

            {/* start column buttons */}
            <Column xs="12" md="5" padding="0">
              <Row fluid>
                <Column padding="0 0 0.5em 0">
                  <Button
                    color="primary"
                    label="info richiesta"
                    onClick={() => {
                      setIdRichiestaServizioEnte(servizioAcquistato.idRichiestaServizioEnte);
                      setOpenModalInfoRichiesta(true);
                    }}
                  />
                </Column>
                <Column padding="0 0 0.5em 0">
                  <DrawerMessageButton requestInfo={servizioAcquistato} fontSize="f7" />
                </Column>
                <Column padding="0 0 0.5em 0">
                  <Button
                    disabled={servizioAcquistato.statoRichiestaEnte !== 8 || isNullOrUndefined(servizioAcquistato.recensione)}
                    color="blue"
                    label={(servizioAcquistato.recensione !== null && servizioAcquistato.recensione.ultimoStato && (servizioAcquistato.recensione.ultimoStato && servizioAcquistato.recensione.ultimoStato.cd_stato_recensione === '3' || servizioAcquistato.recensione.ultimoStato && servizioAcquistato.recensione.ultimoStato.cd_stato_recensione === '2')) ? 'VISUALIZZA RECENSIONE' : 'SCRIVI UNA RECENSIONE'}
                    onClick={() => {
                      if (servizioAcquistato.recensione !== null) {
                        history.push(`/Feedback/${servizioAcquistato.idRichiestaServizioEnte}?q=v`);
                      } else {
                        history.push(`/Feedback/${servizioAcquistato.idRichiestaServizioEnte}`);
                      }
                    }}
                  />
                </Column>
              </Row>
            </Column>
            {/* and column buttons */}
          </EnteRow>
        )
          :
          Data.sort((a, b) => priorita(b) - priorita(a)).map(row => {
            const acquistaPath = `/r/idRequestsIndex/${row.idRichiestaServizioEnte}/Order`;
            const chatPath = '';
            return (
              <EnteRow fluid justifycontent="flex-end" padding="1em 0 4em 0" key={row.idRichiestaServizioEnte}>
                {/* start column nameEnte, price and date */}
                <Column xs="12" lg="9" padding="0">
                  <Row fluid>
                    <Column xs="8" lg="7" padding="0 1em 0 0">
                      <Text
                        tag="h4"
                        value={row.nomeEnte}
                        color="primary"
                        weight="bold"
                        transform="uppercase"
                        letterSpacing="0.05em"
                        marging="0 0 0.5em 0"
                        size="f6"
                      />
                      <Text
                        tag="span"
                        value={row.statoRichiestaTestuale}
                        color="black"
                        size="f7"
                      />
                    </Column>
                    <PriceColumn xs="4" lg="5" padding="0" alignself="top">
                      {
                        // se offerta gratuita (tipo offerta 1 o 2, 3 pagamento)
                        row.tipoOfferta != 3 && !row.prezzoFinale && row.prezzoProposto === 0 ?
                          <Text tag="small" value="Gratuito" size="f6" color="black" weight="semiBold" />
                          :
                          // se richiesta accettata mettere il prezzo deciso dall'ente
                          // per ora controllo sulla presenza del dato
                          row.prezzoFinale ? (
                            <>
                              <Text tag="small" value="prezzo" size="f7" color="darkGrey" weight="semiBold" />
                              {' '}
                              <br />
                              <Text
                                tag="strong"
                                value={
                                `€ ${moneyFormat(row.prezzoFinale)}`}
                                size="f5"
                                weight="bold"
                                color="green"
                              />
                            </>
                          )
                            : row.prezzoProposto ? (
                              <>
                                <Text tag="small" value="da" size="f7" color="darkGrey" weight="semiBold" />
                                {' '}
                                <br />
                                <Text
                                  tag="strong"
                                  value={`€ ${moneyFormat(row.prezzoProposto)}`}
                                  size="f5"
                                  weight="bold"
                                  color="black"
                                />
                              </>
                            )
                              : (
                                <>
                                  <Text tag="small" value="Non erogabile" size="f6" color="black" weight="semiBold" />
                                </>
                            )}
                    </PriceColumn>
                    {
                      row.statoRichiestaEnte === 2 ? (
                        <>
                          <Column xs="12" lg="7" padding="1em 0 0 0">
                            <Text tag="small" value="offerta valida fino alle" size="f7" color="darkGrey" weight="semiBold" />
                            {' '}
                            <br />
                            <Text tag="strong" value={transformData(row.scadenza)} size="f6" weight="bold" color="black" />
                          </Column>
                          <Column xs="12" lg="5" padding="1em 0 0 0">
                            <Text tag="small" value="periodo" size="f7" color="darkGrey" weight="semiBold" />
                            {' '}
                            <br />
                            <Text tag="strong" value={`dal ${row.dataDal}`} size="f6" weight="bold" color="black" transform="uppercase" />
                            {' '}
                            <br />
                            <Text tag="strong" value={`al ${row.dataAl}`} size="f6" weight="bold" color="black" transform="uppercase" />

                          </Column>
                        </>
                      )
                        : null
                    }
                  </Row>
                </Column>
                {/* end column nameEnte, price and date */}

                {/* start column buttons */}
                <Column xs="12" lg="3" padding="0">
                  <Row fluid alignitems="right" justifycontent="right" margin="0" padding="0">
                    <Column padding="0 0 0.5em 0">
                      <Button
                        color="primary"
                        label="info richiesta"
                        fontSize="f6"
                        padding="0.4em 0.4em"
                        onClick={() => {
                          setIdRichiestaServizioEnte(row.idRichiestaServizioEnte);
                          setOpenModalInfoRichiesta(true);
                        }}
                      />
                    </Column>
                    <Column padding="0 0 0.5em 0">
                      <DrawerMessageButton requestInfo={row} fontSize="f6" />
                    </Column>
                    <Column padding="0 0 0.5em 0">
                      <Link width="100%" to={acquistaPath} tabIndex="-1">
                        <Button
                          disabled={row.disabilitaAcquista}
                          color="green"
                          label="ACQUISTA"
                          fontSize="f6"
                        >
                        </Button>
                      </Link>
                    </Column>
                  </Row>
                </Column>
                {/* end column buttons */}
              </EnteRow>
            );
          })
      }

      <ModaleInfoRichiesta
        openModal={openModalInfoRichiesta}
        setOpenModal={setOpenModalInfoRichiesta}
        idRichiestaServizioEnte={idRichiestaServizioEnte}
      />
    </StyledBody>
  );
};

DrawerBody.displayName = 'DrawerBody';

const mapStoreToProps = store => ({
  locale: store.locale,
});

export default connect(mapStoreToProps)(withRouter(DrawerBody));
