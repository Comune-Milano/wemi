import React from 'react';
import withRouter from 'react-router/withRouter';
import { useContentActions } from 'components/shared/ContentList/usecontentactions';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { ContentList } from 'components/shared/ContentList';
import { PAGE_CONTENT_SLIDER_EDIT, PAGE_CONTENT_SLIDER_NEW } from 'types/url';
import withAuthentication from 'hoc/withAuthentication';
import { getContentListSlider } from './graphql/getcontentslider';
import { publishContentSlider } from './graphql/publish';
import { disableContentSlider } from './graphql/disable';

const elementsPerPage = 20;

const ContentListSlider = ({
  breadcrumb,
  page,
  setPage,
  match,
  history,
}) => {
  const [contentsList, getContentList] = useGraphQLRequest(
    {
      total: 0,
      list: [],
    },
    getContentListSlider,
    {
      input: {
        page,
        elementsPerPage,
      },
    },
    true
  );

  const { idOp } = match.params;

  const { publish, disable, modify, isPending } = useContentActions({
    publishGraphQL: publishContentSlider,
    disableGraphQL: disableContentSlider,
    history,
    modifyUrl: PAGE_CONTENT_SLIDER_EDIT,
    idOperatore: idOp,
  });

  const hasToRender = !contentsList.isLoading && !contentsList.pristine;


  return (
    <ContentList
      hasToRender={hasToRender}
      lockActions={isPending}
      breadcrumb={breadcrumb}
      pageNewContentUrl={PAGE_CONTENT_SLIDER_NEW}
      elementsPerPage={elementsPerPage}
      title="SLIDER HOMEPAGE 0-18 ANNI"
      filters={{
        code: {
          name: 'Contenuto',
          hasCode: true,
        },
      }
      }
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

ContentListSlider.displayName = 'ContentListSlider';
const contentListWithAuthentication = withAuthentication(ContentListSlider);
export default withRouter(
  contentListWithAuthentication
);
