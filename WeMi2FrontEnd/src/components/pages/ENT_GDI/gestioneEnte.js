/** @format */

import React, { useState, useEffect } from 'react';
import { NavLink, generatePath } from 'react-router-dom';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui/Button';
import { graphqlRequest, resetField } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';
import Text from 'components/ui/Text';
import Select from 'components/ui/Select';
import Table from 'components/ui/Table';
import Pagination from 'components/ui/Pagination';
import Input from 'components/ui/Input';
import styled from 'styled-components';
import { colors } from 'theme';
import { HandleScrollDown } from 'components/ui/HandleScroll';
import { dominioByTipoS as dominioByTipoSQ } from 'components/pages/DatiEnte/enteGraphQL';
import Loader from 'components/ui/Loader';
import { setFilter } from 'redux-modules/actions/filterActions';

import { AddParameters } from 'redux-modules/actions/goi003Actions';
import withAuthentication from 'hoc/withAuthentication';
import { PAGE_ADMIN_DATIENTE_URL } from 'types/url';
import { ModificaDatiPropriEnte as ModificaDatiPropriEnteQ, EstraiListaEnte as EstraiListaEnteQ } from './enteGraphQL';

import DrawerVisualizza from './partials/drawerPartials';


const TextEnte = styled(Text)`
text-decoration: underline;
font-weight: bold;
`;

const BtnAggiungi = styled(Button)`
   width: 15em;
   height: 3.5em;
   background-color: #005cb9;
`;

