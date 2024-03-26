import styled, { css } from 'styled-components';

import media from 'utils/media-queries';
import { colors } from 'theme';
import { Row } from 'components/ui/Grid';


export const TitleRow = styled(Row)`
  min-height: 3.2em;
  border-bottom: 2px solid ${colors.darkGrey};
  margin-bottom: 1.3rem;
  padding-top: 1rem;
  padding-bottom: 1.66rem;
`;

export const ShowFilterWrap = styled.div`
  height: auto;
  max-height: 0;
  width: 80%;
  opacity: 0;
  transition: max-height .4s linear, opacity .3s linear;
  ${media.lg` 
    width: 60%;
  `}
  ${props => props.shown && css`
    height: auto;
    max-height: 60vh;
    opacity: 1;
    transition: max-height .4s linear, opacity .3s linear;
  `}
`;