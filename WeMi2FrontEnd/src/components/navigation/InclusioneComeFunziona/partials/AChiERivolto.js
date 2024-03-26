import React from 'react';
import TextBox from './TextBox';
import { aChiERivolto } from './constants';

const AChiERivolto = () => (
  <TextBox
    title={aChiERivolto.title}
    text={aChiERivolto.text}
  />
);

AChiERivolto.displayName = 'AChiERivoltoPage';

export default AChiERivolto;
