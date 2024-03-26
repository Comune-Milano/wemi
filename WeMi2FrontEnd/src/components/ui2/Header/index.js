/** @format */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import media from 'utils/media-queries';
import breakpoints from 'utils/breakpoints';

const StyledHeaderTitle = styled.div`
  background-color: ${props => colors[props.color]};
  padding: 1em;
  margin: 1em 0 2em 0;
  border-radius: 50px;
  margin-right: 0;
  margin-left: auto;
  width: 100%;
  min-width: 3.5em;
  height: 3.5em;
  display: inline-flex;
  align-items: center;
  justify-content: ${props => props.justify ? props.justify : 'flex-start'};

  h1 {
    outline: none;
    line-height: 1.05;
    margin: 0 1em;
  }
  @media (max-width: ${breakpoints.md}px) {
      h1{
        font-size: 1rem!important;
        line-height: 1.3rem!important;
      }
  }
  ${media.md` 
    margin: 1em 0 3em 0;
    h1 {
      margin: 0 0 0 2em;
    }
  `}
`;
StyledHeaderTitle.displayName = 'StyledHeaderTitle';

const HeaderTitle = ({ title, color, justify, index, loading, ...rest }) => {
  useEffect(() => {
    const pageHeader = document.getElementById('pageHeader');
    if (pageHeader) {
      pageHeader.focus();
    }
  }, []);

  return (
    <StyledHeaderTitle color={color} justify={justify} {...rest}>
      {index ? (
        <Text
          tag="span"
          value={index}
          intlFormatter
          size="f5"
          weight="bold"
          transform="uppercase"
          letterSpacing="0.05em"
          color="white"
          align="center"
          margin={title ? '0 0 0 0.5em' : '0 auto'}
        />
    )
      : null}
      {title ? (
        <Text
          tag="h1"
          value={title}
          intlFormatter
          size="f5"
          weight="bold"
          transform="uppercase"
          letterSpacing="0.05em"
          color="white"
          id="pageHeader"
          tabIndex="-1"
        />
    )
      : null}
    </StyledHeaderTitle>
  );
};

HeaderTitle.displayName = 'HeaderTitle';

export default HeaderTitle;
