/** @format */

import React, {useEffect} from "react";
import styled, { css } from "styled-components";
import Ore from './Ore';
import { colors, fonts } from "theme";
import { computeLegacy } from './legacyUtil';
import { keyCodes } from 'components/ui2/utils/constants/keyCodes';

const StyledWrapper = styled.table`
    width: 100%;
    font-size: ${props => props.fontSize ? fonts.size[props.fontSize] : fonts.size.f7};
    // display: flex; 
    // flex-wrap: nowrap;
    // justify-content: stretch;
    // align-items: stretch;

    > tbody > tr > td {
        width: calc(100% / 7);
        padding: 0;
        margin: 0;
        border-width: 2px;
        border-style: solid;
        border-color: ${colors.black};
    };
`;

StyledWrapper.displayName = 'StyledWrapper';


let defaultHours = '';
for (let h=0; h<24; h++) {
    defaultHours+='0';
}

const Calendar = ({
    calendarId,
    selectedValues,
    readOnly,
    disabled,
    onChange,
    onChangeLegacy, // exporta i risultati con un json legacy rispetto a versiaone 1.0
    fontSize,
    handleInterval,
    maxHours, // num max total hours
    maxIntervals, // num max interval per day
}) => {

    /**
     * Ogni giorno ha un suo spazio in array con:
     * @txValue che indica il testo da visualizzare per il nome del giorno
     * @hoursBin è un binario di 24 caratteri che per ogni ora del giorno assume valore 0 o 1 a seconda che sia stata selezionata o meno
     * @count indica il conteggio delle ore selezionate
     * @intervals elenca gli intervalli temporali calcolati (from - to) in ore
    */
    const days = [
      {
        txValue: "Lunedì",
        hoursBin: defaultHours,
        count: 0,
        intervals: []
      },
      {
        txValue: "Martedì",
        hoursBin: defaultHours,
        count: 0,
        intervals: []
      },
      {
        txValue: "Mercoledì",
        hoursBin: defaultHours,
        count: 0,
        intervals: []
      },
      {
        txValue: "Giovedì",
        hoursBin: defaultHours,
        count: 0,
        intervals: []
      },
      {
        txValue: "Venerdì",
        hoursBin: defaultHours,
        count: 0,
        intervals: []
      },
      {
        txValue: "Sabato",
        hoursBin: defaultHours,
        count: 0,
        intervals: []
      },
      {
        txValue: "Domenica",
        hoursBin: defaultHours,
        count: 0,
        intervals: []
      }
    ];

    /**
    * Gestisce l'aggiornamento del dato aggiornando il binario degli orari e le altre variabili
    */
   const changeHandler = (day, hoursBin) => {
        const output = JSON.parse(JSON.stringify(days));
        output[day].hoursBin = hoursBin;
        output[day].count = output[day].hoursBin.split("1").length - 1;
        output[day].intervals = computeIntervals(hoursBin);
        onChange(output);
        if (onChangeLegacy) {
            onChangeLegacy(computeLegacy(output));
        }
    }
    const computeIntervals = (hoursBin) => {
        const subintervals = hoursBin.split("0");
        const intervals = [];
        let k=0;
        subintervals.forEach(v=>{
            if(v.length){
                intervals.push({
                    from: k+1,
                    to: (k+v.length+1 > 24) ? 1 : k+v.length+1
                });
                k+=v.length+1
            } else {k++;}
        });
        return intervals;
    }

    /**
    * Processa i dati che arrivano da fuori considerando solo le ore
    */
    let computeTotalHours = 0;
    if (selectedValues) {
        selectedValues.forEach((el, i) => {
            computeTotalHours += el.count;

            if (el.hoursBin && el.hoursBin.length === 24) {
                days[i].hoursBin = el.hoursBin;
                days[i].count = el.hoursBin.split("1").length - 1;
                days[i].intervals = computeIntervals(el.hoursBin);
            }
        })
    }
    
    /**
    * Gestione dell'accessibilità da tastiera
    */
    const handleKeyDown = (e) => {
        const el = document.activeElement,
              elId = (el) ? el.id : null,
              refId = (calendarId)?calendarId:'calendar',
              day = (elId) ? parseInt(elId.split('_')[1]) : null,
              h = (elId) ? parseInt(elId.split('_')[2]) : null;
        switch(e.keyCode) {
            case keyCodes.ENTER:
                el.click();
                e.preventDefault(); e.stopPropagation();
                break;
            case keyCodes.SPACE:
                el.click();
                e.preventDefault(); e.stopPropagation();
                break;
            case keyCodes.DOWN_ARROW:
                let nextHEl = null;
                if(day !== null && !isNaN(day) && !isNaN(h)) {
                    nextHEl = document.getElementById(refId+'_'+day+'_'+((h===24) ? 1 : (h+1)));
                } else {
                    nextHEl = document.getElementById(refId+'_'+0+'_'+1);
                }
                if(nextHEl) {nextHEl.focus();}
                e.preventDefault(); e.stopPropagation();
                break;
            case keyCodes.UP_ARROW:
                let prevHEl = null;
                if(day !== null && !isNaN(day) && !isNaN(h)) {
                    prevHEl = document.getElementById(refId+'_'+day+'_'+((h===1) ? 24 : (h-1)));
                } else {
                    prevHEl = document.getElementById(refId+'_'+6+'_'+24);
                }
                if(prevHEl) {prevHEl.focus();}
                e.preventDefault(); e.stopPropagation();
                break;
            case keyCodes.RIGHT_ARROW:
                let nextDayEl = null;
                if(day !== null && !isNaN(day) && !isNaN(h)) {
                    nextDayEl = document.getElementById(refId+'_'+((day===6) ? 0 : (day+1))+'_'+h);
                } else {
                    nextDayEl = document.getElementById(refId+'_'+0+'_'+1);
                }
                if(nextDayEl) {nextDayEl.focus();}
                e.preventDefault(); e.stopPropagation();
                break;
            case keyCodes.LEFT_ARROW:
                let prevDayEl = null;
                if(day !== null && !isNaN(day) && !isNaN(h)) {
                    prevDayEl = document.getElementById(refId+'_'+((day===0) ? 6 : (day-1))+'_'+h);
                } else {
                    prevDayEl = document.getElementById(refId+'_'+6+'_'+1);
                }
                if(prevDayEl) {prevDayEl.focus();}
                e.preventDefault(); e.stopPropagation();
                break;
            default:
                break;
        }
    }

    /**
     * Gestisce la label per l'accessibilità
     */
    const getAccessibilityLabel = () => {
        if(readOnly || disabled) {
            const textRecap = ["Calendario: fascie orarie selezionate"];
            days.forEach(day => {
                day.intervals.forEach(interval => {
                    textRecap.push(day.txValue + ': dalle ' + interval.from + ' alle ' + interval.to);
                })
            })
            if(textRecap.length===1){textRecap.push("nessuna");}
            return textRecap.toString();
        } else {
            return "Calendario: seleziona le fascie orarie";
        }
    }

    return (
        <div style={{width: '100%', position: 'relative', overflowX: 'auto'}}>
            <StyledWrapper
            id={(calendarId)?calendarId:'calendar'}
            role="table"
            aria-label={getAccessibilityLabel()}
            tabIndex="0"
            onKeyDown={e=>{if(!(readOnly || disabled)) handleKeyDown(e);}}
            fontSize={fontSize}
            readOnly={readOnly}
            disabled={disabled}>
                <tbody>
                <tr>
                {days.map((day,index) => {
                    return (
                    <td key={day.txValue}>
                        <Ore
                            calendarId={(calendarId)?calendarId:'calendar'}
                            dayIndex={index}
                            onHourSelect={(day, hoursBin)=>{if(!(readOnly || disabled)) changeHandler(day, hoursBin);}}
                            hoursBin={day.hoursBin}
                            label={day.txValue}
                            disabled={disabled}
                            readOnly={readOnly}
                            handleInterval={handleInterval}
                            maxHoursSelectionReached={(maxHours) ? computeTotalHours >= maxHours : false}
                            maxIntervals={maxIntervals}
                            intervals={day.intervals}/>
                    </td>
                    )
                })}
                </tr>
                </tbody>
            </StyledWrapper>
        </div>
    );
};

Calendar.displayName = 'Calendar';

export default Calendar;
