/** @format */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { injectIntl } from 'react-intl';
import { fonts, colors } from 'theme';
import { hexToRgba } from 'utils/functions/hexToRgba';
import { noop } from 'utils/functions/noop';
import { useClickOutside } from 'hooks/useClickOutside';
import { keyCodes } from '../utils/constants/keyCodes';
import OptionGroup from './OptionGroup';

const StyledSelectWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 1px;
  min-width: 100%;
  padding-top: ${props => props.hasLabel ? '6px' : '0'};
  font-size: ${fonts.size.f7};
  cursor: ${props => props.disabled || props.readOnly ? 'default' : 'pointer'};
`;

const TextSpan = styled.span`
  position: absolute;
  text-transform: uppercase;
  top: 0;
  left: 10px;
  font-size: ${fonts.size.f8};
  line-height: 15px;
  background-color: ${colors.white};
  padding: 0px 4px;
  font-weight: 600;
  transition: color 0.2s;
  letter-spacing: 0.05em;
  i {
    color: ${colors.red};
    font-style: normal;
    font-size: 100%;
  }
`;

const StyledSelectedOption = styled.button`
  width: 100%;
  background: none;
  text-align: left;
  padding: 9px 13px 9px;
  border-width: 1px;
  border-style: solid;
  color: ${colors.black};
  cursor: ${props => props.disabled || props.readOnly ? 'default' : 'pointer'};
  
  transition: border 0.2s, box-shadow 0.2s;

  ${props => !props.hideBorder ?
    css`
      border: 2px solid ${props => props.color ? colors[props.color] : colors.darkGrey};
    ` :
    'border: none'
  }

  &:focus {
    outline: 0;
  }

  + span {
    color: ${props => props.color ? colors[props.color] : colors.darkGrey};
  }

  ${props => props.error ?
    css`
      border-color: ${colors.red};
      + span {
        color: ${colors.red};
      }
    ` :
    null
  }

  ${props => props.disabled ?
    css`
      border-color: ${colors.grey};
      + span {
        color: ${colors.grey};
      }
    ` :
    null
  }
  
  ${props => !(props.disabled || props.readOnly) ?
    css`
      &:hover, &:focus {
        border-color: ${colors.primary};
        outline: 0;

        + span {
          color: ${colors.primary};
        }
    }` :
    null
  }
`;

const SelectedOptionContent = styled.div`
  display: inline-block;
  width: 100%;
  text-align: ${props => props.textAlign || 'inherit'};
  vertical-align: initial;
  height: fit-content;
  span {
    white-space: ${props => props.wrapWords ? 'normal' : 'nowrap'}; 
    text-overflow: ellipsis; 
    overflow: hidden;
    max-width: 85%;
    display: inline-block;
    /* margin-right: 16px; */
    word-break: break-word;
    vertical-align: text-bottom;

    ${props => props.capitalizeFirst ?
    'text-transform: capitalize;' :
    null
  }

    ${props => !props.isSelected ?
    css`
        color: ${props.color ? hexToRgba(props.color) : hexToRgba(colors.darkGrey, 0.7)};
      ` :
    null
  }
  }
`;

const StyledArrow = styled.div`
  box-sizing: border-box;
  height: 9px;
  width: 9px;
  border-style: solid;
  border-color: inherit;
  border-width: 0px 3px 3px 0px;
  position: relative;
  top: ${props => props.itemsVisible ? '8px' : '4px'};
  transform: ${props => props.itemsVisible ? 'rotate(-135deg)' : 'rotate(45deg)'};
  display: inline-block;
  float: right;
