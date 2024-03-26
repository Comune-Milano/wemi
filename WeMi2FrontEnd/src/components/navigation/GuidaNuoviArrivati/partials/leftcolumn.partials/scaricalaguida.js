import { Row, Column } from 'components/ui/Grid';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import Button from 'components/ui2/Button';
import AnchorLink from 'components/ui/AnchorLink';
import React from 'react';

const ScaricaLaGuida = () => (
  <>
    <Row fluid>
      <BackgroundTitle size={bgTitleSizes.small} label="SCARICA LA GUIDA" bgColor="orange" />
    </Row>
    <Row fluid margin="2em 0 0 0">
      <Column xs="12" sm="6" md="6" lg="6" padding="0">
        <AnchorLink
          _blank
          width="100%"
          align="center"
        >
          <Button
            iconLeft="download"
            color="orange"
            label="BENVENUTI A MILANO"
            padding="5px 30px"
          />
        </AnchorLink>
      </Column>
      <Column xs="12" sm="6" md="6" lg="6" sizepadding={{ xs: '2em 0 0 0', sm: '0 0 0 2em', md: '0 0 0 2em', lg: '0 0 0 2em' }}>
        <AnchorLink
          _blank
          width="100%"
          align="center"
        >
          <Button
            iconLeft="download"
            color="orange"
            label="米兰欢迎欢"
            padding="5px 30px"
          />
        </AnchorLink>
      </Column>
    </Row>
    <Row fluid margin="1.2em 0 0 0" sizemargin={{ xs: '2em 0 0 0' }}>
      <Column xs="12" sm="6" md="6" lg="6" padding="0">
        <AnchorLink
          _blank
          width="100%"
          align="center"
        >
          <Button
            iconLeft="download"
            color="orange"
            label="BIENVENUE À MILAN"
            padding="5px 30px"
          />
        </AnchorLink>
      </Column>
      <Column xs="12" sm="6" md="6" lg="6" sizepadding={{ xs: '2em 0 0 0', sm: '0 0 0 2em', md: '0 0 0 2em', lg: '0 0 0 2em' }}>
        <AnchorLink
          _blank
          width="100%"
          align="center"
        >
          <Button
            iconLeft="download"
            color="orange"
            label="WELCOME TO MILAN"
            padding="5px 30px"
          />
        </AnchorLink>
      </Column>
    </Row>
    <Row fluid margin="1.2em 0 0 0" sizemargin={{ xs: '2em 0 0 0' }}>
      <Column xs="12" sm="6" md="6" lg="6" padding="0">
        <AnchorLink
          _blank
          width="100%"
          align="center"
        >
          <Button
            iconLeft="download"
            color="orange"
            label="مرحبا بك
          في ميلانو"
            padding="5px 30px"
          />
        </AnchorLink>
      </Column>
      <Column xs="12" sm="6" md="6" lg="6" sizepadding={{ xs: '2em 0 0 0', sm: '0 0 0 2em', md: '0 0 0 2em', lg: '0 0 0 2em' }}>
        <AnchorLink
          _blank
          width="100%"
          align="center"
        >
          <Button
            iconLeft="download"
            color="orange"
            label="BIENVENIDOS A MILÁN"
            padding="5px 30px"
          />
        </AnchorLink>
      </Column>
    </Row>
  </>
  );

ScaricaLaGuida.displayName = 'ScaricaLaGuida';
export default ScaricaLaGuida;
