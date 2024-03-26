import { HeaderImage } from 'components/ui2/HeaderImage';
import styled from 'styled-components';
import breakpoints from 'utils/breakpoints';

export const HeaderImageHomeInclusione = styled(HeaderImage)`
  @media screen and (min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg}px) {
    & >div {
      height: auto;
      background-size: contain;
      & >div{
        & >div{
          & >div{
            padding: 28vw 0 2rem 0;
            margin: 0 2.8rem;
            justify-content: flex-end;
            min-height: 20rem;
          }
        }
      }
    }
  }
`;
