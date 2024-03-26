/** @format */

import React from 'react';
import Text from 'components/ui/Text';
import styled from "styled-components";
import { colors } from 'theme';

const StyledTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.marginTop ? props.marginTop : '3em'};
  border-bottom: 2px solid ${colors.primary};
`;

const Title = ({
  title,
  marginTop,
  onPatchStep,
  index
}) => (
  <StyledTitle marginTop={marginTop}>
    <Text
      tag="h3"
      value={title}
      weight="bold"
      transform="uppercase"
      letterSpacing="0.05em"
      color="primary"
    />
    {onPatchStep !== null && onPatchStep !== undefined && onPatchStep &&
      (
        <div
          className="noPrint"
          role="button"
          tabIndex="1"
          onClick={()=>onPatchStep(index)}
          style={{ textDecoration: 'underline', margin: '.15em 0 .15em 2em', cursor: 'pointer', outline: 'none' }}
        >
          <Text
            tag="span"
            value="Modifica"
            size="f8"
            color="black"
          />
        </div>
      )
    }
  </StyledTitle>
  );

Title.displayName = 'Title';

export default Title;
