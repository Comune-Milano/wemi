import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Input from 'components/ui2/Input';
import DatePicker from 'components/ui2/DatePicker';
import moment from 'moment';
import Button from 'components/ui2/Button';
import Select from 'components/ui2/Select';

// eslint-disable-next-line react/display-name
const VouchersFilteringSortingSection = React.memo(({
  dataset,
  statiTransazioni,
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
          name="codiceVoucherFiltro"
          onChange={(value) => setFormField('codiceVoucher', value)}
          inputValue={dataset.codiceVoucher}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 5, sm: 5 }}>
        <Input
          material
          label="CF intestatario"
          name="cfIntestatarioFiltro"
          onChange={(value) => setFormField('cfIntestatario', value)}
          inputValue={dataset.cfIntestatario}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 6, sm: 6 }}>
        <Input
          material
          label="CF minore"
          name="cfMinoreFiltro"
          onChange={(value) => setFormField('cfMinore', value)}
          inputValue={dataset.cfMinore}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 4, sm: 4 }}>
        <Select
          label="Stato Transazione"
          items={statiTransazioni ? creaItems(statiTransazioni) : []}
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
          label="Data transazione Dal"
          fromYear={2020}
          selectedDate={dataset.dataTransazioneDa ? moment(dataset.dataTransazioneDa).format('DD/MM/YYYY') : undefined}
          disabledDays={(date) => dataset.dataTransazioneA ? date > dataset.dataTransazioneA : false}
          onChange={(date) => { setFormField('dataTransazioneDa', date || undefined); }}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 8, sm: 8 }}>
        <DatePicker
          label="Data transazione Al"
          fromYear={2020}
          selectedDate={dataset.dataTransazioneA ? moment(dataset.dataTransazioneA).format('DD/MM/YYYY') : undefined}
          disabledDays={(date) => dataset.dataTransazioneDa ? date < dataset.dataTransazioneDa : false}
          onChange={(date) => { setFormField('dataTransazioneA', date || undefined); }}
          error={errors?.dataTransazioneA}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 9, sm: 9 }}>
        <DatePicker
          label="Data contabilizzazione Dal"
          fromYear={2020}
          selectedDate={dataset.dataContabilizzazioneDa ? moment(dataset.dataContabilizzazioneDa).format('DD/MM/YYYY') : undefined}
          disabledDays={(date) => dataset.dataContabilizzazioneA ? date > dataset.dataContabilizzazioneA : false}
          onChange={(date) => { setFormField('dataContabilizzazioneDa', date || undefined); }}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 10, sm: 10 }}>
        <DatePicker
          label="Data contabilizzazione Al"
          fromYear={2020}
          selectedDate={dataset.dataContabilizzazioneA ? moment(dataset.dataContabilizzazioneA).format('DD/MM/YYYY') : undefined}
          disabledDays={(date) => dataset.dataContabilizzazioneDa ? date < dataset.dataContabilizzazioneDa : false}
          onChange={(date) => { setFormField('dataContabilizzazioneA', date || undefined); }}
          error={errors?.dataContabilizzazioneA}
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
      <Column md="3" sm="6" padding="1em" order={{ md: 11, sm: 11 }}>
        <Input
          material
          type="number"
          label="Importo transazione minimo"
          name="importoTransazioneMinFiltro"
          onChange={(value) => setFormField('importoTransazioneMin', value)}
          inputValue={dataset.importoTransazioneMin}
        />
      </Column>
      <Column md="3" sm="6" padding="1em" order={{ md: 12, sm: 12 }}>
        <Input
          material
          type="number"
          label="Importo transazione massimo"
          name="importoTransazioneMaxFiltro"
          onChange={(value) => setFormField('importoTransazioneMax', value)}
          inputValue={dataset.importoTransazioneMax}
        />
      </Column>
      <Column padding="1.4em 1em 0.4em 0" flex justifycontent="flex-end" order={{ md: 13, sm: 13 }}>
        <Column lg="3" md="3" sm="6" padding="0" sizepadding={{ lg: '0 0 0 1.5em' }}>
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
