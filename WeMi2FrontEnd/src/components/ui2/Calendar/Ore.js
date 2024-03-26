/** @format */

import React, { useState } from "react";
import styled, { css } from "styled-components";
import { colors, fonts } from "theme";
import { hexToRgba } from 'utils/functions/hexToRgba';


const StyledTable = styled.table`
  width: 100%;
  margin: 0; 
    
  th{
    padding: 0.1em 0.4em;
    background: ${colors.greyInput};
    text-align: center;
    font-weight: normal;
    border-bottom: 2px solid ${colors.black};
  }

  tr.daytime {
    th:first-child {
      border-right: 2px solid ${colors.black};
    }
  }
`;

const StyledTd = styled.td`
    padding: 0.1em 0.4em;
    border-top: 1px solid ${colors.grey};
    ${props => props.right &&
    css`
        border-left: 1px solid ${colors.grey};
      `
  }
    background-color:${props => props.selected ? props.disabled ? colors.grey : colors.primary : ''};
    color:${props => props.selected ? props.disabled ? colors.white : colors.white : ''};
    text-align: center;
    ${props => !(props.disabled || props.readOnly) &&
    css`
        cursor: pointer;
        &:focus {
          color:${props => props.selected ? '' : colors.primary};
          font-weight: ${props => props.selected ? '' : '600'};
        }
        &:hover {
          // background-color: ${props => props.selected ? '' : hexToRgba(colors.primary, 0.7)};
          // color:${props => props.selected ? '' : colors.white};
          color:${props => props.selected ? '' : colors.primary};
          font-weight: ${props => props.selected ? '' : '600'};
        }
        ${props => props.inActiveInterval && !props.selected &&
        css`
            background-color: ${hexToRgba(colors.primary, 0.7)};
            color:${colors.white};
          `
      }
      `
  }
`;

