import React from 'react';
import { withRouter } from 'react-router-dom';
import { ContentList } from 'components/shared/ContentList';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useContentActions } from 'components/shared/ContentList/usecontentactions';
import { PAGE_CONTENT_SECTION_EDIT, PAGE_CONTENT_SECTION_NEW } from 'types/url';
import { disableSection, getContentSections, publishSection } from './graphql';
import { TableColumnsSezioni } from './constants';

const elementsPerPage = 20;

const ContentListSection = ({
  breadcrumb,
  page,
  setPage,
  history,
}) => {
  const [contentsList, getContentList] = useGraphQLRequest(
    {
      total: 0,
      list: [],
    },
    getContentSections,
    {
      input: {
        page,
        elementsPerPage,
      },
    },
    true
  );

  const { publish, disable, modify, isPending } = useContentActions({
    publishGraphQL: publishSection,
    disableGraphQL: disableSection,
    history,
    modifyUrl: PAGE_CONTENT_SECTION_EDIT,
  });

  const hasToRender = !contentsList.isLoading && !contentsList.pristine;

  return (
    <ContentList
      hasToRender={hasToRender}
      lockActions={isPending}
      breadcrumb={breadcrumb}
      pageNewContentUrl={PAGE_CONTENT_SECTION_NEW}
      elementsPerPage={elementsPerPage}
      title="Sezioni"
      total={contentsList.data.total}
      page={page}
      setPage={setPage}
      tableColumns={TableColumnsSezioni}
      onSearch={async (dataset) => {
        const { state, description, order, code } = dataset;
        getContentList({
          input: {
            filters: {
              state: state?.id ? state.id : undefined,
              description,
              order: order?.id,
              code,
            },
            page: 1,
            elementsPerPage,
          },
        });
        await setPage(1);
      }}
      onModify={modify}
      onPublish={async (parameters) => {
        const { state, description, id, order, code } = parameters;
        await publish(id);
        getContentList({
          input: {
            filters: {
              state: state?.id ? state.id : undefined,
              description,
              order: order?.id,
              code,
            },
            page,
            elementsPerPage,
          },
        });
      }}
      onDisable={async (parameters) => {
        const { state, description, id, order, code } = parameters;
        await disable(id);
        getContentList({
          input: {
            filters: {
              state: state?.id ? state.id : undefined,
              description,
              order: order?.id,
              code,
            },
            page,
            elementsPerPage,
          },
        });
      }}
      onChangePage={async (parameters) => {
        const { state, description, pageNumber, order, code } = parameters;
        await getContentList({
          input: {
            filters: {
              state: state?.id ? state.id : undefined,
              description,
              order: order?.id,
              code,
            },
            page: pageNumber,
            elementsPerPage,
          },
        });
        setPage(pageNumber);
      }}
      onSort={async (parameters) => {
        const { state, description, order, code } = parameters;
        await getContentList({
          input: {
            filters: {
              state: state?.id ? state.id : undefined,
              description,
              order: order?.id,
              code,
            },
            page: 1,
            elementsPerPage,
          },
        });
        setPage(1);
      }}
      contents={contentsList.data.list}
    />
  );
};


ContentListSection.displayName = 'Content Section List Navigation Component';

export default
  withRouter(
    ContentListSection
  );
