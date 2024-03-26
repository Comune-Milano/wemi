/** @format */
import React from 'react';
import styled from 'styled-components';
import {Row} from 'components/ui/Grid';
import Header from 'components/ui2/Header';
import AnchorLink from 'components/ui/AnchorLink';

const StyledStepper = styled(AnchorLink)`
    ${props => props.stupid ? 
        'cursor: default' : 
        'cursor: pointer'}
    ${props => props.active ? `
    max-width: calc(100% - ${(props.steps.length-1) * 3.5}em);
    // h1, span {
    //     opacity: 0;
    //     animation-delay: .6s;
    //     animation-name: comparsaLenta;
    //     animation-duration: 1s;
    //     animation-fill-mode: forwards;
    // }

    width: 3.5em;
    animation-delay: .6s;
        animation-name: comparsaWidth;
        animation-duration: .2s;
        animation-fill-mode: forwards;
    ` 
    : 
    'max-width: 3.5em;'};
   
    @keyframes comparsaLenta {
        0% {opacity: 0};
        100% {opacity: 1}
    }
    @keyframes comparsaWidth {
        0% {max-width: 3.5em; width: 3.5em};
        100% {max-width: calc(100% - ${props => (props.steps.length-1) * 3.5}em); width: 100%}
    }
    transition: max-width .2s linear
`;


const Stepper = ({ steps, stupid }) => {
    return (
        <Row fluid>
            {steps.map((el, index)=> (
                <StyledStepper
                role="menuitem"
                stupid={stupid}
                to={el.link ? el.link : null}
                active={el.active}
                steps={steps}
                >
                <Header 
                    step={!el.active}
                    title={el.active ? el.title : (index + 1)} 
                    index={el.active ? index + 1 : null}
                    color={el.color} 
                />
                </StyledStepper>
            ))}

        </Row>
    )
};

Stepper.displayName = 'Stepper';

export default Stepper;