const Ore = ({
  calendarId,
  dayIndex,
  onHourSelect,
  label,
  hoursBin,
  handleInterval,
  maxIntervals,
  maxHoursSelectionReached,
  intervals,
  disabled,
  readOnly
}) => {

  const [activeInterval, setActiveInterval] = useState({
    active: false,
    start: 0,
    end: 0,
  });


  /**
  * Gestisce la selezione di una singola fascia oraria
  */
  const selectSingleHour = (h) => {
    const hoursBin_output = hoursBin.substring(0, h - 1) + (hoursBin.charAt(h - 1) === '0' ? '1' : '0') + hoursBin.substring(h);
    if(!(maxHoursSelectionReached && !getIsSelected(h))) {
      onHourSelect(dayIndex, hoursBin_output);
    }
  }

  /**
  * Restituisce true se l'orario h è selezionato (valore 1 nel binario hoursBin)
  */
  const getIsSelected = (h) => {
    return hoursBin.charAt(h - 1) === '1';
  }
  const getIsTempIntervalStart = (h) => {
    return handleInterval && activeInterval.active && activeInterval.start === h;
  }

  /**
  * Restituisce true se l'orario h è all'interno di un intervallo di selezione temporaneo
  */
  const getIsInActiveInterval = (h) => {
    if (handleInterval && activeInterval.active) {
      return ((h < activeInterval.end && h > activeInterval.start) || ((h < activeInterval.start && h > activeInterval.end)))
    } else {
      return false;
    }
  }
  /**
  * Gestisce l'itervallo temporaneo di selezione (quando l'utente deve scegliere il termine)
  */
  const setTempActiveInterval = (h) => {
    if (handleInterval && activeInterval.active) {
      setActiveInterval({ active: true, start: activeInterval.start, end: h })
    }
  }
  /**
  * Gestisce l'interazione con l'intervallo di selezione (creazione e salvataggio)
  */
  const handleActiveInterval = (h) => {

    // Chiude un intervallo di selezione attivo
    if (activeInterval.active) {
      setTempActiveInterval(h);
      const sx = (activeInterval.start < activeInterval.end) ? activeInterval.start : activeInterval.end,
        dx = (activeInterval.start < activeInterval.end) ? activeInterval.end : activeInterval.start;
      let hoursBin_output = '';
      for (let y = 0; y < (1 + dx - sx); y++) {
        hoursBin_output += '1';
      }
      hoursBin_output = hoursBin.substring(0, sx - 1) + hoursBin_output + hoursBin.substring(dx);
      onHourSelect(dayIndex, hoursBin_output);
      setActiveInterval({
        active: false,
        start: 0,
        end: 0
      })
    }

    // Cancella un intervallo esistente
    else if (getIsSelected(h)) {
      intervals.forEach(int => {
        const sx = int.from,
          dx = (int.to === 1) ? 24 : int.to - 1;
        if (sx <= h && h <= dx) {
          let hoursBin_output = '';
          for (let t = 0; t < (1 + dx - sx); t++) {
            hoursBin_output += '0';
          }
          hoursBin_output = hoursBin.substring(0, sx - 1) + hoursBin_output + hoursBin.substring(dx);
          onHourSelect(dayIndex, hoursBin_output);
          setActiveInterval({
            active: false,
            start: 0,
            end: 0
          })
        }
      });
    }

    // Apre un nuovo intervallo di selezione se non si è superato il numero massimo consentito 
    else if (intervals.length < maxIntervals) {
      setActiveInterval({
        active: true,
        start: h,
        end: h
      })
    }
  }

  /**
  * Ottiene l'intevallo in cui è contenuto l'orario selezionato
  */
  const getInterval = (h) => {
    let output = null;
    intervals.forEach(int => {
      const sx = int.from,
        dx = (int.to === 1) ? 24 : int.to - 1;
      if (sx <= h && h <= dx) {
        output = int;
      }
    });
    return output;
  }

  /**
  * Gestisce la label per l'accessibilità
  */
  const getAccessibilityLabel = (h) => {
    if (getIsSelected(h) && !(handleInterval && activeInterval.active)) {
      const dayName = label,
        interval = getInterval(h);
      if (handleInterval && interval) {
        return (dayName + ': deseleziona intervallo da ore ' + interval.from + ' a ore ' + interval.to);
      } else {
        return (dayName + ': deseleziona ore ' + h);
      }
    } else {
      const dayName = label;
      if (handleInterval) {
        if (activeInterval.active) {
          return (dayName + ': seleziona nuovo intervallo fino a ore ' + h);
        } else {
          return (dayName + ': seleziona nuovo intervallo a partire da ore ' + h);
        }
      } else {
        return (dayName + ': seleziona ore ' + h);
      }
    }
  }

  const generaOre = () => {
    let arr = [];
    for (let h = 1; h < 13; h++) {
      arr.push(
        <tr key={calendarId + '_' + dayIndex + '_' + h}>
          <StyledTd
            left
            tabIndex="-1"
            role="option"
            disabled={disabled}
            readOnly={readOnly}
            id={calendarId + '_' + dayIndex + '_' + h}
            aria-label={getAccessibilityLabel(h)}
            selected={getIsSelected(h) || getIsTempIntervalStart(h)}
            aria-selected={getIsSelected(h)}
            inActiveInterval={getIsInActiveInterval(h)}
            onMouseEnter={e => setTempActiveInterval(h)}
            onFocus={e => setTempActiveInterval(h)}
            onClick={e => {
              if (!(readOnly || disabled)) {
                handleInterval ?
                  handleActiveInterval(h) :
                  selectSingleHour(h);
              }
            }}>
            {h}
          </StyledTd>
          <StyledTd
            right
            tabIndex="-1"
            role="option"
            disabled={disabled}
            readOnly={readOnly}
            id={calendarId + '_' + dayIndex + '_' + (h + 12)}
            aria-label={getAccessibilityLabel(h + 12)}
            selected={getIsSelected(h + 12) || getIsTempIntervalStart(h + 12)}
            aria-selected={getIsSelected(h + 12)}
            inActiveInterval={getIsInActiveInterval(h + 12)}
            onMouseEnter={e => setTempActiveInterval(h + 12)}
            onFocus={e => setTempActiveInterval(h + 12)}
            onClick={e => {
              if (!(readOnly || disabled)) {
                handleInterval ?
                  handleActiveInterval(h + 12) :
                  selectSingleHour(h + 12);
              }
            }}>
            {h + 12}
          </StyledTd>
        </tr>
      )
    }
    return arr;
  }
  const orari = generaOre();

  return (
    <StyledTable className="dayTable">
      <thead>
        <tr>
          <th colSpan="2">{label}</th>
        </tr>
        <tr className="daytime">
          <th>AM</th>
          <th>PM</th>
        </tr>
      </thead>
      <tbody className="hoursSelectGrid">
        {orari.map(el => { return el })}
      </tbody>
    </StyledTable>
  );
};

Ore.displayName = 'Ore';

export default Ore;