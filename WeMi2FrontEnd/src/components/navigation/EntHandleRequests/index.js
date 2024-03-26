/** @format */

import React, { useState, useEffect } from 'react';
import Loader from 'components/ui/Loader';
import { HandleScrollDown } from 'components/ui/HandleScroll';
import { Form } from 'libs/Form/components/Form';
import yup from 'libs/Form/validation/yup';
import { Wrapper, SezioneFiltri } from './partials';
import RequestsTablePagination from './partials/RequestsTablePagination';
import { TitleRequestCounter } from './partials/title';
import { PAGINATION_REQUEST_ENTE } from './constants';
import { datasetMapper } from './utils/mapper';

const EntHandleRequests = ({ datiLogin, getRichiesteEnte, initialDataset = {}, isFeedback, isEnte, richiesteEnte, loaded, locale, tableColumns }) => {
  const scrollDown = HandleScrollDown();
  const [currentPage, setCurrentPage] = useState(1);

  const [oldSearch, setOldSearch] = useState(datasetMapper(initialDataset));
  const validationSchema = yup.object().shape({
    nomeEnte: yup.string()
      .notRequired().test('nomeEnte', 'Inserire almeno 3 caratteri', (value) => {
        if (value) {
          const schema = yup.string().min(3);
          return schema.isValidSync(value);
        }
        return true;
      }),
    richiedente: yup.string().notRequired().test('richiedente', 'Inserire almeno 3 caratteri', (value) => {
      if (value) {
        const schema = yup.string().min(3);
        return schema.isValidSync(value);
      }
      return true;
    }),
  });

  const fetchRequestEnte = async (dataset, numeroElementi = 0, pagination = false) => {
    let jsonInput = {
      numeroElementi,
    };
    const mappedDataset = datasetMapper(dataset);

    if (isEnte) {
      jsonInput = {
        ...jsonInput,
        idEnteErogatore: datiLogin.idEnte,
      };
      if (!pagination) {
        jsonInput = {
          ...jsonInput,
          ...mappedDataset,
        };
        setOldSearch(mappedDataset);
      } else {
        jsonInput = {
          ...jsonInput,
          ...oldSearch,
        };
      }
    } else if (!pagination && !isEnte) {
      jsonInput = {
        ...jsonInput,
        ...mappedDataset,
      };
      setOldSearch(mappedDataset);
    } else {
      jsonInput = {
        ...jsonInput,
        ...oldSearch,
      };
    }
    await getRichiesteEnte({
      input: jsonInput,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <Wrapper>
      <Form
        initialDataset={initialDataset}
        validateOnChange
        validationSchema={validationSchema}
        onSubmit={async (dataset) => {
          await fetchRequestEnte(dataset);
          setCurrentPage(1);
        }}
      >
        <SezioneFiltri
          isFeedback={isFeedback}
          isEnte={isEnte}
          locale={locale}
          loaded={loaded}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {!richiesteEnte.isLoading && !richiesteEnte.pristine && !richiesteEnte.errored ? (
          <>
            {isEnte ? (
              <TitleRequestCounter
                richiesteEnte={richiesteEnte.data}
                isFeedback={isFeedback}
              />
            ) : null}
            <RequestsTablePagination
              isFeedback={isFeedback}
              isEnte={isEnte}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              locale={locale}
              loaded={loaded}
              tableColumns={tableColumns}
              pagenumber={1}
              numberitem={PAGINATION_REQUEST_ENTE}
              scrollDown={window.scrollY > 0 && scrollDown === 0 ? 2 : scrollDown}
              richiesteEnte={richiesteEnte.data}
              getRichiesteEnte={fetchRequestEnte}
            />
          </>
        ) : (
          <Loader size="2em" margin="0 auto" width="auto" />
          )}
      </Form>
    </Wrapper>
  );
};

EntHandleRequests.displayName = 'EntHandleRequests';
export default EntHandleRequests;
