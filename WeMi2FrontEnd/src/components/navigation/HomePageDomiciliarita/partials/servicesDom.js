import React, { useEffect, useState } from 'react';
import Text from 'components/ui/Text';
import Button from 'components/ui2/Button';
import { Row, Column } from 'components/ui/Grid';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import { useBusSubscribe } from 'hooks/eventBus/useBusSubscribe';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';
import ButtonIconBox from 'components/ui2/ButtonIconBox';
import { PAGE_QUERY_SERVICES } from 'types/url';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { WrapperLoading, WrapperShimmerDescription } from 'components/shared/CardLoader/components.styled';
import CardLoader from 'components/shared/CardLoader';
import { SEZIONI } from 'types/sezioni';
import { CHANGE_SERVICES_AREA, HOME_DOMICILIARITA_ANCHORS } from '../constants';
import { getAllDom } from '../graphql';

const ServicesDom = ({
  onHasRenderedAreas,
}) => {
  const [allCategoriesDom] = useGraphQLRequest(
    [{ categorie: [] }],
    getAllDom,
    undefined,
    true,
    response => response.areeCategoria
  );
  const loaded = !allCategoriesDom.isLoading && !allCategoriesDom.pristine;

  const [areaView, setAreaView] = useState(0);

  const targetArea = loaded ? allCategoriesDom.data.find(el => el.id === areaView) : {};
  const availableCategories = loaded ? allCategoriesDom.data.some(el => el.id !== 0) : false;
  const areaTutti = 0;

  useEffect(() => {
    if (!loaded || !(allCategoriesDom.data.length > 0)) {
      return;
    }
    if (!(allCategoriesDom.data.find((area) => (area.id === areaView)))) {
      // se servicesAreaCode selezionata non è presente viene settata con il codice 0 cioè TUTTI
      setAreaView(areaTutti);
    } else {
      setAreaView(areaView);
    }
    onHasRenderedAreas();
  }, [areaView, allCategoriesDom]);

  // Subscribes to changes to services area.
  useBusSubscribe(
    CHANGE_SERVICES_AREA,
    servicesAreaCode => setAreaView(servicesAreaCode)
  );

  if (!availableCategories) {
    return <></>;
  }

  return (
    <div id={HOME_DOMICILIARITA_ANCHORS.scopriServiziDom}>
      <Row>
        <Column xs="12" md="4" padding="0">
          <BackgroundTitle
            label="Scopri i servizi domiciliari"
            bgColor="primary"
            size={bgTitleSizes.small}
          />
          <Text
            tag="p"
            margin="1.5em 0"
            size="f7"
            color="black"
            value="Clicca sulla categoria di tuo interesse per scoprire con semplicità tutti i servizi."
          />
          {loaded ?
          allCategoriesDom.data.map((area, i) => {
            const { length } = allCategoriesDom.data;
            const isLast = length === i + 1;
            return (
              <Button
                key={`ar_${area.id}`}
                label={area.title}
                isActive={area.id === areaView}
                onClick={() => {
                  setAreaView(area.id);
                }}
                color="primary"
                margin={isLast ? '0' : '0 0 1em 0'}
                fontSize="f7"
              />
            );
          }) : (
            <>
              <div>
                <WrapperLoading margin="2em 0">
                  <WrapperShimmerDescription height="30px">
                  </WrapperShimmerDescription>
                </WrapperLoading>
              </div>
              <div>
                <WrapperLoading margin="2em 0">
                  <WrapperShimmerDescription height="30px">
                  </WrapperShimmerDescription>
                </WrapperLoading>
              </div>
              <div>
                <WrapperLoading margin="2em 0">
                  <WrapperShimmerDescription height="30px">
                  </WrapperShimmerDescription>
                </WrapperLoading>
              </div>
            </>
          )}
        </Column>
        <Column xs="12" md="8" padding="1.5em 0 0 0" sizepadding={{ md: '0 0 0 2em' }}>
          {targetArea?.categorie ?
            (
              <Row padding="0" justifycontent="flex-start" alignitems="stretch">
                {
                  targetArea.categorie.map((category, index) => {
                    const isLeft = index % 2 === 0;
                    return (
                      <Column
                        key={category.id}
                        sizepadding={{
                          xs: isLeft ? '0 1.5em 2em 0' : '0 0 2em 1.5em',
                          md: '0 1em 2em 1em',
                        }}
                        xs="6"
                        md="3"
                      >
                        <ButtonIconBox
                          link={category.sottotipo === 99 ? '/menuTcb' : `${PAGE_QUERY_SERVICES}?idCategoria=${category.id}&codSezione=${SEZIONI.DOMICILIARITA}`}
                          title={getObjectValue(category, 'title', null)}
                          alt={getObjectValue(category, 'title', null)}
                          media={category.image.path}
                          maxWidth={{
                            xs: '11.66rem',
                            md: '10.93rem',
                          }}
                        />
                      </Column>
                    );
                  })
                }
              </Row>
            )
            : (
              <Row padding="0" justifycontent="flex-start" alignitems="stretch">
                <Column
                  sizepadding={{
                    xs: '0 1.5em 2em 0',
                    md: '0 1em 2em 1em',
                  }}
                  xs="6"
                  md="3"
                >
                  <CardLoader margin="2em 0" />
                </Column>
                <Column
                  sizepadding={{
                    xs: '0 0 2em 1.5em',
                    md: '0 1em 2em 1em',
                  }}
                  xs="6"
                  md="3"
                >
                  <CardLoader margin="2em 0" />
                </Column>
              </Row>
)
          }
        </Column>
      </Row>
    </div>
  );
};

ServicesDom.displayName = 'ServicesDom';

export default React.memo(ServicesDom);
