import styled from 'styled-components';
import React from 'react';

const StyledLi = styled.li`
  width: 100%;
`;
const Ul = styled.ul`
  @-moz-document url-prefix() {
    padding-left: ${props => props.paddingLeft};
  }
  -webkit-padding-start: ${props => props.paddingStart};
  list-style-type: ${properties => properties.type || 'disc'};
`;

const ListComponent = ({
  type = 'disc',
  children: childs = [],
  paddingLeft = '1rem',
  paddingStart = '1.3rem',
  className,
}) => {
  const children = childs.length ? childs : [childs];
  return (
    <Ul type={type} paddingLeft={paddingLeft} paddingStart={paddingStart} className={className}>
      {children.map((child, index) => (
        <StyledLi key={`ListComponent-${child}-${index.toString()}`}>
          {child}
        </StyledLi>
      ))}
    </Ul>
  );
};

ListComponent.displayName = 'List';

export const List = ListComponent;
