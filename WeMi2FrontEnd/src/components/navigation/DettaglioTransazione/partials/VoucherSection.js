import React from 'react';
import { moneyFormat } from 'utils/formatters/moneyFormat';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Input from 'components/ui2/Input';
import { StyledColumn } from './styled';

// eslint-disable-next-line react/display-name
const VoucherSection = React.memo(({
  voucherDetails,
}) => (
  <React.Fragment>
    <Row fluid>
      <Column md="12" sm="12" padding="0 0.5em 1em 1em">
        <Text
          tag="strong"
          size="f6"
          weight="bold"
          color="primary"
          transform="uppercase"
          letterSpacing="0.05em"
          value="Dati del voucher"
        />
      </Column>
      <StyledColumn widthXl="25%" padding="1em">
        <Input
          material
          disabled
          label="Bando"
          name="bando"
          inputValue={voucherDetails?.bando}
        />
      </StyledColumn>
      <StyledColumn widthXl="25%" padding="1em">
        <Input
          material
          disabled
          label="Codice Voucher"
          name="codiceVoucher"
          inputValue={voucherDetails?.codiceVoucher}
        />
      </StyledColumn>
      <StyledColumn widthXl="16.66%" padding="1em">
        <Input
          material
          disabled
          label="Data acquisizione"
          name="dataAcquisizione"
          inputValue={voucherDetails?.dataAcquisizione}
        />
      </StyledColumn>
      <StyledColumn widthXl="16.66%" padding="1em">
        <Input
          material
          disabled
          label="Data scadenza"
          name="dataScadenza"
          inputValue={voucherDetails?.dataScadenza}
        />
      </StyledColumn>
      <StyledColumn widthXl="16.67%" padding="1em">
        <Input
          material
          disabled
          label="Importo (€)"
          name="importo"
          inputValue={voucherDetails?.importo ? moneyFormat(voucherDetails.importo, false) : ''}
        />
      </StyledColumn>
      <StyledColumn widthXl="25%" padding="1em">
        <Input
          material
          disabled
          label="CF intestatario"
          name="cfIntestatario"
          inputValue={voucherDetails?.cfIntestatario}
        />
      </StyledColumn>
      <StyledColumn widthXl="25%" padding="1em">
        <Input
          material
          disabled
          label="CF minore"
          name="cfMinore"
          inputValue={voucherDetails?.cfMinore}
        />
      </StyledColumn>
      <StyledColumn widthXl="33.33%" padding="1em">
        <Input
          material
          disabled
          label="E-MAIL CONTATTO"
          name="emailContatto"
          inputValue={voucherDetails?.emailContatto ? voucherDetails.emailContatto : ''}
        />
      </StyledColumn>
      <StyledColumn widthXl="16.67%" padding="1em">
        <Input
          material
          disabled
          label="CELL. CONTATTO"
          name="cellContatto"
          inputValue={voucherDetails?.cellContatto ? voucherDetails.cellContatto : ''}
        />
      </StyledColumn>
    </Row>
  </React.Fragment>
));

VoucherSection.displayName = 'VoucherSection';

export default VoucherSection;
