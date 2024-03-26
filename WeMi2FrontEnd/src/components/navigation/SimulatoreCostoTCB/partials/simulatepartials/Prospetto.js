import React from 'react';
import { Row, Column } from 'components/ui/Grid';
// import Accordion from 'components/ui/Accordion';
// import FaIcon from 'components/ui/FaIcon';
// import Tooltip from 'components/ui/Tooltip';
import Label from 'components/ui/Label';
// import SubTitle from 'components/ui/SubTitle';
// import styled from 'styled-components';
// import { AccordionBodyWrapper } from '../../../AccordionServAccr/partials';
import { ProspettoContenuto } from './';
// const StyledDiv = styled.div`
// justify-content: space-between;
// display: flex;
// align-items: center;
// `;


const Prospetto = ({ items }) => (
    <Column xs="12" padding="1em 0" >
        <Row>
            <Label value='Prospetto di spesa annuale'
                weight="bold"
                transform="uppercase"
                intlFormatter
                color="primary"
                bgcolor="grey"
                size="f7"
                display="flex" />
            <Label color="primary" size="f4" />
        </Row>
        {/* <Accordion
            headerBgColorOpen="primary"
            headerBgColor="grey"
            headerColorOpen="white"
            headerColor="primary"
            arrowOpenColor="white"
            arrowClosedColor="primary"
            arrowSize="f1"
            headerPadding="0.75rem 1.25rem"
            aperto={false}
            AccordionHeader={() => (
                <Text weight="bold" size="f4" value="Ipotesi di preventivo spesa per assistenza familiare" intlFormatter />
            )}
            AccordionBody={() => {
                if (items)
                    return (<AccordionBodyWrapper> */}
        <Column margin="1em 0" padding="0">
            <ProspettoContenuto items={items} />
        </Column>
        {/* </AccordionBodyWrapper>)

            }}
        /> */}

    </Column>
);
Prospetto.displayName = 'Prospetto';
export default Prospetto;