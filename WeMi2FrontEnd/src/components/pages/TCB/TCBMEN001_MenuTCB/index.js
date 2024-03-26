
import React from 'react';
import { Helmet } from 'react-helmet';
import { Row, Column } from 'components/ui/Grid';
import Modal from 'components/ui2/Modal';
import ImageCopertina from './partials/ImageCopertina';
import TrovaAssistente from './partials/TrovaAssistente';
import LavoraAssistente from './partials/LavoraAssistente';
import { BodyModal } from './partials/BodyModal';

const MenuTCB = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const title = 'WeMi - Home Page TCB';
  const description = 'Home Page TCB: TATE, COLF E BADANTI, trova un assistente familiare, lavora come assistente familiare, trova una colf, una badante o una baby-sitter, inviaci la tua candidatura, scopri come funziona il servizio.';
  const keywords = 'welfare, milano, cittadino, lavoratore, servizi, servizio, ente, enti, tcb, baby-sitter, colf, badante, assistente, familiare, trova, lavora, candidatura';
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
      <ImageCopertina />
      <Row fluid>
        <Column lg="6" md="6" sizepadding={{ xs: '15em 0 1.5em 0', sm: '15em 0 3em 0', md: '3.5em 1em 4.5em 5em', lg: '3.5em 1em 5em 5em' }}>
          <TrovaAssistente />
        </Column>
        <Column lg="6" md="6" sizepadding={{ xs: '1.5em 0 3em 0', sm: '3em 0 6em 0', md: '3.5em 5em 4.5em 1em', lg: '3.5em 5em 5em 1em' }}>
          <LavoraAssistente
            setOpenModal={setOpenModal}
          />
        </Column>
      </Row>
      <Modal
        open={openModal}
        width="50%"
        setOpenModal={setOpenModal}
        color="primary"
        children={BodyModal}
      />
    </>
  );
};


MenuTCB.displayName = 'MenuTCB';

export default MenuTCB;
