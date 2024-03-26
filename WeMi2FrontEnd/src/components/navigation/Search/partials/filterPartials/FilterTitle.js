import React from 'react';
import { colors } from 'theme';
import { Row } from 'components/ui/Grid';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import { SearchFiltersJson } from 'mocks/SearchServiceJson';

const SectionTitle = styled(Row)`
  min-height: 3.2em;
  border-bottom: 2px solid ${colors.darkGrey};
  margin-bottom: 1.3rem;
  padding-bottom: 2.3rem;
`;

const FilterTitle = () => {
  return (
    <>
      <SectionTitle fluid alignitems="center">
        <Text
          weight="bold"
          tag="h2"
          value={SearchFiltersJson.title}
          intlFormatter
          transform="uppercase"
          letterSpacing="0.05em"
          color="black"
          size="f6"
        />
      </SectionTitle>
    </>
  );
};

FilterTitle.displayName = '';

export default FilterTitle;
