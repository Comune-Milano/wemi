import Button from 'components/ui2/Button';
import React from 'react';
import { withRouter } from 'react-router';
import { PAGE_INCLUSIONE_CORSO_ITALIANO } from 'types/url';
import IlProgetto from './ilprogetto';
import CosaOffre from './CosaOffre';
import CosaOffreScuola from './CosaOffreScuola';
import AChi from './AChi';
import LaRete from './larete';

const ComeFunzionaApprendimento = ({
  history,
}) => (
  <>
    <IlProgetto />
    <CosaOffre />
    <CosaOffreScuola />
    <AChi />
    <LaRete />
    <div style={{ margin: '3em 0 0 0' }}>
      <Button
        label="CERCO UN CORSO DI ITALIANO A MILANO"
        color="blue"
        fontSize="f6"
        padding="5px 30px"
        weight="bold"
        width="auto"
        onClick={() => { history.push(PAGE_INCLUSIONE_CORSO_ITALIANO); }}
      />
    </div>
  </>
);

ComeFunzionaApprendimento.displayName = 'ComeFunzionaApprendimento';
export default withRouter(ComeFunzionaApprendimento);