const GestioneEnte = ({ numberitem = 10, pagenumber = 1, EstraiListaEnte, dominioByTipoS, graphqlRequest, filtri, setFilter, resetField, AddParameters, userProfile }) => {
  const { datiLogin } = userProfile;

  const [refresh, setRefresh] = useState(false);

  const [StatoSelected, SetStatoSelected] = useState('Tutti gli stati');
  const [currentPage, setCurrentPage] = useState(pagenumber);
  const indexOfLastItem = currentPage * numberitem;
  const indexOfFirstItem = indexOfLastItem - numberitem;


  let currentItems; let
totalItems;
  if (EstraiListaEnte) {
    totalItems = EstraiListaEnte;
    if (StatoSelected && StatoSelected !== 'Tutti gli stati' && StatoSelected.length > 0) totalItems = totalItems.filter(el => String(el.tl_valore_testuale && el.tl_valore_testuale.it).includes(StatoSelected));
    if (filtri.ricercaNome && filtri.ricercaNome.length > 0) {
      totalItems = totalItems.filter(el => el.nm_ente.toLowerCase().includes(filtri.ricercaNome.toLowerCase())
        || el.nm_ente.includes(filtri.ricercaNome.toLowerCase()));
    }
    currentItems = totalItems.slice(indexOfFirstItem, indexOfLastItem);
  }

  const scrollDown = HandleScrollDown();

  useEffect(() => {
    graphqlRequest(dominioByTipoSQ('STATO_ENTE'));
    graphqlRequest(EstraiListaEnteQ());
    if (filtri && (filtri.InputServizi || filtri.SelectCategoria || filtri.SelectStato)) {
      setFilter({ ...filtri, InputServizi: '', SelectCategoria: '', SelectStato: '' });
    }
  }, [refresh, graphqlRequest]);

  useEffect(() => {
    if (filtri.statoGestioneEnti && filtri.statoGestioneEnti != '') {
      handleChangeSelect(filtri.statoGestioneEnti, 'refreshare');
    }
  }, [dominioByTipoS, EstraiListaEnte]);

  useEffect(() => {
    resetField('usersCollegatiEnte');
    resetField('enteDatiPK');
  }, [resetField]);

  useEffect(() => {
    AddParameters({ sedi: [] });
  }, [AddParameters]);

  const handlePublish = event => {
    const id = event.target.name;
    graphqlRequest(ModificaDatiPropriEnteQ(id, '2', datiLogin.idCittadino));
    setRefresh(!refresh);
  };

  const handleChangeSelect = (option, refreshare) => {
    setFilter({ ...filtri, statoGestioneEnti: option });
    SetStatoSelected(option.value.slice(0));
    setCurrentPage(1);
    // if(!refreshare)
    // setRefresh(!refresh);
  };

  const handleBlock = event => {
    const id = event.target.name;
    graphqlRequest(ModificaDatiPropriEnteQ(id, '4', datiLogin.idCittadino));
    setRefresh(!refresh);
  };
  const Valida = (event) => {
    const id = event.target.name;
    graphqlRequest(ModificaDatiPropriEnteQ(id, '31', datiLogin.idCittadino));
    setRefresh(!refresh);
  };
  const handleChangeSearch = event => {
    setFilter({ ...filtri, ricercaNome: event.target.value });
    setCurrentPage(1);
    // setRefresh(!refresh)
  };

  const dummy = [];

  currentItems && currentItems.map(riga => {
    dummy.push(
      {
        partitaIVA: riga.id_partita_iva_ente,
        versScheda: riga.pg_versione,
        NomeEnte: <NavLink
          to={riga.cd_stato_ente == 1 ? `/admin/gestioneEnte/${riga.id_ente}/SchedaServiziEnte/DatiEnte` : `/admin/gestioneEnte/${riga.id_ente}/SchedaEnte`}
          name={riga.id_ente}
        >
          <TextEnte value={riga.nm_ente} />
        </NavLink>,
        EmailAmministratore: riga.ptx_email,
        UltimoStato: riga.tl_valore_testuale && riga.tl_valore_testuale.it,
        DataCambiamentoStato: riga.ts_variazione_stato && riga.ts_variazione_stato.split('T')[0],
        UltimoOperatore: riga.ptx_username ? riga.ptx_username : riga.id_utente,
        Azioni: <DrawerVisualizza
          scrollDown={window.scrollY > 0 && scrollDown === 0 ? 2 : scrollDown}
          headerValue={riga}
          bodyValue={{ riga, handleBlock, handlePublish, Valida }}
        />,
      }
    );
  });

  const data = {
    Colonne: ['Partita IVA', 'Vers. Scheda', 'Nome Ente', 'Email Amministratore', 'Ultimo Stato', 'Data Camb. Stato', 'Ultimo Operatore', 'Azioni'],
    Righe: dummy,
  };
  const selectArr = () => {
    const arr = [{ value: 0, textValue: 'Tutti gli stati' }];
    dominioByTipoS && dominioByTipoS.map(el => arr.push(el));
    return arr;
  };


  return (
    <>
      {EstraiListaEnte ? (
        <>
          <Row fluid>
            <Column lg="6" md="6" sm="8" sx="6">
              <Input material intlLabel="Ricerca per nome" initialValue={filtri.ricercaNome} onKeyUp={handleChangeSearch} />
            </Column>

            <Column lg="6" md="6" sm="8" sx="6">
              {dominioByTipoS ? (
                <Select
                  material
                  name="Stato:"
                  id="UltimoStato"
                  selectedValue={{ value: StatoSelected }}
                  items={selectArr()}
                  getValue={handleChangeSelect}
                />
                )
                  : null}
            </Column>
          </Row>

          <Row>
            <Column lg="2">
              <NavLink to={generatePath(PAGE_ADMIN_DATIENTE_URL, { idEnte: -1 })}>
                <BtnAggiungi value="Aggiungi" />
              </NavLink>
            </Column>
          </Row>

          {EstraiListaEnte ? (
            <>
              <Row fluid>
                <Column xs="12">
                  {data ? (
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
                    )
                      : null
                    }
                </Column>
              </Row>

              <Row fluid justifycontent="center">
                <Pagination
                  json={totalItems}
                  currentPage={currentPage}
                  numberitem={numberitem}
                  setCurrentPage={setCurrentPage}
                />
              </Row>
            </>
            )
              : null}

        </>
        )
        : <Loader />}
    </>
  );
};

const mapDispatchToProps = {
  graphqlRequest,
  setFilter,
  resetField,
  AddParameters,
};

function mapStateToProps(state) {
  const { graphql, filter } = state;
  const { EstraiListaEnte, dominioByTipoS, error } = graphql;
  return {
    locale: state.locale,
    filtri: filter.filter,
    EstraiListaEnte,
    dominioByTipoS,
    error,
  };
}

GestioneEnte.displayName = 'GestioneEnte';

export default withAuthentication(connect(
  mapStateToProps,
  mapDispatchToProps
)(GestioneEnte));
