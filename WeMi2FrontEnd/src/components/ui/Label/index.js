/** @format */
import React from 'react';
import styled from 'styled-components';
import Text from 'components/ui/Text';
import {Row} from 'components/ui/Grid';
import { colors } from 'theme';
const ContainerRow = styled(Row)`
background-color: ${props => colors[props.bgcolor]};
  padding: ${({ theme }) => theme.spacing.p3} ${({ theme }) => theme.spacing.p6};
  width: ${props => props.width};
  margin: ${props => props.margin};
  display:  ${props => props.display ? props.display : 'block'};
  justify-content:${props => props.justifycontent};
`;
const StyledLabel = styled(Text)`
  background-color: ${props => colors[props.bgcolor]};
  width: ${props => props.width};
  margin: ${props => props.margin};
  display:  ${props => props.display ? props.display : 'block'};
  justify-content:${props => props.justifycontent};
  cursor: default;
  
`;

const Label = ({bgcolor, required, width, margin, display, justifycontent, children, withIcon,icona: Icon,...rest}) => {
  return (
    <ContainerRow justifycontent="space-between" alignitems="center"    bgcolor={bgcolor}
    width={width}
    margin={margin}
    display={display}>
    <StyledLabel 
    bgcolor={bgcolor}
    width={width}
    margin={margin}
    display={display}
    justifycontent={justifycontent}
    {...rest}
    />
    {required && <Text value="*" color="red" padding="0 0 0 .5em" weight="bold" />}
    {withIcon? 
      <Icon  />
    : null
    }
  </ContainerRow>)
}

Label.displayName = 'Label';

export default Label;

