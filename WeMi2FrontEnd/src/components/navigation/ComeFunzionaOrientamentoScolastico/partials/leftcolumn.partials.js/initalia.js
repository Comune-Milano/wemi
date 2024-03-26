import { TextSpan, UnderlineBlueTextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';
import { Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import React from 'react';
import { colors } from 'theme';

const InItalia = () => (
  <div id="initalia">
    <Row fluid margin="2.7em 0 0 0">
      <BackgroundTitle size={bgTitleSizes.small} label="ORIENTAMENTO SCOLASTICO IN ITALIA" bgColor="purple" />
    </Row>
    <Row fluid margin="1.2em 0 0 0">
      <Text
        value="SCEGLIERE LA SCUOLA GIUSTA E ISCRIVERE I RAGAZZI E LE RAGAZZE"
        size="f6"
        weight="bold"
        letterSpacing="0.05em"
        color="purple"
        lineHeight="175%"
      />
    </Row>
    <Row fluid>
      <TextSpan>
        Se i ragazzi e le ragazze hanno da 6 a 14 anni, saranno inseriti in una scuola del primo ciclo (
        <b>scuole elementari </b>
        e
        <b> scuole medie</b>
        ). Per conoscere l&apos;indirizzo della scuola di Milano a cui iscrivere i tuoi figli puoi
        rivolgerti agli
        {' '}
        <a href=" " target="_blank">
          <UnderlineBlueTextSpan>
            sportelli Poli START
          </UnderlineBlueTextSpan>
        </a>
        {' '}
        del tuo Municipio di residenza.
      </TextSpan>
    </Row>
    <Row fluid margin="2em 0 0 0">
      <TextSpan>
        Se i ragazzi e le ragazze hanno più di 14 anni, potranno essere inseriti in una scuola del secondo ciclo (scuole secondarie di secondo grado, ovvero
        <b> scuole superiori</b>
        ).
        <br />
        In italia esistono tante scuole superiori con indirizzi di studio diversi. Visita il
        {' '}
        <a href=" https://www.miur.gov.it/scuola-secondaria-di-secondo-grado" target="_blank">
          <UnderlineBlueTextSpan>
            Sito del Ministero dell&apos;Istruzione
          </UnderlineBlueTextSpan>
        </a>
        {' '}
        per avere più informazioni riguardo ai tipi di scuole secondarie. La scelta della scuola superiore richiede la conoscenza di sé, dei propri interessi e delle proprie attitudini. Cerco-Offro Scuola è uno sportello gratuito del Comune di Milano che aiuta i ragazzi e le ragazze alla
        <b> scelta della scuola più adatta </b>
        a loro e li accompagna nel processo di iscrizione. Per chiedere un appuntamento, scrivi un&apos;email a
        {' '}
        <a href="mailto:" style={{ color: colors.purple, fontStyle: 'italic' }}>
        </a>
        <Row fluid margin="2em 0 0 0">
          <TextSpan>
            Se i ragazzi hanno requisiti per accedere alle
            <b> facoltà universitarie</b>
            , potranno richiedere informazioni e orientamento agli atenei presenti sul territorio milanese.
          </TextSpan>
        </Row>
      </TextSpan>
    </Row>
  </div>
);

InItalia.displayName = 'InItalia';
export default InItalia;
