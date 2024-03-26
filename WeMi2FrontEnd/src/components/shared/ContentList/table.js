import React from 'react';
import { Row } from 'components/ui/Grid';
import { useFormContext } from 'libs/Form/hooks/useFormContext';
import Table from 'components/ui/Table';
import Pagination from 'components/ui2/Pagination';
import Text from 'components/ui/Text';
import { addActions } from './contentlist.utils';
import { TableColumnsReorganizedContent } from './contentlist.constants';

export const ContentTable = ({
  contents = [],
  page,
  onChangePage,
  elementsPerPage = 20,
  onPublish,
  onDisable,
  onModify,
  contentsMapper,
  total = 0,
  setPage,
  lockActions,
  tableColumns = TableColumnsReorganizedContent,
}) => {
  const { dataset } = useFormContext();

  const handleChangePage = React.useCallback((pageNumber) => {
    onChangePage({ pageNumber, ...dataset });
  }, [onChangePage, dataset]);

  const handlePublish = React.useCallback((id) => {
    onPublish({ ...dataset, id });
  }, [onPublish, page, dataset]);

  const handleDisable = React.useCallback((id) => {
    onDisable({ ...dataset, id });
  }, [onDisable, page, dataset]);

  const handleModify = React.useCallback((id) => {
    onModify({ ...dataset, id });
  }, [onModify]);

  const tableData = React.useMemo(() => {
    let rows = addActions(contents, {
      onPublish: handlePublish,
      onDisable: handleDisable,
      onModify: handleModify,
      lockActions,
    });

    if (typeof contentsMapper === 'function') {
      rows = contentsMapper(rows);
    }
    const columns = tableColumns;

    return { rows, columns };
  }, [contents]);

  if (!(contents.length > 0)) {
    return (<Text tag="div" value="Nessun risultato" intlFormatter size="f6" margin="4em 0" />);
  }

  return (
    <React.Fragment>
      <Row fluid>
        <Table
          size="f8"
          thWidth="30em"
          tdWidth="10em"
          thHeight="3em"
          tdBold={[1, 4]}
          tdUppercase={[1]}
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
          currentPage={page}
          callback={handleChangePage}
          setCurrentPage={setPage}
          numberitem={elementsPerPage}
          ariatitle="Elenco contenuti"
          navNumber={4}
          scrollToTop
          count={total}
          json={[]}
        />
      </Row>
    </React.Fragment>
  );
};

ContentTable.displayName = 'Content Table Component';
