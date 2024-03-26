import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Column, Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Table from 'components/ui/Table';
import { colors } from 'theme';
import ButtonIcon from 'components/ui2/FaIcon/ButtonIcon';
import Drawer from 'components/ui2/Drawer';
import { withRouter } from 'react-router-dom';
import Button from 'components/ui2/Button';
import withAuthentication from 'hoc/withAuthentication';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import Header from 'components/ui2/Header';
import ModaleRiepilogo from "components/navigation/CandidaturaLavoratoreTCB/partials/ModaleRiepilogo";
import ModaleRiepilogoRichiesta from 'components/shared/ModaleRiepilogoRichiesta/ModaleRiepilogoRichiesta';
import { connect } from 'react-redux';
import { getNomeServizioTCB } from 'utils/functions';
import moment from 'moment';
import {
  DrawerHeaderAssociaLavoratoriRichiestaTcb,
  DrawerBodyAssociaLavoratoriRichiestaTcb,
} from './partials/DrawerAssociaLavoratoriRichesteTcb/partials';
import {
  EstraiLavoratoriAssociatiRichiestaTcb as EstraiLavoratoriAssociatiRichiestaTcbQ,
  ConfermaAssociazioneLavoratoriDomande as ConfermaAssociazioneLavoratoriDomandeMutation,
  EstraiDatiAssociaLavoratoriRichiesta as EstraiDatiAssociaLavoratoriRichiestaQ,
} from './backofficeTcbAssociaLavoratoriRichiestaGraphQL';
import ModaleConfermaOperazione from '../TCB_ADMIN_ERI_002/partials/modals/ModaleConfermaOperazione';

const HeaderAssociaLavoratori = styled(Row)`
  display: flex;
  justify-content: center;
  border: 1px solid #add8e6;
  border-radius: 15px 15px 15px 15px;
  text-align: center;

  @media (max-width: 576px) {
    flex-wrap: unset;
  }
`;

const IdRichiestaText = styled(Text)`
 :hover {
    color: rgb(55, 190, 255)
 },
`;

