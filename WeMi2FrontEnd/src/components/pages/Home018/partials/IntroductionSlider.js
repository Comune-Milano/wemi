/** @format */
import SliderCarousel from 'components/navigation/Home018/Slider';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import React from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { HOME_ANCHORS } from '../constants/anchors';
import { estraiListaSlider } from '../graphql';

const Wrapper = styled.div`
  height: auto;
  i {
    border-color: initial !important;
  }
  ${media.md`
    height: 50vw;
    i {
      border-color: white !important;
    }
  `};
  ${media.lg`
    height: 35.85vw;
  `};
  ${media.xl`
    max-height: 30.85rem;
  `};
  ${media.xxl`
    max-height: 33.8625rem;
  `};
`;

/**
 * The hero slider in the home page.
 */
const IntroductionSlider = () => {

  const [sliderList] = useGraphQLRequest(
    undefined,
    estraiListaSlider,
    {},
    true,
    response => response.list.map(contenuto => ({
      ...contenuto,
      iw_path_media1: encodeURI(contenuto.image.path),
    }))
  );

  // Data Loading
  const sliderListLoading = sliderList.isLoading;
  // Data Pristine
  const sliderListPristine = sliderList.pristine;
  // Data
  const sliderListData = sliderList.data;

  return (
    <Wrapper id={HOME_ANCHORS.introductionSlider}>
      <SliderCarousel
        data={sliderListData}
        loading={sliderListLoading || sliderListPristine}
        widthDescription={{
          md: '51.7%',
          lg: '46.7%',
          xl: '41.7%',
          xxl: '41.7%',
        }}
      />
    </Wrapper>
  );
};

IntroductionSlider.displayName = 'IntroductionSlider';

export default React.memo(IntroductionSlider);
