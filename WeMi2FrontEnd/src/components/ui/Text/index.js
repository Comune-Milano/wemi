/** @format */

import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { fonts, colors } from 'theme';
import styled from 'styled-components';
import TextDefaultProps from './defaultProps';

const TextComponent = ({
  value,
  color,
  bgcolor,
  intlFormatter,
  size,
  padding,
  display,
  margin,
  weight,
  width,
  transform,
  decoration,
  fontStyle,
  align,
  whitespace,
  tag: Component,
  activeIntl,
  lineHeight,
  borderBottom,
  letterSpacing,
  wordBreak,
  ...rest
}) => (
    <Fragment>
      {activeIntl ? (
        <FormattedMessage id={value ? value : 'default'} defaultMessage={value ? value : ''}>
          {message => (
            <Component
              style={{
                fontSize: `${fonts.size[size]}`,
                fontWeight: `${fonts.weight[weight]}`,
                textTransform: `${fonts.transform[transform]}`,
                wordBreak,
                textDecoration: `${decoration}`,
                fontStyle: `${fontStyle}`,
                color: `${colors[color]}`,
                backgroundColor: `${colors[bgcolor]}`,
                margin: `${margin}`,
                padding: `${padding}`,
                textAlign: `${align}`,
                lineHeight,
                borderBottom,
              }}
              {...rest}
            >
              {message}
            </Component>
          )}
        </FormattedMessage>
      ) : 
        (
          <Component
            style={{
              fontSize: `${fonts.size[size]}`,
              fontWeight: `${fonts.weight[weight]}`,
              textTransform: `${fonts.transform[transform]}`,
              letterSpacing,
              wordBreak,
              textDecoration: `${decoration}`,
              fontStyle: `${fontStyle}`,
              color: `${colors[color]}`,
              backgroundColor: `${colors[bgcolor]}`,
              margin: `${margin}`,
              padding: `${padding}`,
              textAlign: `${align}`,
              display: `${display}`,
              lineHeight,
              borderBottom,
            }}
            id="person-label"
            {...rest}
          >
            {value}
          </Component>
        )}
    </Fragment>
  );

TextComponent.displayName = 'TextComponent';
TextComponent.defaultProps = TextDefaultProps;
// TextComponent.propTypes = TextPropTypes;
const Text = styled(TextComponent)`
  width: ${props => props.width};
  white-space: ${props => props.whitespace ? props.whitespace : 'normal'};
`;
export default Text;
