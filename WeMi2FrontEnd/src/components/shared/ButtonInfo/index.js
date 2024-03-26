import React from 'react';
import iconaButtonInfo from 'images2/info-button/FumettoSuggeritoreCittadino.png';
import AnchorLink from 'components/ui/AnchorLink';
import Text from 'components/ui/Text';
import { Column, Row } from 'components/ui/Grid';
import { StyledCont } from './components.styled';


const InfoButtonComponent = ({ padding = '0.5em 0 0.5em 0' }) => (
  <AnchorLink
    to=""
    _blank
    padding={padding}
    display="block"
    width="auto"
  >
    <StyledCont padding={padding}>
      <Row fluid>
        <Column xs="3" padding="0" alignself="center">
          <img
            src={iconaButtonInfo}
            alt="iconaButtonInfo"
            style={{ width: '40px' }}
          />
        </Column>
        <Column xs="9" padding="0" textAlign="start">
          <Text
            value={"SEGNALA L'ENTE CHE\nDESIDERI TROVARE"}
            color="primary"
            whitespace="pre-line"
            weight="bold"
          />
        </Column>
      </Row>
    </StyledCont>
  </AnchorLink>

  );

InfoButtonComponent.displayName = 'Info-Button-Component';
export default InfoButtonComponent;
