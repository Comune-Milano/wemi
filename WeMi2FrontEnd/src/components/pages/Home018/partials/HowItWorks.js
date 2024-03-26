/** @format */
import React from 'react';
import styled from 'styled-components';
import ComeFunzionaSottoHomePage from 'components/shared/ComeFunzionaSottoHomePage';
import media from 'utils/media-queries';
import { HOME_ANCHORS } from '../constants/anchors';
import { stepList } from '../constants/steplist';

const Wrapper = styled.div`
  ${media.xs`
    padding-bottom: 5.5rem;
  `}
  ${media.xsm`
    padding-bottom: 5rem;
  `}
  ${media.md`
    padding-bottom: 9.6rem;
  `}
  height: auto;
`;


const HowItWorks = () => (
  <Wrapper id={HOME_ANCHORS.comeFunziona}>
    <ComeFunzionaSottoHomePage
      color="blue"
      stepList={stepList}
      text="Puoi cercare, personalizzare e acquistare attività per bambine e bambini, ragazzi e ragazze, gratuite o a pagamento, disponibili in città ed erogate dalla rete di"
    />
  </Wrapper>
);

HowItWorks.displayName = 'HowItWorks';

export default React.memo(HowItWorks);
