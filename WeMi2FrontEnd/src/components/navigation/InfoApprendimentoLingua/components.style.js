import { Row } from 'components/ui/Grid';
import TextAccordion from 'components/ui2/TextAccordion';
import styled from 'styled-components';
import { colors, fonts } from 'theme';
import media from 'utils/media-queries';

export const Wrapper = styled(Row)`
  margin-bottom: 8rem;
  margin-left: 2.8rem;
  margin-right: 2.8rem;
  margin-top: 3rem;

  ${media.md`
    margin-top: 3rem;
    margin-bottom: 12rem;
    margin-left: 100px;
    margin-right: 100px;
  `};
`;

export const ComeContattarciRow = styled(Row)`
  position: sticky;
  top: ${({ top }) => top}px;
`;

export const TextSpan = styled.span`
  line-height:175%;
  font-size:${fonts.size.f7};
  color: ${colors.black};
`;

export const StyledTextAccordion = styled(TextAccordion)`
  button {
    text-align: left;
    padding: 4px 4px 4px 0;
  }
  span {
    margin-right: .9em;
  }   
`;


export const EntiCertificatoriOrderedList = styled.ol`
  padding: 0 1em 0;
  list-style-type: decimal;
`;

export const WrapperRow = styled(Row)`
  margin-top: 6em;

  ${media.md`
    margin-top: 0;
  `};
`;

export const UnderlineBlueTextSpan = styled.span`
  font-size: ${fonts.size.f7};
  text-decoration: underline;
  font-style: italic;
  line-height:175%;
  cursor: pointer;
  color:${colors.blue}
`;

export const BoldBlueTextSpan = styled.span`
  color: ${colors.blue};
  font-weight: bold;
  line-height:175%;
  font-size: ${fonts.size.f7};
`;
