/** @format */

import React, { useState, useMemo } from 'react';
import { Row, Column } from 'components/ui/Grid';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import styled from 'styled-components';
import { hexToRgba } from 'utils/functions/hexToRgba';
import ModaleRiepilogoRichiesta from 'components/shared/ModaleRiepilogoRichiesta/ModaleRiepilogoRichiesta';
import moment from 'moment';
import Drawer from 'components/ui2/Drawer';
import checkAdmin from 'utils/functions/checkAdmin';
import withAuthentication from 'hoc/withAuthentication';
import useWindowSize from 'hooks/useWindowSize';
import DrawerHeaderStoricoRichiesta from './drawer/DrawerHeaderStoricoRichiesta';
import DrawerBodyStoricoRichiesta from './drawer/DrawerBodyStoricoRichiesta';

export const TableOverflow = styled(Row)`
  overflow: auto;
  min-height: 10em;
  @keyframes PagefadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
  }
  animation-name: PagefadeIn;
  animation-duration: 1s;
`;

export const StyledDataRow = styled(Row)`
  &:last-child {
    border-bottom: 2px solid ${colors.primary};
  }
  border-top: 2px solid ${colors.primary};
  width: 100%;
  &:hover, &:focus{
    background-color: ${hexToRgba(colors.primary, 0.2)};
  }
`;

export const Table = ({ columns, rows, setOpenDrawer, dati }) => (
  <>
    {rows && rows.length > 0 ? (
      rows.map((val, indexRow) => (
        <StyledDataRow
          key={indexRow.toString()}
          tabIndex={0}
          justifycontent="space-between"
          flex
          alignitems="center"
          padding="5px 0"
          onClick={rows[indexRow].cdStatoAssociazione === 1 ? () => {
            const {
              idRichiesta,
              idRichiestaServizioBase,
              dataOfferta,
              tipologiaLavoro,
              statoOpportunita,
              statoOpportunitaValue,
              cdStatoRecensione,
            } = rows[indexRow];

            setOpenDrawer({
              openDrawer: true,
              rowDataDrawer: {
                idRichiesta,
                idRichiestaServizioBase,
                dataOfferta,
                tipologiaLavoro,
                statoOpportunita,
                statoOpportunitaValue,
                cdStatoRecensione,
                idLavoratore: dati.id_utente,
              },
            });
          } : null}
        >
          {columns.map((col, indexCol) => (
            <Column
              key={indexCol.toString()}
              xs={col.sizes.xs}
              md={col.sizes.md}
              padding="5px"
              order={col.sizes.order}
            >
              <Text
                tag="strong"
                value={col.columnName}
                color="darkGrey"
                weight="bold"
                transform="uppercase"
                letterSpacing="0.05em"
                marging="0 0 0.5em 0"
                size="f8"
              />
              <br />
              <Text
                tag="span"
                value={val[col.columnId]}
                color="black"
                weight="bold"
                transform="uppercase"
                letterSpacing="0.05em"
                marging="0 0 0.5em 0"
                size="f6"
              />
            </Column>
          ))
          }
        </StyledDataRow>
      ))
    ) : (
      <StyledDataRow
        tabIndex={0}
        justifycontent="center"
        flex
        alignitems="center"
        padding="5px 0"
      >
        <Column
          padding="5px"
          xs="2"
          md="2"
        >
          <Text
            tag="span"
            value="Nessun dato"
            color="black"
            weight="bold"
            transform="uppercase"
            letterSpacing="0.05em"
            marging="0 0 0.5em 0"
            size="f6"
          />
        </Column>
      </StyledDataRow>
      )}
  </>
);
Table.displayName = 'Table';

