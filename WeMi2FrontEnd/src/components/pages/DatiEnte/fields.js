import React from 'react';
import Input from 'components/ui2/Input';
import { Column, Row } from 'components/ui/Grid';
import Select from 'components/ui2/Select';
import InputNumber from 'components/ui2/InputNumber';
import Button from 'components/ui2/Button';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import Text from 'components/ui/Text';
import { STRING_MAX_VALIDATION } from 'libs/Form/errors';

const addArrayItem = (item, items = []) => {
  const itemsSliced = items.slice();
  itemsSliced.push(item);
  return itemsSliced;
};

const removeArrayItem = (item, items = []) => {
  const itemsSliced = items.slice();
  const newItems = itemsSliced.filter(itemToFilter => item.id !== itemToFilter.id);
  return newItems;
};

const FormDatiIdentificaviEnte = ({
  listaSpaziWeMi = [],
  listaCategorieAccreditamento = [],
  listaStati = [],
  onConfirm,
  onDeny,
}) => {
  const { dataset, handleFieldBlur, setFormField, errors, touched, isFormValid } = useFormContext();

  const addSpazioWeMi = React.useCallback((item) => {
    const newSpaziWeMi = addArrayItem(item, dataset.spaziWeMi);
    setFormField('spaziWeMi', newSpaziWeMi);
  });

  const removeSpazioWeMi = React.useCallback((item) => {
    const spaziWeMiFiltrati = removeArrayItem(item, dataset.spaziWeMi);
    setFormField('spaziWeMi', spaziWeMiFiltrati);
  });

  const addCategoriaAccreditata = React.useCallback((item) => {
    const newCategorieAccreditate = addArrayItem(item, dataset.categorieAccreditate);
    setFormField('categorieAccreditate', newCategorieAccreditate);
  });

  const removeCategoriaAccreditata = React.useCallback((item) => {
    const newCategorieAccreditate = removeArrayItem(item, dataset.categorieAccreditate);
    setFormField('categorieAccreditate', newCategorieAccreditate);
  });

  return (
    <div>
      <Row>
        <Column xs="12" md="6">
          <Input
            label="Nome Chiave Ente"
            inputValue={dataset.nomeEnte}
            onChange={(value) => setFormField('nomeEnte', value)}
            onBlur={() => handleFieldBlur('nomeEnte')}
            error={touched.nomeEnte && errors.nomeEnte ? errors.nomeEnte : undefined}
            required
          />
        </Column>
        <Column xs="12" md="6">
          <Input
            label="Email Amministratore Ente"
            inputValue={dataset.emailEnte}
            onChange={(value) => setFormField('emailEnte', value)}
            onBlur={() => handleFieldBlur('emailEnte')}
            error={touched.emailEnte && errors.emailEnte ? errors.emailEnte : undefined}
            required
          />
        </Column>
      </Row>
      <Row>
        <Column xs="12">
          <Input
            label="PARTITA IVA / CF"
            maxLength={11}
            inputValue={dataset.partitaIva}
            onChange={(value) => setFormField('partitaIva', value)}
            onBlur={() => handleFieldBlur('partitaIva')}
            error={touched.partitaIva && errors.partitaIva ? errors.partitaIva : undefined}
            required
          />
        </Column>
      </Row>
      <Row>
        <Column xs="12">
          <Input
            label="Nome completo di ragione sociale"
            inputValue={dataset.ragioneSociale}
            onChange={(value) => setFormField('ragioneSociale', value)}
            maxLength={STRING_MAX_VALIDATION.value}
            onBlur={() => handleFieldBlur('ragioneSociale')}
            error={touched.ragioneSociale && errors.ragioneSociale ? errors.ragioneSociale : undefined}
            required
          />
        </Column>
      </Row>
      <Row>
        <Column xs="12">
          <Select
            multi
            enableSearch
            label="Spazi WeMi Gestiti"
            name="spaziWemiGestiti"
            items={listaSpaziWeMi}
            selectedValue={dataset.spaziWeMi}
            clickedItem={(item) => addSpazioWeMi(item)}
            clickedSelectedItem={(item) => removeSpazioWeMi(item)}
          />
        </Column>
      </Row>
      <Row alignitems="flex-end">
        <Column xs="12" lg="6">
          <Select
            enableSearch
            items={listaStati}
            selectedValue={dataset.stato}
            clickedItem={(item) => setFormField('stato', item)}
            clickedSelectedItem={() => setFormField('stato')}
            onBlur={() => handleFieldBlur('stato')}
            label="Stato"
            name="Stato"
            required
            placeholder="Stato"
            error={touched.stato && errors['stato.id'] ? errors['stato.id'] : undefined}
          />
        </Column>
        <Column xs="12" lg="6">
          <Text
            tag="h3"
            value="Operatori servizi WeMi"
            color="black"
            transform="uppercase"
            letterSpacing="0.05em"
            weight="bold"
            size="f6"
          />
          <Row alignitems="center" padding="0.25rem 0">
            <InputNumber
              ariaLabel="Operatori servizi WeMi"
              min={0}
              label="Operatori servizi WeMi"
              value={Number.parseInt(dataset.operatoriServiziWeMi, 10) || 0}
              onChange={(value) => setFormField('operatoriServiziWeMi', value)}
              onInputChange={(value) => setFormField('operatoriServiziWeMi', value)}
            />
            <Text
              value="Operatori"
            />
          </Row>
        </Column>
      </Row>
      <Row>
        <Column xs="12">
          <Select
            multi
            enableSearch
            label="Categorie accreditate"
            items={listaCategorieAccreditamento}
            selectedValue={dataset.categorieAccreditate}
            clickedItem={(item) => addCategoriaAccreditata(item)}
            clickedSelectedItem={(item) => removeCategoriaAccreditata(item)}
            name="catergorieAccreditateSelect"
          />
        </Column>
      </Row>
      <Row justifycontent="space-around">
        <Column xs="12" md="3">
          <Button
            label="Annulla"
            size="f7"
            color="red"
            onClick={() => onDeny(dataset)}
          />
        </Column>
        <Column xs="12" md="3">
          <Button
            onClick={() => onConfirm(dataset)}
            label="Conferma"
            size="f7"
            color="primary"
            disabled={!isFormValid}
          />
        </Column>
      </Row>
    </div>
  );
};

FormDatiIdentificaviEnte.displayName = 'FormDatiIdentificativiEnte';


export default FormDatiIdentificaviEnte;
