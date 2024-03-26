import styled from 'styled-components';
import media from 'utils/media-queries';

export const PageContainer = styled.div`
  padding-left: 2.8rem;
  padding-right: 2.8rem;
  ${media.md`
    padding-left: 7.03rem;
    padding-right: 7.03rem;
`}
`;

export const Wrapper = styled.div`
  height: auto;
  ${media.xs`
    padding-bottom: 5.5rem;
  `}
  ${media.xsm`
    padding-bottom: 5rem;
  `}
  ${media.md`
    padding-bottom: 9.6rem;
  `}
`;
