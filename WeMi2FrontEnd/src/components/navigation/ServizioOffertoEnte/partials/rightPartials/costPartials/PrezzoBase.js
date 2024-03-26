/** @format */

import React from 'react';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';
import Text from 'components/ui/Text';
import moment from 'moment';

const StyledList = styled.ul`
  box-sizing: border-box;
  padding: ${props => props.inModal ? '1em' : '0'} 0;
  margin: 1em 0 0 0;
  width: 100%;

  > li {
    padding: 0;
    clear: both;
    vertical-align: middle;
    white-space: nowrap;
    font-size: ${fonts.size.f7};
    display: flex;
    justify-content: space-between;
    strong.title {
      font-weight: 700;
      display: block;
      vertical-align: middle;
    }
  }
  .financing {
    display: block;
    vertical-align: middle;
    /* padding: 0.2em 0; */
  }

    ${props => props.inModal &&
    css`
    > li {
      border-bottom: 2px solid ${colors.primary};
      color: ${colors.primary};
      display: flex;
      flex-wrap: no-wrap;
      justify-content: space-between;
      align-items: center;
      strong.title {
        text-transform: uppercase;
      }
    }
      .financing {
        /* padding: 0.2em 0; */
        color: ${colors.primary};
        font-size: ${fonts.size.f7};
        font-weight: bold;
        text-transform: uppercase;
      }

      `
  }

`;

const PrezzoBase = ({ jsonDatiPrezzo, unitaPrezzo, locale, inModal }) => {
  const { cdTipoOffertaServizio } = jsonDatiPrezzo;
  const { txTitoloFinanziamento } = jsonDatiPrezzo;
  const TESTO_VALIDITA_FINE = jsonDatiPrezzo.dataFine ? `Offerta valida fino al ${moment(jsonDatiPrezzo.dataFine).format('DD/MM/YYYY')}` : undefined;

  const setUnitaPrezzo = () => {
    if (cdTipoOffertaServizio === 3) {
      if (!inModal) {
        return '';
      } return `Prezzo ${unitaPrezzo.tl_testo_aggettivo[locale]}`;
    } return '';
  };

  const setTitle = () => {
    if (cdTipoOffertaServizio === 1 && txTitoloFinanziamento && txTitoloFinanziamento.trim()) {
      return `${txTitoloFinanziamento}`;
    } if (cdTipoOffertaServizio === 3) {
      return TESTO_VALIDITA_FINE;
    } return '';
  };

  return (
    <StyledList inModal={inModal}>
      <li>
        <strong className="title">
          <Text
            tag="span"
            value={setTitle()}
          />
        </strong>
        <strong className="title">
          <Text
            tag="span"
            value={setUnitaPrezzo()}
          />
        </strong>
      </li>
      {
        cdTipoOffertaServizio !== 3 && TESTO_VALIDITA_FINE ?
          (
            <Text
              className="financing"
              value={TESTO_VALIDITA_FINE}
            />
          )
          : null
      }
    </StyledList>
  );
};

PrezzoBase.displayName = 'PrezzoBase';

export default PrezzoBase;
