/** @format */

import React from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';
import Text from 'components/ui/Text';
import moment from 'moment';
import { Row, Column } from 'components/ui/Grid';
import { moneyFormat } from 'utils/formatters/moneyFormat';


const StyledList = styled.ul`
  box-sizing: border-box;
  margin: 0;
  /* padding: 0 0 1em 0; */
  width: 100%;

  > li {
    clear: both;
    /* padding: 0.6em 0 0 0; */
    font-size: ${fonts.size.f7};
    padding:0 0 1em 0;

    strong.title {
      font-weight: 500;
      font-style: italic;
    }

    div.desc {
      display: inline-block;
      min-width: 13rem;
      &:before {
        content: "";
      }
    }
    span.priceValue {
      min-width: 6rem;
      text-align: right;
      font-weight: 700;
      display: inline-block;

    }
    div.price {
      min-width: 6rem;
      font-weight: 700;
      display: inline-block;

    }

    ol {
      li {
        padding: 0.1em 0 0 0;
      }
    }

    ${props => props.inModal &&
    css`
      color: ${colors.darkGrey};
      margin-left: 1em;
  padding: 0 0 2em 0;
      text-indent: -1em;
      #groupTitle {
      &:before {
        content: '';
        background-color: ${colors.primary};
        height: 0.4em;
        width: 0.4em;
        display: inline-block;
        margin-right: 0.6em;
        border-radius: 100%;
      }
    }

      strong.title {
        text-transform: uppercase;
        font-weight: 700;
        font-style: normal;
      }

      div.desc {
        display: inline-block;
        &:before {
          content: "";
        }
        &:after {
          content: "";
        }
      }

      div.price {
        display: inline-block;
        color: ${colors.primary};
        font-size: ${fonts.size.f7};
        font-weight: 700;
        font-variant: small-caps;
        text-align: left;
        min-width: auto;
      }

      ol{
        padding-top: 0.5em;
        
        li {
          text-indent: 0;
          margin-top: 0.5em;
          font-size: ${fonts.size.f7};
          color: ${colors.black};
          border-bottom: 2px solid ${colors.grey};
          display: flex;
          flex-wrap: no-wrap;
          justify-content: space-between;
          align-items: center;
        }
      }
      `
  }

  }
`;

const PrezzoGruppi = ({ jsonDatiPrezzo, unitaPrezzo, locale, inModal }) => {
  const formattedDate = (date) => moment(date).format('DD/MM/YYYY');
  const {
    cdTipoOffertaServizio,
    cdTipoServizioErog,
    dataInizio,
    dataFine,
    txTitoloFinanziamento,
    qtMinimaUnita,
    txNoteAlPrezzo,
    listinoPrezzi,
  } = jsonDatiPrezzo;
  const {
    cd_unita_prezzo,
    tl_testo_aggettivo,
    tl_testo_sostantivo,
  } = unitaPrezzo;

  // cd tipo servizio erogato => 1 individuale, 2 condiviso, 3 cond/ind
  // cd tipo offerta servizio => 1/2 gratutito, 3 pagamento
  return (
    <>
      <StyledList inModal={inModal}>
        {listinoPrezzi
          .map((off, i) => (
            <li key={`group${i}`}>
              {
                off.qtPersoneA > 1 ?
                  (
                    <Text tag="span" value={off.qtPersoneDa === off.qtPersoneA ? `Servizio condiviso da ${off.qtPersoneA} persone` : `Servizio condiviso da ${off.qtPersoneDa} fino a ${off.qtPersoneA} persone`} weight="bold" />
                  )
                  : (
                    <Text
                      tag="span"
                      value="Servizio individuale"
                      weight="bold"
                      // padding="0.5em 0"
                    />
                  )
              }
              <ol>
                {off.offerta
                  .filter(off => off.qtUnitaA >= qtMinimaUnita || off.qtUnitaA === null)
                  .map((unita, j) => (
                    <li key={`group${i}El${j}`}>
                      <div className="price" style={{ alignItems: 'right', margin: '0 1em 0 0' }}>
                        <Text
                          tag="span"
                          value="€"
                          align="left"
                        />
                        <span className="priceValue">
                          <Text
                            tag="span"
                            value={moneyFormat(unita.valore, false)}
                            align="right"
                          />
                        </span>
                      </div>
                      {(unita.qtUnitaA || unita.qtUnitaDa > 1) ? (
                        <>
                          <div className="desc">
                            <Text tag="span" value="da " />
                            <strong>{unita.qtUnitaDa > qtMinimaUnita ? unita.qtUnitaDa : qtMinimaUnita}</strong>
                            {unita.qtUnitaA ? (
                              <>
                                <Text tag="span" value=" a " />
                                <strong>{unita.qtUnitaA}</strong>
                                <Text tag="span" value={` ${tl_testo_sostantivo[locale]}`} />
                              </>
                            )
                            : <Text tag="span" value={` ${tl_testo_sostantivo[locale]}`} />
                            }
                          </div>
                        </>
                      )
                        : null
                      }
                    </li>
                  ))}
              </ol>
            </li>
          ))}
      </StyledList>
      {qtMinimaUnita && qtMinimaUnita > 1 ? (
        <>
          <Row fluid margin="0 0 1em">
            <strong>
              <Text
                tag="span"
                color={inModal ? 'primary' : 'black'}
                value={`Il servizio è richiedibile per un minimo di ${qtMinimaUnita} ${tl_testo_sostantivo[locale]}.`}
              />
            </strong>
          </Row>
        </>
      )
        : null}
    </>
  );
};

PrezzoGruppi.displayName = 'PrezzoGruppi';

export default PrezzoGruppi;
