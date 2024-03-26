
import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { colors } from 'theme';
import Tooltip from 'components/ui2/Tooltip';
import { keyCodes } from 'components/ui2/utils/constants/keyCodes';
import { getMunicipioBrandColor, getMunicipioContrastColor } from '../utils/utils';

const StyledCircle = styled.div`
  border-radius: 50%;
  background-color: ${({ color }) => colors[color]};
  background-clip: content-box;
  display: inline-block;
  padding: 3px;
  height: 22px;
  width: 22px;
  mix-blend-mode: multiply;

  &:focus {
    outline: none;
  }

  ${({ borderColor }) => borderColor && `
    box-shadow: 0 0 0 5px ${colors[borderColor]};
    transition: box-shadow 0.3s ease-in-out;
  `}

  ${({ active, borderColor }) => active && `
    box-shadow: 0 0 0 4.75rem ${colors[borderColor]};
  `}

  ${({ cursor }) => cursor && `
    cursor: ${cursor};
  `}
`;

const MunicipalitiesMapPoint = ({
  point,
  municipalitiesList,
  selectedMunicipalityID,
  overedMunicipalityPointID,
  onClick,
  onHover,
  onOut,
}) => {
  const brandColor = useMemo(
    () => getMunicipioBrandColor(point.municipalityID),
    [point],
  );

  const contrastColor = useMemo(
    () => getMunicipioContrastColor(point.municipalityID),
    [point]
  );

  const municipalityName = useMemo(
    () => {
      const municipality = municipalitiesList.get(point.municipalityID);
      return `Municipio ${municipality?.nome}`;
    },
    [point, municipalitiesList],
  );

  const handleKeyDown = event => {
    if (event.keyCode === keyCodes.ENTER) {
      onClick();
    }
  };

  const isPointActive = point.municipalityID === selectedMunicipalityID &&
    (!overedMunicipalityPointID || overedMunicipalityPointID === selectedMunicipalityID);

  if (point.municipalityID) {
    return (
      <div
        onMouseOver={onHover}
        onMouseOut={onOut}
      >
        <Tooltip
          bgcolor={brandColor}
          color={contrastColor}
          position="bottom"
          fontWeight="bold"
          posAdjustment="-355%"
          preventOnHover={point.municipalityID === selectedMunicipalityID}
          value={municipalityName}
        >
          <StyledCircle
            tabIndex="0"
            cursor="pointer"
            aria-label={municipalityName}
            color={point.dotColor}
            active={isPointActive}
            borderColor={brandColor}
            onClick={onClick}
            onKeyDown={handleKeyDown}
          />
        </Tooltip>
      </div>
    );
  }

  return (
    <StyledCircle
      color={point.dotColor}
      cursor="default"
    />
  );
};

MunicipalitiesMapPoint.displayName = 'MunicipalitiesMapPoint';

const memoizedComponent = memo(MunicipalitiesMapPoint);
export { memoizedComponent as MunicipalitiesMapPoint };
