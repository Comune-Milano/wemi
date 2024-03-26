import React, { useState, useEffect } from 'react';

import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import Table from 'components/ui/Table';
import Pagination from 'components/ui/Pagination';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';

import { HandleScrollDown } from 'components/ui/HandleScroll';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import { colors } from 'theme';
import Loader from 'components/ui/Loader';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import checkEnte from 'utils/functions/checkEnte';
import RedirectAdmin from 'components/router/RedirectAdmin';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import Filtri from './partial/Filtri';
import {
    EstraiServiziPerCategoriediAccredidatmentoEnte as EstraiServiziPerCategoriediAccredidatmentoEnteQ,
} from './Modal/ModalGraphQL';
import {
    EstraiServizioErogatoEnte004Admin as EstraiServizioErogatoEnte004Q,
    EstraiListaEnte as EstraiListaEnteQ,
    InserisciServizioEnte004 as InserisciServizioEnte004Q,
    EstraiCategorieAccreditamento as EstraiCategorieAccreditamentoQ,
    dominioByTipoS as dominioByTipoSQ,
    EstraiDatiEnte as EstraiDatiEnteQ,
    inserisciServizioEnte004Mutation,
} from './ServizioErogatoEnteGraphQL';
import ModaleServizio from './Modal';
import DrawerVisualizza from './drawerPartials';
import AggiungiServizio from './partial/AggiungiServizio';

let data;

