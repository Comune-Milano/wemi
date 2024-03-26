import React, { useState } from 'react';
import { Row, Column } from 'components/ui/Grid';
import Accordion from 'components/ui/Accordion';
import Text from 'components/ui/Text';
import Rating from 'components/ui/Rating';


const ServiceRating = props => {
const {getValue, defaultValue} = props;

    return (
        <Accordion
        headerColor="primary"
        headerBgColor="white"
        headerColorOpen="primary"
        headerBgColorOpen="white"
        arrowOpenColor="primary"
        arrowClosedColor="primary"
        headerPadding="0"
        arrowSize="f5"
        AccordionHeader={() => (
          <Row fluid justifycontent="space-between">
            <Column xs="11" padding="0">
              <Text 
                value="Valutazione" 
                transform="uppercase"
                letterSpacing="0.05em" 
                intlFormatter 
                size="f7"
                letterSpacing="0.05em"
              />
            </Column>
            {/* <Column xs="2" padding="0 1em 0 0">
              <Badge
                bgcolor="red"
                color="white"
                value="0/3"
                width="auto"
                height="auto"
                padding="p1"
                radius="25px"
                fontsize="f8"
              />
            </Column> */}
          </Row>
        )}
        AccordionBody={() => (
            <>
    
          <Row fluid  margin="1em 0">
          <Rating fontSize="f5" getValue={getValue} defaultValue={defaultValue} spacingRight="p1" />   
          </Row>
          </>
        )}
      />
    )
}

export default ServiceRating;