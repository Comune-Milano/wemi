import React from 'react';
import Header from './common/Header';
import { Row, Column } from 'components/ui/Grid';
import Text from 'components/ui/Text';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';
import { converterHours } from 'components/ui2/Calendar/converterHours';

const Calendario = ({ Value }) => {
    const sottotitolo = "Calendario Disponibilità";
    const giorniSettimana = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
    const calendar = Value.calendario ? Value.calendario : Value;

    const creaOre = (arr) => {
        if (arr.length === 0) {
            return '---';
        }
        let ris;
        let controlloMattina = true;
        let controlloPomeriggio = true;
        arr.forEach((element, index) => {
            if (index === 0) {
                if (parseInt(element) < 12) {
                    ris = element + ":00";
                } else {
                    ris = "---";
                }
            }
            if (parseInt(element) > 12 && controlloMattina) {
                if (ris !== "---") {
                    ris = ris + "-" + arr[index - 1] + ":00";
                }
                controlloMattina = false;

            }
            if (!controlloMattina && controlloPomeriggio) {
                ris = ris + " / " + element + ":00";
                controlloPomeriggio = false;
            }
        });

        return ris + "-" + arr[arr.length - 1] + ":00";
    }
    return (
        <>
            <Header
                sottotitolo={sottotitolo}
            ></Header>
            {
                calendar ? calendar.map((day, i) => (
                    <Row fluid key={'contday_' + i} alignitems="flex-start">
                        <Column xs="3" padding="0 .5em 0 0">
                            <Text
                                tag="strong"
                                value={day.giorno ? day.giorno : day.txValue}
                                weight="bold"
                                color="black" size="f7" />
                        </Column>
                        <Column xs="9" padding="0 0 0 1em">
                            {(day.disponibilita && (!isNullOrUndefined(day.disponibilita[0]) || !isNullOrUndefined(day.disponibilita[1]))) ?
                                day.disponibilita.map((disp, i2) => (
                                    <React.Fragment key={'disp_' + i + '_' + i2}>
                                        {i2 && day.disponibilita[0] && day.disponibilita[1] ? ' / ' : ''}

                                        {
                                            disp ?
                                                (
                                                    <>
                                                        <Text
                                                            value={disp && disp.oraDa && disp.oraDa}
                                                            color="black" size="f7"
                                                        />
                                                        -
                                                                <Text
                                                            value={disp && disp.oraA && disp.oraA}
                                                            color="black" size="f7"
                                                        />
                                                    </>
                                                ) : null
                                        }


                                    </React.Fragment>
                                )) :
                                day.hoursBin ?
                                    <>
                                        <Text
                                            value={creaOre(converterHours(day.hoursBin))}
                                            color="black" size="f7"
                                        />
                                    </>

                                    :
                                    '---'}
                        </Column>
                    </Row>
                ))
                    :
                    giorniSettimana.map((ele, index) => {
                        return (
                            <Row fluid key={index} alignitems="flex-start">
                                <Column xs="3" padding="0 .5em 0 0">
                                    <Text
                                        tag="strong"
                                        value={ele}
                                        weight="bold"
                                        color="black" size="f7" />
                                </Column>
                                <Column xs="9" padding="0 0 0 1em">
                                    ---
                        </Column>
                            </Row>)
                    })
            }
        </>

    )
}


export default Calendario