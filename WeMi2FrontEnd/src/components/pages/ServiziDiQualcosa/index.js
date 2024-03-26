import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Column } from 'components/ui/Grid';
import Table from 'components/ui/Table';
import {colors} from 'theme';
import Pagination from 'components/ui/Pagination';
import { Link } from 'react-router-dom';
import FaIcon from 'components/ui/FaIcon';
import Button from 'components/ui/Button';
import Dropdown, { DropdownContent } from 'components/navigation/Navbar/partials/Dropdown';
import MenuItem from 'components/navigation/Navbar/partials/MenuItem';
import RightSection from './RightSection';
import LeftSection from './LeftSection';
import { EnteServizioErogatoTable as EnteServizioErogatoTableQ } from './ServizioErogatoEnteGraphQL';
import { graphqlRequest } from 'redux-modules/actions/authActions';
import { connect } from 'react-redux';

const DivServizi = styled.div`
margin: 2rem 0 4rem;
padding: 0 4rem;
`;

const MyRow = styled(Row)`
padding: 2rem 0rem;
`;

const RowTable = styled(Row)`
display: eleents;
`;

const MyButton = styled(Button)`
width: 20%
`;

const DropdownList = styled(DropdownContent)`
background-color: #f0f0f0;
`;

var data
var ricerca
var ente_id

const Servizi = ({ numberitem = 5, pagenumber = 1, EnteServizioErogatoTable, graphqlRequest, error }) => {

    const [currentPage, setCurrentPage] = useState(pagenumber);
    const indexOfLastItem = currentPage * numberitem;
    const indexOfFirstItem = indexOfLastItem - numberitem;
    const currentItems = EnteServizioErogatoTable && EnteServizioErogatoTable.slice(indexOfFirstItem, indexOfLastItem);

    const [refresh, SetRefresh] = useState(false);

    const enteFittizio = 700003

    useEffect(() => {
        graphqlRequest(EnteServizioErogatoTableQ(enteFittizio))
    }, [refresh]);

    const handleUpdateRow = event => {
        const idRecord = event.target.name
    }

    //---------------- Table GOI004 ----------------
    let dummy = []
    currentItems && currentItems.map(ele => {
        if (ricerca == null || ricerca == "" || ele.tl_testo_1.it.includes(ricerca) || (ele.tl_testo_1.it.toUpperCase()).includes(ricerca) || (ele.tl_testo_1.it.toLowerCase()).includes(ricerca)) {
            dummy.push(
                {
                    id: ele.id_servizio_ente,
                    versione: ele.pg_versione,
                    ente: ele.nm_ente,
                    categoria: ele.cat_accreditamento,
                    servizio: ele.serv_offerto,
                    status: ele.cd_stato_dati_servizio_ente,
                    data: ele.ts_variazione_stato,
                    utente: ele.id_utente,
                    azioni:
                        < Dropdown>
                            <FaIcon navUserIcon icon="\f7d9" fontSize="f6" color="primary" />
                            <DropdownList>

                                <MenuItem dropdownItem>
                                    <Link to="/it/DatiEnte">
                                        <button name={ele.id_servizio_ente} onClick={handleUpdateRow}>Modifica</button>
                                    </Link>
                                </MenuItem>

                                <MenuItem dropdownItem>
                                    <Link to="/it/DatiEnte">
                                        <button name={ele.id_servizio_ente} onClick={handleUpdateRow}>Visualizza</button>
                                    </Link>
                                </MenuItem>

                            </DropdownList>
                        </Dropdown >
                }

            )
        } // fine IF
    })

    data = {
        Colonne: [
            ' ID',
            ' Vers. Scheda',
            ' Nome ente',
            ' Categoria Accred.',
            ' Servizio',
            ' Ultimo stato',
            ' Data Cambiamento Stato',
            ' Ultimo operatore',
            ' Azioni',
        ],
        Righe: dummy,
    };

    //-----------------------

    return (
        <DivServizi>
            <Row>
                <Column lg={6} md={6} fluid>
                    <LeftSection />
                </Column>

                <Column lg={6} md={6} fluid>
                    <RightSection />
                </Column>
            </Row>

            <MyRow>
                <MyButton width="50%" value="Proponi nuovo servizio" />
            </MyRow>

            {EnteServizioErogatoTable ?
                <>

                    <MyRow>
                        {data ?
                            <Table
                            size="f8"
                            thWidth="10em"
                            thHeight="3em"
                            thBorder={`5px solid ${colors.darkBlue}`}
      tdBorder={'none!important'}
                            thColor="white"
                            tdHeight="3em"
                            tdColor="darkGrey"
                            headerBgColor="blue"
                            tableWidth="100%"
                            {...data} />
                            : null
                        }
                    </MyRow>

                    <Row justifyeleent="center">
                        <Pagination
                            json={EnteServizioErogatoTable}
                            currentPage={currentPage}
                            numberitem={numberitem}
                            setCurrentPage={setCurrentPage}
                        />
                    </Row>

                </>
                : null}

        </DivServizi>

    )
};

const mapDispatchToProps = {
    graphqlRequest,
};

function mapStateToProps(state) {
    const { graphql } = state;
    const { EnteServizioErogatoTable, error } = graphql;
    return {
        EnteServizioErogatoTable,
        error
    };
    
}

Servizi.displayName = 'Servizi';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Servizi);


