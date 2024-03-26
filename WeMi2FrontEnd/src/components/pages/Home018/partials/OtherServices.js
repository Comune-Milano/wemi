
import React from 'react';
import styled from 'styled-components';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import OtherServicesNavigation from 'components/navigation/Home018/OtherServices';
import { HOME_ANCHORS } from '../constants/anchors';
import media from 'utils/media-queries';

const Wrapper = styled.div`
  margin-bottom: 7.85rem;
  height: auto;
`;

const StyledTitle = styled.div`
  margin: 0 2.8rem 3rem 0;
`;

const OtherServices = () => (
  <Wrapper id={HOME_ANCHORS.altriServizi}>
    <StyledTitle>
      <BackgroundTitle
        label="Disponibili Anche:"
        bgColor="blue"
        size={bgTitleSizes.small}
      />
    </StyledTitle>
    <OtherServicesNavigation />
  </Wrapper>
  );

OtherServices.displayName = 'OtherServices';

export default React.memo(OtherServices);
