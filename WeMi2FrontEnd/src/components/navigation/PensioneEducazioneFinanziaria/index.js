import React from 'react';
import { Column, Row } from 'components/ui/Grid';
import BodyEducazioneFinanziaria from 'components/shared/bodyEducazioneFinanziaria';
import HowContactEducazioneFinanziaria from 'components/shared/howContactEducazioneFinanziaria';
import Text from 'components/ui/Text';
import ScopriGliAltriContenutiEdFinanziaria from 'components/shared/ScopriGliAltriContenutiEdFinanziaria';
import { list } from './constants';

const PensioneEducazioneFinanziariaNavigation = () => (
  <Row fluid margin="3.5rem 0 4rem 0">
    <Column padding="0" md="7">
      <BodyEducazioneFinanziaria
        title="PENSIONE"
        subTitle="PREPARARE LA VITA IN PENSIONE PER POTER VIVERE UNA VECCHIAIA SENZA PREOCCUPAZIONI"
      >
        <Column xs="12" padding="0">
          <Text
            value="A che età potrò andare in pensione?"
            weight="bold"
          />
        </Column>
        <Column xs="12" padding="0">
          <Text
            value="Quanto avrò e sarà sufficiente per vivere bene?"
            weight="bold"
          />
        </Column>
        <Column xs="12" padding="0">
          <Text
            value="Quando potremo andare in pensione? Che vita vorremo fare? In media, passeremo almeno vent'anni della nostra vita
          in pensione: si tratta di un tempo molto lungo e molto diverso da quello scandito dagli impegni del lavoro, che merita di
          essere progettato con grande attenzione. Quanto costerà ogni mese la nostra 'nuova vita' e quanto denaro avremo dalla previdenze
          pubbliche e complementari? Immaginare la nostra vita futura ci consente di valutare se ciò che avremo a disposizione sarà sufficiente,
          o se è necessario cominciare fin da subito ad accantonare risorse ulteriori. Inoltre, pianificare il benessere e la qualità della vita in pensione
          richiede una valutazione sul vivere bene, potendo gestire eventuali cure legate all'età. Le educatrici e gli educatori finanziari
          ci aiutano a fare tutto questo!"
          />
        </Column>
      </BodyEducazioneFinanziaria>
      <ScopriGliAltriContenutiEdFinanziaria list={list} />
    </Column>
    <HowContactEducazioneFinanziaria />
  </Row>
  );

PensioneEducazioneFinanziariaNavigation.displayName = 'PensioneEducazioneFinanziariaNavigation';

export default PensioneEducazioneFinanziariaNavigation;
