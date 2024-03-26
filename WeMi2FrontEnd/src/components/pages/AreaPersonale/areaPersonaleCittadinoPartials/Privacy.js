/** @format */

import React, { useEffect } from 'react';
import { Row, Column } from 'components/ui/Grid';
import AreaCittadinoCard from './partials/AreaCittadinoCard';

const Privacy = ({ 
  card,
  wrapperColumnMd,
  wrapperColumnLg,
  imgHeight,
  imgWidth
 }) => {

  return (
    <Row fluid padding="0 2em" justifycontent="center">
      <Column padding="0" md={wrapperColumnMd} lg={wrapperColumnLg}>
        {
          card.map((cardInfo, index) => (
            <AreaCittadinoCard
              cardInfo={cardInfo}
              mdColumnSize={12}
              lgColumnSize={12}
              color="orange"
              key={'card' + index}
              imgWidth={imgWidth}
              imgHeight={imgHeight}
              paddingXlDescrCol= "2em 2em 0.5em 2em"
            />
          ))
        }
      </Column>
    </Row>
  )
};

Privacy.displayName = 'Privacy';
export default Privacy;