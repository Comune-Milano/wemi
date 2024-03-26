import React from 'react';
import Loader from 'components/ui/Loader';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import NavLink from 'components/router/NavLink';
import Text from 'components/ui/Text';
import { withRouter } from 'react-router-dom';
import { PAGE_ENTI_SERVICES_SEARCH_URL } from 'types/url';
import { generatePath } from 'react-router';
import { colors } from 'theme';
import { AREE } from 'types/aree';
import Tooltip from 'components/ui2/Tooltip';
import InfoButtonComponent from 'components/shared/ButtonInfo';
import {
  Section,
  CategoryTitle,
} from './SearchServices.style';
import CategorySection from './CategorySection';


const ServicesBody = ({
    isFromHomeSearch,
    services,
    serviceSection,
    mdServices,
    location,
    history,
    codSezione,
}) => {
  const generatePathToService = (idServizio = 'idServizio', idCategoria = 'idCategoria') => {
    let path = `${generatePath(PAGE_ENTI_SERVICES_SEARCH_URL, {
      idServizio,
      idCategoria,
    })}`;

    if (codSezione) {
      path += `?codSezione=${codSezione}`;
    }

    return path;
  };


  const only018ServiceSection = React.useMemo(() => serviceSection?.data?.services?.length ?
  serviceSection.data.services.some(service => (service.tipoArea?.trim() === AREE.AREA_018_ANNI)) :
  location.state?.isOnly018, [serviceSection, location]);

  if (isFromHomeSearch) {
    return (
        serviceSection.pristine || serviceSection.isLoading ?
          <Loader /> : (
            <Row fluid>
              <Column xs="12" md={mdServices} padding="0 20px" margin="1em 0">
                {serviceSection.data.services && serviceSection.data.services.length ? (
                  <Text
                    tag="h3"
                    value="Scegli il servizio"
                    size="f6"
                    weight="bold"
                    transform="uppercase"
                    letterSpacing="0.05em"
                    color="primary"
                  />
                  ) : (
                    <Text
                      tag="p"
                      value="Nessun servizio selezionabile."
                    />
                  )}
                <Section fluid margin="1em 1em 0 0">
                  {serviceSection.data.services &&
                      serviceSection.data.services.map(service => (
                        service.tipoArea?.trim() === AREE.AREA_018_ANNI ? (
                          <Tooltip
                            id={service.idServizio}
                            position="top"
                            fontSize="f8"
                            color="white"
                            bgcolor="blue"
                            posAdjustment="20%"
                            preventOnHover={!service.tipoArea?.trim() === AREE.AREA_018_ANNI}
                            value="Sezione 0-18 - Include servizi acquistabili con voucher."
                          >
                            <Button
                              label={service.nomeServizio}
                              fontSize="f6"
                              autowidth
                              onClick={() => {
                                history.push(
                                generatePathToService(service.idServizio),
                                  {
                                    is018: true,
                                    service018: true,
                                  }
);
                              }}
                              margin="1em 1em 0 0"
                              color={Object.keys(colors).find(el => colors[el] === service.datiSezione?.cd_colore_sezione)}
                            />
                          </Tooltip>
                      ) : (
                        <Button
                          label={service.nomeServizio}
                          fontSize="f6"
                          margin="1em 1em 0 0"
                          onClick={() => {
                            history.push(
                            generatePathToService(service.idServizio)
);
                          }}
                          autowidth
                          color="primary"
                        />
)
                        ))
                        }
                </Section>
                {only018ServiceSection &&
                <InfoButtonComponent />
  }
              </Column>
            </Row>
      )
    );
  } return (
        services.pristine || services.isLoading ?
          <Loader />
          : (
            <>
              {services.data.category ? (
                <Row fluid padding="0 20px">
                  <CategoryTitle>
                    {services.data.category.name.toLowerCase()}
                  </CategoryTitle>
                </Row>
              )
                : null}
              <Row fluid>
                <Column xs="12" md="4" padding="0 20px">
                  {services.data.category ? (
                    <CategorySection
                      categoryName={services.data.category.name}
                      categoryMedia={services.data.category.media}
                      categoryDescription={services.data.category.description}
                    />
                  ) : null}
                </Column>
                <Column xs="12" md={mdServices} padding="0 20px" margin="1em 0">
                  {services.data.services && services.data.services.length ? (
                    <Text
                      tag="h3"
                      value="Scegli il servizio"
                      size="f6"
                      weight="bold"
                      transform="uppercase"
                      letterSpacing="0.05em"
                      color="primary"
                    />
                  ) : (
                    <Text
                      tag="p"
                      value="Nessun servizio selezionabile."
                    />
                  )}
                  <Section fluid>
                    {services.data.services &&
                      services.data.services.map(service => (
                        <Button
                          label={service.name}
                          fontSize="f6"
                          margin="1em 1em 0 0"
                          onClick={() => {
                            history.push(generatePathToService(service.serviceId, service.categoryId),
                            { service018: location.state?.isOnly018 });
                          }}
                          autowidth
                        />
                      ))
                    }
                  </Section>
                  {only018ServiceSection &&
                  <InfoButtonComponent />
}
                </Column>
              </Row>
            </>
          )
  );
};

ServicesBody.displayName = 'Ricerca servizi';
export default withRouter(ServicesBody);
