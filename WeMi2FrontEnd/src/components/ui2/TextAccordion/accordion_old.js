/** @format */
import React, { useState } from 'react';
import TextAccordionControllable from './accordion';


const TextAccordion = ({
  label,
  size,
  color,
  weight,
  labelTransform,
  labelLetterSpacing,
  maxheight,
  visible,
  children,
  nearTitle,
  reference,
  margin,
  tabIndex,
  padding,
  ...rest
}) => {
  const [open, setOpen] = useState(visible || false);

  return (
    <TextAccordionControllable
      label={label}
      labelLetterSpacing={labelLetterSpacing}
      size={size}
      color={color}
      weight={weight}
      labelTransform={labelTransform}
      maxheight={maxheight}
      visibility={open}
      nearTitle={nearTitle}
      forwardRef={reference}
      onVisible={setOpen}
      margin={margin}
      tabIndex={tabIndex}
      padding={padding}
      {...rest}
    >
      {children}
    </TextAccordionControllable>
  );
};
TextAccordion.displayName = 'TextAccordion';
// Accordion.propTypes = AccordionPropTypes;
export default TextAccordion;
