
import React, { memo } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import OrderSectionHeader from '../../Layout/SectionHeader';
import SummaryInfoRow from '../SummaryInfoRow/SummaryInfoRow';
import { entityType as orderEntityTypes } from '../../../context/ServiceOrderContext';

/**
 * The billing summary.
 */
const BillingSummary = ({
  billingInfo,
  entityType,
}) => (
    <Row padding="0 0 3em 0">
      <Column xs={12} padding="0 0 1em 0">
        <OrderSectionHeader
          title="I tuoi dati"
          description="Controlla che i dati inseriti siano correti"
        />
      </Column>

      <Column xs={12} padding="1em 0 0 0">
        {billingInfo.businessName ?
          <>
            <SummaryInfoRow
              label="Intestato a:"
              text={`${billingInfo.businessName}`}
            />
            <Text
              value={`${billingInfo.name || ''} ${billingInfo.surname || ''}`}
              size="f7"
              weight="bold"
            />
          </>
          :
          <SummaryInfoRow
            label="Intestato a:"
            text={`${billingInfo.name || ''} ${billingInfo.surname || ''}`}
          />
        }
        <SummaryInfoRow
          label="Residente in:"
          text={`${billingInfo.address || ''} - ${billingInfo.region || ''} (${billingInfo.province || ''}) - ${billingInfo.postalCode || ''}`}
        />
        <SummaryInfoRow
          label="Codice fiscale / partita iva:"
          text={entityType === orderEntityTypes.CITIZEN ?
            billingInfo.fiscalCode :
            billingInfo.vatNumber
          }
        />
        <SummaryInfoRow
          label="Telefono:"
          text={billingInfo.phoneNumber}
          padding="0 0 2em 0"
        />
        <Row padding="0">
          <Text
            value="Note in fattura:"
            size="f7"
            tag="div"
            width="100%"
          />
          <Text
            whitespace="pre-wrap"
            wordBreak="break-word"
            value={billingInfo.notes || ''}
            size="f7"
            weight="bold"
            tag="div"
            width="100%"
          />
        </Row>
      </Column>
    </Row>
  );

BillingSummary.displayName = 'BillingSummary';

export default memo(BillingSummary);
