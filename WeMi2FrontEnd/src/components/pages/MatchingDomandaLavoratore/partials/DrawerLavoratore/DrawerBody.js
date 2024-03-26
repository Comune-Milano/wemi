import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import { withRouter, generatePath } from 'react-router';
import { PAGE_TCB_ADMIN_ECA_002_URL, PAGE_MODIFICA_CANDIDATURA_TCB_ADMIN_URL, PAGE_TCB_ADMIN_ERI_002 } from 'types/url';
import withAuthentication from 'hoc/withAuthentication';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import connectContext from 'hoc/connectContext';
import ModaleCV from 'components/shared/ModaleCV';
import { convertObjectToBin } from 'components/ui2/WeekCalendarTimePicker/utils/converter';
import { MatchingLavoratoreContext } from '../../utils/MatchingLavoratoreContext';
import { ErrorModal } from './ErrorModal';
import { saveCompletePdf, saveAnonymousPdf, matchWorker, unmatchWorker } from '../../graphql';
import { SuccessModal } from './SuccessModal';
import { mapLabelToProps, mapFiltersTableToProps } from '../../utils/mapLabelToProps';
import { labelCalendario, labelTipologiaOrario } from '../../labels';
import { STATI_ASSOCIAZIONE, MAX_NUMERO_ASSOCIAZIONI } from '../../constants/stato_associazione';

