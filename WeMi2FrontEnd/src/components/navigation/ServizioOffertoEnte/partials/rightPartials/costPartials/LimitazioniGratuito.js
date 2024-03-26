/** @format */

import React from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';
import Text from 'components/ui/Text';
import moment from 'moment';
import { Row } from 'components/ui/Grid';


const StyledList = styled.ul`
  box-sizing: border-box;
  margin: 0;
  /* padding: 0 0 1em 0; */
  width: 100%;

  > li {
    clear: both;
    /* padding: 0.6em 0 0 0; */
    font-size: ${fonts.size.f7};

    strong.title {
      font-weight: 500;
      font-style: italic;
    }

    span.desc {
      &:before {
        content: "- ";
      }
      &:after {
        content: ": ";
      }
    }

    span.price {
      
    }

    ol {
      li {
        /* padding: 0.2em 0; */
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

      span.desc {
        &:before {
          content: "";
        }
        &:after {
          content: "";
        }
      }

      span.price {
        color: ${colors.primary};
        font-size: ${fonts.size.f7};
        font-weight: 700;
        font-variant: small-caps;
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

  const setTitle = () => {
    if ((cdTipoOffertaServizio === 1 && !txTitoloFinanziamento && !txTitoloFinanziamento.trim()) ||
      (cdTipoOffertaServizio === 2)) {
      return 'Servizio erogato a titolo gratuito';
    }
  };

  if (
    listinoPrezzi.length &&
    (
      listinoPrezzi.find(el => el.qtPersoneDa || el.qtPersoneA)
    )
  ) {
    return (
      <>
        <StyledList inModal={inModal}>
          {listinoPrezzi.map((off, i) => (
            <li key={`group${i}`}>
              {
                off.qtPersoneA > 1 ?
                  (
                    <Text 
                      tag="span"
                      weight="bold"
                      value={off.qtPersoneDa !== off.qtPersoneA ? `Servizio condiviso da ${off.qtPersoneDa} fino a ${off.qtPersoneA} persone` :
                        `Servizio condiviso da ${off.qtPersoneDa} persone`}
                    />
                  )
                  : off.qtPersoneA === 1 ? (
                    <Text   tag="span" value="Servizio individuale" weight="bold" />
                  )
                    : null}
              <ol>
                {off.offerta
                  .filter(off => off.qtUnitaA >= qtMinimaUnita || off.qtUnitaA === null)
                  .map((unita, j) => (
                    <>
                      <li key={`group${i}El${j}`}>
                        {(unita.qtUnitaA || unita.qtUnitaDa > 1) ? (
                          <>
                            <div className="desc">
                              <Text   tag="span" value="Gratuito da " />
                              <strong>{unita.qtUnitaDa > qtMinimaUnita ? unita.qtUnitaDa : qtMinimaUnita}</strong>
                              {unita.qtUnitaA ? (
                                <>
                                  <Text   tag="span" value=" a " />
                                  <strong>{unita.qtUnitaA}</strong>
                                  <Text   tag="span" value={` ${tl_testo_sostantivo[locale]}`} />
                                </>
                              )
                                : <Text   tag="span" value={` ${tl_testo_sostantivo[locale]}`} />
                              }
                            </div>
                          </>
                        )

                          : null
                        }
                      </li>
                    </>
                  ))}
              </ol>
            </li>
          ))}
        </StyledList>
      </>
    );
  }

  if (listinoPrezzi.length === 0) {
    return (
      <Row fluid margin="0 0 1em">
        <strong>
          <Text 
             
            tag="span"
            color="black"
            value={setTitle()}
          />
        </strong>
      </Row>
    );
  }

  if (qtMinimaUnita && qtMinimaUnita > 1) {
    return (
      <>
        <Row fluid margin="0 0 1em">
          <strong>
            <Text 
               
              tag="span"
              color="black"
              value={`Il servizio è erogabile per un minimo di ${qtMinimaUnita} ${tl_testo_sostantivo[locale]}.`}
            />
          </strong>
        </Row>
      </>
    );
  }
  return (
    <Row>
    </Row>
  );
};

PrezzoGruppi.displayName = 'PrezzoGruppi';

export default PrezzoGruppi;
