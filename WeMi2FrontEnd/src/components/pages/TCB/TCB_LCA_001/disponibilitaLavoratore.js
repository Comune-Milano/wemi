import React, { useEffect, useState } from 'react';
import Header from 'components/ui2/Header';
import { Row, Column } from 'components/ui/Grid';
import Button from 'components/ui2/Button';
import Select from 'components/ui2/Select';
import DatePicker from 'components/ui2/DatePicker';
import Text from 'components/ui/Text';
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import moment from 'moment';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import media from 'utils/media-queries';
import { colors } from 'theme';
import breakpoints from 'utils/breakpoints';
import useWindowSize from 'hooks/useWindowSize';
import {
  DominioTcbByTipoTcb as DominioTcbByTipoTcbQ,
  AggiornaStatoOccupazionale as AggiornaStatoOccupazionaleMutation,
  EstraiDatiStatoOccupazionaleLavoratore as EstraiDatiStatoOccupazionaleLavoratoreQ,
} from './disponibilitaLavoratoreGraphQL';
import DisponibilitaOrariaLavoratoreTcb from './partials/disponibilitaOrariaLavoratore';
import { ID_SERVIZIO_TATA, ID_SERVIZIO_COLF, ID_SERVIZIO_BADANTE } from '../../../../types/tcbConstants';
import MenuDisponibilità from './partials/menuDisponibilità';
import MenuDisponibilitàChildren from './partials/menuDisponibilitàChildren';

const ContentColumn = styled(Column)`
  padding-top: 1.5em;
  ${media.lg`
      padding-right: 3em;
      padding-top: 0em;
      border-right: 2px solid ${colors.grey};
  `}
`;
ContentColumn.displayName = 'ContentColumn';

const ButtonColumn = styled(Column)`
  padding-bottom: 1.5em;
  border-bottom: 2px solid ${colors.grey};
  ${media.lg`
      padding-left: 3em;
      padding-bottom: 0em;
      border-bottom: none;
  `}
`;
ButtonColumn.displayName = 'ButtonColumn';

ContentColumn.displayName = 'ContentColumn';

const StyledHeader = styled(Header)`
    @media (max-width: ${breakpoints.md}px) {
      h1{
        font-size:1rem!important;
        line-height:1.3rem!important;
      }
    }
`;