const OpportunitaTable = ({ dati, datistorico, locale, userProfile }) => {
  const { datiLogin } = userProfile;

  const [{ openDrawer, rowDataDrawer }, setOpenDrawer] = useState({
    openDrawer: false,
    rowDataDrawer: null,
  });

  const [{ openModalRiepilogo, idRichiestaTcb, idServizio }, setOpenModalRiepilogo] = useState({
    openModalRiepilogo: false,
    idRichiestaTcb: null,
    idServizio: null,
  });

  const isAmministratore = useMemo(
    () => checkAdmin(datiLogin),
    [datiLogin]
  );

  const notMobile = ['xs', 'sm'].indexOf(useWindowSize()) === -1;

  const tableDataColums = () => {
    if (notMobile) {
      return (
      [
          { columnName: 'ID Domanda', columnId: 'idDomanda', sizes: { xs: '6', md: '2', order: { xs: 1, md: 1 } } },
          { columnName: 'Tipologia lavoro', columnId: 'tipologiaLavoro', sizes: { xs: '6', md: '2', order: { xs: 2, md: 2 } } },
          { columnName: 'Data offerta', columnId: 'dataOfferta', sizes: { xs: '6', md: '2', order: { xs: 3, md: 3 } } },
          { columnName: 'Stato candidatura', columnId: 'statoCandidatura', sizes: { xs: '0', md: '3', order: { xs: 5, md: 4 } } },
          { columnName: 'Stato opportunità', columnId: 'statoOpportunita', sizes: { xs: '6', md: '3', order: { xs: 4, md: 5 } } },
      ]
      );
    } return (
    [
        { columnName: 'ID Domanda', columnId: 'idDomanda', sizes: { xs: '6', md: '2', order: { xs: 1, md: 1 } } },
        { columnName: 'Tipologia lavoro', columnId: 'tipologiaLavoro', sizes: { xs: '6', md: '2', order: { xs: 2, md: 2 } } },
        { columnName: 'Data offerta', columnId: 'dataOfferta', sizes: { xs: '6', md: '2', order: { xs: 3, md: 3 } } },
        { columnName: 'Stato opportunità', columnId: 'statoOpportunita', sizes: { xs: '6', md: '3', order: { xs: 4, md: 5 } } },
    ]
    );
  };

  const tableDataRows = {
    rows: datistorico && datistorico.StoricoLavoratoreFiltro.map(richiesta => {
      const [recensione] = richiesta.recensioniEnte;
      return {
        idDomanda: (
          <Text
            intlFormatter
            tag="p"
            value={richiesta.id_richiesta_servizio_base}
            {...(isAmministratore ? {
              style: {
                cursor: 'pointer',
                fontSize: '1.105rem',
                fontWeight: 'normal',
                color: '#005CB9',
              },
              onClick: () => {
                setOpenModalRiepilogo({
                  openModalRiepilogo: true,
                  idRichiestaTcb: richiesta.id_richiesta,
                  idServizio: richiesta.id_servizio,
                });
              },
            } : {})}
          />
        ),
        tipologiaLavoro: richiesta.tipoServizio,
        dataOfferta: richiesta.ts_creazione ? moment(richiesta.ts_creazione).format('DD/MM/YYYY') : '',
        statoCandidatura: richiesta.stato_candidatura,
        statoOpportunita: (
          <>
            <Text
              intlFormatter
              tag="p"
              value={richiesta.stato_associazione}
            />
            {richiesta.nota_richiesta && (richiesta.cd_stato_associazione === 2 || richiesta.cd_stato_associazione === 4) ? (
              <Text
                intlFormatter
                tag="p"
                weight="normal"
                transform="none"
                value={`(${richiesta.nota_richiesta})`}
              />
            ) : null}
          </>
        ),
        idRichiesta: richiesta.id_richiesta,
        idRichiestaServizioBase: richiesta.id_richiesta_servizio_base,
        cdStatoAssociazione: richiesta.cd_stato_associazione,
        cdStatoRecensione: recensione.statoRecensione,
        statoOpportunitaValue: richiesta.stato_associazione,
      };
    }),
  };


  return (
    <>
      <TableOverflow fluid justifycontent="flex-end" margin="1em 0">
        <Column fluid margin="1em 0 0 0" padding="0">
          <Table
            columns={tableDataColums()}
            rows={tableDataRows.rows}
            setOpenDrawer={setOpenDrawer}
            dati={dati}
          />
        </Column>
      </TableOverflow>

      {openModalRiepilogo ? (
        <ModaleRiepilogoRichiesta
          openModal={openModalRiepilogo}
          setOpenModal={setOpenModalRiepilogo}
          idRichiestaTcb={idRichiestaTcb}
          idServizio={idServizio}
          locale={locale}
        />
      ) : null}

      <Drawer
        open={openDrawer}
        setOpenModal={setOpenDrawer}
        width="60%"
        header={() => <DrawerHeaderStoricoRichiesta data={rowDataDrawer} />}
      >
        <DrawerBodyStoricoRichiesta
          data={rowDataDrawer}
          userProfile={userProfile}
        />
      </Drawer>

    </>
  );
};

OpportunitaTable.displayName = 'OpportunitaTable';
export default withAuthentication(OpportunitaTable);
