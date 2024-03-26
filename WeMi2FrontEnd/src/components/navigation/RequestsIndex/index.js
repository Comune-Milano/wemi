/** @format */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { resetField } from 'redux-modules/actions/authActions';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { Wrapper, Filtri, RiepilogoRichiestaPagination } from './partials';
import {
  getBaseRequests,
  getEntiRequests,
  getTCBRequest,
} from './RequestIndexsGraphQL';
import Pagination from 'components/ui2/Pagination';
import DrawerVisualizza from './partials/DrawerVisualizza';
import { Row, Column } from 'components/ui/Grid'
import Modal from 'components/ui2/Modal';
import Button from 'components/ui2/Button';
import Text from 'components/ui/Text';
import Loader from 'components/ui2/Loader';
import { ENTE, TCB } from './constants';
import withAuthentication from 'hoc/withAuthentication';
import ModaleRiepilogoRichiesta from 'components/shared/ModaleRiepilogoRichiesta/ModaleRiepilogoRichiesta';
import { OpenModal } from 'redux-modules/actions/openModalInserimento';
import ModalRichiestaAnnullamento from './partials/ModalRichiestaAnnullamento'; 

const RequestsIndex = ({
  richiestaInoltrata,
  resetField,
  openModalInserimento,
  userProfile,
  OpenModal: setOpenModalInserimento,
  locale
}) => {
  const { datiLogin } = userProfile;
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalAnnullamento, setOpenModalAnnullamento] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (richiestaInoltrata) {
      setOpen(true);
      resetField('ServizioBaseAdd');
    }
  }, [richiestaInoltrata])

  useEffect(() => {
    if (openModalInserimento && openModalInserimento.open) {
      setOpen(true);
      resetField('openModalInserimento');
    }
  }, [openModalInserimento])


  const [filtri, setFiltri] = useState({
    dataDa: null,
    dataAl: null,
    statoRichiesta: { id: undefined, value: 'Tutti gli stati' },
    tipologiaServizio: { id: '0', value: 'Tutte le tipologie' },
  });

  const [richiesteBase, loadRichiesteBase] = useGraphQLRequest(
    [],
    getBaseRequests,
    {
      idUtente: datiLogin.idCittadino,
      numeroElementi: 0,
    },
    true,
  );

  const [richiesteEnte, loadRichiesteEnte] = useGraphQLRequest(
    [],
    getEntiRequests,
    null,
    false,
  );

  const [richiestaTCB, loadRichiestaTCB] = useGraphQLRequest(
    null,
    getTCBRequest,
    null,
    false,
  );

  const [drawerData, setDrawerData] = useState({
    rowClickedData: null,
    openDrawer: false,
    requestType: null,
  });

  const resetDrawerData = () => {
    setDrawerData({
      rowClickedData: null,
      openDrawer: false,
      requestType: null,
    });
  }

  const [open, setOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState();


  const getModalInfo = (info) => {
    setModalInfo(info);
    setOpenModal(true);
  };


  const elementsToShow = 5;

  const listaServiziSize = richiesteBase.data.length > 0 ? richiesteBase.data[0].count : 0;

  const calcolaNumeroElementi = (pagina) => ((pagina - 1) * elementsToShow)

  const manageFiltri = (filtri) => {
    setFiltri(filtri);
    const statoRichiesta = filtri.statoRichiesta.id;
    const tipologiaServizio = filtri.tipologiaServizio.id > 0 ? filtri.tipologiaServizio.id.toString() + '' : null;
    const from = filtri.dataDa !== null ? filtri.dataDa : undefined;
    const to = filtri.dataAl !== null ? filtri.dataAl : undefined;
    setCurrentPage(1);
    loadRichiesteBase({
      from,
      to,
      statoRichiesta,
      tipologiaServizio,
      idUtente: datiLogin.idCittadino,
      numeroElementi: calcolaNumeroElementi(1),
    });
  };

  const handleRowClick = index => {
    const row = richiesteBase.data[index];
    const requestType = row.requestType === TCB ? TCB : ENTE;
    if (requestType === TCB) {
      loadRichiestaTCB({
        idRichiestaServizioBase: row.idRichiestaBase,
      });
    } else {
      loadRichiesteEnte({
        idRichiestaServizioBase: row.idRichiestaBase,
      });
    }
    setDrawerData({
      rowClickedData: row,
      requestType,
      openDrawer: true,
    });
  };

  const paginationCallback = (numero) => {
    const statoRichiesta = filtri.statoRichiesta.id;
    const tipologiaServizio = filtri.tipologiaServizio.id > 0 ? filtri.tipologiaServizio.id.toString() : null;
    const from = filtri.dataDa !== null ? filtri.dataDa : undefined;
    const to = filtri.dataAl !== null ? filtri.dataAl : undefined;
    loadRichiesteBase({
      from,
      to,
      statoRichiesta,
      tipologiaServizio,
      idUtente: datiLogin.idCittadino,
      numeroElementi: calcolaNumeroElementi(numero),
    });
  };
  const modaleBody = (
    <Row fluid justifycontent="center">
      <Column xs="12" justifycontent="center">
        <Text tag="p" size="f7" align="center" value={"Gli enti che hai scelto risponderanno a breve."}></Text>
        <Text tag="p" size="f7" align="center" value={"Hai ricevuto un'email con i dettagli della tua richiesta."}></Text>
      </Column>
      <Column xs="12" justifycontent="center" flex>
        <Button
          autowidth
          label="Visualizza lo storico delle richieste"
          onClick={() => { setOpen(false); setOpenModalInserimento({ open: false }); }}
        />
      </Column>
    </Row>
  );
  const modaleBodyTCB = (
    <Row fluid justifycontent="center">
      <Column xs="12" justifycontent="center">
        <Text tag="p" size="f7" align="center" value={`WeMi selezionerà per te tre proﬁli di ${openModalInserimento.nomeServizio} che rispondono al meglio alle tue necessità e ti invierà i loro CV via e-mail. `}></Text>
        <Text tag="p" size="f7" align="center" value={"Hai ricevuto un'email con i dettagli della tua richiesta."}></Text>
      </Column>
      <Column xs="12" justifycontent="center" flex>
        <Button
          autowidth
          label="Visualizza lo storico delle richieste"
          onClick={() => { setOpen(false); setOpenModalInserimento({ open: false });}}
        />
      </Column>
    </Row>
  );

  return (
    <>
      <Wrapper>
        <Filtri filtri={filtri} setFiltri={manageFiltri} />
        <Modal
          open={open}
          width="50%"
          setOpenModal={() => { setOpen(false); setOpenModalInserimento({ open: false }); }}
          color="primary"
          title="la tua richiesta è stata inviata"
          children={openModalInserimento && openModalInserimento.open ? modaleBodyTCB : modaleBody}
        ></Modal>
        {
          !richiesteBase.isLoading ? richiesteBase.data.length > 0 ?
            (
              <>
                <RiepilogoRichiestaPagination
                  listaRichieste={richiesteBase.data}
                  handleRowClick={handleRowClick}
                />
                <Row fluid justifycontent="center">
                  <Pagination
                    margin="2.5em 0 0 0"
                    callback={paginationCallback}
                    navNumber={10}
                    json={richiesteBase.data}
                    currentPage={currentPage}
                    count={listaServiziSize}
                    numberitem={elementsToShow}
                    setCurrentPage={setCurrentPage}
                  />
                </Row>
                <DrawerVisualizza
                  data={drawerData}
                  getModalInfo={getModalInfo}
                  setOpenModalAnnullamento={setOpenModalAnnullamento}
                  requestState={drawerData.requestType === TCB ? richiestaTCB : richiesteEnte}
                  closeDrawer={resetDrawerData}
                />


              </>
            )
            :
            <Text tag="div" value='Nessun risultato' intlFormatter size='f6' margin="4em 0" />
            :
            <Loader margin="3em auto 20em auto" size="5em" />

        }
      </Wrapper>
      {openModal ? (
        <ModaleRiepilogoRichiesta
          openModal={openModal}
          setOpenModal={setOpenModal}
          idRichiestaTcb={modalInfo.idRichiestaTCB}
          idServizio={modalInfo.idServizio}
          locale={locale}
        />
      ) : null}
      <ModalRichiestaAnnullamento
        open={openModalAnnullamento}
        setOpen={setOpenModalAnnullamento}
      />
    </>
  )
}

RequestsIndex.displayName = "Riepilogo storico richieste";

const mapDispatchToProps = {
  resetField,
  OpenModal
};
const mapStoreToProps = store => ({
  richiestaInoltrata: store.graphql.ServizioBaseAdd,
  openModalInserimento: store.openModalInserimento,
  locale: store.locale

});

export default connect(
  mapStoreToProps,
  mapDispatchToProps,
)(withAuthentication(RequestsIndex));

