/** @format */

import React from 'react';
import { colors } from 'theme';
import styled from 'styled-components';
import { Row } from 'components/ui/Grid';
import { BackgroundTitle, bgTitleSizes } from '../BackgroundTitle';

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: ${props => props.bgColor ? colors[props.bgColor] : '#ECECEC'};
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justifycontent};
`;

const SchedaPagineMenu = ({ infoScheda, children, paddingBody, justifycontent = 'space-between' }) => {
  const {
    titoloScheda,
    bgColor,
  } = infoScheda;

  return (
    <>
      <Wrapper bgColor={bgColor} justifycontent={justifycontent}>
        <Row fluid justifycontent="center" padding="3.5em 0.5em 0">
          <BackgroundTitle
            textAlign="center"
            size={bgTitleSizes.small}
            bgColor={titoloScheda.bgColor || 'primary'}
            label={titoloScheda.text}
          />
        </Row>
        <Row fluid padding={paddingBody || '3em 0 3em'}>
          {children}
        </Row>
      </Wrapper>
    </>
  );
};


SchedaPagineMenu.displayName = 'SchedaPagineMenu';

export default SchedaPagineMenu;
