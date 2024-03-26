/** @format */

import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import { colors } from 'theme';
import { WINDOW_SIZE } from 'types/windowSize';
import useWindowSize from 'hooks/useWindowSize';
import TransactionSectionMobile from './TransactionSectionPartials/TransactionSectionMobile';
import TransactionSectionDesktop from './TransactionSectionPartials/TransactionSectionDesktop';

export const StyledRow = styled(Row)`
  border-bottom: 2px solid ${colors.grey};
  `;

export const RightRow = styled(Row)`
  justify-content: flex-end;
  `;


// eslint-disable-next-line react/display-name
const TransactionSection = React.memo(({
  transactionDetails,
}) => {
  let i = 0;
  const rowColor = () => {
    let color;
    if (i % 2 !== 0) {
      color = { backgroundColor: colors.greyInput };
    }
    i += 1;
    return color;
  };

  const windowSize = useWindowSize();

  const isDesktop = [...WINDOW_SIZE.windowSizesMedium, ...WINDOW_SIZE.windowSizesSmall].indexOf(windowSize) === -1;

  return (
    <React.Fragment>
      <Row fluid padding="0">
        <Column xs="12" padding="0 0 1em 0">
          {transactionDetails?.map((transazione) => (
            <div key={transazione.idTransazioneVoucher} style={rowColor()} padding="0" margin="0">
              <StyledRow
                padding="0"
                margin="0"
                justifycontent="space-between"
                flex
                alignitems="center"
              >
                { isDesktop ? (
                  <TransactionSectionDesktop transazione={transazione} />
                ) : (
                  <TransactionSectionMobile transazione={transazione} />
                )}
              </StyledRow>
            </div>
          ))}
        </Column>
      </Row>
    </React.Fragment>
  );
});


TransactionSection.displayName = 'TransactionSection';

export default TransactionSection;
