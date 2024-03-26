/** @format */

import React from 'react';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import styled, { css } from 'styled-components';
import { colors, fonts } from 'theme';
import Text from 'components/ui/Text';
import { PrezzoBase, PrezzoGruppi, LimitazioniGratuito } from './costPartials';
import WrapperText from '../WrapperText';

const StyledWrapper = styled.div`
  font-size: ${fonts.size.f7};
  color: ${colors.black};
  box-sizing: border-box;
  padding: 0;
  /* margin: 0.5em 0 0; */
  width: 100%;
  margin: 1.2em 0px 0px;
  p.notes {
    > span {
      padding: 0.2em 0;
      display: block;
    }
  }

  ${props => props.inModal &&
    css`
      padding: 1em;
      margin: 0;
      p.notes {
        margin-bottom: 2.5em;
        > span {
          padding: 0;
          display: inline;
        }
      }
    `
  }
`;

const Cost = ({ servizioErogato, locale, inModal }) => {
  const jsonDatiPrezzo = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.js_dati_prezzo', false);
  const servizio = getObjectValue(servizioErogato, 'EstraiDettaglioAmministrativoServizioEnte.service', false);
  const unitaPrezzo = servizio.prezzo;
  const { cdTipoOffertaServizio } = jsonDatiPrezzo;
  const txNoteAlPrezzo = (jsonDatiPrezzo.txNoteAlPrezzo || '').trim();

  return (
    <StyledWrapper inModal={inModal}>
      {cdTipoOffertaServizio === 3 ?
        <PrezzoGruppi jsonDatiPrezzo={jsonDatiPrezzo} unitaPrezzo={unitaPrezzo} locale={locale} inModal={inModal} />
        :
        cdTipoOffertaServizio === 1 || cdTipoOffertaServizio === 2 ?
          <LimitazioniGratuito jsonDatiPrezzo={jsonDatiPrezzo} unitaPrezzo={unitaPrezzo} locale={locale} inModal={inModal} />
          : null
      }
      {txNoteAlPrezzo && (
        <p className="notes">
          <Text tag="strong" weight="bold" value="Note: " />
          <WrapperText>
            <Text tag="span" value={txNoteAlPrezzo} whitespace="pre-line" />
          </WrapperText>
        </p>
      )}
      <PrezzoBase cdTipoOffertaServizio={cdTipoOffertaServizio} jsonDatiPrezzo={jsonDatiPrezzo} unitaPrezzo={unitaPrezzo} locale={locale} inModal={inModal} />
    </StyledWrapper>
  );
};

Cost.displayName = 'Cost';

export default Cost;
