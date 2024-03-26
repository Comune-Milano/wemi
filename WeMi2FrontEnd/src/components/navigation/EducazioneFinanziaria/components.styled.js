import styled from 'styled-components';
import { colors } from 'theme';
import media from 'utils/media-queries';
import { Column } from 'components/ui/Grid';

export const Wrapper = styled.div`
  height: auto;

  ${media.md`
    height: 50vw;
  `};
  ${media.lg`
    height: 35.85vw;
  `};
  ${media.xl`
    max-height: 30.85rem;
  `};
  ${media.xxl`
    max-height: 33.8625rem;
  `}
`;

export const WrapperCard = styled.div`
  width: 100%;
  height: 100%;
  display: table;
  background-color: ${colors.greyCardInclusione};
  padding: 1.5rem;
  ${media.xs`
    padding: 3rem 1.5rem 3rem 1.5rem;
  `}
  ${media.md`
    padding: 2.7rem;
  `}
`;

export const BodyWrapper = styled.div`
  margin: 0 2.8rem 5rem 2.8rem;

  ${media.md`
    margin: 0 7.82rem 5rem 7.82rem;
  `}
`;

export const Img = styled.img`
  width: 140px;
`;

export const StyledColumn = styled(Column)`
  display: table-footer-group;
`;

export const ImgContainer = styled(Column)`
  display: flex;
  justify-content: center;
  padding: 0;
  ${media.sm`
    display: block;
    align-self: center;
    justify-content: start;
    width: 25%;
  `}
  ${media.md`
    display: flex;
    justify-content: center;
    width: 100%;   
  `}
  ${media.xl`
    display: block;
    align-self: center;
    justify-content: start;
    width: 30%;   
  `}
`;

export const TextContainer = styled(Column)`
  ${media.sm`
  width: 75%;
  `}
  ${media.md`
  width: 100%;
  `}
  ${media.xl`
  width: 70%;
  `}
`;
