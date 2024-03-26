
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { colors } from 'theme';
import FaIcon from 'components/ui2/FaIcon';
import { hexToRgba } from 'utils/functions/hexToRgba';
import { keyCodes } from '../../utils/constants/keyCodes';

const SelectOption = styled.li`
  position: relative;
  padding: 10px 13px;
  background-color: ${props => props.selected ? hexToRgba(colors.primary, 0.15) : 'transparent'};
  display: inline-flex;
  width: 100%;
  padding-left: ${props => props.selected ? '13px' : '2.4em'}
  
  ${props => props.capitalizeFirst ?
    'text-transform: capitalize;' :
    null
  }

  &:hover, &:focus {
    background-color: ${props => props.bgHoverColor ?
    colors[props.bgHoverColor] :
    props.selected ? hexToRgba(colors.primary, 0.3) : colors.grey
  }
  }

  &:focus {
    outline: 0;
  }

  i {
    margin-right: 0.4em;
    margin-top: 0.3em;
  }
`;

const Option = ({
  item,
  selected,
  clickedItem,
  selectName,
  bgHoverColor,
  movedToNext,
  movedToPrevious,
  escaped,
  removed,
  capitalizeFirst,
  selectedAutofocus,
  highlighted,
}) => {
  const containerRef = useRef();

  useEffect(
    () => {
      if (selected && selectedAutofocus) {
        containerRef.current.focus();
      }
    },
    []
  );

  useEffect(() => {
    if (highlighted) {
      containerRef.current.focus();
    }
  }, [highlighted]);

  /**
   * Handles the keydown event on the select option.
   * @param {*} event
   */
  const handleKeyDown = event => {
    let matchedNonPrintableKey = true;

    switch (event.keyCode) {
      case keyCodes.DOWN_ARROW: {
        movedToNext();
        break;
      }
      case keyCodes.UP_ARROW: {
        movedToPrevious();
        break;
      }
      case keyCodes.ESC: {
        escaped();
        break;
      }
      case keyCodes.BACKSPACE:
      case keyCodes.DELETE: {
        removed(item);
        break;
      }
      case keyCodes.SPACE:
      case keyCodes.ENTER: {
        clickedItem(item);
        break;
      }
      default:
        matchedNonPrintableKey = false;
    }

    if (matchedNonPrintableKey) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const ariaLabel = selected ? `Valore selezionato ${item.value}` : item.value;

  return (
    <SelectOption
      ref={containerRef}
      role="option"
      tabIndex="0"
      id={`${selectName}-item.id`}
      {...(selected ? { 'aria-selected': true } : {})}
      bgHoverColor={bgHoverColor}
      capitalizeFirst={capitalizeFirst}
      selected={selected}
      onKeyDown={handleKeyDown}
      onClick={() => { clickedItem(item) }}
      aria-label={ariaLabel}
    >
      <div>
        {
          selected ?
            (
              <FaIcon
                icon="check"
                color="primary"
                fontSize="f7"
              />
            ) : null
        }
      </div>
      {item.value}
    </SelectOption>
  );
};

Option.displayName = 'SelectOption';

export default Option;
