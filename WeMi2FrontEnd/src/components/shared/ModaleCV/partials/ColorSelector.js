/** @format */
import React from 'react';
import styled, { css } from 'styled-components';
import { colors } from 'theme';

const ColorCircle = styled.div`
  height: ${props => props.size ? props.size : '1em'};
  width: ${props => props.size ? props.size : '1em'};
  background-color: ${props => props.color};
  border-radius: 50%;
  margin: ${props => props.spacing || '0 .5em'}
  transition: all .3s ease-in-out;
  &:hover {
    transform: scale(1.9, 1.9);
    transition: all .3s ease-in-out;
  };
  ${props => props.selectedColor && css`
      transform: scale(1.9, 1.9);
      transition: all .3s ease-in-out;
  `}
`

const ColorSelector = ({
  colorList,
  getColor,
  selectedColor,
  size,
  spacing,
}) => {

  const handleSelectedColor = (val) => {
    if (selectedColor !== val) {
      getColor(val);
    } else getColor(undefined);
  };

  return (
    <>
      {colorList.map(el => (
        <ColorCircle
          key={el.id}
          size={size}
          spacing={spacing}
          color={el.color}
          onClick={() => handleSelectedColor(el.color)}
          selectedColor={selectedColor === el.color}
        />
      ))}

    </>
  )
};

ColorSelector.displayName = 'ColorSelector';

export default ColorSelector;
