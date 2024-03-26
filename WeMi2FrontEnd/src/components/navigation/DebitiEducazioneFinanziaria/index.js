import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import BodyEducazioneFinanziaria from 'components/shared/bodyEducazioneFinanziaria';
import Text from 'components/ui/Text';
import HowContactEducazioneFinanziaria from 'components/shared/howContactEducazioneFinanziaria';
import ScopriGliAltriContenutiEdFinanziaria from 'components/shared/ScopriGliAltriContenutiEdFinanziaria';
import { list } from './constants';

const DebitiEducazioneFinanziariaNavigation = () => (
  <Row fluid margin="3.5rem 0 4rem 0">
    <Column padding="0" md="7">
      <BodyEducazioneFinanziaria
        title="DEBITI"
        subTitle="SOSTENERE I DEBITI PER POTER PAGARE RATE E AFFITTI SENZA PREOCCUPAZIONI"
      >
        <Column xs="12" padding="0">
          <Text
            value="Como posso pagare le rate con serenità o estinguere i debiti e i finanziamenti in corso?"
            weight="bold"
          />
        </Column>
        <Column xs="12" padding="0">
          <Text
            value="Quanto costa la mia casa e quando potrò comprarla?"
            weight="bold"
          />
        </Column>
        <Column xs="12" padding="0">
          <Text
            value="Il credito è uno strumento che ci consente di anticipare il momento dell'acquisto di un bene o di un servizio
          rispetto a quando avremmo potuto farlo accantonando quanto necessario mese per mese. Se usati bene, i mutui e i
          finanziamenti sono quindi strumenti importanti che ci permettono di raggiungere obiettivi di vita che altrimenti
          potremmo raggiungere solo dopo molto tempo. Dobbiamo tuttavia saper individuare gli strumenti più adatti a noi,
          per non compromettere la nostra stabilità economica con rate o debiti che non siamo in grado di sostenere nel tempo.
          E se stiamo vivendo un momento difficile e non riusciamo più a pagare le rate di mutui e finanziamenti? Occorre fermarsi,
          fare ordine tra entrate e uscite e trovare la strada migliore per ristrutturare i debiti in corso.
          Le educatrici e gli educatori finanziari ci aiutano a fare tutto questo!"
          />
        </Column>
      </BodyEducazioneFinanziaria>
      <ScopriGliAltriContenutiEdFinanziaria list={list} />
    </Column>
    <HowContactEducazioneFinanziaria />
  </Row>
  );

DebitiEducazioneFinanziariaNavigation.displayName = 'DebitiEducazioneFinanziariaNavigation';
export default DebitiEducazioneFinanziariaNavigation;
