/** @format */
import React from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';
import Text from 'components/ui/Text';

const StyledSubTitle = styled.span`
  font-size: ${({ theme }) => theme.fonts.size.f4};
  color: ${({ theme }) => theme.colors.blue};
  .secondpart {
    color: ${({ theme }) => theme.colors.primary};
  }
  ${media.sm`

  font-size: 1.5rem !important;
  
    `}
  ${media.md`
  font-size: 1.5rem !important;
    `}
  ${media.lg`
  font-size: 2rem !important;
  `}
`;
StyledSubTitle.displayName = 'StyledSubTitle';

const SubTitle = ({ title, secondtitle }) => (
  <StyledSubTitle>
    <Text intlFormatter value={title} size={({ theme }) => theme.fonts.size.f2} />
    <Text
      intlFormatter
      className="secondpart"
      value={secondtitle}
      size={({ theme }) => theme.fonts.size.f2}
    />
  </StyledSubTitle>
);

SubTitle.displayName = 'SubTitle';

export default SubTitle;
