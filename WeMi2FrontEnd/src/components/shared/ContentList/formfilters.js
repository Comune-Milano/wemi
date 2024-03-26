import React from 'react';
import { Column, Row } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import { DescriptionInput } from './descriptioninput';
import { CodeInput } from './codeinput';
import { StatesSelect } from './selectstate';
import { SortSelect } from './selectsort';

const Div = styled.div`
  padding: 1rem;
`;

export const FormFilters = ({ onSort, filters = {}, codeLabel = '' }) => {
  const { dataset, setFormField } = useFormContext();
  return (
    <>
      <Row fluid margin="1em 0" justifycontent="flex-start" display="flex" alignitems="flex-end">
        <Div>
          <Text
            value="FILTRA PER:"
            weight="bold"
            color="black"
            size="f6"
            letterSpacing="0.05em"
          />
        </Div>
        <Column xs="12" lg="3" lgShift={!filters.code ? '1' : '0'} padding="0" sizepadding={{ xs: '1rem 0', lg: '1rem 1rem 0 0' }}>
          <DescriptionInput
            inputValue={dataset.description}
            handleChange={(value) => {
              setFormField('description', value);
            }}
          />
        </Column>
        {filters.code ? (
          <Column xs="12" lg="3" padding="0" sizepadding={{ xs: '1rem 0', lg: '1rem 1rem 0 1rem' }}>
            <CodeInput
              label={codeLabel || `Codice ${filters.code.name || ''}`}
              inputValue={dataset.code}
              handleChange={(value) => {
                setFormField('code', value);
              }}
            />
          </Column>
        )
           : <></>}

        <Column xs="12" lg={filters.code ? '2' : '3'} padding="0" sizepadding={{ xs: '1rem 0', lg: '1rem 1rem 0 1rem' }}>
          <StatesSelect
            selectedValue={dataset.state}
            handleSelected={(value) => {
              setFormField('state', value);
            }}
          />
        </Column>
        <Column xs="12" lg={filters.code ? '2' : '3'} padding="0" sizepadding={{ xs: '1rem 0', lg: '1rem 0 0 1rem' }}>
          <Button
            type="submit"
            name="cerca"
            label="Cerca"
            ariaLabel="Filtra"
          />
        </Column>
      </Row>
      <Row fluid margin="1em 0" justifycontent="flex-start" display="flex" alignitems="flex-end">
        <Column xs="12" lg="2" padding="0" sizepadding={{ xs: '1rem 0', lg: '1rem 1rem 0 1rem' }}>
          <SortSelect
            selectedValue={dataset.order}
            handleSelected={async (value) => {
              await setFormField('order', value);
              onSort({ ...dataset, order: value });
            }}
          />
        </Column>
      </Row>
    </>
  );
};

FormFilters.displayName = 'Form Filters Component';
