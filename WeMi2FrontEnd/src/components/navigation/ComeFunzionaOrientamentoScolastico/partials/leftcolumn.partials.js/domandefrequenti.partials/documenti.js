import { Row } from 'components/ui/Grid';
import React from 'react';
import TextAccordion from 'components/ui2/TextAccordion';
import Text from 'components/ui/Text';
import { TextSpan } from 'components/navigation/InfoApprendimentoLingua/components.style';
import { StyledUl } from '../../../components.style';

const Documenti = () => (
  <>
    <Row fluid margin="2em 0 0 0">
      <TextAccordion
        label="QUALI DOCUMENTI BISOGNA PORTARE DAL PAESE D'ORIGINE PER ISCRIVERE I FIGLI A SCUOLA?"
        weight="bold"
        size="f6"
        labelTransform="uppercase"
        labelLetterSpacing="0.05em"
        color="purple"
      >
        <TextSpan>
          I documenti da preparare, sono i seguenti:
        </TextSpan>
        <StyledUl>
          <Row fluid margin="0 1em 0">
            <li>
              <TextSpan>
                <b>Certificato </b>
                che attesti gli anni di scolarità o il titolo di studio recante firma del Dirigente scolastico della scuola frequentata nel Paese straniero, legalizzata dall&apos;Autorità diplomatica o consolare italiana in loco;
              </TextSpan>
            </li>
          </Row>
          <Row fluid margin="0 1em 0">
            <li>
              <TextSpan>
                <b>Dichiarazione di valore </b>
                accompagnata dalla traduzione in lingua italiana del titolo (certificata e giurata, conforme al testo straniero) o del certificato che attesti gli anni di scolarità, da parte dell&apos;Autorità diplomatica o consolare italiana operante nel Paese in cui il documento è stato prodotto;
              </TextSpan>
            </li>
          </Row>
        </StyledUl>
        <Row fluid>
          <a href="https://www.miur.gov.it/studenti-stranieri-inserimento-nelle-scuole-italiane" target="_blank">
            <Text
              value="Scopri di più"
              fontStyle="italic"
              decoration="underline"
              color="blue"
              size="f7"
            />
          </a>
        </Row>
        <Row fluid>
          <Text
            value="Si consiglia di portare in Italia la documentazione sanitaria relativa ed eventuali vaccinazioni, o certificazioni che attestino disabilità che richiedono attenzioni specifiche nella frequenza scolastica."
            size="f7"
          />
        </Row>
      </TextAccordion>
    </Row>
  </>
);

Documenti.displayName = 'Documenti';
export default Documenti;
