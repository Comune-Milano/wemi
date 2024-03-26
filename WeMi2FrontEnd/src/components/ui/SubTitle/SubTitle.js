/** @format */
import React from 'react';
import styled from 'styled-components';

const StyledSubTitle = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fonts.size.f2};
  span {
    color: ${({ theme }) => theme.colors.blue};
  }
`;
StyledSubTitle.displayName = 'StyledSubTitle';

const SubTitle = ({ title, secondtitle }) => (
  <StyledSubTitle>
    <span>{title}</span>
    {secondtitle}
  </StyledSubTitle>
);

SubTitle.displayName = 'SubTitle';

export default SubTitle;
