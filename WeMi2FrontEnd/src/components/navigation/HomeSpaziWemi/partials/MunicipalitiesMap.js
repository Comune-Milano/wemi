
import React, { memo, useState } from 'react';
import styled from 'styled-components';
import { colors, fonts } from 'theme';
import { Row, Column } from 'components/ui/Grid';
import media from 'utils/media-queries';
import { MUNICIPALITIES_MAP } from '../constants';
import { MunicipalitiesMapPoint } from './MunicipalitiesMapPoint';
import { BackgroundTitle, bgTitleSizes } from 'components/ui2/BackgroundTitle';

const StyledCircleWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 1rem;

  &:first-of-type {
    margin-left: 0;
  }

  ${media.md`
    margin-left: 1.3rem;
  `}

  ${media.lg`
    margin-left: 2rem;
  `}
`;

const StyledTitle = styled.div`
  line-height: 1.7;

  span {
    text-transform: uppercase;
    font-weight: bold;
    padding: 0.2rem 1rem;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    color: ${colors.white};
    background-color: ${colors.blue};
    font-size: ${fonts.size.f5};  
    letter-spacing: 0.05em;  
  }
`;

const StyledMapRow = styled(Row)`
  justify-content: center;

  ${media.md`
    justify-content: flex-start;
  `}
`;

const MunicipalitiesMap = ({
  onMunicipalityClick,
  onSelectedMunicipalityClick,
  selectedMunicipalityID,
  municipalitiesList,
}) => {
  /**
   * Handles the click on a municipality in the map.
   */
  const handleMunicipalityClick = municipalityID => {
    const clickCallback = municipalityID === selectedMunicipalityID ?
      onSelectedMunicipalityClick :
      onMunicipalityClick;

    clickCallback(municipalityID);
  };

  // The municipality ID of the overed point.
  const [overedMunicipalityPointID, setOveredMunicipalityPointID] = useState();

  return (
    <Row>
      <Column xs="12" padding="0 0 6rem 0">
        <BackgroundTitle
          size={bgTitleSizes.small}
          bgColor="blue"
          label="Scopri la nostra rete di spazi"
        />
      </Column>
      <Column xs="12" padding="0">
        {
          MUNICIPALITIES_MAP.map((row, rowIndex) => (
            <StyledMapRow margin="0 0 2rem 0" key={rowIndex.toString()}>
              {
                row.map((point, pointIndex) => (
                  <StyledCircleWrapper key={pointIndex.toString()}>
                    <MunicipalitiesMapPoint
                      municipalitiesList={municipalitiesList}
                      point={point}
                      selectedMunicipalityID={selectedMunicipalityID}
                      overedMunicipalityPointID={overedMunicipalityPointID}
                      onClick={() => handleMunicipalityClick(point.municipalityID)}
                      onHover={() => setOveredMunicipalityPointID(point.municipalityID)}
                      onOut={() => setOveredMunicipalityPointID(undefined)}
                    />
                  </StyledCircleWrapper>
                ))
              }
            </StyledMapRow>
          ))
        }
      </Column>
    </Row>
  );
};

MunicipalitiesMap.displayName = 'MunicipalitiesMap';

const memoizedComponent = memo(MunicipalitiesMap);
export { memoizedComponent as MunicipalitiesMap };
