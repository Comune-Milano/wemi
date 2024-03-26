import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Input from 'components/ui2/Input';
import Select from 'components/ui2/Select';
import DatePicker from 'components/ui2/DatePicker';
import moment from 'moment';
import Button from 'components/ui2/Button';

const UsersFilteringSortingSection = React.memo(({
  dataset,
  setFormField,
  profileCodesItems = [],
  sortingCriteria = [],
  isFormValid,
  isFormDirty,
  onSearchSubmit, // on click filter 
  onSortingSubmit, // on click order 
  errors
}) => {
 
  const onChangeSorting = (data = { id: undefined, value: '' }) => {
    setFormField('ordinamento', data);
    onSortingSubmit(data);
  };

  return (
    <React.Fragment>
      <Row fluid>
        <Column md="3" sm="12" padding="2em 0.5em 1em 1em">
          <Text
            tag='strong'
            size='f6'
            weight='bold'
            transform='uppercase'
            letterSpacing="0.05em"
            value='Filtra per:'
            letterSpacing="0.05em"
          />
        </Column>
        <Column md="3" sm="6" padding="1em">
          <Input
            material
            label="Nome"
            name="nomeFiltro"
            onChange={(value) => setFormField('nome', value)}
            inputValue={dataset.nome}
          />
        </Column>
        <Column md="3" sm="6" padding="1em">
          <Input
            material
            label="Cognome"
            name="cognomeFiltro"
            onChange={(value) => setFormField('cognome', value)}
            inputValue={dataset.cognome}
          />
        </Column>
        <Column md="3" sm="6" padding="1em">
          <Input
            material
            label="Username"
            name="usernameFiltro"
            onChange={(value) => setFormField('username', value)}
            inputValue={dataset.username}
          />
        </Column>
        <Column md="3" sm="6" padding="1em">
          <Input
            material
            label="E-mail"
            name="emailFiltro"
            onChange={(value) => setFormField('email', value)}
            inputValue={dataset.email}
          />
        </Column>
        <Column md="3" sm="6" padding="1em" >
          <Select
            name='profiloFiltro'
            label='Profilo'
            items={profileCodesItems}
            clickedSelectedItem={() => { setFormField('codiceProfilo', { id: undefined, value: 'Tutti i profili' }) }}
            clickedItem={(data) => { setFormField('codiceProfilo', data) }}
            removedItem={() => { setFormField('codiceProfilo', { id: undefined, value: 'Tutti gli stati' }) }}
            selectedValue={dataset.codiceProfilo}
          />
        </Column>
        <Column md="3" sm="6" padding="1em">
          <DatePicker
            label='Inizio validità'
            fromYear={2020}
            selectedDate={dataset.inizioValidita ? moment(dataset.inizioValidita).format('DD/MM/YYYY') : undefined}
            disabledDays={(date) => dataset.fineValidita ? date > dataset.fineValidita : false}
            onChange={(date) => { setFormField('inizioValidita', date || undefined) }}
          />
        </Column>
        <Column md="3" sm="6" padding="1em">
          <DatePicker
            label='Fine validità'
            fromYear={2020}
            selectedDate={dataset.fineValidita ? moment(dataset.fineValidita).format('DD/MM/YYYY') : undefined}
            disabledDays={(date) => dataset.inizioValidita ? date < dataset.inizioValidita : false}
            onChange={(date) => { setFormField('fineValidita', date || undefined) }}
            error={errors?.fineValidita}
          />
        </Column>
        <Column padding="2em 1em 1em 1em" flex justifycontent="flex-end" >
          <Column lg="3" md="3" sm="6" padding="0" sizepadding={{ lg: "0 0 0 1.5em" }}>
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
      <Row fluid >
        <Column md="3" sm="6" padding="1em">
          <Select
            name='criteriOrdinamento'
            label='Criteri ordinamento'
            items={sortingCriteria}
            clickedSelectedItem={() => { onChangeSorting({ id: undefined, value: '' }) }}
            clickedItem={(data) => { onChangeSorting(data) }}
            removedItem={() => { onChangeSorting({ id: undefined, value: '' }) }}
            selectedValue={dataset.ordinamento}
          />
        </Column>
      </Row>
    </React.Fragment>
  )
});

UsersFilteringSortingSection.displayName = 'UsersFilteringSortingSectionUsersManagement';

export default UsersFilteringSortingSection;