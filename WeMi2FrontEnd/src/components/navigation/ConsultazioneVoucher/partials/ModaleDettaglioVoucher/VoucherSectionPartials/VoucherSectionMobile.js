/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import styled from 'styled-components';
import { colors } from 'theme';

export const StyledRow = styled(Row)`
  border-bottom: 2px solid ${colors.grey};
  padding: 0;
  `;

// eslint-disable-next-line react/display-name
const VoucherSectionMobile = React.memo(({
  voucherDetails,
}) => {
  return (
    <React.Fragment>
      <Row fluid padding="0">
        <Column xs="12" padding="1em 0 1em 0">
          <StyledRow>
            <Column xs="6" padding="0">
              <Text
                tag="strong"
                size="f8"
                weight="bold"
                transform="uppercase"
                letterSpacing="0.05em"
                value="cf assegnatario"
              />
            </Column>
            <Column xs="6" padding="0">
              <Text
                tag="strong"
                size="f8"
                weight="bold"
                color="primary"
                transform="uppercase"
                letterSpacing="0.05em"
                value={voucherDetails?.cfMinore}
              />
            </Column>
          </StyledRow>
        </Column>
        <Column xs="12" padding="0 0 1em 0">
          <StyledRow>
            <Column xs="6" padding="0">
              <Text
                tag="strong"
                size="f8"
                weight="bold"
                transform="uppercase"
                letterSpacing="0.05em"
                value="bando"
              />
            </Column>
            <Column xs="6" padding="0">
              <Text
                tag="strong"
                size="f8"
                weight="bold"
                color="primary"
                transform="uppercase"
                letterSpacing="0.05em"
                value={voucherDetails?.bando}
              />
            </Column>
          </StyledRow>
        </Column>
        <Column xs="12" padding="0 0 1em 0">
          <StyledRow>
            <Column xs="6" padding="0">
              <Text
                tag="strong"
                size="f8"
                weight="bold"
                transform="uppercase"
                letterSpacing="0.05em"
                value="data attivazione"
              />
            </Column>
            <Column xs="6" padding="0">
              <Text
                tag="strong"
                size="f8"
                weight="bold"
                color="primary"
                transform="uppercase"
                letterSpacing="0.05em"
                value={voucherDetails?.inizioValidita}
              />
            </Column>
          </StyledRow>
        </Column>
        <Column xs="12" padding="0 0 1em 0">
          <StyledRow>
            <Column xs="6" padding="0">
              <Text
                tag="strong"
                size="f8"
                weight="bold"
                transform="uppercase"
                letterSpacing="0.05em"
                value="data fine validità"
              />
            </Column>
            <Column xs="6" padding="0">
              <Text
                tag="strong"
                size="f8"
                weight="bold"
                color="primary"
                transform="uppercase"
                letterSpacing="0.05em"
                value={voucherDetails?.fineValidita}
              />
            </Column>
          </StyledRow>
        </Column>
        <Column xs="12" padding="0 0 1em 0">
          <StyledRow>
            <Column xs="6" padding="0">
              <Text
                tag="strong"
                size="f8"
                weight="bold"
                transform="uppercase"
                letterSpacing="0.05em"
                value="valore"
              />
            </Column>
            <Column xs="6" padding="0">
              <Text
                tag="strong"
                size="f8"
                weight="bold"
                color="primary"
                transform="uppercase"
                letterSpacing="0.05em"
                value={voucherDetails?.totalImport}
              />
            </Column>
          </StyledRow>
        </Column>
        <Column xs="12" padding="0 0 1em 0">
          <StyledRow>
            <Column xs="6" padding="0">
              <Text
                tag="strong"
                size="f8"
                weight="bold"
                transform="uppercase"
                letterSpacing="0.05em"
                value="residuo"
              />
            </Column>
            <Column xs="6" padding="0">
              <Text
                tag="strong"
                size="f8"
                weight="bold"
                color="primary"
                transform="uppercase"
                letterSpacing="0.05em"
                value={voucherDetails?.remainingImport}
              />
            </Column>
          </StyledRow>
        </Column>
      </Row>
    </React.Fragment>
  );
});

VoucherSectionMobile.displayName = 'VoucherSectionMobile';

export default VoucherSectionMobile;
