/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';
import { LeftColumn, RightColumn } from './partials';

const StyledRow = styled(Row)`
    ${media.md`
        > div:first-child {
            border-right: 2px solid ${colors.grey};
        }
    `}
`;

const ServizioOffertoEnte = ({
  servizioErogato,
  locale,
  sectionsContentPrintWidth,
  withoutNomeServizio,
}) => (
  <StyledRow>
    <LeftColumn
      servizioErogato={servizioErogato}
      sectionsContentPrintWidth={sectionsContentPrintWidth}
      withoutNomeServizio={withoutNomeServizio}
    />
    <RightColumn
      servizioErogato={servizioErogato}
      locale={locale}
      sectionsContentPrintWidth={sectionsContentPrintWidth}
    />
  </StyledRow>
);

ServizioOffertoEnte.displayName = 'ServizioOffertoEnte';

export default ServizioOffertoEnte;
