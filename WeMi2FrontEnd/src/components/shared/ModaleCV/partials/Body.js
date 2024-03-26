/** @format */
import React, { useState } from 'react';
import { 
  estraiCurriculumLavoratore as estraiCurriculumLavoratoreQ,
  estraiServiziTcbCandidaturaLavoratore as estraiServiziTcbCandidaturaLavoratoreQ,
 } from '../CVGraphQL';
import { useStatelessGraphQLRequest } from 'hooks/graphQLRequest/useStatelessGraphQLRequest';
import DownloadAnchorButton from './DownloadAnchorButton';
import Select from 'components/ui2/Select';
import { Column, Row } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import ColorSelector from './ColorSelector';
import { colors } from 'theme';
import styled from 'styled-components';
import { ReactComponent as DownloadIcon } from 'images2/Icons/download.svg'
import { useGraphQLRequest } from 'hooks/graphQLRequest/useGraphQLRequest';
import { isFunction } from 'utils/functions/typeCheckers';
import withAuthentication from 'hoc/withAuthentication';
import checkAdmin from 'utils/functions/checkAdmin';
import checkLavoratore from 'utils/functions/checkLavoratore';
import Checkbox from 'components/ui2/Checkbox';

const StyledDownloadIcon = styled(DownloadIcon)`
  color: ${props => colors[props.color]};
  fill: ${props => colors[props.color]};
  stroke: ${props => colors[props.color]};
  width: ${props => props.width};
`;

const Body = ({
  idUtente,
  setOpen,
  label,
  titleButton,
  anonymous,
  idServizio,
  savePdfCallback,
  userProfile
}) => {
  const isAdmin = checkAdmin(userProfile.datiLogin);
  const isLavoratore = checkLavoratore(userProfile.datiLogin);
  const [color, setColor] = useState();

  const colorList = [
    {
      id: "Primary WeMi",
      color: colors.primary,
    },
    {
      id: "Red WeMi",
      color: colors.red,
    },
    {
      id: "Orange WeMi",
      color: colors.orange,
    },
    {
      id: "Green WeMi",
      color: colors.green,
    },
    {
      id: "Blue WeMi",
      color: colors.blue,
    },
    {
      id: "Purple WeMi",
      color: colors.purple,
    },
  ];

  const estariCV = useStatelessGraphQLRequest(
    estraiCurriculumLavoratoreQ,
  );

  const [estraiServiziTcb] = useGraphQLRequest(
    undefined,
    estraiServiziTcbCandidaturaLavoratoreQ,
    { idUtenteLav: idUtente },
    true,
    estraiServiziTcbData => estraiServiziTcbData.map(el => ({ id: el.idServizio, value: el.servizio })),
  );

  const estraiServiziTcbLoaded = !estraiServiziTcb.isLoading && !estraiServiziTcb.errored && !estraiServiziTcb.pristine;

  const [selectedService, setSelectedService] = useState(null);
  const [checkboxLogoWemi, setCheckboxLogoWemi] = useState(isLavoratore);

  const [firstService] = (estraiServiziTcbLoaded && estraiServiziTcb.data) || [];

  const serviceId = idServizio || (firstService && firstService.id);

  const scaricaCV = () => estariCV(
    {
      idUtenteLav: idUtente,
      idServizio: (selectedService && selectedService.id) || serviceId,
      brandColor: color ? color : "#0099A8",
      anonymous,
      logoWemi: checkboxLogoWemi,
    },
  );

  return (
    <>
      <Row fluid flex justifycontent="center" padding="0 0 1em">
        <Column padding="0" xs="10" md="8" lg="6" flex justifycontent="center">
          <Text
            size="f7"
            value={label}
            align="center"
          />
        </Column>
        <Column padding="0" xs="12">
          <Row padding="1.5rem 0 0 0" justifycontent="center" alignitems="center">
            <ColorSelector
              colorList={colorList}
              size="1.6em"
              spacing="0.3rem 0.8rem"
              getColor={(value) => setColor(value)}
              selectedColor={color}
            />
          </Row>
        </Column>
        <Row fluid flex justifycontent="center" padding="1em 0 1em">
          {estraiServiziTcbLoaded && estraiServiziTcb.data.length > 1 && !idServizio ? (
            <Column padding="0" xs="10" md="8" lg="6" flex justifycontent="center">
              <Select
                items={estraiServiziTcb.data}
                label="Seleziona il servizio"
                name="servizio"
                selectedValue={selectedService}
                clickedSelectedItem={() => setSelectedService(null)}
                clickedItem={(value) => setSelectedService(value)}
              />
            </Column>
          ) : null}
          {isAdmin ? (
            <Column padding="0" xs="3" md="4" lg="3" flex justifycontent="center" margin="1em 0 0 0">
              <Checkbox
                value={checkboxLogoWemi}
                onChange={(value) => setCheckboxLogoWemi(value)}
                label="Logo WeMi"
                checkcolor="primary"
                width="auto"
              />
            </Column>
          ) : null}
        </Row>
        <Row fluid margin="1.5em 0 0" justifycontent="center">
          <span style={{ padding: "1px 0.7em 0 0" }}>
            <StyledDownloadIcon
              color="green"
              height="1em"
              width="1em"
            />
          </span>
          <DownloadAnchorButton
            dataCallback={scaricaCV}
            buttonProps={{
              autowidth: true,
              label: titleButton,
              labelColor: "green",
              size: "f7",
            }}
            onDownloadDone={(data) => {
              if (isFunction(savePdfCallback) && data) {
                savePdfCallback(data);
              }
              setOpen(false);
            }}
          />
        </Row>
      </Row>
    </>
  )
};

Body.displayName = 'Body';

export default withAuthentication(Body);
