import React from 'react';
import TextBox from './TextBox';
import IconifiedTextBox from './IconifiedTextBox';
import { cosaOffre, cosaOffreIcon } from './constants';

const CosaOffre = () => (
  <>
    <TextBox
      title={cosaOffre.title}
      text={cosaOffre.text}
    />
    <IconifiedTextBox
      text={cosaOffreIcon}
    />
  </>
);

CosaOffre.displayName = 'CosaOffrePage';

export default CosaOffre;