const ServiziAdmin = ({
    userProfile,
    numberitem = 5,
    pagenumber = 1,
    EstraiServizioErogatoEnte004,
    EstraiListaEnte,
    EstraiCategorieAccreditamento,
    dominioByTipoS,
    EstraiServiziPerCategoriediAccredidatmentoEnte,
    EstraiDatiEnte,
    filter,
    graphqlRequest,
    match,
    error,
}) => {
  const [filtri, setFiltri] = useState({
    nomeServizio: null,
    categoriaAccreditamento: null,
    statoServizio: null,
  });

  const inserisciServizioEnte004 = useStatelessGraphQLRequest(inserisciServizioEnte004Mutation);
  const [insertiServEnte004Loading, setInsertiServEnte004Loading] = useState(false);


  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(pagenumber);
  const indexOfLastItem = currentPage * numberitem;
  const indexOfFirstItem = indexOfLastItem - numberitem;

  const id_ente = match.params.idEnte;

  const { datiLogin } = userProfile;
  const validitaAdmin = checkAdmin(datiLogin);
  const validitaEnte = checkEnte(datiLogin);

  useEffect(() => {
    if (validitaAdmin || validitaEnte) {
      graphqlRequest(EstraiListaEnteQ());
      graphqlRequest(EstraiServizioErogatoEnte004Q(id_ente));
      graphqlRequest(EstraiServiziPerCategoriediAccredidatmentoEnteQ(id_ente));
      graphqlRequest(EstraiCategorieAccreditamentoQ(id_ente));
      graphqlRequest(EstraiDatiEnteQ(id_ente));
            // da aggiornare con le nuove direttive per lo stato dei servizi
      graphqlRequest(dominioByTipoSQ('STATO_COMPILAZ_SRV'));
      if (filter && filter.InputServizi) {
        filtri.nomeServizio = filter.InputServizi;
      }

      if (filter && filter.SelectCategoria) {
        filtri.categoriaAccreditamento = filter.SelectCategoria;
      }
      if (filter && filter.SelectStato) {
        filtri.statoServizio = filter.SelectStato;
      }
    }
  }, [id_ente, datiLogin]);

    // const strDatiLogin = sessionStorage.getItem('DatiLogin');
    // const datiLogin = strDatiLogin && JSON.parse(strDatiLogin);

  const listaCompletaServiziEnte = EstraiServizioErogatoEnte004;

  const listaFiltrataServiziEnte = listaCompletaServiziEnte ?
        listaCompletaServiziEnte.filter(el => {
            // filtrare per nome servizio offerto
          const flagNomeServizio = filtri.nomeServizio ?
                el.serv_offerto.toLowerCase().includes(filtri.nomeServizio.toLowerCase())
                : true;
            // filtrare per categoria accreditamento
          const flagAccreditamento = filtri.categoriaAccreditamento ?
                el.cat_accreditamento == filtri.categoriaAccreditamento.value
                : true;

            // filtrare per stato servizio
          const flagStatoServizio = filtri.statoServizio ?
                el.cd_stato_dati_servizio_ente == filtri.statoServizio.id
                : true;

          return flagNomeServizio && flagStatoServizio && flagAccreditamento;
        })
        : null;

  const listTuttiServiziErogabili = EstraiServiziPerCategoriediAccredidatmentoEnte;


  const scrollDown = HandleScrollDown();


  const handleUpdateRow = event => {
    const idRecord = event.target.name;
  };


  const handleModalSubmit = async (servizi) => {
    if (servizi.length > 0) {
      setInsertiServEnte004Loading(true);
      inserisciServizioEnte004({
        input: {
          id_servizio_riferimento: servizi
                        .map(
                            servizio => servizio.id
                        ).sort(),
          id_ente_erogatore: parseInt(id_ente, 10),
        },
      })
                .then(() => {
                  window.location.reload();
                })
                .finally(() => {
                  setInsertiServEnte004Loading(false);
                });
    }
  };

    // ---------------- Table GOI004 ----------------
  const righeTabella = [];

  if (listaFiltrataServiziEnte) {
    listaFiltrataServiziEnte.slice(indexOfFirstItem, indexOfLastItem).map((ele) => {
      righeTabella.push({
        id: ele.id_servizio_ente,
        versione: ele.pg_versione,
        categoria: ele.cat_accreditamento,
        servizio: ele.serv_offerto,
        status: ele.tl_valore_testuale && ele.tl_valore_testuale.it,
        data: ele.ts_variazione_stato && ele.ts_variazione_stato.split('T')[0],
        utente: ele.ptx_username ? ele.ptx_username : ele.id_utente,
        azioni: <DrawerVisualizza
          headerValue={ele}
          scrollDown={window.scrollY > 0 && scrollDown === 0 ? 2 : scrollDown}
          bodyValue={{ id_ente, ele, handleUpdateRow, datiLogin }}
        />,
      });
    });
  }

  data = {
    Colonne: [
      ' ID',
      ' Vers. Scheda',
      ' Categoria Accred.',
      ' Servizio',
      ' Ultimo stato',
      ' Data Cambiamento Stato',
      ' Ultimo operatore',
      ' Azioni',
    ],
    Righe: righeTabella,
  };

    //-----------------------

  const BreadcrumbPathAmministratore = [
    {
      slash: 'Home',
      url: '',
    },
    {
      slash: 'Area personale',
      url: 'AreaPersonale',
    },

    {
      slash: 'gestione ente',
      url: 'gestioneEnti',
    },
    {
      slash: 'Scheda servizi Ente',
      url: `/admin/GestioneEnte/${id_ente}/SchedaServiziEnte`,
    },
  ];


  const listaCategorieAccreditamento = EstraiServizioErogatoEnte004 ?
    Array.from(new Set(EstraiServizioErogatoEnte004.map(el => el.cat_accreditamento))).sort().map((categoria, i) => (
        { value: i, textValue: categoria }
    ))
    : [];
  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={BreadcrumbPathAmministratore} />
      <Row fluid margin="2em 0">
        <Text size="f3" value="Scheda " color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
        <Text size="f3" value="servizi " color="darkGrey" transform="uppercase" letterSpacing="0.05em" padding="0 0.5em 0 0" />
        <Text size="f3" value={EstraiDatiEnte ? EstraiDatiEnte.entePK.nm_ente : ''} color="darkGrey" transform="uppercase" letterSpacing="0.05em" weight="bold" padding="0 0.5em 0 0" />
      </Row>
      <Row fluid margin="2em 0">
        <Column xs={12} padding="0">
          <Filtri
            State={{ filtri,
              listaStatiServizio: dominioByTipoS,
              listaCategorieAccreditate: listaCategorieAccreditamento,
              callback: () => { setCurrentPage(1); } }}
            SetState={setFiltri}
          >
          </Filtri>
        </Column>
      </Row>
      <ModaleServizio
        open={openModal}
        setOpen={setOpenModal}
        lista={listTuttiServiziErogabili}
        aggiungiDisabled={insertiServEnte004Loading}
        submit={handleModalSubmit}
      />
      {EstraiServizioErogatoEnte004 && data ? (
        <Row fluid margin="2em 0">
          <Column xs={12} padding="0">
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
              {...data}
            />
          </Column>
          <Column xs={12} padding="0">
            <Pagination
              json={listaFiltrataServiziEnte}
              currentPage={currentPage}
              numberitem={numberitem}
              setCurrentPage={setCurrentPage}
            />
          </Column>
        </Row>
            )
                : <Loader size="2em" margin="0 auto" width="auto" />}

    </Wrapper>
  );


  return (<RedirectAdmin />);
};

const mapDispatchToProps = {
  graphqlRequest,
};

function mapStateToProps(state) {
  const { graphql, filter } = state;
  const { EstraiDatiEnte, EstraiCategorieAccreditamento, dominioByTipoS, EstraiServizioErogatoEnte004Admin: EstraiServizioErogatoEnte004, EstraiListaEnte, InserisciServizioEnte004, EstraiServiziPerCategoriediAccredidatmentoEnte, error } = graphql;
  return {
    EstraiDatiEnte,
    filter: filter.filter,
    EstraiCategorieAccreditamento,
    dominioByTipoS,
    EstraiServizioErogatoEnte004,
    EstraiListaEnte,
    InserisciServizioEnte004,
    EstraiServiziPerCategoriediAccredidatmentoEnte,
    error,
  };
}

ServiziAdmin.displayName = 'ServiziAdmin';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withAuthentication(ServiziAdmin));
