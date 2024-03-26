/** @format */

import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { colors, fonts } from "theme";
import { injectIntl } from 'react-intl';
import Radio from './radio';


const StyledRadioGroup = styled.div`
  display: ${props => props.display};
  overflow: hidden;
`;

StyledRadioGroup.displayName = "StyledRadioGroup";

const RadioGroup = ({
  intl,
  radioItems,
  selectedItem,
  onChange,
  labelledby,
  fontSize,
  checkcolor,
  width,
  display,
  spacing,
  noWrap,
  disabled,
  ...rest
}) => {
  const handleClick = (el, isSelected) => { 
    if (!isSelected) {
      onChange(el);
    } else {
      onChange({});
    }
  };

  return (
    <StyledRadioGroup
      display={display}
      role="radiogroup"
      aria-labelledby={labelledby}
    >
      {radioItems.map((el) => {
        const isSelected = selectedItem && selectedItem.id === el.id;
        return (
          <Radio
            key={`${el.label} ${el.id}`}
            intl={intl}
            width={width}
            selected={isSelected}
            onClick={() => handleClick(el, isSelected)}
            label={el.label}
            intlLabel={el.intlLabel}
            fontSize={fontSize}
            checkcolor={checkcolor}
            spacing={spacing}
            noWrap={noWrap}
            disabled={disabled}
            {...rest}
          />
        )
      })}
    </StyledRadioGroup>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default injectIntl(RadioGroup);