const Body = ({
  history,
  userProfile,
  worker,
  domandaTCB,
  filterProps,
  filtersTable,
  ricercaLavoratori,
  flagCalendario,
  setContextState,
  contextState,
 }) => {
  const [openErrorModal, setOpenErrorModal] = useState({ open: false, message: '' });

  const [openSuccessModal, setOpenSuccessModal] = useState({ open: false, message: '', callback: () => { } });

  const [modaleCv, setOpenModaleCv] = useState({ openModaleCv: false, anonymous: false });

  const { datiLogin: { idCittadino } } = userProfile;

  const { idRichiesta } = domandaTCB;

  const associaLavoratore = useStatelessGraphQLRequest(
    matchWorker
  );

  const disassociaLavoratore = useStatelessGraphQLRequest(
    unmatchWorker
  );

  const saveCompletePdfReq = useStatelessGraphQLRequest(
    saveCompletePdf
  );

  const saveAnonymousPdfReq = useStatelessGraphQLRequest(
    saveAnonymousPdf
  );

  const { statoAssociazione, countLavoratoriAssociati, lavoratoreAssociato } = worker;

  const buttons = [
    {
      label: 'Modifica la candidatura',
      labelButton: 'Modifica',
      actionButton: () => {
        const pathToEditCandidacy = generatePath(PAGE_MODIFICA_CANDIDATURA_TCB_ADMIN_URL, { idLavoratore: worker.idLavoratore });

        history.push(pathToEditCandidacy, { idRichiesta });
      },
    },
    {
      label: 'Abbina provvisoriamente il lavoratore alla domanda',
      labelButton: 'Abbina provvisoriamente a domanda',
      actionButton: async () => {
        try {
          await associaLavoratore({
            idLavoratore: worker.idLavoratore,
            idRichiesta,
          });

          const filtersPopup = mapLabelToProps(filterProps);
          const filtersTabella = mapFiltersTableToProps(filtersTable);

          const callback = async () => {
            setContextState({ ...contextState, lavoratori: null, dataReadyLavoratore: false });
            const ricerca = await ricercaLavoratori({
              parameters: {
                ...filtersPopup,
                ...filtersTabella,
                calendario: flagCalendario ? convertObjectToBin(filtersPopup[labelCalendario]) : undefined,
              },
              offset: 0,
              idRichiesta,
            });
            setContextState({ ...contextState, lavoratori: ricerca, dataReadyLavoratore: true, currentPage: 1 });
          };

          setOpenSuccessModal({
            open: true,
            message: 'Associazione del lavoratore alla domanda eseguita',
            callback });
        } catch (error) {
          setOpenErrorModal({ message: error.message, open: true });
        }
      },
      disabled:
      (statoAssociazione === STATI_ASSOCIAZIONE.ASSOCIATO
      || statoAssociazione === STATI_ASSOCIAZIONE.DISPONIBILITA_RICHIEDERE
      || statoAssociazione === STATI_ASSOCIAZIONE.DISPONIBILITA_OTTENUTA)
      || countLavoratoriAssociati >= MAX_NUMERO_ASSOCIAZIONI
      || lavoratoreAssociato,
    },
    {
      label: 'Disabbina il lavoratore alla domanda',
      labelButton: 'Disabbina a domanda',
      actionButton: async () => {
        try {
          await disassociaLavoratore({
            idLavoratore: worker.idLavoratore,
            idRichiesta,
          });

          const filtersPopup = mapLabelToProps(filterProps);
          const filtersTabella = mapFiltersTableToProps(filtersTable);


          const callback = async () => {
            setContextState({ ...contextState, lavoratori: null, dataReadyLavoratore: false });
            const ricerca = await ricercaLavoratori({
              parameters: {
                ...filtersPopup,
                ...filtersTabella,
                calendario: flagCalendario ? convertObjectToBin(filtersPopup[labelCalendario]) : undefined,
              },
              offset: 0,
              idRichiesta,
            });
            setContextState({ ...contextState, lavoratori: ricerca, dataReadyLavoratore: true, currentPage: 1 });
          };

          setOpenSuccessModal({
            open: true,
            message: 'Disassociazione del lavoratore dalla domanda eseguita',
            callback,
          });
        } catch (error) {
          setOpenErrorModal({ message: error.message, open: true });
        }
      },
      disabled: (statoAssociazione !== STATI_ASSOCIAZIONE.DISPONIBILITA_RICHIEDERE
        || lavoratoreAssociato),
        // && statoAssociazione !== STATI_ASSOCIAZIONE.DISPONIBILITA_OTTENUTA,
    },
    {
      label: 'Apri pagina gestione associazioni',
      labelButton: 'Gestione associazioni',
      actionButton: () => {
        const pathToOpportunityHistory = generatePath(
          PAGE_TCB_ADMIN_ERI_002,
          { idRichiesta }
        );
        history.push(pathToOpportunityHistory, { 
          isFromMatching: true,
          idRichiesta,
        });
      },
    },
    {
      label: 'Apre pagina storico opportunità',
      labelButton: 'Storico Opportunità',
      actionButton: () => {
        const pathToOpportunityHistory = generatePath(PAGE_TCB_ADMIN_ECA_002_URL, { idLavoratore: worker.idLavoratore });

        history.push(pathToOpportunityHistory, { idRichiesta });
      },
    },
    {
      label: 'Genera CV in formato anonimo',
      labelButton: 'Genera CV anonimo',
      actionButton: () => {
        setOpenModaleCv({ openModaleCv: true, anonymous: true });
      },
    },
    {
      label: 'Genera CV completo con dati di contatto',
      labelButton: 'Genera CV Completo',
      actionButton: () => {
        setOpenModaleCv({ ...modaleCv, openModaleCv: true });
      },
    },
  ];


  const { open: errorOpen, message: errorMessage } = openErrorModal;

  const { open: successOpen, message: successMessage, callback } = openSuccessModal;

  const title = 'SCARICA IL CV';

  const titleButton = 'Clicca per scarica CV';

  const label = 'CV inserito con successo, seleziona uno dei colori WeMi per la stampa del CV';

  const { openModaleCv, anonymous } = modaleCv;

  return (
    <>
      <ErrorModal
        open={errorOpen}
        setOpenErrorModal={setOpenErrorModal}
        message={errorMessage}
      />
      <SuccessModal
        open={successOpen}
        setOpenSuccessModal={setOpenSuccessModal}
        message={successMessage}
        callback={callback}
      />
      <ModaleCV
        idUtente={worker.idLavoratore}
        setOpen={setOpenModaleCv}
        open={openModaleCv}
        title={title}
        titleButton={titleButton}
        label={label}
        anonymous={anonymous}
        idServizio={worker.idServizioRichiesta}
        savePdfCallback={(pdfBase64) => {
          if (anonymous) {
            saveAnonymousPdfReq({
              idUtenteLav: worker.idLavoratore,
              pdfBase64,
            });
          } else {
            saveCompletePdfReq({
              idUtenteLav: worker.idLavoratore,
              pdfBase64,
            });
          }
        }}
      />
      <Row fluid>
        <Column xs="12" padding="1.5em">
          {buttons.map(button => (
            <Row key={button.labelButton} fluid display="flex" justifycontent="space-between" alignitems="center">
              <Column xs="7" padding="0.3em" justifycontent="flex-start">
                <Text
                  value={button.label}
                  fontSize="f8"
                  color="black"
                  tag="strong"
                  align="start"
                />
              </Column>
              <Column xs="5" padding="0.3em">
                <Button
                  color="green"
                  label={button.labelButton}
                  onClick={button.actionButton}
                  fontSize="f8"
                  disabled={button.disabled}
                />
              </Column>
            </Row>
            ))}
        </Column>
      </Row>
    </>
  );
};

Body.displayName = 'Body';

const mapContextToProps = (context) => ({
  domandaTCB: context.contextState.dataDomandaTCB,
  filterProps: context.contextState.popupFilters,
  flagCalendario: context.contextState.calendario,
  filtersTable: context.contextState.filtersTable,
  ricercaLavoratori: context.ricercaLavoratori,
  setContextState: context.setContextState,
  contextState: context.contextState,
});

export const DrawerBody = connectContext(MatchingLavoratoreContext, mapContextToProps)(withAuthentication(withRouter(Body)));
