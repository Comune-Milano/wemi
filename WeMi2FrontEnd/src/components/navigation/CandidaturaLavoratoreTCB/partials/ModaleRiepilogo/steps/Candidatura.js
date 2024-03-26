/** @format */

import React from 'react';
import Title from '../partials/Title';
import FieldCheck from '../partials/FieldCheck';
import { isNullOrUndefined } from 'components/navigation/AccordionServAccr/accordionPartials/common/utils';

const Candidatura = ({
  onPatchStep,
  Flags
}) => {

  return (
    !isNullOrUndefined(Flags) && <>
      <Title
        title="Candidatura"
      />
      <FieldCheck
        title='Candidatura come baby-sitter'
        checked={Flags.tata}
      />
      <FieldCheck
        title='Candidatura come colf'
        checked={Flags.colf}
      />
      <FieldCheck
        title='Candidatura come badante'
        checked={Flags.badante}

      />
    </>
  );
};

Candidatura.displayName = 'Candidatura';

export default Candidatura;
