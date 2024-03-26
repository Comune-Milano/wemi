/** @format */
import React from 'react';
import styled, {css} from 'styled-components';
import media from 'utils/media-queries';
import {colors} from 'theme';
import Text from 'components/ui/Text';
import Loader from 'components/ui/Loader';

const StyledHeaderTitle = styled.div`
  background-color: ${props => colors[props.color]};
  padding: 1em;
  margin: 1em 0;
  border-radius: 50px;
  margin-right: 0;
  margin-left: auto;
  width: 100%;
  min-width: 3.5em;
  height: 3.5em;
  display: inline-flex;
  align-items: center;
  justify-content: ${props => props.step ? 'center' : 'flex-start'};
  transition: all .3s linear;
`;
StyledHeaderTitle.displayName = 'StyledHeaderTitle';

const HeaderTitle = ({ title, color, step, index, loading }) => (
  <StyledHeaderTitle color= {color} step={step}  >
    {index ? 
      <Text
        tag="span"
        value={index}
        intlFormatter
        size={"f7"}
        weight="bold"
        transform="uppercase"
        letterSpacing="0.05em"
        color="white"
        padding="0 2em 0 .5em"
      />  
  : null}
    <Text
      tag="h1"
      value={title}
      intlFormatter
      size={"f7"}
      weight="bold"
      transform="uppercase"
      letterSpacing="0.05em"
      color="white"
    />
  </StyledHeaderTitle>
);

HeaderTitle.displayName = 'HeaderTitle';

export default HeaderTitle;