`;

const Select = ({
  placeholder,
  intlPlaceholder,
  intlLabel,
  label,
  intl,
  name,
  items,
  selectedValue,
  clickedItem,
  removedItem = noop,
  clickedSelectedItem = noop,
  maxHeight,
  color,
  required,
  zIndex,
  bgColor,
  bgHoverColor,
  multi,
  textAlign,
  wrapWords = false,
  hideBorder,
  capitalizeFirst,
  onBlur,
  error,
  disabled,
  enableSearch,
  searchLowerLimit = 3,
  selectedOptAutofocus,
  className,
  labelSelected
}) => {
  const [itemsVisible, setItemsVisible] = useState(false);
  const [highlightedItem, setHighlightedItem] = useState();
  const [searchTerm, setSearchedTerm] = useState();

  const prevSelectedItems = useRef([]);
  const lastSearchedValue = useRef('');

  // Translated labels.
  const selectLabel = intlLabel ?
    intl.formatMessage({ id: intlLabel.id }, intlLabel.params) :
    label;
  const selectPlaceholder = intlPlaceholder ?
    intl.formatMessage({ id: intlPlaceholder.id }, intlPlaceholder.params) :
    placeholder;

  // The prefix used to build a set of unique aria attributes.
  const ariaPrefix = name ? `${name}-` : '';

  const getSelectedItems = value => multi ? value : [].concat(value || []);
  const currentSelectedItems = getSelectedItems(selectedValue);

  // aria-label to accessibility

  const ariaLabel = currentSelectedItems && currentSelectedItems.length > 0 ?
    `${labelSelected} ${currentSelectedItems.map(current => current.value).join(', ')}`
    : selectPlaceholder;

  /**
  * The set of items, with the selected ones at the top.
  */
  const sortItems = (elements, selectedElements) => {
    if (!multi || !selectedElements?.length) {
      return elements.slice();
    }

    return elements.slice().sort((itemA, itemB) => {
      const itemASelected = selectedElements.some(selItem => itemA.id === selItem.id);
      const itemBSelected = selectedElements.some(selItem => itemB.id === selItem.id);

      // itemA is selected and itemB is not, show itemA before itemB
      if (itemASelected && !itemBSelected) {
        return -1;
      }

      // itemB is selected and itemA is not, show itemA before itemB
      if (itemBSelected && !itemASelected) {
        return 1;
      }

      // itemA and itemB are both selected/deselected, just leave their position unchanged.
      return 0;
    });
  };

  /**
   * The set of select options to show:
   * - filtered by the search term
   * - sorted in order to show the set of selected items on top.
   */
  const showedItems = useMemo(
    () => {
      let itemsCopy = sortItems(items, currentSelectedItems);

      if (
        searchTerm &&
        searchTerm.length >= searchLowerLimit &&
        searchTerm !== lastSearchedValue.current
      ) {
        itemsCopy = itemsCopy.filter(
          el => el.value.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1
        );
      }

      return itemsCopy;
    },
    [items, searchTerm, currentSelectedItems],
  );

  /**
   * Hides the set of select options and reset the search term.
   */
  const hideItems = () => {
    lastSearchedValue.current = '';
    setSearchedTerm('');
    setItemsVisible(false);
  };

  /**
   * Shows the set of select options.
   */
  const showItems = () => setItemsVisible(true);

  /**
   * Toggles the visibility of the set of selection options.
   */
  const changeItemsVisibility = newVisibility => {
    if (newVisibility) {
      showItems();
    } else {
      hideItems();
    }
  };

  // Handles the click ouside of the wrapper.
  const [wrapperRef] = useClickOutside(() => hideItems());

  /**
  * Changes to highlighted item when the selected one changes.
  */
  useEffect(
    () => {
      const selectedItems = getSelectedItems(selectedValue);
      if (selectedItems && selectedItems.length > 0) {
        const currentRef = prevSelectedItems.current || [];

        const newHighlightedItem = selectedItems.find(item =>
          !currentRef.some(prevItem => prevItem.id === item.id));

        setHighlightedItem(newHighlightedItem);
        prevSelectedItems.current = selectedItems;
      }
    },
    [selectedValue]
  );

  /**
   * Determines if the provided item is selected.
   * @param {*} item
   */
  const isSelectedItem = item =>
    !!currentSelectedItems && currentSelectedItems.some(current => current.id === item.id);

  /**
   * Highlights the item in the given position.
   */
  const highlightItem = position => {
    if (position < 0 || position > (showedItems.length - 1)) {
      return;
    }
    setHighlightedItem(showedItems[position]);
  };

  /**
   * Reset the highlighted item.
   */
  const resetHighlightedItem = () => {
    setHighlightedItem(undefined);
  };

  /**
   * Handles the keydown event on the selected option.
   * @param {*} event
   */
  const handleKeyDown = event => {
    let matchedNonPrintableKey = true;

    switch (event.keyCode) {
      case keyCodes.DOWN_ARROW: {
        if (!itemsVisible) {
          showItems();
        }
        if (itemsVisible && !highlightedItem) {
          highlightItem(0);
        }
        break;
      }
      case keyCodes.ESC: {
        hideItems();
        break;
      }
      case keyCodes.ENTER: {
        showItems();
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

  /**
   * Handles the click on an item of the dropdown
   * by toggling its selection.
   * @param {*} item The clicked item.
   */
  const handleItemClick = item => {
    if (isSelectedItem(item)) {
      clickedSelectedItem(item);
    } else {
      clickedItem(item);
    }

    if (!multi) {
      hideItems();
    }
  };

  /**
  * Handles the onChange event on the search input element.
  * @param {*} event
  */
  const handleInputOnChange = event => {
    const currentValue = event.target.value;
    setSearchedTerm(currentValue);
  };

  return (
    <StyledSelectWrapper className={className} ref={wrapperRef} hasLabel={selectLabel} multi={multi}>
      <StyledSelectedOption
        type="button"
        aria-haspopup="listbox"
        aria-labelledby={`${ariaPrefix}exp_elem ${ariaPrefix}exp_button`}
        aria-label={ariaLabel || name}
        hideBorder={hideBorder}
        color={color}
        id={`${ariaPrefix}exp_button`}
        {...(multi ? { 'aria-multiselectable': true } : {})}
        {...(itemsVisible ? { 'aria-expanded': true } : {})}
        onClick={() => {
          if (!disabled) {
            // Toggle dropdown visibility.
            changeItemsVisibility(!itemsVisible);
          }
        }}
        onKeyDown={(ev) => {
          if (!disabled) {
            handleKeyDown(ev);
          }
        }}
        onBlur={onBlur}
        error={error}
        disabled={disabled}
      >
        <SelectedOptionContent
          isSelected={!!currentSelectedItems && currentSelectedItems.length > 0}
          textAlign={textAlign}
          wrapWords={wrapWords}
          capitalizeFirst={capitalizeFirst}
          multi={multi}
        >
          <span>
            {currentSelectedItems && currentSelectedItems.length > 0 ?
              currentSelectedItems.map(current => current.value).join(', ') :
              selectPlaceholder
            }
          </span>
          <StyledArrow
            color={color}
            itemsVisible={itemsVisible}
          />
        </SelectedOptionContent>
      </StyledSelectedOption>
      <OptionGroup
        itemsVisible={itemsVisible}
        items={showedItems}
        ariaPrefix={ariaPrefix}
        highlightedItem={highlightedItem}
        bgHoverColor={bgHoverColor}
        zIndex={zIndex}
        bgColor={bgColor}
        maxHeight={maxHeight}
        name={name}
        capitalizeFirst={capitalizeFirst}
        handleItemClick={handleItemClick}
        removedItem={removedItem}
        setItemsVisible={changeItemsVisibility}
        highlightItem={highlightItem}
        isSelectedItem={isSelectedItem}
        handleInputOnChange={handleInputOnChange}
        handleKeyDown={handleKeyDown}
        enableSearch={enableSearch}
        resetHighlightedItem={resetHighlightedItem}
        selectedOptAutofocus={!multi && selectedOptAutofocus}
      />
      {
        selectLabel ?
          (
            <TextSpan id={`${ariaPrefix}exp_elem`}>
              {selectLabel}
              {required && <i> *</i>}
            </TextSpan>
          )
          : null
      }
    </StyledSelectWrapper>
  );
};

Select.displayName = 'Select';

export default injectIntl(Select);
