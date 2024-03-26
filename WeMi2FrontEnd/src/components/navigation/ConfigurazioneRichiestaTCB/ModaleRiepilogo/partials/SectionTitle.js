/** @format */

import React, { useState } from 'react';
import Text from 'components/ui/Text';
import styled from "styled-components";
import media from 'utils/media-queries';
import { fonts, colors } from 'theme';

const StyledTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.marginTop ? props.marginTop : '2em'};
  margin-bottom: 0;
  border-bottom: 2px solid ${colors.primary};
`;

const SectionTitle = ({
  title,
  moveTo,
  marginTop
}) => (
    <StyledTitle
      marginTop={marginTop}>
      <Text
        tag="h3"
        value={title}
        weight="bold"
        transform="uppercase"
        letterSpacing="0.05em"
        color="primary"
      />
      {moveTo !== null && moveTo !== undefined &&
        <div
          className="noPrint"
          role="button"
          tabIndex="1"
          onClick={() => moveTo()}
          style={{ textDecoration: 'underline', margin: '.15em 0 .15em 2em', cursor: 'pointer', outline: 'none' }}
        >
          <Text
            tag="span"
            value="Modifica"
            size="f8"
            color="black"
          />
        </div>
      }
    </StyledTitle>
  );

SectionTitle.displayName = 'SectionTitle';

export default SectionTitle;