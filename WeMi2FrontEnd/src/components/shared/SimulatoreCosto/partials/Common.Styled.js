import React from 'react';
import styled from 'styled-components';
import colors from 'theme/colors';
import media from 'utils/media-queries';
import { hexToRgba } from 'utils/functions/hexToRgba';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';

export const GroupContainer = styled.div`
  margin: 0 0 1.5em 0;
`;

export const PriceBanner = styled.div`
  background-color: ${hexToRgba(colors.primary, 0.15)};
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-start;

  > div {
    width: 50%;

    &:first-child {
      padding: 1em .5em 1em 1.5em;
    }
    &:last-child {
      padding: 1em 1.5em 1em .5em;
    }
  }

`;

const BorderRow = styled(Row)`
  border-bottom: 2px solid ${props => props.borderSolid ? colors.primary : colors.grey};
`;

export const BodyRow = ({
  title,
  description,
  detail,
  borderSolid,
  colorText = "black"
}) => {

  return (
    <BorderRow fluid alignitems="center" justifycontent="space-between" borderSolid={borderSolid}>
      <Column xs="12" md="10" padding="1em 0 0 0" sizepadding={{ md: "1em 1em 1em 0" }}>
        <Text
          tag="h4"
          value={title}
          transform="uppercase"
          letterSpacing="0.05em"
          weight="bold"
          size="f7"
          color={colorText}
        />
        <Text
          tag="p"
          value={description}
          size="f7"
          color="black"
        />
      </Column>
      <Column xs="12" md="2" padding=".5em 0 1em 0" sizepadding={{ md: "0" }}>
        <Text
          tag="p"
          value={`${detail}`}
          weight="bold"
          size="f7"
          color="black"
          align="right"
        />
      </Column>
    </BorderRow>
  );
}

BodyRow.displayName = 'Row simulatore costo';