const BackofficeTcbAssociaLavoratoriRichiesta = ({ locale, history, match, userProfile }) => {
  const performRequestEstraiDatiAssociaLavoratoriRichiesta = useStatelessGraphQLRequest(EstraiDatiAssociaLavoratoriRichiestaQ);

  const performRequestEstraiLavoratoriAssociatiRichiestaTcb = useStatelessGraphQLRequest(EstraiLavoratoriAssociatiRichiestaTcbQ);

  const [estraiDatiAssociaLavoratoriRichiesta, setEstraiDatiAssociaLavoratoriRichiesta] = useState({});
  const [estraiLavoratoriAssociatiRichiestaTcb, setEstraiLavoratoriAssociatiRichiestaTcb] = useState();
  const [openModalConferma, setOpenModalConferma] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    Promise.all([
      performRequestEstraiDatiAssociaLavoratoriRichiesta({
        idRichiesta: +match.params.idRichiesta,
        locale: `{${locale}}`,
      }),
      performRequestEstraiLavoratoriAssociatiRichiestaTcb({
        codiceRichiesta: +match.params.idRichiesta,
        locale: `{${locale}}`,
      }),
    ]).then(([datiAssociaLavoratoriRichiesta, datiLavoratoriAssociatiRichiestaTcb]) => {
      setEstraiDatiAssociaLavoratoriRichiesta(datiAssociaLavoratoriRichiesta);

      setConfermaDisabled(!datiLavoratoriAssociatiRichiestaTcb.some(el => el.codiceDominioTcb === 5));
      const tableData = datiLavoratoriAssociatiRichiestaTcb.map(row => ({
        idLavoratore: (
          <Text
            intlFormatter
            tag="h1"
            value={row.codiceLavoratore}
            style={{
              cursor: 'pointer',
              fontSize: '.9rem',
              fontWeight: 'normal',
              color: '#005CB9',
            }}
            onClick={() => setOpenModalRiepilogoLavoratore({
              openModalRiepilogoLavoratore: !openModalRiepilogoLavoratore,
              idLavoratore: row.codiceLavoratore,
            })}
          />
        ),
        nome: row.nome,
        cognome: row.cognome,
        eta: row.eta,
        nazionalita: row.nazionalita,
        statoAssociazione: (
          <>
            <Text
              intlFormatter
              tag="h1"
              size="f7_5"
              weight="normal"
              transform="none"
              value={row.statoAssociazione}
            />
            {row.notaRichiesta ? (
              <Text
                intlFormatter
                tag="h1"
                size="f7_5"
                weight="normal"
                transform="none"
                color="red"
                value={`(${row.notaRichiesta})`}
              />
            ) : null}
          </>
        ),
        numeroDomandeRifiutate: row.numeroDomandeRifiutate,
        numeroDomandeAccettate: row.numeroDomandeAccettate,
        azioni: (
          <ButtonIcon
            icon="angle-right"
            fontSize="f6"
            color="blue"
            onClick={() => handleClickAzioni({
              ...row,
              isLavoratoreAssociato: datiAssociaLavoratoriRichiesta.isLavoratoreAssociato, 
              codiceRichiestaBase: datiAssociaLavoratoriRichiesta.codiceRichiestaBase,
              codiceRichiesta: datiAssociaLavoratoriRichiesta.codiceRichiesta,
            })}
          />
          ),
      }));

      setEstraiLavoratoriAssociatiRichiestaTcb(tableData);
    });
  };

  const [isConfermaDisabled, setConfermaDisabled] = useState(false);
  const [nomeText, cognomeText] = estraiDatiAssociaLavoratoriRichiesta.nomeFamiglia
    ? estraiDatiAssociaLavoratoriRichiesta.nomeFamiglia.split(' ')
    : [null, null];
  const [{ openDrawer, rowDataDrawer }, setOpenDrawer] = useState({
    openDrawer: false,
    rowDataDrawer: null,
  });
  const [{ openModalRiepilogoLavoratore, idLavoratore }, setOpenModalRiepilogoLavoratore] = useState({
    openModalRiepilogoLavoratore: false,
    idLavoratore: null,
  });
  const [{ openModalRiepilogoRichiesta, idRichiestaTcb, idServizio }, setOpenModalRiepilogoRichiesta] = useState({
    openModalRiepilogoRichiesta: false,
    idRichiestaTcb: null,
    idServizio: null,
  });

  const associaLavoratoriRichiesteTcbButtonsTypes = {
    GeneraCvAnonimo: 'GeneraCvAnonimo',
    GeneraCvCompleto: 'GeneraCvCompleto',
    AccettaOfferta: 'AccettaOfferta',
    DisassociaLavoratore: 'DisassociaLavoratore',
    AssociaAllaDomanda: 'AssociaAllaDomanda',
  };

  const Colonne = [
    'ID Lavoratore',
    'Nome',
    'Cognome',
    'Età',
    'Nazionalità',
    'Stato Associazione',
    'Nr Domande Rifiutate',
    'Nr Domande Accettate',
    'Azioni',
  ];

  const confermaAssociazioneLavoratoriDomande = useStatelessGraphQLRequest(ConfermaAssociazioneLavoratoriDomandeMutation);

  const updateTableData = () => {
    setOpenDrawer({ openDrawer: false });
    getData();
  };

  const handleClickAzioni = rowData => {
    setOpenDrawer({
      openDrawer: true,
      rowDataDrawer: rowData,
    });
  };

  const handleClickAnnulla = () => {
    history.goBack();
  };

  const handleClickConferma = () => {
    confermaAssociazioneLavoratoriDomande({
      codiceRichiesta: estraiDatiAssociaLavoratoriRichiesta.codiceRichiesta,
    }).then(() => {
      updateTableData();
    });
  };

  const HeaderRowAssociaLavoratori = ({ domanda, cognome, nome, dataRichiesta, color }) => (
    <Row fluid>
      <Column lg="3" md="3" sm="3" sx="3" margin="0 0 0 auto" padding="0.5em">
        <Text
          tag="h2"
          value={domanda}
          color={color}
          weight="bold"
          transform="uppercase"
          letterSpacing="0.05em"
          size="f7"
        />
      </Column>
      <Column lg="3" md="3" sm="3" sx="3" margin="0 0 0 auto" padding="0.5em">
        <Text
          tag="h2"
          value={cognome}
          color={color}
          weight="bold"
          transform="uppercase"
          letterSpacing="0.05em"
          size="f7"
        />
      </Column>
      <Column lg="3" md="3" sm="3" sx="3" margin="0 0 0 auto" padding="0.5em">
        <Text tag="h2" value={nome} color={color} weight="bold" transform="uppercase" size="f7" />
      </Column>
      <Column lg="3" md="3" sm="3" sx="3" margin="0 0 0 auto" padding="0.5em">
        <Text
          tag="h2"
          value={dataRichiesta}
          color={color}
          weight="bold"
          transform="uppercase"
          size="f7"
        />
      </Column>
    </Row>
  );
  HeaderRowAssociaLavoratori.displayName = 'HeaderRowAssociaLavoratori';

  return (
    <>
      <Header
        title={(
          <>
            <Text
              intlFormatter
              display="inline"
              tag="p"
              size="f5"
              margin="0"
              value="Associazione lavoratori a richiesta "
            />
            <IdRichiestaText
              intlFormatter
              tag="p"
              style={{
                cursor: 'pointer',
                fontSize: '1.46rem',
                display: 'inline',
                margin: '0',
              }}
              value={estraiDatiAssociaLavoratoriRichiesta.codiceRichiestaBase}
              onClick={() => setOpenModalRiepilogoRichiesta({
                openModalRiepilogoRichiesta: !openModalRiepilogoRichiesta,
                idRichiestaTcb: estraiDatiAssociaLavoratoriRichiesta.codiceRichiesta,
                idServizio: estraiDatiAssociaLavoratoriRichiesta.idServizio,
              })}
            />
          </>
        )}
        fontSize="f4"
        color="blue"
      />
      <HeaderAssociaLavoratori>
        <HeaderRowAssociaLavoratori
          domanda="Domanda"
          cognome="Cognome"
          nome="Nome"
          dataRichiesta="Data richiesta"
          color="primary"
        />
        <HeaderRowAssociaLavoratori
          domanda={getNomeServizioTCB(parseInt(estraiDatiAssociaLavoratoriRichiesta.idServizio, 10))}
          cognome={cognomeText}
          nome={nomeText}
          dataRichiesta={estraiDatiAssociaLavoratoriRichiesta.dataRichiesta ? moment(parseInt(estraiDatiAssociaLavoratoriRichiesta.dataRichiesta, 10)).format('DD-MM-YYYY') : null}
          color="darkGrey"
        />
      </HeaderAssociaLavoratori>
      <Row fluid>
        <Column xs="12" padding="1em 0 0 0">
          {estraiLavoratoriAssociatiRichiestaTcb ? (
            <Table
              size="f8"
              thWidth="10em"
              thHeight="3em"
              thBorder={`5px solid ${colors.darkBlue}`}
              tdBorder="none!important"
              thColor="white"
              tdHeight="3em"
              tdColor="darkGrey"
              headerBgColor="blue"
              tableWidth="100%"
              Colonne={Colonne}
              Righe={estraiLavoratoriAssociatiRichiestaTcb}
            />
          ) : null}
        </Column>
      </Row>
      <Row fluid padding="1em 0 0 0">
        <Column xl="2" lg="2" md="2" sm="3" xs="12" padding="1em 1em 0 0">
          <Button
            color="primary"
            label="Esci"
            value="Esci"
            fontSize="f6"
            onClick={handleClickAnnulla}
          />
        </Column>
        <Column xl="2" lg="4" md="5" sm="8" xs="12" padding="1em 1em 0 0">
          <Button
            color="primary"
            label="Accetta offerte candidature"
            value="Accetta offerte candidature"
            fontSize="f6"
            disabled={isConfermaDisabled}
            onClick={handleClickConferma}
          />
        </Column>
      </Row>

      {/* <Row fluid justifycontent="center">
        <Pagination
          json={[]}
          callback={numero => {
            getElementi(numero);
          }}
          count={richiesteTcbData.data.righeTotali}
          currentPage={currentPage}
          numberitem={itemPerPage}
          setCurrentPage={setCurrentPage}
          navNumber={10}
        />
      </Row> */}

      <Drawer
        open={openDrawer}
        setOpenModal={setOpenDrawer}
        width="60%"
        header={() => <DrawerHeaderAssociaLavoratoriRichiestaTcb data={rowDataDrawer} />}
      >
        <DrawerBodyAssociaLavoratoriRichiestaTcb
          data={rowDataDrawer}
          buttons={associaLavoratoriRichiesteTcbButtonsTypes}
          updateTableDataCallback={updateTableData}
          setOpenModalConferma={setOpenModalConferma}
        />
      </Drawer>

      {openModalRiepilogoLavoratore ? (
        <ModaleRiepilogo
          locale={locale}
          open={openModalRiepilogoLavoratore}
          setOpen={setOpenModalRiepilogoLavoratore}
          idLavoratore={idLavoratore}
        />
      ) : null}

{openModalConferma ?
        <ModaleConfermaOperazione
          open={openModalConferma}
          setOpenModal={setOpenModalConferma}
        />
        : null
      }

      {openModalRiepilogoRichiesta ? (
        <ModaleRiepilogoRichiesta
          openModal={openModalRiepilogoRichiesta}
          setOpenModal={setOpenModalRiepilogoRichiesta}
          idRichiestaTcb={idRichiestaTcb}
          idServizio={idServizio}
          locale={locale}
        />
      ) : null}
    </>
  );
};

BackofficeTcbAssociaLavoratoriRichiesta.displayName = 'BackofficeTcbAssociaLavoratoriRichiesta';

const mapStoreToProps = store => ({
  locale: store.locale,
});

export default withRouter(withAuthentication(connect(mapStoreToProps)(BackofficeTcbAssociaLavoratoriRichiesta)));
