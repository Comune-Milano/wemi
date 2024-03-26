import React from 'react';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { PAGE_INCLUSIONE_LAB_IMPACT } from 'types/url';
import { NavLink } from 'react-router-dom';
import { WrapperText } from '../VoglioSaperneDiPiuExtrascolatico.styled';
import { cercoOffroScuolaTitle, ANCHOR_TOP } from './constants';

const CercoOffroScuola = ({
  color = 'purple',
}) => (
  <Row fluid>
    <div id={ANCHOR_TOP}>
      <BackgroundTitle
        bgColor={color}
        label={cercoOffroScuolaTitle}
        size={bgTitleSizes.small}
      />
    </div>
    <WrapperText margin="1.8em 0 0 0" fontSize="f7">
      Il&nbsp;
      <a href=" " target="_blank">
        <Text
          value="servizio di orientamento scolastico"
          decoration="underline"
          fontStyle="italic"
          color="blueIcon"
          lineHeight="175%"
        />
      </a>
      {' '}
      della Direzione Educazione rivolto a giovani dai 14 ai 21 anni, che sono arrivati in Italia da massimo tre anni.
      <br />
      Le attività in via Don Carlo San Martino sono finanziate dal progetto&nbsp;
      <NavLink
        to={PAGE_INCLUSIONE_LAB_IMPACT}
        align="left"
        display="inline-block"
      >
        <Text
          value="Lab Impact"
          decoration="underline"
          fontStyle="italic"
          color="blueIcon"
          lineHeight="175%"
        />
      </NavLink>
      &nbsp;con capofila Regione Lombardia.
    </WrapperText>
  </Row>
);

CercoOffroScuola.displayName = 'CercoOffroScuolaNavigation';

export default CercoOffroScuola;
