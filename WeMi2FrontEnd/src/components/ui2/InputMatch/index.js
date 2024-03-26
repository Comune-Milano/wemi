
import React, { useState } from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { fonts } from 'theme';
import { noop } from 'utils/functions/noop';
import { keyCodes } from '../utils/constants/keyCodes';
import Input from '../Input';
import OptionGroup from '../Select/OptionGroup';

const StyledMatchWrapper = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
  overflow: visible;
  font-size: ${fonts.size.f7};
  cursor: ${props => props.disabled || props.readOnly ? 'default' : 'text'};
`;

const InputMatch = ({
  intl,
  intlLabel,
  label,
  readOnly,
  height,
  onChange,
  color,
  bgColor,
  bgHoverColor,
  inputValue,
  clickedSelectedItem,
  clickedItem,
  removedItem,
  disabled,
  error,
  id,
  intlPlaceholder,
  placeholder,
  pattern,
  required,
  width,
  maxLength,
  minLength,
  pointer,
  min,
  name,
  max,
  type,
  onBlur,
  onClick,
  onFocus = noop,
  minChar,
  matches,
  maxHeight,
  capitalizeFirst,
  zIndex,
  forwardRef,
  ...rest
}) => {
  const [itemsVisible, setItemsVisible] = useState(false);
  const [highlightedItem, setHighlightedItem] = useState();
  const selectedItems = [].concat(inputValue ? [inputValue] : []);
  const ariaPrefix = name ? `${name}-` : '';

  /**
 * Determines if the provided item is selected.
 * @param {*} item
 */
  const isSelectedItem = item =>
    !!selectedItems && selectedItems.some(current => current.id === item.id);

  /**
 * Handles the click on an item of the dropdown
 * by toggling its selection.
 * @param {*} item The clicked item.
 */
  const handleItemClick = item => {
    setItemsVisible(false);
    if (isSelectedItem(item)) {
      clickedSelectedItem(item);
      return;
    }
    clickedItem(item);
  };

  /**
 * Highlights the item in the given position.
 */
  const highlightItem = position => {
    if (matches) {
      if (position < 0 || (matches && position > (matches.length - 1))) {
        return;
      }
      setHighlightedItem(matches[position]);
    }
  };

  /**
   * Handles the keydown event on the selected option.
   * @param {*} event
   */
  const handleKeyDown = event => {
    switch (event.keyCode) {
      case keyCodes.DOWN_ARROW: {
        if (itemsVisible && !highlightedItem) {
          highlightItem(0);
        }
        break;
      }
      case keyCodes.ESC: {
        setItemsVisible(false);
        break;
      }
      default:
    };
    return false;
  };
  return (
    <StyledMatchWrapper>
      <Input
        id={id}
        onBlur={onBlur}
        onClick={onClick}
        onFocus={() => { onFocus(); setHighlightedItem(); }}
        onKeyDown={handleKeyDown}
        name={name}
        intl={intl}
        intlLabel={intlLabel}
        label={label}
        intlPlaceholder={intlPlaceholder}
        placeholder={placeholder}
        inputValue={inputValue}
        color={color}
        pointer={pointer}
        pattern={pattern}
        width={width}
        height={height}
        onChange={(value) => {
          onChange(value);
          setItemsVisible(value.length > minChar);
        }}
        required={required}
        disabled={disabled}
        error={error}
        max={max}
        min={min}
        maxLength={maxLength}
        minLength={minLength}
        readOnly={readOnly}
        type={type}
        innerRef={forwardRef}
        bgColor={bgColor}
        hoverColor={bgHoverColor}
        {...rest}
      />
      <OptionGroup
        itemsVisible={itemsVisible}
        items={matches || []}
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
        setItemsVisible={setItemsVisible}
        highlightItem={highlightItem}
        isSelectedItem={isSelectedItem}
      />
    </StyledMatchWrapper>
  );
};

InputMatch.displayName = 'InputMatch';

export default injectIntl(InputMatch);
