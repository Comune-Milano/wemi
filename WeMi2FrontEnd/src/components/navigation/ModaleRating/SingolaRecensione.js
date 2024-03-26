import React from 'react';
import { Row, Column } from 'components/ui/Grid';
import Hr from 'components/ui/Hr';
import Rating from 'components/ui2/Rating';
import Text from 'components/ui/Text';
import { getObjectValue } from 'utils/extensions/objectExtensions';
import styled from 'styled-components';
import media from 'utils/media-queries';
import moment from 'moment';

const MyColumn = styled(Column)`
 justify-content: flex-start;
 padding: 0.5em 0 0 0;
${media.lg`
justify-content:flex-end;
padding: 0;
`}
${media.md`
justify-content:flex-end;
padding: 0;
`}
${media.sm`
justify-content:flex-end;
padding: 0;
`}

`;

const SingolaRecensione = ({ recensione }) => {

    const rating = [{
        'txValue': 'Valutazione generale del servizio offerto',
        'ratingValue': getObjectValue(recensione, 'qt_media_singola_recensione', '')
    },
    {
        'txValue': "Puntualità dell'operatore",
        'ratingValue': getObjectValue(recensione, 'js_dati_recensione.qtPuntualita', '')
    },
    {
        'txValue': 'Velocità nel rispondere alla richiesta',
        'ratingValue': getObjectValue(recensione, 'js_dati_recensione.qtVelocita', '')
    },
    {
        'txValue': "Professionalità dell'operatore",
        'ratingValue': getObjectValue(recensione, 'js_dati_recensione.qtCortesia', '')
    },
    ];

    const creazioneRecensione = getObjectValue(recensione, 'ts_creazione', null);

    return (
        <>
            <Hr width="100%" height="1.5px" color="primary" top="0px" bottom="0.2em" />
            <Row fluid padding='0 0 0.7rem 0'>
                <Column xs="9" sm="7" md='6' lg='6' padding='0 0 0 0' justifycontent="flex-start">
                    <Text
                        intlFormatter
                        tag="strong"
                        value={getObjectValue(recensione, 'tx_nome_utente', '')}
                        transform="uppercase"
                        letterSpacing="0.05em"
                        weight="bold"
                        color="darkGrey"
                        size="f8"
                    />
                </Column>
                <Column xs="3" sm="5" md='6' lg='6' flex justifycontent="flex-end" padding='0 0 0 0' >
                    <Text
                        intlFormatter
                        tag="strong"
                        value={creazioneRecensione ? moment(creazioneRecensione).format('DD/MM/YYYY') : ""}
                        transform="uppercase"
                        letterSpacing="0.05em"
                        weight="bold"
                        color="darkGrey"
                        size="f8"
                    />
                </Column>

                <Row fluid padding='0.5em 0' >
                    <Text
                        intlFormatter
                        tag="p"
                        wordBreak="break-word"
                        value={getObjectValue(recensione, 'js_dati_recensione.txNotaRecensione', '')}
                        whitespace="pre-line"
                        color="dark"
                        size="f7"
                    />
                </Row>
            </Row>
            {rating.map(ele => {
                return (
                    <Row fluid margin='0.2em 0 0 0' alignitems="center" key={ele.txValue} >
                        <Column xs="12" sm="8" md='6' lg='9' padding="0 1.5rem 0 0">
                            <Text
                                intlFormatter
                                value={ele.txValue}
                                transform="uppercase"
                                letterSpacing="0.05em"
                                weight="bold"
                                color="darkGrey"
                                size="f8"
                                padding="0 0.2em 0 0"
                            />
                        </Column>
                        <MyColumn xs="12" sm="4" md='6' lg='3' flex >
                            <Rating fontSize="f8" spacingRight="0.1em" onClick={() => { }} stars={ele.ratingValue} readOnly={true} />
                        </MyColumn>
                        <Hr width="100%" height="1.5px" color="grey" type="solid" top="0px" bottom="0px" />
                    </Row>
                )
            })
            }
        </>
    );
}
export default SingolaRecensione;