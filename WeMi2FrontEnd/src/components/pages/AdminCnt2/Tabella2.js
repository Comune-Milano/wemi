
import React, { useContext } from 'react';
import { Row } from 'components/ui/Grid';
import Table from 'components/ui/Table';
import Pagination from 'components/ui2/Pagination';
import { NavLink } from 'components/router';
import AnchorLink from 'components/ui/AnchorLink';
import ModalSpaceWeMi from 'components/navigation/Spaces/partials/Modal';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import Text from 'components/ui/Text';
import { SPAZI_SINGOLI_WEMI } from 'types/contenuti/typeContenuto';
import styled from 'styled-components';
import { contentContext } from './ContentContext';
import { calcolaNumeroElementi } from './utils/calcolaNumeroElementi';
import { calculateRows } from './utils/calculateRows';
import { TableColumns } from './TableColumns';

const TextDescrizione = styled(Text)`
  white-space: pre;
`;

const Tabella = ({
  typeContenuto,
  numberitem = 20,
  getContenutoTyData,
  contenutoTyData,
  locale,
}) => {
  const context = useContext(contentContext);

  const { currentPage, setCurrentPage, filters, indice, setIndice, setPopupInformativo, popupInformativo } = context;

  const columns = TableColumns;

  const rows = calculateRows(contenutoTyData.data, typeContenuto, getContenutoTyData, filters);

  const tableData = { rows, columns };

  const paginationCallback = async (numero) => {
    const statoContenuto = filters.statoCnt.id !== 0 ? filters.statoCnt.id : undefined;

    const ricerca = filters.ricerca !== '' ? filters.ricerca : undefined;

    await getContenutoTyData({
      offset: calcolaNumeroElementi(numero),
      statoContenuto,
      typeContenuto,
      ricerca,
    });

    await setCurrentPage(numero);
  };

  if (!(contenutoTyData.data.length > 0)) {
    return (<Text tag="div" value="Nessun risultato" intlFormatter size="f6" margin="4em 0" />);
  }

  return (
    <>
      {typeContenuto === SPAZI_SINGOLI_WEMI && popupInformativo && (
        <div style={{ position: 'relative' }}>
          <ModalSpaceWeMi
            gestioneContenuti
            changeValue={val => {
              setIndice(val);
            }}
            value={indice}
            valueMax={tableData.rows.length}
            open={popupInformativo}
            openModal={setPopupInformativo}
            iconcolor="white"
            iconRadius="50%"
            iconBgColor="purple"
            iconBgColor2="green"
          >
            <NavLink to={`/pinfsw/${contenutoTyData.data[indice].id_contenuto}`}>
              <AnchorLink value={!isNullOrUndefined(contenutoTyData.data[indice].tl_testo_1) ? contenutoTyData.data[indice].tl_testo_1[locale] : ' '} size="f4" tag="h1" color="purple" weight="bold" />
            </NavLink>
            <Row fluid flex direction="column" padding="0 0 0.5rem">

              <Text value="Indirizzo email" size="f8" color="purple" weight="bold" />
              <Text value={!isNullOrUndefined(contenutoTyData.data[indice].tl_testo_2) ? contenutoTyData.data[indice].tl_testo_2[locale] : 'Nessuna email disponibile'} size="f7" color="darkgrey" />

              <Text value="Indirizzo" size="f8" color="purple" weight="bold" />
              <Text value={!isNullOrUndefined(contenutoTyData.data[indice].tl_testo_3) ? contenutoTyData.data[indice].tl_testo_3[locale] : 'Nessun indirizzo disponibile'} size="f7" color="darkgrey" />
              <Text value="Telefono" size="f8" color="purple" weight="bold" />
              <Text
                value={
                  contenutoTyData.data[indice].js_dati_contenuto && contenutoTyData.data[indice].js_dati_contenuto.Telefono ?
                    contenutoTyData.data[indice].js_dati_contenuto.Telefono :
                    'Nessun telefono disponibile'
                }
                size="f7"
                color="darkgrey"
              />

              <Text value="Descrizione" size="f8" color="purple" weight="bold" />
              <TextDescrizione
                value={
                  contenutoTyData.data[indice].js_dati_contenuto && contenutoTyData.data[indice].js_dati_contenuto.Descrizione ?
                    contenutoTyData.data[indice].js_dati_contenuto.Descrizione :
                    'Nessuna descrizione'
                }
                size="f7"
                color="darkgrey"
              />
            </Row>


          </ModalSpaceWeMi>
        </div>
      )}
      <Row fluid>
        <Table
          size="f8"
          thWidth="30em"
          tdWidth="10em"
          thHeight="3em"
          tdBold={[1, 4]}
          tdUppercase={[1]}
          // thBorder={`5px solid ${colors.darkBlue}`}
          tdBorder="none!important"
          thColor="white"
          tdHeight="3em"
          tdColor="darkGrey"
          headerBgColor="blue"
          tableWidth="100%"
          Righe={tableData.rows}
          Colonne={tableData.columns}
        />

      </Row>
      <Row justifycontent="center" fluid padding="20px">
        <Pagination
          currentPage={currentPage}
          callback={paginationCallback}
          setCurrentPage={setCurrentPage}
          numberitem={numberitem}
          ariatitle="Elenco contenuti"
          navNumber={4}
          scrollToTop
          count={contenutoTyData.data.length > 0 ? contenutoTyData.data[0].count : 0}
          json={tableData.rows}
        />
      </Row>
    </>
  );
};


Tabella.displayName = 'Tabella';

export default Tabella;
