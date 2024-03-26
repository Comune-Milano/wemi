import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Input from 'components/ui2/Input';
import DatePicker from 'components/ui2/DatePicker';
import moment from 'moment';
import Button from 'components/ui2/Button';
import Select from 'components/ui2/Select';
import Checkbox from 'components/ui2/Checkbox';

// eslint-disable-next-line react/display-name
const VouchersFilteringSortingSection = React.memo(({
  dataset,
  statiVoucher,
  setFormField,
  isFormValid,
  onSearchSubmit, // on click filter
  errors,
  creaItems,
}) => (
  <React.Fragment>
    <Row fluid>
      <Column md="3" sm="6" padding="0 0.5em 0 1em" order={{ md: 1, sm: 1 }}>
        <Text
          tag="strong"
          size="f6"
          weight="bold"
          transform="uppercase"
          letterSpacing="0.05em"
          value="Filtra per:"
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 3, sm: 3 }}>
        <Input
          material
          label="Codice Voucher"
          name="codiceFiltro"
          onChange={(value) => setFormField('cod', value)}
          inputValue={dataset.cod}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 5, sm: 5 }}>
        <Input
          material
          label="CF intestatario"
          name="cfIntestatarioFiltro"
          onChange={(value) => setFormField('cfInt', value)}
          inputValue={dataset.cfInt}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 6, sm: 6 }}>
        <Input
          material
          label="CF minore"
          name="cfMinoreFiltro"
          onChange={(value) => setFormField('cfMin', value)}
          inputValue={dataset.cfMin}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 4, sm: 4 }}>
        <Select
          name="1"
          label="Stato voucher"
          items={statiVoucher ? creaItems(statiVoucher) : []}
          selectedValue={dataset.state}
          clickedSelectedItem={() => {
            setFormField('state', undefined);
          }}
          clickedItem={(value) => {
            setFormField('state', value);
          }}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 7, sm: 7 }}>
        <DatePicker
          label="Inizio validità"
          fromYear={2020}
          selectedDate={dataset.inizioValidita ? moment(dataset.inizioValidita).format('DD/MM/YYYY') : undefined}
          disabledDays={(date) => dataset.fineValidita ? date > dataset.fineValidita : false}
          onChange={(date) => { setFormField('inizioValidita', date || undefined); }}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 8, sm: 8 }}>
        <DatePicker
          label="Fine validità"
          fromYear={2020}
          selectedDate={dataset.fineValidita ? moment(dataset.fineValidita).format('DD/MM/YYYY') : undefined}
          disabledDays={(date) => dataset.inizioValidita ? date < dataset.inizioValidita : false}
          onChange={(date) => { setFormField('fineValidita', date || undefined); }}
          error={errors?.fineValidita}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 2, sm: 2 }}>
        <Input
          material
          label="Riferimento bando di gara"
          name="bandoFiltro"
          onChange={(value) => setFormField('bando', value)}
          inputValue={dataset.bando}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 9, sm: 9 }}>
        <Input
          material
          type="number"
          label="Importo minimo residuo"
          name="minImportoFiltro"
          onChange={(value) => setFormField('minImporto', value)}
          inputValue={dataset.minImporto}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 10, sm: 10 }}>
        <Input
          material
          type="number"
          label="Importo massimo residuo"
          name="maxImportoFiltro"
          onChange={(value) => setFormField('maxImporto', value)}
          inputValue={dataset.maxImporto}
        />
      </Column>
      <Column md="6" sm="6" padding="1em 1em 0 1em" flex justifycontent="space-between" order={{ md: 11, sm: 11 }} alignitems="center">
        <Column lg="9" md="6" sm="6" padding="0.6em 0 0 0" sizepadding={{ lg: '0 1.5em 0 0' }}>
          <Checkbox
            label="VISUALIZZA SOLO VOUCHER NON UTILIZZATI"
            key="filter-checkbox"
            id="filter-checkbox"
            value={dataset.nonUtilizzato}
            onChange={(checked) => { setFormField('nonUtilizzato', checked); }}
            width="auto"
            fontSize="f6"
            checkColor="darkGrey"
          />
        </Column>
        <Column lg="3" md="3" sm="6" padding="0.6em 0 0 0" sizepadding={{ lg: '0 0 0 1.5em' }}>
          <Button
            type="submit"
            disabled={!isFormValid}
            width="100%"
            label="Cerca"
            color="primary"
            size="f7"
            onClick={() => onSearchSubmit(dataset)}
            padding="0.4em 1em"
          />
        </Column>
      </Column>
    </Row>
  </React.Fragment>
));

VouchersFilteringSortingSection.displayName = 'VoucherFilteringSortingSectionVoucherManagement';

export default VouchersFilteringSortingSection;
