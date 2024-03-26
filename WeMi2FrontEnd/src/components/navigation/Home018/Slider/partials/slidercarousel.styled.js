import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';

export const StyledCaptionWrapper = styled.div`
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  padding: 27vw 0 2rem 0;
  justify-content: flex-start;

  ${media.md`
    padding: 5rem 7.81rem;
    justify-content: center;
    min-height: auto;
  `};
`;

export const StyledTitle = styled.div`
  line-height: 1.9;
  margin: 0 2.8rem;

  span {
    padding: 0 0.5em;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    letter-spacing: 0.05em;
  }

  ${media.md`
    max-width: 70%;
    margin: 0;

    span {
    }

  `};

  ${media.lg`
    max-width: 56%;
  `};

  ${media.xl`
    max-width: 41.7%;
  `};

  ${media.xxl`
    max-width: 41.7%;
  `};
`;

export const StyledDescription = styled.div`
  min-height: 12em;
  line-height: 1.5;
  color: ${colors.black};
  margin: 1.5rem 2.8rem 0 2.8rem;

  ${media.md`
      width: ${props => props.width.md};
      min-height: 10em;
      margin: 1.5rem 0 0 0;
  `};

  ${media.lg`
      width: ${props => props.width.lg};
      min-height: 10.2em;
      margin: 1.5rem 0 0 0;
  `};

  ${media.xl`
      width: ${props => props.width.xl};
      margin: 1.5rem 0 0 0;
  `};

  ${media.xxl`
      width: ${props => props.width.xxl};
      margin: 1.5rem 0 0 0;
  `};

  > span {
    display: inline-block;
  }
`;
