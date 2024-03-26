import { Row } from 'components/ui/Grid';
import React from 'react';
import TextAccordion from 'components/ui2/TextAccordion';
import { TextSpan, UnderlineBlueTextSpan } from '../../components.style';

const ScuolePubbliche = () => (
  <>
    <Row fluid margin="1em 0 0 0">
      <TextAccordion
        label="SCUOLE PUBBLICHE"
        size="f6"
        weight="bold"
        labelLetterSpacing="0.05em"
        color="blue"
      >
        <Row fluid>
          <TextSpan>
            <b>CPIA (Centri Provinciali per l&apos;Istruzione degli Adulti)</b>
            : in base a quanto stabilito

            dall&apos;Accordo Quadro fra il Ministero dell&apos;Interno e il MIUR (Ministero dell&apos;Istruzione e

            Ministero dell&apos;Università e della Ricerca), ai CPIA è conferita una mansione cruciale e

            specifica per l&apos;integrazione dei cittadini stranieri nella società italiana: essi svolgono corsi di

            formazione civica ed esami di conoscenza della lingua italiana per il rispetto dell&apos;Accordo

            di Integrazione e rilasciano le attestazioni utili per il permesso di soggiorno di lungo

            periodo e per la richiesta di cittadinanza.
            <p>
              <a href=" " target="_blank">
                <UnderlineBlueTextSpan>
                  Scopri di più
                </UnderlineBlueTextSpan>
              </a>
            </p>
            <b>
              Corsi di Italiano per Stranieri della Direzione Economia Urbana e Lavoro, Area Lavoro e

              Formazione del Comune di Milano:
            </b>
            &nbsp;
            offrono corsi di diverse lingue, tra cui l&apos;italiano per

            stranieri. Collocati in diverse sedi cittadine, sono corsi a pagamento, anche intensivi, che

            consentono di arrivare all&apos;esame di certificazione CILS.
            <br />
            <a href="" target="_blank">
              <UnderlineBlueTextSpan>
                Scopri di più
              </UnderlineBlueTextSpan>
            </a>
            <br />
            Anche il centro
            {' '}
            <a href="" target="_blank">
              <UnderlineBlueTextSpan>
                Forma Fleming
              </UnderlineBlueTextSpan>
            </a>
            {' '}
            offre corsi di italiano in laboratorio per stranieri, finalizzati all&apos;inserimento nel mondo del lavoro.
          </TextSpan>
        </Row>
      </TextAccordion>
    </Row>
  </>
);

ScuolePubbliche.displayName = 'ScuolePubbliche';
export default ScuolePubbliche;
