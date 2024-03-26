import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { BackgroundTitle } from 'components/ui2/BackgroundTitle';
import { bgTitleSizes } from 'components/ui2/BackgroundTitle/constants';
import { NavLink } from 'components/router';
import { PAGE_CONSULENZA_SOCIALE_GIURIDICA } from 'types/url';
import { TextSpan } from '../components.style';
import { cosaFareContent } from './costants';

const CosaOffre = () => (
  <>
    <Row fluid margin="1.8em 0 0 0">
      <BackgroundTitle size={bgTitleSizes.small} label="Cosa offre ai cittadini" bgColor="blue" />
    </Row>
    {
      cosaFareContent.map((text, index) => (
        <React.Fragment key={`content-CosaOffre-${index.toString()}`}>
          <Row fluid margin="1em 0 0 0">
            <Text
              weight="bold"
              size="f6"
              value={text.title}
              lineHeight="175%"
              color="blue"
              letterSpacing="0.05em"
            />
          </Row>
          <Row fluid>
            <Text
              size="f7"
              value={text.text}
              lineHeight="175%"
            />
          </Row>
        </React.Fragment>
      ))
    }
    <Row fluid margin="1em 0 0 0">
      <Text
        weight="bold"
        size="f7"
        value="SUPPORTO GIURIDICO"
        lineHeight="175%"
        color="blue"
        letterSpacing="0.05em"
      />
    </Row>
    <Row fluid>
      <TextSpan>
        Per richiedere consulenza sull&apos;iter per la dimostrazione della conoscenza della lingua italiana previsto dalla normativa in vigore (Accordo di Integrazione, permessi di soggiorno e richiesta di cittadinanza italiana) in collaborazion  e con il servizio di&nbsp;
        <NavLink
          to={PAGE_CONSULENZA_SOCIALE_GIURIDICA}
          align="left"
          display="inline-block"
        >
          <Text
            size="f7"
            value="CONSULENZA GIURIDICA"
            lineHeight="175%"
            color="green"
          />
        </NavLink>
        .
      </TextSpan>
    </Row>
  </>
);

CosaOffre.displayName = 'CosaOffre';
export default CosaOffre;
