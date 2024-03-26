import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import media from 'utils/media-queries';
import Modal from 'components/ui2/Modal';
import { colors, fonts } from 'theme';
import withAuthentication from 'hoc/withAuthentication';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import ModaleCV from 'components/shared/ModaleCV';
import {
  AccettaOffertaLavoratore as AccettaOffertaLavoratoreMutation,
  AssociaLavoratoreDomanda as AssociaLavoratoreDomandaMutation,
  saveAnonymousPdf as saveAnonymousPdfMutation,
  saveCompletePdf as saveCompletePdfMutation,
} from '../../../backofficeTcbAssociaLavoratoriRichiestaGraphQL';
import DissociaLavoratoreModal from '../../modals/DissociaLavoratoreModal';

const StyledBody = styled.div`
  padding: 3em 3em;

  ${media.md`
    padding: 3em 6em;
  `}
`;

const StyledModalHeader = styled.div`
  font-size: ${fonts.size.f6};
  padding-top: 7em;
  margin: 0;
  color: ${colors.primary};
  text-align: center;
`;

const DrawerBodyAssociaLavoratoriRichiestaTcb = ({ 
    data, 
    buttons,
    updateTableDataCallback, 
    setOpenModalConferma
  }) => {
  const [{ openModal, titleModal, childrenModal }, setOpenModal] = useState({ openModal: false });

  const [checkBtnClicked, setCheckBtnClicked] = useState(false);
  const [openModalCV, setOpenModalCV] = useState(false);
  const [modalCVAnonymous, setModalCVAnonymous] = useState(false);

  const accettaOffertaLavoratore = useStatelessGraphQLRequest(AccettaOffertaLavoratoreMutation);
  const associaLavoratoreDomanda = useStatelessGraphQLRequest(AssociaLavoratoreDomandaMutation);
  const saveAnonymousPdfReq = useStatelessGraphQLRequest(saveAnonymousPdfMutation);
  const saveCompletePdfReq = useStatelessGraphQLRequest(saveCompletePdfMutation);

  const openModalCVA = () => {
    setModalCVAnonymous(true);
    setOpenModalCV(true);
  };

  const openModalCVC = () => {
    setModalCVAnonymous(false);
    setOpenModalCV(true);
  };

  const ModalHeader = ({ title }) => (
    <StyledModalHeader>
      <Text tag="h2" value={title} />
    </StyledModalHeader>
  );
  ModalHeader.displayName = 'ModalHeader';

  const ConfirmModal = ({ onClickConferma, onClickAnnulla }) => (
    <Row fluid>
      <Column xs="6" md="6" alignself="center">
        <Button
          color="primary"
          label="Conferma"
          value="Conferma"
          fontSize="f8"
          onClick={onClickConferma}
        />
      </Column>
      <Column xs="6" md="6" alignself="center">
        <Button
          color="primary"
          label="Annulla"
          value="Annulla"
          fontSize="f8"
          onClick={onClickAnnulla}
        />
      </Column>
    </Row>
  );
  ConfirmModal.displayName = 'ConfirmModal';

  const buttonData = [
    {
      text: 'Genera il CV del lavoratore in formato anonimo',
      buttonText: 'Genera Cv Anonimo',
      buttonType: buttons.GeneraCvAnonimo,
      buttonColor: 'primary',
      btnClick: () => openModalCVA(),
    },
    {
      text: 'Genera il CV del lavoratore completo con i dati di contatto',
      buttonText: 'Genera Cv Completo',
      buttonType: buttons.GeneraCvCompleto,
      buttonColor: 'primary',
      btnClick: () => openModalCVC(),
    },
    {
      text: "Disassocia il lavoratore dall'offerta",
      buttonText: 'Disassocia lavoratore',
      buttonType: buttons.DisassociaLavoratore,
      buttonColor: 'primary',
      btnClick: () => {
        setOpenModal({
          openModal: true,
          titleModal: 'Disassocia il lavoratore dalla domanda',
          childrenModal: (
            <DissociaLavoratoreModal
              setOpenModal={setOpenModal}
              data={data}
              updateTableDataCallback={updateTableDataCallback}
            />
          ),
        });
      },
    },
    {
      text: "Il lavoratore accetta l'offerta",
      buttonText: 'Accetta Offerta',
      buttonType: buttons.AccettaOfferta,
      buttonColor: 'primary',
      btnClick: () => {
        setOpenModal({
          openModal: true,
          titleModal: "Sei sicuro di voler accettare l'offerta per il lavoratore selezionato?",
          childrenModal: (
            <ConfirmModal
              onClickConferma={clickAccettaOffertaHandler}
              onClickAnnulla={() => setOpenModal({ openModal: false })}
            />
          ),
        });
      },
    },
    {
      text: 'Associa in maniera definitiva il lavoratore alla domanda in seguito agli accordi presi con il cittadino',
      buttonText: 'Associa Alla Domanda',
      buttonType: buttons.AssociaAllaDomanda,
      buttonColor: 'primary',
      btnClick: () => {
        setOpenModal({
          openModal: true,
          titleModal: 'Sei sicuro di voler associare il lavoratore alla domanda?',
          childrenModal: (
            <ConfirmModal
              onClickConferma={clickAssociaLavoratoreOffertaHandler}
              onClickAnnulla={() => setOpenModal({ openModal: false })}
            />
          ),
        });
      },
    },
  ];

  const clickAccettaOffertaHandler = () => {
    if (!checkBtnClicked) {
      setCheckBtnClicked(true);
      accettaOffertaLavoratore({
        input: {
          codiceRichiesta: data.codiceRichiesta,
          codiceLavoratore: data.codiceLavoratore,
        },
      }).then(() => {
        setCheckBtnClicked(false);
        setOpenModal({ openModal: false });
        updateTableDataCallback();
      });
    }
  };

  const clickAssociaLavoratoreOffertaHandler = () => {
    if (!checkBtnClicked) {
      setCheckBtnClicked(true);
      associaLavoratoreDomanda({
        input: {
          codiceRichiestaBase: data.codiceRichiestaBase,
          codiceRichiesta: data.codiceRichiesta,
          codiceLavoratore: data.codiceLavoratore,
          idServizio: data.idServizio,
        },
      }).then(() => {
        updateTableDataCallback();
        setCheckBtnClicked(false);
        //chiude modale
        setOpenModal({ openModal: false });
        //apre modale di conclusione dell'operazione
        setOpenModalConferma(true);
      });
    }
  };

  const isButtonDisabled = (buttonType, data) => {
    switch (buttonType) {
      case buttons.GeneraCvAnonimo:
      case buttons.GeneraCvCompleto:
      case buttons.DisassociaLavoratore:
        return data.isLavoratoreAssociato;
      case buttons.AccettaOfferta:
        return !(data.codiceDominioTcb === 5);
      case buttons.AssociaAllaDomanda:
        return !(data.codiceDominioTcb === 6);
      default:
        return true;
    }
  };

  return (
    <>
      {data ? (
        <StyledBody>
          {buttonData.map((btnData, index) => (
            <Row fluid key={index.toString()} padding="0 0 1em 0">
              <Column xs="7" md="7" padding="0" alignself="center">
                <Text
                  intlFormatter
                  tag="h1"
                  value={btnData.text}
                  color="black"
                  weight="bold"
                  transform="uppercase"
                  letterSpacing="0.05em"
                  marging="0 0 0.5em 0"
                  size="f8"
                />
              </Column>
              <Column xs="5" md="5" padding="0" alignself="center">
                <Button
                  disabled={isButtonDisabled(btnData.buttonType, data)}
                  color={btnData.buttonColor}
                  label={btnData.buttonText}
                  value={btnData.buttonText}
                  onClick={() => btnData.btnClick(btnData.buttonType)}
                  fontSize="f8"
                />
              </Column>
            </Row>
          ))}
        </StyledBody>
      ) : null}

      <ModaleCV
        open={openModalCV}
        setOpen={setOpenModalCV}
        idUtente={data && data.codiceLavoratore}
        title="SCARICA IL CV"
        label="CV inserito con successo, seleziona uno dei colori WeMi per la stampa del CV"
        titleButton="Clicca per scaricare il CV"
        anonymous={modalCVAnonymous}
        idServizio={data && data.idServizio}
        savePdfCallback={(pdfBase64) => {
          if (modalCVAnonymous) {
            saveAnonymousPdfReq({
              idUtenteLav: data.codiceLavoratore,
              pdfBase64,
            });
          } else {
            saveCompletePdfReq({
              idUtenteLav: data.codiceLavoratore,
              pdfBase64,
            });
          }
        }}
      />
      <Modal
        customModal
        header={() => (<ModalHeader title={titleModal}></ModalHeader>)}
        open={openModal}
        setOpenModal={setOpenModal}
        width="50%"
      >
        {childrenModal}
      </Modal>
    </>
  );
};

DrawerBodyAssociaLavoratoriRichiestaTcb.displayName = 'DrawerBodyAssociaLavoratoriRichiestaTcb';
export default withRouter(withAuthentication(DrawerBodyAssociaLavoratoriRichiestaTcb));
