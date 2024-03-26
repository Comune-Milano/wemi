import React from 'react';
import TextAccordion from 'components/ui2/TextAccordion';
import { StyledDiv, StyledGroupDiv } from './style';

const ContainerComponent = ({
  label = '',
  children,
  visible,
  orientation,
  color,
}) => (
  <StyledDiv>
    <TextAccordion
      label={label}
      color={color || 'primary'}
      tabIndex="0"
      visible={visible}
    >
      <StyledGroupDiv
        orientation={orientation}
      >
        {children}
      </StyledGroupDiv>
    </TextAccordion>
  </StyledDiv>

);


ContainerComponent.displayName = 'container component';

export const Container = ContainerComponent;
