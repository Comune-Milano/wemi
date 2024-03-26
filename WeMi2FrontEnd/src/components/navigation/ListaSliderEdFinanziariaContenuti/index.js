import React from 'react';
import { withRouter } from 'react-router-dom';
import { ContentList } from 'components/shared/ContentList';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { useContentActions } from 'components/shared/ContentList/usecontentactions';
import { PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_EDIT, PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_NEW } from 'types/url';
import { getSlidersFinancialEducation } from './graphql/getlist';
import { publishSlider } from './graphql/publish';
import { disableSlider } from './graphql/disable';
import { tableColumns } from './constants';

const elementsPerPage = 20;

const ContentListSliderFinancialEducation = ({
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
    getSlidersFinancialEducation,
    {
      input: {
        page,
        elementsPerPage,
      },
    },
    true
  );

  const { publish, disable, modify, isPending } = useContentActions({
    publishGraphQL: publishSlider,
    disableGraphQL: disableSlider,
    history,
    modifyUrl: PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_EDIT,
  });

  const hasToRender = !contentsList.isLoading && !contentsList.pristine;

  return (
    <ContentList
      hasToRender={hasToRender}
      lockActions={isPending}
      breadcrumb={breadcrumb}
      columns={tableColumns}
      codeLabel="Codice contenuto"
      pageNewContentUrl={PAGE_CONTENT_SLIDER_FINANCIAL_EDUCATION_NEW}
      elementsPerPage={elementsPerPage}
      title="Slider educazione finanziaria"
      total={contentsList.data.total}
      page={page}
      setPage={setPage}
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


ContentListSliderFinancialEducation.displayName = 'ContentListSliderFinancialEducation Navigation Component';

export default
  withRouter(
    ContentListSliderFinancialEducation
  );
