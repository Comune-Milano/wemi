import React from 'react';
import Text from 'components/ui/Text';
import { Row } from 'components/ui/Grid';
import TextAccordion from 'components/ui2/TextAccordion';
import { StyledOl } from '../components.style';

export const OttenereRicongiungimento = () =>
(
  <Row fluid margin="0 0 1em">
    <TextAccordion
      label="COME SI OTTIENE IL RICONGIUNGIMENTO FAMILIARE?"
      weight="bold"
      labelTransform="uppercase"
      labelLetterSpacing="0.05em"
      color="red"
      size="f6"
    >
      <StyledOl>
        <li>
          <Text
            value="Occorre presentare la richiesta di nulla osta al ricongiungimento familiare on line sul "
            lineHeight="175%"
            size="f7"
          />
          <a href="https://www.interno.gov.it/it" target="_blank">
            <Text
              value="sito del Ministero dell'Interno."
              color="blue"
              fontStyle="italic"
              size="f7"
              lineHeight="175%"
              decoration="underline"
            />
          </a>
          &nbsp;
          <Text
            value="Attenzione: per poter inoltrare la domanda è obbligatorio disporre delle"
            lineHeight="175%"
            size="f7"
          />
          &nbsp;
          <Text
            value="credenziali SPID"
            weight="bold"
            lineHeight="175%"
            size="f7"
          />
          &nbsp;
          <Text
            value="(Sistema Pubblico di Identità Digitale) e di un indirizzo mail valido. Ai sensi del protocollo d'intesa siglato tra Prefettura e Comune il 23 settembre 2000, il servizio WeMi RaggiungiMi collabora con lo Sportello Unico della Prefettura di Milano e ti aiuta gratuitamente a presentare la richiesta di nulla osta."
            lineHeight="175%"
            size="f7"
          />
        </li>
        <li>
          <Text
            value="Lo Sportello Unico per l'Immigrazione (SUI) della Prefettura"
            lineHeight="175%"
            size="f7"
          />
          &nbsp;
          <Text
            value="rilascia il nulla osta"
            weight="bold"
            size="f7"
            lineHeight="175%"
          />
          &nbsp;
          <Text
            value="che il richiedente dovrà inviare in originale ai familiari da ricongiungere."
            lineHeight="175%"
            size="f7"
          />
        </li>
        <li>
          <Text
            value="Il nulla osta ha validità 6 mesi dalla data del rilascio ed entro tale termine i familiari, con il nulla osta, si dovranno recare all'Ambasciata/Rappresentanza Consolare Italiana del paese di origine per richiedere il"
            lineHeight="175%"
            size="f7"
          />
          &nbsp;
          <Text
            value="visto di ingresso per motivi di famiglia"
            weight="bold"
            lineHeight="175%"
            size="f7"
          />
          <Text
            value="."
            lineHeight="175%"
            size="f7"
          />
        </li>
        <li>
          <Text
            value="Il visto di ingresso ha validità di 1 anno dalla data del rilascio ed entro tale termine i familiari dovranno entrare in Italia."
            lineHeight="175%"
            size="f7"
          />
        </li>
      </StyledOl>
    </TextAccordion>
  </Row>
);

OttenereRicongiungimento.displayName = 'OttenereRicongiungimento';
