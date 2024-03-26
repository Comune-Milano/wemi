import React from 'react';
import { Attivazione } from './partials/attivazione';
import { Realizzazione } from './partials/realizzazione';
import { Consolidamento } from './partials/consolidamento';
import { Preparazione } from './partials/preparazione';

const StepsComeFunziona = () => (
  <>
    <Preparazione />
    <Attivazione />
    <Realizzazione />
    <Consolidamento />
  </>
  );
StepsComeFunziona.displayName = 'StepsComeFunziona';
export default StepsComeFunziona;