const DisponibilitaLavoratoreTcb = ({ history, userProfile }) => {
  const performRequestStatoOccupazionaleLavoratore = useStatelessGraphQLRequest(
    EstraiDatiStatoOccupazionaleLavoratoreQ
  );

  const [
    dominioTcbStatoOccupazionale,
  ] = useGraphQLRequest(
    [],
    DominioTcbByTipoTcbQ,
    {
      ty_dominio_tcb: 36,
    },
    true,
    data =>
      data.map(row => ({ id: row.value, value: row.textValue }))
  );

  const updStatoOccupazionale = useStatelessGraphQLRequest(AggiornaStatoOccupazionaleMutation);

  const windowSize = useWindowSize();
  const windowSizesLarge = ['lg', 'xl', 'xxl', 'xxxl'];

  const [formData, setFormData] = useState({
    codiceStatoOccupazionale: null,
    dataDisponibileDa: { value: undefined, error: null },
  });

  const [disponibilitaOrariaData, setDisponibilitaOrariaData] = useState({
    show: false,
    servizio: null,
    idServizioRiferimento: null,
  });

  const [buttonsData, setButtonsData] = useState({
    btnDispTataEnabled: false,
    btnDispColfEnabled: false,
    btnDispBadanteEnabled: false,
  });

  useEffect(() => {
    performRequestData();
  }, []);

  const performRequestData = () => {
    performRequestStatoOccupazionaleLavoratore({
      input: {},
    }).then((resp) => {
      const selectedDate = resp.dataDisponibileDa ? moment(resp.dataDisponibileDa).format('YYYY-MM-DD') : null;
      const momentSelectedDate = moment(selectedDate);

      const dataDisponibileDa = {
        value: momentSelectedDate,
        error: null,
      };
      const currentDate = moment().format('YYYY-MM-DD');

      if (momentSelectedDate && momentSelectedDate.isBefore(currentDate)) {
        dataDisponibileDa.error = 'La data deve essere maggiore di quella corrente.';
      }
      setFormData({
        codiceStatoOccupazionale: resp.codiceStatoOccupazionale,
        dataDisponibileDa,
      });

      const disableBtn = (idServizio) => resp.serviziAbilitati.some(x => x.idServizioRiferimento === idServizio);

      if (resp.serviziAbilitati) {
        const servizioTataEnabled = disableBtn(ID_SERVIZIO_TATA);
        const servizioColfEnabled = disableBtn(ID_SERVIZIO_COLF);
        const servizioBadanteEnabled = disableBtn(ID_SERVIZIO_BADANTE);

        setButtonsData({
          btnDispTataEnabled: servizioTataEnabled,
          btnDispColfEnabled: servizioColfEnabled,
          btnDispBadanteEnabled: servizioBadanteEnabled,
        });
      }
    });
  };

  const handleChangeStatoOccupazionale = event => {
    setFormData({
      ...formData,
      codiceStatoOccupazionale: event || undefined,
    });
  };

  const handleChangeDisponibileDa = event => {
    if (event) {
      const momentSelectedDate = moment(event);
      const currentDate = moment();

      if (momentSelectedDate.isBefore(currentDate)) {
        setFormData({
          ...formData,
          dataDisponibileDa: {
            value: momentSelectedDate,
            error: 'La data deve essere maggiore di quella corrente.',
          },
        });
      } else {
        setFormData({
          ...formData,
          dataDisponibileDa: { value: momentSelectedDate, error: null },
        });
      }
    } else {
      setFormData({
        ...formData,
        dataDisponibileDa: { value: undefined, error: null },
      });
    }
  };

  const handleClickConfermaStatoOccupazionale = () => {
    const upDate = formData.dataDisponibileDa.value;

    updStatoOccupazionale({
      input: {
        codiceStatoOccupazionale: formData.codiceStatoOccupazionale ? Number.parseInt(formData.codiceStatoOccupazionale.id, 10) : null,
        dataDisponibileDa: upDate ? upDate.format('YYYY-MM-DD') : null,
      },
    }).then((success) => {
      if (success) {
        setFormData({
          codiceStatoOccupazionale: formData.codiceStatoOccupazionale,
          dataDisponibileDa: { value: upDate, error: null },
        });
        performRequestData();
      }
    });
  };

  const blackList = [
    {
      service: ID_SERVIZIO_COLF,
      domainBlackList: [4, 5, 6],
    },
  ];
  return (
    <>
      {!disponibilitaOrariaData.show ? (
        <Row fluid justifycontent="space-between" padding="0 0 5em 0">
          <StyledHeader
            fontSize="f4"
            title="Modifica le tue disponibilità e il tuo stato occupazionale"
            color="blue"
          />
          <ButtonColumn
            xs="12"
            lg="4"
            padding="0"
            order={{ lg: 2 }}
            tagName="aside"
          >
            <Row fluid padding="0 1em 0 1em">
              <Row fluid lg="5" padding="0 0 1em 0">
                <Button
                  type="button"
                  color="blue"
                  fontSize="f7"
                  label="Salva le modifiche"
                  onClick={handleClickConfermaStatoOccupazionale}
                  disabled={formData.dataDisponibileDa?.error}
                />
              </Row>
              <Row fluid lg="5">
                <Button
                  type="button"
                  color="red"
                  fontSize="f7"
                  label="Annulla"
                  onClick={() => history.goBack()}
                />
              </Row>
            </Row>
          </ButtonColumn>
          <ContentColumn
            xs="12"
            lg="8"
            padding="0"
            order={{ lg: 1 }}
            tagName="section"
          >
            <Row fluid padding="0 0 1em 0">
              <Text
                value="Modifica le tue disponibilità"
                size="f6"
                weight="bold"
                transform="uppercase"
                letterSpacing="0.05em"
                color="primary"
              />
            </Row>
            <MenuDisponibilità>
              <MenuDisponibilitàChildren
                setDisponibilitaOrariaData={setDisponibilitaOrariaData}
                buttonsData={buttonsData}
              />
            </MenuDisponibilità>
            <Row fluid padding="3em 0 0.5em 0">
              <Text
                value="Modifica il tuo stato occupazionale"
                size="f6"
                weight="bold"
                transform="uppercase"
                letterSpacing="0.05em"
                color="primary"
              />
            </Row>
            <Row fluid padding="0 0 0.5em 0">
              <Text
                value="Qual è il tuo stato occupazionale?"
                size="f6"
                weight="bold"
                color="black"
              />
            </Row>
            <Row fluid padding="0 0 1em 0">
              <Column lg="5" padding="0">
                {dominioTcbStatoOccupazionale.data ? (
                  <Select
                    material
                    name="statoOccupazionale"
                    label="Stato occupazionale"
                    placeholder="Seleziona lo stato occupazionale"
                    clickedItem={handleChangeStatoOccupazionale}
                    items={dominioTcbStatoOccupazionale.data}
                    selectedValue={formData.codiceStatoOccupazionale}
                    intlFormatter
                  />
                ) : null}
              </Column>
            </Row>
            <Row fluid padding="2em 0 0.5em 0">
              <Text
                value="Da quando sei disponibile a svolgere le mansioni per cui ti sei proposto/a?"
                size="f6"
                weight="bold"
                color="black"
              />
            </Row>
            <Row fluid padding="0 0 0.5em 0">
              <Column lg="5" padding="0">
                <DatePicker
                  label="Disponibile dal"
                  selectedDate={
                    formData.dataDisponibileDa.value
                      ? moment(formData.dataDisponibileDa.value).format('DD/MM/YYYY')
                      : undefined
                  }
                  onChange={handleChangeDisponibileDa}
                  error={formData.dataDisponibileDa.error}
                  positionTooltip={windowSizesLarge.indexOf(windowSize) === -1 ? 'top' : 'right'}
                />
              </Column>
            </Row>
          </ContentColumn>
        </Row>
      ) : (
        <DisponibilitaOrariaLavoratoreTcb
          disponibilitaOrariaData={disponibilitaOrariaData}
          setDisponibilitaOrariaData={setDisponibilitaOrariaData}
          userProfile={userProfile}
          blackList={blackList}
        />
      )}
    </>
  );
};

DisponibilitaLavoratoreTcb.displayName = 'DisponibilitaLavoratoreTcb';
export default withRouter(DisponibilitaLavoratoreTcb);
