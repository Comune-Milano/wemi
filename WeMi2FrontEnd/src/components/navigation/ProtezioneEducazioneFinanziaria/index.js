import { Column, Row } from 'components/ui/Grid';
import React from 'react';
import Text from 'components/ui/Text';
import HowContactEducazioneFinanziaria from 'components/shared/howContactEducazioneFinanziaria';
import BodyEducazioneFinanziaria from 'components/shared/bodyEducazioneFinanziaria';
import ScopriGliAltriContenutiEdFinanziaria from 'components/shared/ScopriGliAltriContenutiEdFinanziaria';
import { list } from './constant';

const ProtezioneEducazioneFinanziaria = () => (
  <Row fluid margin="3.5rem 0 4rem 0">
    <Column padding="0" md="7">
      <BodyEducazioneFinanziaria
        title="Protezione"
        subTitle="Proteggersi dagli imprevisti preparandosi a gestire necessità improvvise"
      >
        <Text
          value="Quali necessità di protezione economica ha la mia famiglia? "
          size="f7"
          tag="div"
          weight="bold"
        />
        <Text
          value="Come posso proteggermi e mettere al sicuro le persone a cui tengo?"
          size="f7"
          tag="div"
          weight="bold"
        />
        <Text
          value="La protezione riguarda temi da cui spesso cerchiamo di tenerci lontani, come malattie o infortuni improvvisi. Tuttavia, tutti noi dovremmo essere consapevoli dei rischi che corriamo e che fanno parte della nostra vita quotidiana, per garantire più serenità a noi stessi e ai nostri cari qualunque cosa accada. È nostro compito conoscere i rischi cui siamo soggetti, misurarli, decidere quali tenere sulle nostre spalle e quali, invece, sarebbe opportuno trasferire ad altri soggetti. Per fare questo non è necessario essere esperti di protezione, dobbiamo, invece, rispondere ad alcune semplici domande. Da quali rischi dobbiamo proteggerci? Chi e cosa dobbiamo proteggere? Per quanto tempo e di quanta protezione abbiamo bisogno? Le educatrici e gli educatori finanziari ci aiutano a fare tutto questo!"
          size="f7"
        />
      </BodyEducazioneFinanziaria>
      <ScopriGliAltriContenutiEdFinanziaria list={list} />
    </Column>
    <HowContactEducazioneFinanziaria />
  </Row>
);

ProtezioneEducazioneFinanziaria.displayName = 'ProtezioneEducazioneFinanziaria Component';
export default ProtezioneEducazioneFinanziaria;
