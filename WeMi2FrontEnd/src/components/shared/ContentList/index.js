import React from 'react';
import Wrapper from 'components/navigation/NavigationWrapper';
import Breadcrumbs from 'components/navigation/Breadcrumbs';
import { Title } from 'components/pages/SchedaEntePage/shared';
import { Form } from 'libs/Form/components/Form';
import yup from 'libs/Form/validation/yup';
import Loader from 'components/ui2/Loader';
import { DEFAULT_SORT, STATE_ALL } from './contentlist.constants';
import Header from './header';
import { FormFilters } from './formfilters';
import { ContentTable } from './table';

export const ContentList = ({
  breadcrumb,
  pageNewContentUrl,
  rightColumnChildren,
  tableColumns,
  contents = [],
  onPublish,
  onDisable,
  onModify,
  contentsMapper,
  elementsPerPage,
  onSearch,
  onChangePage,
  page,
  columns,
  total,
  title = '',
  codeLabel,
  hasToRender = true,
  setPage,
  lockActions = false,
  onSort,
  filters = {
    code: {
      name: 'Sezione',
      hasCode: true,
    },
  },
}) => {
  const handleSearch = React.useCallback((dataset) => {
    onSearch(dataset);
  }, [onSearch]);

  return (
    <Wrapper>
      <Breadcrumbs value="Breadcrumb.page" pathSlashes={breadcrumb} />
      <Title
        firstTitle="Gestione"
        secondTitle={title}
      />
      <Header
        contentNewUrl={pageNewContentUrl}
        rightColumnChildren={rightColumnChildren}
      />
      <Form
        initialDataset={{
          state: STATE_ALL,
          order: DEFAULT_SORT,
        }}
        onSubmit={(dataset) => handleSearch(dataset)}
        validationSchema={yup.object().shape({})}
      >
        <FormFilters onSort={onSort} filters={filters} codeLabel={codeLabel} />
        {lockActions ? <Loader overlay label="Operazione in corso" /> : null}
        {hasToRender ? (
          <ContentTable
            lockActions={lockActions}
            contents={contents}
            tableColumns={tableColumns}
            onPublish={onPublish}
            onDisable={onDisable}
            onModify={onModify}
            columns={columns}
            contentsMapper={contentsMapper}
            elementsPerPage={elementsPerPage}
            onChangePage={onChangePage}
            page={page}
            setPage={setPage}
            total={total}
          />
        ) : <Loader overlay />}
      </Form>
    </Wrapper>
  );
};

ContentList.displayName = 'Content List Component';
