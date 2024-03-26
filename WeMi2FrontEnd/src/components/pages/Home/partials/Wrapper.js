/** @format */

import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';

const StyledWrapper = styled.div`
  position: relative;
  display: block;
  overflow-x: hidden;
  background-color: ${colors.white};
  padding-top: ${props => props.paddingTop || '5rem'};
  padding-bottom: ${props => props.paddingBottom || '7rem'};
  // old padding-left: 2.8rem;
  // old padding-right: 2.8rem;
  padding-left: 1.67rem;
  padding-right: 1.67rem;
  ${media.xs`
    padding-top: 5.5rem;
  `}
  ${media.xsm`
    padding-top: 5rem;
  `}
  ${media.md`
    padding-left: 7.03rem;
    padding-right: 7.03rem;
    padding-bottom: ${props => props.paddingBottomMd || '11rem'};
    padding-top: ${props => props.paddingTop || '5rem'};
  `};
`;

export default StyledWrapper;
