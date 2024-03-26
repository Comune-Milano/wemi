import React, { useState } from 'react';
import { withRouter, generatePath } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import media from 'utils/media-queries';
import Modal from 'components/ui2/Modal';
import { colors, fonts } from 'theme';
import withAuthentication from 'hoc/withAuthentication';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { PUBLIC_URL, PAGE_FEEDBACK_LAVORATORE_ADMIN_URL, PAGE_FEEDBACK_TCB_URL, PAGE_ADMIN_FEEDBACK_TCB_URL } from 'types/url';
import { PAGE_TCB_ADMIN_ERI_002 } from 'types/path';
import {
  ChiusuraNegativaModal,
  ChiusuraPositivaModal,
  DissociaLavoratoriModal,
} from './modals';
import {
  InvioEmailValutazioneWemiCittadino as InvioEmailValutazioneWemiCittadinoM,
  InvioEmailValutazioneLavoratoreCittadino as InvioEmailValutazioneLavoratoreCittadinoM,
  AssociaLavoratoreStatoDomanda as AssociaLavoratoreStatoDomandaMutation,
} from '../../../backofficeTcbRichiesteGraphQL';
import moment from 'moment';

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

const DrawerBodyRichiesteTcb = ({ data, richiesteTcbButtonsTypes, updateTableDataCallback, setOpenDrawer, userProfile, history }) => {
  const invioEmailValutazioneWemiCittadino = useStatelessGraphQLRequest(InvioEmailValutazioneWemiCittadinoM);
  const invioEmailValutazioneLavoratoreCittadino = useStatelessGraphQLRequest(InvioEmailValutazioneLavoratoreCittadinoM);
  const associaLavoratoreStatoDomanda = useStatelessGraphQLRequest(AssociaLavoratoreStatoDomandaMutation);

  const [{ openModal, titleModal, childrenModal }, setOpenModal] = useState({ openModal: false });

  const [isPendingOperation, setIsPending] = useState(false);

  const firstReviewByProg = data && data.recensioniEnte.find(el => el.progressivoRichiesta === 1);
  const [firstReviewByOrder] = (data && data.recensioniEnte) || [];

  const ModalHeader = ({ title }) =>
  (
    <StyledModalHeader>
      <Text tag="h2" value={title} />
    </StyledModalHeader>
  );
  ModalHeader.displayName = 'ModalHeader';

  const buttonData = [
    {
      text: 'Modifica Domanda',
      buttonText: 'Modifica Domanda',
      buttonType: richiesteTcbButtonsTypes.ModificaDomanda,
      buttonColor: "primary",
      btnClick: (btnType) => {
        history.push(`${PUBLIC_URL}/admin/ModificaDomandaTCB/${data.codiceRichiesta}/${data.idServizio}`, { isFromBackoffice: true });
      },
    },
    {
      text: 'Associa domanda al lavoratore',
      buttonText: 'Ricerca e associa lavoratori',
      buttonType: richiesteTcbButtonsTypes.AssociaLavoratore,
      buttonColor: 'primary',
      btnClick: async () => {
        if (data.codiceDominioTcb === 10) {
          await setIsPending(true);
          await associaLavoratoreStatoDomanda({
            input: {
              codiceRichiestaBase: data.codiceRichiestaBase,
              codiceRichiesta: data.codiceRichiesta,
            },
          });
          await setIsPending(false);
        }
        history.push(`${PUBLIC_URL}/admin/matchingDomandaLavoratore/${data.codiceRichiesta}`);
      },
    },
    {
      text: 'Gestione stato associazioni lavoratori alla domanda',
      buttonText: 'Gestione associazioni Lav.',
      buttonType: richiesteTcbButtonsTypes.GestioneAssociazioniLavoratori,
      buttonColor: 'primary',
      btnClick: (btnType) => {
        const pathAssociaDomandaOfferta = generatePath(
          PAGE_TCB_ADMIN_ERI_002,
          { idRichiesta: data.codiceRichiesta }
        );
        history.push(pathAssociaDomandaOfferta);
      },
    },
    {
      text: 'Disassocia tutti i lavoratori abbinati alla domanda',
      buttonText: 'Dissocia tutti i lavoratori',
      buttonType: richiesteTcbButtonsTypes.Disassocia,
      buttonColor: 'red',
      btnClick: (btnType) => {
        setOpenModal({
          openModal: true,
          titleModal: 'Disassocia lavoratori dalla domanda',
          childrenModal: (
            <DissociaLavoratoriModal
              setOpenModal={setOpenModal}
              data={data}
              updateTableDataCallback={updateTableDataCallback}
              userProfile={userProfile}
            />
          ),
        });
      },
    },
    {
      text: 'Nota di chiusura positiva della domanda',
      buttonText: 'Nota chiusura positiva domanda',
      buttonType: richiesteTcbButtonsTypes.NotaChiusuraPositivaDomanda,
      buttonColor: 'primary',
      btnClick: () => {
        setOpenModal({
          openModal: true,
          titleModal: `Chiusura positiva domanda TCB ${data.codiceRichiesta} del ${data.dataRichiesta ? moment(data.dataRichiesta).format('DD-MM-YYYY') : 'non definita'}`,
          childrenModal: (
            <ChiusuraPositivaModal
              setOpenModal={setOpenModal}
              data={data}
              updateTableDataCallback={updateTableDataCallback}
              userProfile={userProfile}
            />
          ),
        });
      },
    },
    {
      text: data && data.statoChiusuraRichiesta ? 'Visualizza motivo della chiusura negativa della richiesta' : 'Chiudi la domanda con esito negativo',
      buttonText: data && data.statoChiusuraRichiesta ? 'Visualizza motivo chiusura' : 'Chiudi Negativo',
      buttonType: richiesteTcbButtonsTypes.ChiudiNegativo,
      buttonColor: 'red',
      btnClick: (btnType) => {
        setOpenModal({
          openModal: true,
          titleModal: `Chiusura negativa domanda TCB ${data.codiceRichiesta} del ${data.dataRichiesta ? moment(data.dataRichiesta).format('DD-MM-YYYY') : 'non definita'}`,
          childrenModal: (
            <ChiusuraNegativaModal
              setOpenModal={setOpenModal}
              data={data}
              updateTableDataCallback={updateTableDataCallback}
              userProfile={userProfile}
            />
          ),
        });
      },
    },
    {
      text: firstReviewByProg &&
        (firstReviewByProg.statoRecensioneWemi === 1 ||
          firstReviewByProg.statoRecensioneWemi === 2 ||
          firstReviewByProg.statoRecensioneWemi === 3) ?
        'Visualizza valutazione WeMi' :
        'Richiesta valutazione WeMi al cittadino',
      buttonText: firstReviewByProg &&
        (firstReviewByProg.statoRecensioneWemi === 1 ||
          firstReviewByProg.statoRecensioneWemi === 2 ||
          firstReviewByProg.statoRecensioneWemi === 3) ?
        'Visualizza valutazione WeMi' :
        'Richiesta valutazione WeMi',
      buttonType: richiesteTcbButtonsTypes.RichiestaValutazioneWeMi,
      buttonColor: 'primary',
      btnClick: async (btnType) => {
        if (firstReviewByProg &&
          (firstReviewByProg.statoRecensioneWemi === 1 ||
            firstReviewByProg.statoRecensioneWemi === 2 ||
            firstReviewByProg.statoRecensioneWemi === 3)) {
          const path = generatePath(PAGE_ADMIN_FEEDBACK_TCB_URL, { idRichiesta: data.codiceRichiesta });
          history.push(path, {
            isFromBackoffice: true,
          });
        } else {
          invioEmailValutazioneWemiCittadino({
            codiceRichiesta: data.codiceRichiesta,
          }).then(() => {
            setOpenDrawer({ openDrawer: false });
            updateTableDataCallback();
          });
        }
      },
    },
    {
      text: 'Richiesta valutazione sul lavoratore',
      buttonText: 'Richiesta valutazione Lav.',
      buttonType: richiesteTcbButtonsTypes.RichiestaValutazioneLavoratori,
      buttonColor: 'primary',
      btnClick: async (btnType) => {
        if (data.lavoratoriAssociati) {
          const lavAssociato = data.lavoratoriAssociati.find(el => el.statoAssociazione === 1);
          if (lavAssociato) {
            invioEmailValutazioneLavoratoreCittadino({
              codiceRichiesta: data.codiceRichiesta,
              idLavoratore: lavAssociato ? lavAssociato.idLavoratore : null,
            }).then(() => {
              setOpenDrawer({ openDrawer: false });
              updateTableDataCallback();
            });
          }
        }
      },
    },
  ];

  if ((data && data.recensioniEnte && data.recensioniEnte.length > 1) ||
    (firstReviewByOrder && (firstReviewByOrder.statoRecensioneLavoratore === 2 || firstReviewByOrder.statoRecensioneLavoratore === 3))) {
    buttonData.push({
      text: 'Visualizza valutazione Lavoratore',
      buttonText: 'Visualizza valutazione Lavoratore',
      buttonType: richiesteTcbButtonsTypes.VisualizzaValutazioneLavoratore,
      buttonColor: 'primary',
      btnClick: async (btnType) => {
        const idLavoratore = data.lavoratoriAssociati.find(el => el.statoAssociazione === 1).idLavoratore;
        const path = generatePath(PAGE_FEEDBACK_LAVORATORE_ADMIN_URL, { idRichiesta: data.codiceRichiesta });
        history.push(path, {
          isFromBackoffice: true,
          idLavoratore,
        });
      },
    });
  }

  const isButtonDisabled = (buttonType, data) => {
    // - 0 bozza
    // - 10 inoltrata
    // - 11 in gestione
    // - 12 chiusa con esito positivo
    // - 13 chiusa con esito negativo
    // - 14 annullata dal cittadino
    switch (buttonType) {
      case richiesteTcbButtonsTypes.AssociaLavoratore:
        return !(data.codiceDominioTcb === 10 || data.codiceDominioTcb === 11);
      case richiesteTcbButtonsTypes.NotaChiusuraPositivaDomanda:
        return !(data.codiceDominioTcb === 12);
      case richiesteTcbButtonsTypes.ChiudiNegativo:
        return !(data.codiceDominioTcb === 0 || data.codiceDominioTcb === 10 || data.codiceDominioTcb === 11 || data.codiceDominioTcb === 13 || data.codiceDominioTcb === 14);
      case richiesteTcbButtonsTypes.Disassocia:
        return !(data.codiceDominioTcb === 11);
      case richiesteTcbButtonsTypes.RichiestaValutazioneWeMi:
        return !(data.codiceDominioTcb === 12 || data.codiceDominioTcb === 13) ||
          !(!firstReviewByProg.statoRecensioneWemi || firstReviewByProg.statoRecensioneWemi === 2 ||
            firstReviewByProg.statoRecensioneWemi === 3);
      case richiesteTcbButtonsTypes.ModificaDomanda:
        return !(data.codiceDominioTcb === 0 || data.codiceDominioTcb === 10 || data.codiceDominioTcb === 11 || data.codiceDominioTcb === 12);
      case richiesteTcbButtonsTypes.GestioneAssociazioniLavoratori:
        return !(data.codiceDominioTcb === 11 || data.codiceDominioTcb === 12);
      case richiesteTcbButtonsTypes.RichiestaValutazioneLavoratori:
        return !(data.codiceDominioTcb === 12);
      case richiesteTcbButtonsTypes.VisualizzaValutazioneLavoratore:
        return false;
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
                  disabled={isButtonDisabled(btnData.buttonType, data) || isPendingOperation}
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

      <Modal
        customModal
        header={() => (<ModalHeader title={titleModal}></ModalHeader>)}
        open={openModal}
        setOpenModal={setOpenModal}
        width="60%"
      >
        {childrenModal}
      </Modal>
    </>
  );
};

DrawerBodyRichiesteTcb.displayName = 'DrawerBodyRichiesteTcb';
export default withRouter(withAuthentication(DrawerBodyRichiesteTcb));
