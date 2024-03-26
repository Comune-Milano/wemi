
import React from 'react';
import styled from 'styled-components';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import ServicesNavigation from 'components/navigation/Home018/Services';
import media from 'utils/media-queries';
import { HOME_ANCHORS } from '../constants/anchors';

const Wrapper = styled.div`
  ${media.xs`
    margin-bottom: 5.5rem;
  `}
  ${media.xsm`
    margin-bottom: 5rem;
  `}
  ${media.md`
    margin-bottom: 7.85rem;
  `}
  height: auto;
`;

const StyledTitle = styled.div`
  margin: 0 3.91rem 0 0;
  ${media.md`
    margin: 0 3.91rem 4.4rem 0;`
    }
`;

const Services = () => (
  <Wrapper paddingTop="1rem" id={HOME_ANCHORS.scopriServizi}>
    <StyledTitle>
      <BackgroundTitle
        label="Scopri i servizi 0-18 Anni"
        bgColor="blue"
        size={bgTitleSizes.small}
      />
    </StyledTitle>
    <ServicesNavigation />
  </Wrapper>
  );

Services.displayName = 'Services';

export default React.memo(Services);
