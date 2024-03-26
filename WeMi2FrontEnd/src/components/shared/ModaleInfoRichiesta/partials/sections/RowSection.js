/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { colors } from 'theme';
import styled from 'styled-components';

const WrapperTextBreak = styled.div`
  word-break: break-word;
`;

const RowSection = ({ label, value, newLine }) => {
  if (value === null) {
    return null;
  }

  return (
    <Row fluid margin="0 0 1em 0">
      {
        label ? (
          <Text
            whitespace="pre"
            value={`${label}: `}
            size="f7"
            color={colors.grey}
            tag="p"
          />
        )
          : null
      }
      {newLine ? (
        <Row fluid>
          <WrapperTextBreak>
            <Text
              whitespace="pre-line"
              value={value}
              size="f7"
              color={colors.darkGrey}
              tag="h3"
              weight="bold"
            />
          </WrapperTextBreak>
        </Row>
      ) : (
        <WrapperTextBreak>
          <Text
            whitespace="pre-line"
            value={value}
            size="f7"
            color={colors.darkGrey}
            tag="h3"
            weight="bold"
          />
        </WrapperTextBreak>
        )}
    </Row>
  );
};

RowSection.displayName = 'RowSection';
export default RowSection;
