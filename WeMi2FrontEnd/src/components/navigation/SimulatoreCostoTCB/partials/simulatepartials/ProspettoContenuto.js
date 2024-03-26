import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Input from 'components/ui/Input';
import Hr from 'components/ui/Hr';
import FaIcon from 'components/ui/FaIcon';
import Tooltip from 'components/ui/Tooltip';
import Text from 'components/ui/Text';
import styled from 'styled-components';
// import { AccordionBodyWrapper } from '../../../AccordionServAccr/partials';
import { isUndefined } from 'util';
import { moneyFormat } from 'utils/formatters/moneyFormat';

const StyledDiv = styled.div`
//justify-content: space-between;
display: flex;
align-items: center;
`;


const ProspettoContenuto = ({ items }) => (
    <>
        {Object.keys(items).map((item, index) => (
            <div key={index.toString()}>
                <Row key={index.toString()} fluid padding=".5rem 0 0 0" justifycontent="space-around" alignitems="center" display="flex">
                <Column xs="6" md="8"  padding="0">
                    <StyledDiv>
                        <Text
                            intlFormatter
                            value={items[item].name.replace("${servizio}", 'colf')}
                            transform="uppercase"
                            letterSpacing="0.05em"
                            // weight="bold"
                            color="primary"
                            size="f7"
                        />
                        {item.nameDescription ?
                            <Text
                                intlFormatter
                                value={items[item].nameDescription}
                                transform="uppercase"
                                letterSpacing="0.05em"
                                weight="bold"
                                color="primary"
                                padding="0 1em"
                                size="f9"
                            />
                            : null}

                        <Tooltip
                            bottom
                            width="12em"
                            padding=".5em"
                            fontSize="f8"
                            alignitems="center"
                            textTT={`Lorem ipsum dolor sit amet dolor sit amet lorem.`}
                            color="white"
                            bgcolor="primary">
                            <FaIcon
                                radius="50%"
                                icon="\f128"
                                bgcolor="primary"
                                color="white"
                                fontSize="f9"
                                height="2em"
                                width="2em"
                            />
                        </Tooltip>
                    </StyledDiv>
                    </Column>
                <Column xs="6" md="4" padding="0 1em">
                    <Input
                        type="disabled"
                        disabled
                        initialValue={!isUndefined(items[item].value)? moneyFormat(items[item].value, true) : ' '}
                        intlFormatter
                        size="f7"
                    />
                </Column>
                </Row>

                <Hr height="1px" color="darkGrey" width="75%" left="0%" right="30%" top="-1px" bottom="1em" />
            </div>
))}
    </>
);
ProspettoContenuto.displayName = 'ProspettoContenuto';
export default ProspettoContenuto;