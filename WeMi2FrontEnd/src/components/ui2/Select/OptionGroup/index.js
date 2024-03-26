
import React from 'react';
import styled, {css} from 'styled-components';
import { colors } from 'theme';
import { hexToRgba } from 'utils/functions/hexToRgba';
import SelectOption from '../Option';
import debounce from 'utils/functions/debounce';

export const SelectOptionsGroup = styled.ul`
  border-top: 0;
  max-height: ${props => props.maxHeight || '12.2rem'};
  overflow-y: auto;
  position: absolute;
  margin: 0;
  width: 100%;
  z-index: ${props => props.zIndex ? props.zIndex : '7'};
  background-color: ${props => props.bgColor ?
    hexToRgba(colors[props.bgColor], 0.90) :
    hexToRgba(colors.greyInput, 0.90)
  };
`;

const StyledContainerSearch = styled.div`
  padding: 1em 0;
  margin: 0 1em;
  border-bottom: 1px solid gray;
  
  & > input {
    width: 100%;
    padding: 0.5em;
    border: 1px solid ${colors.primary};
  }
`;

const OptionGroup = ({
  itemsVisible,
  items,
  ariaPrefix,
  highlightedItem,
  bgHoverColor,
  zIndex,
  bgColor,
  maxHeight,
  name,
  handleItemClick,
  removedItem,
  setItemsVisible,
  isSelectedItem,
  highlightItem,
  capitalizeFirst,
  handleInputOnChange,
  handleKeyDown,
  enableSearch,
  resetHighlightedItem,
  selectedOptAutofocus,
}) => {
  /**
  * Performs a debounce on onChange event.
  */
  const debounceOnChange = debounce(handleInputOnChange, 500);

  return (
    <>
      {
        itemsVisible ? (
          <SelectOptionsGroup
            id={`${ariaPrefix}exp_elem_list`}
            tabIndex="-1"
            role="listbox"
            aria-labelledby={`${ariaPrefix}exp_elem`}
            {...(highlightedItem ?
              { 'aria-activedescendant': `${ariaPrefix}${highlightedItem.id}` } :
              {}
            )}
            zIndex={zIndex}
            bgColor={bgColor}
            maxHeight={maxHeight}
            selectName={name || ''}
          >
            {enableSearch ? (
              <StyledContainerSearch>
                <input
                  autoFocus
                  onKeyDown={handleKeyDown}
                  onFocus={resetHighlightedItem}
                  placeholder="Ricerca..."
                  onChange={ev => {
                    ev.persist();
                    debounceOnChange(ev);
                  }}
                  style={{ outline: 'none' }}
                />
              </StyledContainerSearch>
            ) : null}
            {items && items.length > 0 && items.map((item, index) => (
              <SelectOption
                key={item.id}
                option={item}
                item={item}
                selected={isSelectedItem(item)}
                highlighted={highlightedItem && highlightedItem.id === item.id}
                bgHoverColor={bgHoverColor}
                clickedItem={handleItemClick}
                removed={removedItem}
                capitalizeFirst={capitalizeFirst}
                escaped={() => setItemsVisible(false)}
                movedToNext={() => highlightItem(index + 1)}
                movedToPrevious={() => highlightItem(index - 1)}
                selectedAutofocus={selectedOptAutofocus}
              />
              ))
            }
          </SelectOptionsGroup>
        ) : null
      }
    </>
  );
};

OptionGroup.displayName = 'SelectOption';

export default OptionGroup;
