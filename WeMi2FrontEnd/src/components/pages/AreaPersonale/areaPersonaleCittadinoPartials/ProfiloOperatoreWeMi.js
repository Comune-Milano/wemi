/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import AreaCittadinoCard from './partials/AreaCittadinoCard';
import Button from 'components/ui2/Button';
import Tooltip from 'components/ui2/Tooltip';

const ProfiloOperatoreWeMi = ({ card, cv }) => {

  return (
    <Row fluid padding="0" justifycontent="center">
      {
        card.map((cardInfo, index) => (
          <AreaCittadinoCard
            cardInfo={cardInfo}
            mdColumnSize={12}
            lgColumnSize={4}
            color="green"
            key={'card' + index}
          />
        ))
      }
      <Row
        fluid
        justifycontent="center"
        margin="1.5em 2em 1em"
      >
        {cv.tooltipValue ?
          <Tooltip
            position="bottom"
            fontSize="f8"
            color="white"
            bgcolor="blue"
            posAdjustment="10%"
            value={cv.tooltipValue}
          >
            <Button
              autowidth
              color="green"
              label={cv.title}
              fontSize="f6"
              onClick={cv.onClick}
              disabled={cv.disabled}
            />
          </Tooltip>
          :
          <Button
            autowidth
            color="green"
            label={cv.title}
            fontSize="f6"
            onClick={cv.onClick}
            disabled={cv.disabled}
          />}
      </Row>
    </Row>
  )
};

ProfiloOperatoreWeMi.displayName = 'ProfiloOperatoreWeMi';
export default ProfiloOperatoreWeMi;