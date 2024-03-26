import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import media from 'utils/media-queries';
import withAuthentication from 'hoc/withAuthentication';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import ModaleCV from 'components/shared/ModaleCV';
import {
  saveCompletePdf as saveCompletePdfQ,
  saveAnonymousPdf as saveAnonymousPdfQ,
  InvioEmailPromemoriaDisponibilita as InvioEmailPromemoriaDisponibilitaQ,
} from '../TCB_ADMIN_ECA_001GraphQL';

const StyledBody = styled.div`
  padding: 3em 3em;

  ${media.md`
    padding: 3em 6em;
  `}
`;

const DrawerBodyCandidatureTcb = ({ data, updateTableDataCallback, setOpenDrawer, setOpenInfoMessageModal, userProfile, history }) => {
  const saveAnonymousPdfReq = useStatelessGraphQLRequest(
    saveAnonymousPdfQ
  );
  const saveCompletePdfReq = useStatelessGraphQLRequest(
    saveCompletePdfQ,
  );
  const [openModalCV, setOpenModalCV] = useState(false);
  const [modalCVAnonymous, setModalCVAnonymous] = useState(false);
  const invioEmailPromemoriaDisponibilita = useStatelessGraphQLRequest(InvioEmailPromemoriaDisponibilitaQ);

  const openModalCVA = () => {
    setModalCVAnonymous(true);
    setOpenModalCV(true);
  };

  const openModalCVC = () => {
    setModalCVAnonymous(false);
    setOpenModalCV(true);
  };

  const buttonData = [];

  if (data) {
    buttonData.push(
      {
        text: 'Modifica la candidatura',
        buttonText: 'Modifica Candidatura',
        buttonColor: 'primary',
        disabled: false,
        btnClick: () => {
          history.push(`/admin/ModificaCandidaturaLavoratore/${data.idLavoratore}`);
        },
      },
      {
        text: 'Genera il CV anonimo',
        buttonText: 'Genera CV Anonimo',
        buttonColor: 'primary',
        disabled: false,
        btnClick: () => { openModalCVA(); },
      },
      {
        text: 'Genera il CV completo',
        buttonText: 'Genera CV Completo',
        buttonColor: 'primary',
        disabled: false,
        btnClick: () => { openModalCVC(); },
      },
      {
        text: 'Inoltra il promemoria di aggiornamento disponibilità',
        buttonText: 'Inoltra promemoria disponibilità',
        buttonColor: 'primary',
        disabled: false,
        btnClick: () => {
          invioEmailPromemoriaDisponibilita({
            idLavoratore: data.idLavoratore,
          }).then((result) => {
            setOpenDrawer({ openDrawer: false });

            if (result) {
              setOpenInfoMessageModal({
                open: true,
                title: 'Inoltro email promemoria di aggiornamento disponibilità',
                message: 'Inoltro promemoria di aggiornamento disponibilità inoltrato correttamente.',
              });
            }
          });
        },
      },
      {
        text: 'Storico opportunità',
        buttonText: 'Storico Opportunità',
        buttonColor: 'primary',
        disabled: false,
        btnClick: () => {
          history.push(`/admin/r/StoricoLavoratore/${data.idLavoratore}`);
        },
      }
    );
  }

  const title = 'SCARICA IL CV';
  const titleButton = 'Clicca per scaricare il CV';
  const label = 'CV inserito con successo, seleziona uno dei colori WeMi per la stampa del CV';

  return (
    <>
      {data ? (
        <StyledBody>
          {
            <ModaleCV
              open={openModalCV}
              setOpen={setOpenModalCV}
              idUtente={data.idLavoratore}
              title={title}
              label={label}
              titleButton={titleButton}
              anonymous={modalCVAnonymous}
              savePdfCallback={(pdfBase64) => {
                if (modalCVAnonymous) {
                  saveAnonymousPdfReq({
                    idUtenteLav: data.idLavoratore,
                    pdfBase64,
                  });
                } else {
                  saveCompletePdfReq({
                    idUtenteLav: data.idLavoratore,
                    pdfBase64,
                  });
                }
              }}
            />
          }
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
                  color={btnData.buttonColor}
                  label={btnData.buttonText}
                  value={btnData.buttonText}
                  onClick={btnData.btnClick}
                  disabled={btnData.disabled}
                  fontSize="f8"
                />
              </Column>
            </Row>
            ))}
        </StyledBody>
      ) : null}
    </>
  );
};

DrawerBodyCandidatureTcb.displayName = 'DrawerBody';
export default withRouter(withAuthentication(DrawerBodyCandidatureTcb));
