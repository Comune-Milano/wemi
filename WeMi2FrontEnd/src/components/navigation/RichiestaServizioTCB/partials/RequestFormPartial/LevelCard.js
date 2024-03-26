/** @format */

import React, { useState } from 'react';
import { colors } from 'theme';
import Text from 'components/ui/Text';
import Tooltip from 'components/ui/Tooltip';
import Radio from 'components/ui2/RadioGroup/radio';
import FaIcon from 'components/ui/FaIcon';
import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import { Row, Column } from 'components/ui/Grid';
import { hexToRgba } from 'utils/functions/hexToRgba';
import { noop } from 'utils/functions/noop';

const StyledLevelCard = styled.div`
position: relative;
height: auto;
padding: 1.5em 1em;
cursor: pointer;
transition: background-color .2s linear;
&:hover {
    background-color: ${hexToRgba(colors.darkGrey, 0.15)};
}
${props => props.active && css`
    background-color: ${hexToRgba(colors.primary, 0.15)} !important;
`}

label {
    padding-left: 1em;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    width: 100%;
};
`

const LevelCard = ({
    card, 
    getCard, 
    selectedCard,
}) => {
return(
    <StyledLevelCard  active={selectedCard && card.id === selectedCard.id} padding="0"
        aria-checked={selectedCard && card.id === selectedCard.id} 
        onClick={() => {getCard.bind(this); getCard(card)}}>
        <Radio
            label={card.title}
            selected={selectedCard && card.id === selectedCard.id}
            onClick={() => noop()}
            fontSize="f7"
            spacing="0"
            checkcolor={"primary"}
            display="inline-grid"
        /> 
        <Text 
            padding=".2em 0 0 2em"
            value={`${card.text1}.`}
            size="f7" tag="p" 
        />
    </StyledLevelCard>

    )
};

LevelCard.displayName = 'LevelCard';
export default LevelCard;