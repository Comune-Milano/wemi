/** @format */

import React from 'react';
import styled from 'styled-components';
import FaIcon from 'components/ui/FaIcon';
import {Row} from 'components/ui/Grid';

import { colors, fonts } from 'theme';

const StyledChip = styled.span`
padding: ${props => props.padding ? props.padding : "1em"};
margin: ${props => props.margin ? props.margin : "0"};
border-radius: 15px;
background-color: ${colors.grey};
display: ${props => props.display};
font-size: ${props => fonts.size[props.fontSize]};
align-items: center;
z-index:7;
width: ${props => props.width};
i {
padding-left: 1em
};

&:hover {
  i {
    &:before {
      color: ${colors.red};

    }
  }
}

`;



const Chip = ({ value, children, size, getValue, width, margin, padding, removeChip,  ...rest }) => {  
    return (
                  <StyledChip 
                  margin={margin}
                  padding={padding}
                  width={width}
                  fontSize={size}
                    onClick={removeChip ? () => {removeChip.bind(this); removeChip()} : null}
                  >
                    <Row fluid justifycontent="space-between">

                    {value}
                    {children}
                    {removeChip && <FaIcon noShadow icon="\f00d" color="primary" fontSize={size} />}

                    </Row>
                  </StyledChip>)
}
Chip.displayName = 'Chip';
export default Chip;