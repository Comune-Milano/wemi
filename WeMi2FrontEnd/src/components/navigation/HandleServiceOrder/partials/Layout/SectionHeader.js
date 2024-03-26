
import React, { memo } from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { colors } from 'theme';

const SectionHeaderRow = styled(Row)`
  border-bottom: 2px solid ${colors.darkGrey};
`;

const SectionHeader = ({
  title,
  description,
}) => (
  <SectionHeaderRow padding="0 0 6px 0">
    <Column xs={12} padding="0" margin="0">
      <Text
        value={title}
        size="f6"
        weight="bold"
        transform="uppercase"
        letterSpacing="0.05em"
        color="black"
      />
    </Column>
    {
      description ?
        (
          <Column xs={12} padding="0" margin="0">
            <Text
              value={description}
              size="f7"
            />
          </Column>
        ) : null
    }
  </SectionHeaderRow>
);

SectionHeader.displayName = 'SectionHeader';

export default memo(SectionHeader);
