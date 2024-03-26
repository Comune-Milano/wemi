/** @format */

import React from 'react';
import { Row } from 'components/ui/Grid';
import AreaCittadinoCard from './partials/AreaCittadinoCard';

const Voucher = ({ card }) => {

  return (
    <Row fluid padding="0 2em" justifycontent="center">
      {
        card.map((cardInfo, index) => (
          <AreaCittadinoCard
            cardInfo={cardInfo}
            mdColumnSize={12}
            lgColumnSize={12}
            color="purple"
            key={'card' + index}
            imgWidth="30%"
            imgHeight="30%"
          />
        ))
      }
    </Row>
  );
};

Voucher.displayName = 'Voucher';
export default Voucher;
