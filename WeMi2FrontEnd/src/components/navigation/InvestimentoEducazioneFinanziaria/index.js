import { Column, Row } from 'components/ui/Grid';
import React from 'react';
import Text from 'components/ui/Text';
import HowContactEducazioneFinanziaria from 'components/shared/howContactEducazioneFinanziaria';
import BodyEducazioneFinanziaria from 'components/shared/bodyEducazioneFinanziaria';
import ScopriGliAltriContenutiEdFinanziaria from 'components/shared/ScopriGliAltriContenutiEdFinanziaria';
import { list } from './constant';

const InvestimentoEducazioneFinanziaria = () => (
  <Row fluid margin="3.5rem 0 4rem 0">
    <Column padding="0" md="7">
      <BodyEducazioneFinanziaria
        title="Investimento"
        subTitle="Raggiungere obiettivi futuri importanti per sé e per i propri cari"
      >
        <Text
          value="Come posso mettere al sicuro i miei risparmi?"
          size="f7"
          tag="div"
          weight="bold"
        />
        <Text
          value="Come posso garantire una buona istruzione ai miei figli, un supporto per chi mi è caro, acquistare una casa tutta mia…?"
          size="f7"
          tag="div"
          weight="bold"
        />
        <Text
          value="Ognuno di noi ha obiettivi di vita personali nel futuro, prossimo o lontano, che ritiene importanti. Non sempre, tuttavia, riusciamo a “vederli” e a pianificare il futuro per tempo e nel modo più adeguato, per questo serve consapevolezza e metodo. L'investimento non è un fine in sé, ma è il mezzo per raggiungere obiettivi belli e gratificanti: non è quindi finalizzato ad aumentare la nostra ricchezza, ma a garantirci, quando saranno necessarie, le risorse che serviranno per gli obiettivi che ci siamo posti. Investire significa inoltre definire l'ammontare di risorse da tenere prontamente disponibili per gli imprevisti e per necessità improvvise, come un calo di reddito o un'uscita straordinaria. Le educatrici e gli educatori finanziari ci aiutano a fare tutto questo!"
          size="f7"
        />
      </BodyEducazioneFinanziaria>
      <ScopriGliAltriContenutiEdFinanziaria list={list} />
    </Column>
    <HowContactEducazioneFinanziaria />
  </Row>
);

InvestimentoEducazioneFinanziaria.displayName = 'InvestimentoEducazioneFinanziaria Component';
export default InvestimentoEducazioneFinanziaria;
