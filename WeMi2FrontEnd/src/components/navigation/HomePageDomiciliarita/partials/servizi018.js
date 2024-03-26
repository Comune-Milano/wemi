import React, { useEffect } from 'react';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import { Row } from 'components/ui/Grid';
import ButtonIconBox from 'components/ui2/ButtonIconBox';
import Grid from 'components/ui2/Grid';
import { PAGE_QUERY_SERVICES } from 'types/url';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import CardLoader from 'components/shared/CardLoader';
import { SEZIONI } from 'types/sezioni';
import { HOME_DOMICILIARITA_ANCHORS } from '../constants';
import { getAll018 } from '../graphql';

const Servizi018 = ({ onHasRenderedAreas }) => {
  const [allCategories018] = useGraphQLRequest(
    [{ categorie: [] }],
    getAll018,
    undefined,
    true,
    response => response.areeCategoria
  );

  const loaded = !allCategories018.isLoading && !allCategories018.pristine;

  useEffect(() => {
    if (loaded) {
      onHasRenderedAreas();
    }
  }, [loaded]);


  return (
    <div id={HOME_DOMICILIARITA_ANCHORS.scopriServizi018}>
      {loaded && allCategories018.data.length ? (
        <>
          <Row fluid sizemargin={{ xs: '5.5rem 0 0 0', xsm: '5rem 0 0 0', md: '7.85rem 0' }}>
            <BackgroundTitle
              label="Scopri anche i servizi 0-18 anni"
              bgColor="primary"
              size={bgTitleSizes.small}
            />
          </Row>
          <Row fluid margin="0 0 7.81rem 0">
            <Grid>
              {loaded ?
            allCategories018.data.map((area) => {
              if (!area) {
                return <></>;
              }
              return area.categorie.map((categoria) => (
                <React.Fragment key={categoria.id}>
                  <ButtonIconBox
                    alt={categoria.title}
                    maxWidth={{
                      xs: '11.66rem',
                      md: '10.94rem',
                    }}
                    title={categoria.title}
                    isOnly018
                    media={categoria.image.path}
                    link={`${PAGE_QUERY_SERVICES}?idCategoria=${categoria.id}&codSezione=${SEZIONI.DOMICILIARITA}`}
                  />
                </React.Fragment>
              ));
            })
            : (
              <React.Fragment>
                <CardLoader margin="2em 0" />
                <CardLoader margin="2em 0" />
                <CardLoader margin="2em 0" />
                <CardLoader margin="2em 0" />
                <CardLoader margin="2em 0" />
              </React.Fragment>
          )}
            </Grid>
          </Row>
        </>
      ) :
        <Row fluid sizemargin={{ xs: '5.5rem 0 0 0', xsm: '5rem 0 0 0', md: '7.85rem 0' }} />
            }
    </div>
  );
};

Servizi018.displayName = 'Servizi018';
export default Servizi018;
