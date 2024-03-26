
import React, { memo } from 'react';
import { Row, Column } from 'components/ui/Grid';
import {
  ColumnLeftSection,
  ColumnRightSection,
} from './MainLayout.style';
import ServiceInfo from '../ServiceInfo';
import CancelOrderButton from '../Buttons/CancelOrder';

/**
 * The layout of the Order page.
 */
const OrderMainLayout = ({
  leftContent,
  confirmationButton,
  buttonsUpperContent,
  otherPaymentSelected,
  creditCardOrPaypalSelected,
  dataset,
  infoRichiestaEnte,
}) => (
  <Row fluid>
    <ColumnLeftSection xs={12} lg={8}>
      {leftContent}
    </ColumnLeftSection>
    <ColumnRightSection xs={12} lg={4}>
      <ServiceInfo
        infoRichiestaEnte={infoRichiestaEnte}
        dataset={dataset}
        creditCardOrPaypalSelected={creditCardOrPaypalSelected}
        otherPaymentSelected={otherPaymentSelected}
      />
      <Row padding="2em 0">
        <Column padding="0">
          {buttonsUpperContent}
        </Column>
      </Row>
      <Row>
        <Column
          xs={12}
          md={6}
          lg={12}
          padding="0 0 1em 0"
          sizepadding={{ md: '0 0 1em 0' }}
        >
          {confirmationButton}
        </Column>
        <Column padding="0" margin="0" md="6" />
        <Column
          xs={12}
          md={6}
          lg={12}
          padding="0"
        >
          <CancelOrderButton />
        </Column>
        <Column padding="0" margin="0" md="6" />
      </Row>
    </ColumnRightSection>
  </Row>
);

OrderMainLayout.displayName = 'OrderMainLayout';

export default memo(OrderMainLayout);
