import styled from 'styled-components';

import media from 'utils/media-queries';
import { colors, fonts } from 'theme'

import { Row } from 'components/ui/Grid';

export const Section = styled(Row)`
  padding: 0;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : "1em")};
`;

export const CategoryTitle = styled.h2`
  color: ${colors.black};
  font-size: ${fonts.size.f5};
  font-weight: bold;
  text-transform: lowercase;
  ::first-letter {
    text-transform: uppercase;
  }
  ${media.md`
    font-size: ${fonts.size.f4};
  `}
`;

export const CategoryDescription = styled.p`
  color: ${colors.black};
  margin: 1em 0;
  padding-right: 0;
  padding: 0;
  width: 100%;
  ${media.md`
  padding-right: 3rem;
`}
`;

export const CategoryLogo = styled.img`
  display: block;
  width: 70%;
  height: 70%;
  margin-top: 0;
  ${media.md`
    width: 80%;
    margin-right: auto;
    margin-left: 0;
    margin-top: 0;
  `}
`;
