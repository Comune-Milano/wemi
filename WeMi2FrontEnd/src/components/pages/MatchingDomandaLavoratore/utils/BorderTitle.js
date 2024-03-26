/** @format */
import React from 'react';
import styled from 'styled-components';
import { colors } from 'theme';
import Text from 'components/ui/Text';

const BorderTitleStyled = styled.div`
  background-color: transparent;
  border: 1px solid ${(props) => colors[props.color]};
  padding: 1em; 
  position: relative;
  margin: ${(props) => props.margin};
`;
BorderTitleStyled.displayName = 'BorderTitleStyled';

const BorderTitle = ({
  children,
  textValue,
  color,
  margin,
}) => (
  <BorderTitleStyled color={color} margin={margin}>
    {children}
    <Text
      value={textValue}
      color={color}
      tag="div"
      style={{
        position: 'absolute',
        top: '-12px',
        background: 'white',
        padding: '0.1em 0.2em',
        color: 'rgb(0, 153, 168)',
      }}
    />
  </BorderTitleStyled>
  );

BorderTitle.displayName = 'Titolo con bordo';

export default BorderTitle;
