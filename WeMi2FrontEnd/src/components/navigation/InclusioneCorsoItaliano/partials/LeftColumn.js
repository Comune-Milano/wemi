import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import ComeCercare from './partialsLeftColumn/ComeCercare';
import QualeLivello from './partialsLeftColumn/QualeLivello';
import QualeTitolo from './partialsLeftColumn/QualeTitolo';
import QualeScuola from './partialsLeftColumn/QualeScuola';
import Corsi from './partialsLeftColumn/Corsi';
import DomandeFrequenti from './partialsLeftColumn/DomandeFrequenti';
import ModalAttestazione from './partialsLeftColumn/modals/ModalAttestazione';
import ModalCertificazione from './partialsLeftColumn/modals/ModalCertificazione';
import ModalCefr from './partialsLeftColumn/modals/ModalCefr';

const LeftColumn = () => {
  const [openModalAttestazione, setOpenModalAttestazione] = React.useState(false);
  const [openModalCertificazione, setOpenModalCertificazione] = React.useState(false);
  const [openModalCefr, setOpenModalCefr] = React.useState(false);

  return (
    <Row fluid>
      <Column padding="0">
        <ComeCercare />
      </Column>
      <Column padding="0" margin="2.5em 0 0 0">
        <QualeLivello
          openModalCefr={openModalCefr}
          setOpenModalCefr={setOpenModalCefr}
        />
      </Column>
      <Column padding="0" margin="2.5em 0 0 0">
        <QualeTitolo
          openModalAttestazione={openModalAttestazione}
          setOpenModalAttestazione={setOpenModalAttestazione}
          openModalCertificazione={openModalCertificazione}
          setOpenModalCertificazione={setOpenModalCertificazione}
        />
      </Column>
      <Column padding="0" margin="2.5em 0 0 0">
        <QualeScuola />
      </Column>
      <Column padding="0" margin="2.5em 0 0 0">
        <Corsi
          openModalAttestazione={openModalAttestazione}
          setOpenModalAttestazione={setOpenModalAttestazione}
          openModalCertificazione={openModalCertificazione}
          setOpenModalCertificazione={setOpenModalCertificazione}
          openModalCefr={openModalCefr}
          setOpenModalCefr={setOpenModalCefr}
        />
      </Column>
      <Column padding="0" margin="2.5em 0 0 0">
        <DomandeFrequenti />
      </Column>

      {/* modals */}
      <ModalAttestazione
        open={openModalAttestazione}
        setOpen={setOpenModalAttestazione}
      />
      <ModalCertificazione
        open={openModalCertificazione}
        setOpen={setOpenModalCertificazione}
      />
      <ModalCefr
        open={openModalCefr}
        setOpen={setOpenModalCefr}
      />
    </Row>
  );
};

LeftColumn.displayName = 'LeftColumnNavigation';

export default LeftColumn;
