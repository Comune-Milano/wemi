import React from 'react';
import styled from 'styled-components';

// sr-only
const SpanHidden = styled.span`
  border: 0;
  clip: rect(0,0,0,0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  @media print {
    display: none;
  }
`;

const AccessibilityReadingFaIcon = ({ text }) => (
  <SpanHidden>
    {text}
  </SpanHidden>
);

AccessibilityReadingFaIcon.displayName = 'AccessibilityReadingFaIcon';

export default AccessibilityReadingFaIcon;
