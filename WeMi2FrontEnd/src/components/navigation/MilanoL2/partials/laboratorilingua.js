import React from 'react';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { TextSpan, UnderlineBlueTextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';

const LaboratoriLingua = () => (
  <>
    <Row fluid margin="1.5em 0 0 0">
      <Text
        value="LABORATORI DI LINGUA CON DONNE E MINORI MIGRANTI"
        size="f6"
        weight="bold"
        letterSpacing="0.05em"
        color="blue"
        lineHeight="175%"
      />
    </Row>
    <Row fluid>
      <TextSpan>
        <i>Milano L2.Laboratori di lingua con donne e minori migranti </i>
        è un progetto finanziato dal Fondo Asilo, Migrazione e integrazione (FAMI) 2014-2020, con capofila di progetto la
        <a href="https://www.codiciricerche.it/it/" target="_blank">
          <UnderlineBlueTextSpan> Cooperativa Codici | Ricerca e Intervento</UnderlineBlueTextSpan>
        </a>
        , che porta avanti l&apos;esperienza maturata nel corso dei progetti
        <i> Fil Rouge e Parl@mi </i>
        nell&apos;ambito dell&apos;apprendimento della lingua italiana come lingua seconda (L2).
      </TextSpan>
    </Row>
  </>
);

LaboratoriLingua.displayName = 'LaboratoriLingua';
export default LaboratoriLingua;
