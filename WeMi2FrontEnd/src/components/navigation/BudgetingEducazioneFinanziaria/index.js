import React from 'react';
import HowContactEducazioneFinanziaria from 'components/shared/howContactEducazioneFinanziaria';
import BodyEducazioneFinanziaria from 'components/shared/bodyEducazioneFinanziaria';
import Text from 'components/ui/Text';
import { Row, Column } from 'components/ui/Grid';
import ScopriGliAltriContenutiEdFinanziaria from 'components/shared/ScopriGliAltriContenutiEdFinanziaria';
import { list } from './constant';

const BudgetingEducazioneFinanziaria = () => (
  <Row fluid margin="3.5rem 0 4rem 0">
    <Column padding="0" md="7">
      <BodyEducazioneFinanziaria
        title="Budgeting"
        subTitle="Controllare le entrate e le uscite per migliorare le proprie abitudini di spesa"
      >
        <Text
          value="Come posso risparmiare di più, mettendo in pratica piccole azioni concrete?"
          size="f7"
          weight="bold"
          tag="div"
        />
        <Text
          value="Come posso affrontare spese impreviste?"
          size="f7"
          weight="bold"
          tag="div"
        />
        <Text
          value="Se non riusciamo a risparmiare quel che dovremmo, se alla fine del mese le nostre entrate non coprono tutti i nostri consumi, se dobbiamo chiedere un prestito per far fronte a un piccolo imprevisto o se semplicemente desideriamo accantonare qualcosa per raggiungere un obiettivo o fare un viaggio, ma facciamo fatica a gestire le spese quotidiane… allora il budgeting può fare al caso nostro! Fare budgeting significa innanzitutto assumere il controllo delle entrate e uscite e migliorare i nostri comportamenti di consumo. Questa attività ci aiuta a capire per cosa, come e perché risparmiare, e a chiarirci le priorità rispetto ai consumi correnti. Ci insegna inoltre a monitorare nel tempo le spese all’interno del budget definito, a verificare costantemente la situazione e ad apportare le correzioni necessarie."
          size="f7"
          tag="div"
        />
        <Text
          value="Le educatrici e gli educatori finanziari ci aiutano a fare tutto questo!"
          size="f7"
          tag="div"
        />
      </BodyEducazioneFinanziaria>
      <ScopriGliAltriContenutiEdFinanziaria list={list} />
    </Column>
    <HowContactEducazioneFinanziaria />
  </Row>
);

BudgetingEducazioneFinanziaria.displayName = 'BudgetingEducazioneFinanziaria Navigations';

export default BudgetingEducazioneFinanziaria;
