import React from 'react'
import Accordion from "components/ui/Accordion";
import Text from "components/ui/Text"
import { accordionStyle } from '../styles'
import Wrapper from './AccordionBodyWrapper'

const AccordionServizio = ({ titolo, nearTitle, Body, Form, SetForm, Modifica }) => {
    return (
        <Accordion
            {...accordionStyle}
            aperto={false}
            AccordionHeader={() => (
                <span>
                    <Text weight="bold" size="f4" value={titolo} />
                    &nbsp;
                    <Text weight="bold" size="f7" value={nearTitle} />
                </span>
            )}
            children={
                <Wrapper>
                    <Body
                        Form={Form}
                        SetForm={SetForm}
                        Modifica={Modifica}
                    />
                </Wrapper>}
        >
        </Accordion>
    );
};

export default AccordionServizio;
