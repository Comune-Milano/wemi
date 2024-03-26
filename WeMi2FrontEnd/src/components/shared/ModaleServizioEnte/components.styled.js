import { Column, Row } from 'components/ui/Grid';
import styled, { css } from 'styled-components';
import { colors, spacing } from 'theme';
import media from 'utils/media-queries';
import ServiceCarousel from './partials/serviceCarousel';

export const ModalHeader = styled.div`
  background-color: ${colors.greyInput};
  color: ${colors.black};
  box-sizing: border-box;
  margin: 0;
  width: 100%;
`;

export const RowHeader = styled(Row)`
  flex-direction: column-reverse;
`;

export const PrintButtonColumn = styled(Column)`
  padding-top: calc(${spacing.pagePadding.p1} - 0.3em);
  padding-right: calc(${spacing.pagePadding.p1} + 3rem);
  align-self: flex-end;
  ${media.md`
    padding-top: 1.95rem;
    padding-right: 4.68rem;
  `}
`;

export const GreyRow = styled(Row)`
  background-color: ${colors.greyInput};
  @media print {
    & > div {
      padding: 27px;
    }
  }
  
`;

export const WrapperTitleSection = styled.div`
${props => props.isCarouselVisibile ?
    css`
      @media screen and (max-width: 768px) {
        margin-top: -5rem;
        position: relative;
      }
    `
    : ''
  }
`;

export const RatingColumn = styled(Column)`
  justify-content: flex-start;
  ${media.xs`
    margin-top: 0.5em;
    margin-right: 0;
  `}
  ${media.xsm`
    margin-top: 0.5em;
    margin-right: 2rem;
  `}
  ${media.md`
    margin-top: 0;
  `}
  ${media.lg`
    justify-content: flex-end;
  `}
`;

export const TextColumn = styled(Column)`
  ${media.md`
    text-align:end;
  `}
  ${media.sm`
    width: 66%;
    flex-grow: unset; 
  `}
  @media screen and (max-width: 574px) {
    width: 66%; 
    flex-grow: 1; 
  }
  @media screen and (max-width: 374px) {
    width: 100%; 
    flex-grow: unset; 
  }
`;

export const ColumnTitle = styled(Column)`
  ${media.sm`
    margin: -19px 0 0 0 !important;
  `}
  ${media.xs`
    margin: 0;
  `}
`;

export const ServicesRow = styled(Row)`
  padding: 4.16rem 1.66rem 0 1.66rem;
  ${media.sm`
    padding: 3.91rem 4.69rem 0 4.69rem;
  `} 
`;

export const ServiceCarouselModal = styled(ServiceCarousel)`
  @media screen and (min-width: 320px) {
    height: 170px;
  }
  @media screen and (min-width: 425px) {
    height: 170px;
    width:  auto;
  }
  ${media.md`
    height: 27.7vw;
  `};

  ${media.xl`
    max-height: 33.8625rem;
  `};
`;
